const _ = require("lodash");
const moment = require("moment");
const querystring = require("querystring");

const parseUrlQuery = url => {
  const urls = url.split("?");

  if (!urls[1]) return {};

  return querystring.parse(urls[1]);
};

const safeToArray = field => {
  if (!field) return;

  if (typeof field === "string") {
    return [field];
  }

  if (_.isArray(field)) return field;

  return;
};

// time dimension
const timeDims = [
  "year",
  "quarter",
  "month",
  "week",
  "isoWeek",
  "day",
  "hour",
  "min",
  "second",
];

/**
 * is group is a time
 * @param {string} field
 */
const isTimeGroup = field => {
  const splitted = field.split(".");

  if (splitted.length <= 1) return false;

  return timeDims.includes(_.last(splitted));
};

/**
 * parse group
 * eg...
 * input: ["birthAt.hour", "birthAt.year", "tag"]
 * output: 
 * [
 *    { field: 'birthAt', timeDim: 'hour', key: (val, dim) => moment(val).startOf(dim).toISOString() },
      { field: 'tag' } 
   ]
 * @param {[string]} group
 */
const parseGroup = group => {
  const parsed = _.uniq(group).map(g => {
    const ret = { field: g };
    if (isTimeGroup(g)) {
      ret.field = _.slice(g.split("."), 0, -1).join(".");
      ret.timeDim = _.last(g.split("."));
      // to key
      ret.key = (val, dim) => {
        return moment(val)
          .startOf(dim)
          .toISOString();
      };
    }
    return ret;
  });

  const chain = _.chain(parsed)
    .groupBy(p => p.field)
    .mapValues(o => {
      if (o.length <= 1) return o[0];
      else {
        return _.maxBy(o, g => _.indexOf(timeDims, g.timeDim));
      }
    });

  return chain.values().value();
};

function handleAggs(aggs = {}, req, res) {
  const path = req.path;
  const query = parseUrlQuery(req.url) || {};
  const agg = aggs[path] || {};
  const data = res.locals.data;

  if (!_.isArray(data)) return data;

  const { _group, _select } = query;

  const group = safeToArray(_group);
  const select = safeToArray(_select);

  if (!group) return data;

  const parsed = parseGroup(group);

  const grouped = _.groupBy(data, r => {
    return querystring.stringify(
      parsed.map(g => {
        if (g.key) {
          return g.key(_.get(r, g.field), g.timeDim);
        }

        return _.get(r, g.field);
      })
    );
  });

  // set total header
  res.setHeader("X-Total-Count", _.keys(grouped).length);

  return _.keys(grouped).map(k => {
    const fileds = querystring.parse(k);
    // records in group key
    const records = grouped[k];

    // group dims
    const dimensions = {};

    for (let i = 0; i < parsed.length; i++) {
      dimensions[parsed[i].field] = fileds[i];
    }

    // result
    const ret = {};

    // no select add count field in result
    ret.count = records.length;

    if (select) {
      for (let s of select) {
        const aggConfig = agg[s] || "sum";

        let aggFun;

        if (_.isString(aggConfig)) {
          switch (aggConfig) {
            case "sum":
              aggFun = rs => _.sumBy(rs, r => r[s]);
              break;
            case "avg":
              aggFun = rs => _.sumBy(rs, r => r[s]) / rs.length;
              break;
            default:
              break;
          }
        }

        if (_.isFunction(aggConfig)) {
          aggFun = aggConfig;
        }

        if (aggFun) {
          ret[s] = aggFun(records);
        }
      }
    }

    return {
      ...dimensions,
      ...ret,
    };
  });
}

module.exports.handleAggs = handleAggs;
module.exports.parseGroup = parseGroup;

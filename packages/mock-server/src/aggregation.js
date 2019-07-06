const _ = require("lodash");
const moment = require("moment");
const querystring = require("querystring");
const { safeToArray } = require("./util");

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
  const query = req.cusQuery || {};
  const agg = aggs[path];
  const data = res.locals.data;

  if (!agg) return data;
  if (!_.isArray(data)) return data;

  const { _group, _limit = 10, _start = 0, _order, _sort } = query;

  const group = safeToArray(_group);

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

  const result = _.keys(grouped).map(k => {
    const fileds = querystring.parse(k);
    // records in group key
    const records = grouped[k];

    // group dims
    const dimensions = {};

    for (let i = 0; i < parsed.length; i++) {
      dimensions[parsed[i].field] = fileds[i];
    }

    // cal all metrics
    const metrics = _.mapValues(agg, (aggConfig = "sum", m) => {
      let aggFun;
      if (_.isString(aggConfig)) {
        switch (aggConfig) {
          case "sum":
            aggFun = rs => _.sumBy(rs, r => r[m]);
            break;
          case "avg":
            aggFun = rs => _.sumBy(rs, r => r[m]) / rs.length;
            break;
          default:
            throw new Error("Not support aggregation config: " + aggConfig);
        }
      }
      if (_.isFunction(aggConfig)) {
        aggFun = aggConfig;
      }

      return aggFun(records);
    });

    return {
      id: querystring.stringify(dimensions),
      ...dimensions,
      ...metrics,
    };
  });

  // set total header
  res.setHeader("X-Total-Count", result.length);

  let chain = _.chain(result);

  // handle sort
  if (_sort) {
    const _sortSet = _sort.split(",");
    const _orderSet = (_order || "").split(",").map(s => s.toLowerCase());
    chain = chain.orderBy(_sortSet, _orderSet);
  }

  chain = chain.slice(_start, _start + _limit);

  // add id

  return chain.value();
}

module.exports.handleAggs = handleAggs;
module.exports.parseGroup = parseGroup;

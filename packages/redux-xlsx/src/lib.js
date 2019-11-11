import { get, findIndex } from "lodash";

/**
 * pick as lodash but return flattern object
 * @param {*} obj
 * @param {*} paths
 */
export function pickF(obj, paths = []) {
  const res = {};
  for (let key of paths) {
    res[key] = get(obj, key);
  }
  return res;
}

export const getChildColumns = columns => {
  // 获取所有叶子节点，用于输出具体数据
  let stack = [],
    result = [],
    tmp = [...columns];
  tmp.forEach(c => stack.push(c));
  while (stack.length > 0) {
    let val = stack.shift();
    if (val.children)
      [...val.children].reverse().forEach(c => stack.unshift(c));
    else result.push(val.dataIndex);
  }
  return result;
};

const getNoChild = columns => {
  // 按顺序获取当前数组中，所有不含child的节点
  let stack = [],
    noChildResult = [],
    tmp = [...columns];
  tmp.forEach(c => stack.push(c));

  while (stack.length > 0) {
    let val = stack.shift();
    if (val.children)
      [...val.children].reverse().forEach(c => stack.unshift(c));
    else noChildResult.push(val);
  }
  return noChildResult;
};

const getItemByKey = (columns, key) => {
  // 通过key获取它的节点
  if (!key) return null;
  let stack = [],
    item = null,
    tmp = [...columns];
  tmp.forEach(c => stack.push(c));

  while (stack.length > 0) {
    let val = stack.shift();
    if (val.key === key) {
      item = val;
      break;
    }
    if (val.children)
      val.children.forEach(c => {
        c.parent = val.key;
        stack.push(c);
      });
  }
  return item;
};

const removeAndInsertChild = (columns, havChildResult, index) => {
  // 移除并插入节点
  let tmp = [...columns];
  for (let i = 0; i < havChildResult[index].length; i++) {
    // 要移除子节点的key
    let key = havChildResult[index][i].key;
    let item = getItemByKey(tmp, key);
    // insertNum至少为1，子节点个数最少是2
    let insertNum = item.children.length - 1;
    item.children = undefined;

    // 获取父节点
    let parentKey = item.parent;
    if (parentKey) {
      let parentItem = getItemByKey(tmp, parentKey);
      let childIndex = findIndex(parentItem.children, ["key", key]);
      for (let j = 0; j < insertNum; j++) {
        parentItem.children.splice(childIndex, 0, item);
      }
    } else {
      // 表示到顶部
      let childIndex = findIndex(tmp, ["key", key]);
      for (let j = 0; j < insertNum; j++) {
        tmp.splice(childIndex, 0, item);
      }
    }
  }
  return tmp;
};

const getHavChild = columns => {
  // 获取有child的节点 倒序输出
  let stack = [],
    havChildResult = [],
    tmp = [...columns];
  tmp.forEach(c => {
    c.parent = undefined;
    stack.push(c);
  });
  stack.push(0); //添加层结束标志
  let tmpArray = [];
  while (true) {
    let val = stack.shift();
    if (!val) {
      if (tmpArray.length > 0) havChildResult.push([...tmpArray]);
      tmpArray = [];
      if (stack.length > 0) stack.push(0);
      else break;
    } else if (val.children) {
      val.children.forEach(c => {
        c.parent = val.key;
        stack.push(c);
      });
      tmpArray.push(val);
    }
  }
  return havChildResult.reverse();
};

const getTitle = data => {
  let result = [],
    tmp = [];
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
      if (
        (j && data[i][j].key === data[i][j - 1].key) ||
        (i && data[i][j].key === data[i - 1][j].key)
      )
        tmp.push("");
      else tmp.push(data[i][j].title);
    }
    result.push(tmp);
    tmp = [];
  }
  return result;
};
const getMerge = data => {
  // { s: {r:0, c:0}, e: {r:0, c:1} }
  let result = [],
    left = 0,
    right = 0,
    up = 0,
    down = 0,
    key = "";
  for (let i = 0; i < data.length; i++) {
    up = i;
    down = up + 1;
    left = 0;
    right = 1;
    while (right <= data[i].length) {
      key = data[up][left].key;
      if (
        (left && data[up][left - 1].key === key) ||
        (up && data[up - 1][left].key === key)
      ) {
        left++;
        right++;
        continue;
      }
      while (right < data[i].length && data[up][right].key === key) {
        right++;
      }
      while (down < data.length && data[down][left].key === key) {
        down++;
      }
      if (left !== right - 1 || up !== down - 1)
        result.push({
          s: { r: up, c: left },
          e: { r: down - 1, c: right - 1 },
        });

      left = right;
      right++;
      down = up + 1;
    }
  }
  return result;
};

export const getValues = columns => {
  let havChildResult = getHavChild(columns);
  let tmp = [...columns],
    result = [];
  for (let i = 0; i < havChildResult.length; i++) {
    let data = getNoChild(tmp);
    result.push(data);
    tmp = removeAndInsertChild(tmp, havChildResult, i);
  }
  result.push(getNoChild(tmp));
  result = result.reverse();
  const title = getTitle(result);
  const merge = getMerge(result);
  return [title, merge];
};

/**
 * 方法说明
 *     A   B  C
 *    /\  /\
 *   D E F G    =>按顺序获取所有无child节点 =>[HIEFGC]=>剔除最后一层=>
 *  /\
 * H I
 *
 *      A   B  C
 *    //\  /\
 *   DD E F G    =>按顺序获取所有无child节点 =>[DDEFGC]=>剔除最后一层=>
 *
 *   AAA BB C =>按顺序获取所有无child节点 =>[AAABBC]=>
 *
 * [[AAABBC],
 *  [DDEFGC],
 *  [HIEFGC]]
 */

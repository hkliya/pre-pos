'use strict';

function parse(str) {
  if (str.length === 1) {
    return {key: str, count: 1};
  }

  let arr = str.split("-");
  return {key: arr[0], count: parseInt(arr[1], 10)};
}

function expand(collectionA) {
  let res = [];
  for (let str of collectionA) {
    let {key, count} = parse(str);
    for (let i = 0; i < count; i++) {
      res.push(key);
    }
  }
  return res;
}
function group(expanded) {
  return expanded.reduce((res, ch) => {
    let o = res.find((o) => o.key === ch);
    if (o) {
      o.count++;
    } else {
      res.push({key: ch, count: 1});
    }
    return res;
  }, [])
}
function discount(grouped, promotionItems) {
  return grouped.map((o) => {
    let count = o.count;
    if (promotionItems.includes(o.key)) {
      count -= Math.floor(count / 3);
    }
    return {key: o.key, count: count};
  });

}
function createUpdatedCollection(collectionA, objectB) {
  let expanded = expand(collectionA);
  let grouped = group(expanded);
  return discount(grouped, objectB.value);
}


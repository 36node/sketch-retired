import Taro from '@tarojs/taro';

/**
 * 全局数据设置获取
 */
const globalData = {};

export function setGlobalData(key, val) {
  globalData[key] = val;
}

export function getGlobalData(key) {
  return globalData[key];
}

/**
 * api 错误处理
 */
export function handleError(data) {
  if (data.ret === 20001) {
    Taro.redirectTo({
      url: '/pages/login/index?from=user',
    });
  }
  Taro.showToast({
    title: data.msg,
    icon: 'none',
  });
}

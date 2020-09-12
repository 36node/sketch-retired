import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';

import './index.scss';
import { handleError } from '../../lib';

import Description from '../../components/description';

export default class Interact extends Component {
  config = {
    navigationBarTitleText: '页面1',
  };

  state = {};

  componentDidShow() {
    Taro.showLoading({
      title: '加载中...',
    });
  }

  onShareAppMessage() {
    return {
      title: ``,
      path: `/pages/page1/index`,
    };
  }

  getData = async () => {
    const result = await Taro.request({
      url: ``,
    });

    const { data } = result;
    if (data) {
    } else {
      handleError(data);
    }
  };

  render() {
    return (
      <View className='index'>
        <Text>Hello world!</Text>
        <Description />
      </View>
    );
  }
}

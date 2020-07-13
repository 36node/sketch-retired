import Taro, { Component } from '@tarojs/taro';
import { View, Button } from '@tarojs/components';
import { AtAvatar, AtIcon } from 'taro-ui';

import './index.scss';

export default class Description extends Component {
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  config = {
    navigationBarTitleText: '组件',
  };

  render() {
    const { description = {} } = this.props;
    return (
      <View className='description'>
        <View className='info'>
          <View className='info-avatar'>
            <AtAvatar
              customStyle={{ width: '110rpx', height: '110rpx' }}
              circle
              image={description.avatar}
            />
          </View>
        </View>
      </View>
    );
  }
}

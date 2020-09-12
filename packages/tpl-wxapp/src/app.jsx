import Taro, { Component } from '@tarojs/taro';
import Index from './pages/index';

import './app.scss';

class App extends Component {
  componentDidMount() {}

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}

  config = {
    // 所有页面
    pages: ['pages/page1/index', 'pages/page2/index', 'pages/page3/index'],
    // 窗口设置
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: '小程序',
      navigationBarTextStyle: 'black',
    },
    // tabBar 设置
    tabBar: {
      color: '#333333',
      selectedColor: '#fc4431',
      borderStyle: 'black',
      backgroundColor: '#ffffff',
      list: [
        {
          text: 'page1',
          pagePath: 'pages/page1/index',
          iconPath: 'images/user.png',
          selectedIconPath: 'images/user-active.png',
        },
        {
          text: 'page2',
          pagePath: 'pages/page2/index',
          iconPath: 'images/user.png',
          selectedIconPath: 'images/user-active.png',
        },
        {
          text: 'page3',
          pagePath: 'pages/page3/index',
          iconPath: 'images/user.png',
          selectedIconPath: 'images/user-active.png',
        },
      ],
      position: 'bottom',
    },
  };

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return <Index />;
  }
}

Taro.render(<App />, document.getElementById('app'));

import React from "react";
import Head from "next/head";
import Link from "next/link";
import Tabs, { TabPane } from "rc-tabs";
import TabContent from "rc-tabs/lib/TabContent";
import ScrollableInkTabBar from "rc-tabs/lib/ScrollableInkTabBar";

export async function getServerSideProps() {
  return { props: { data: 1 } };
}
export default class extends React.Component {
  render() {
    return (
      <div className="container p-t-24 p-b-24">
        <Head>
          <title>设计规范</title>
          <link
            rel="stylesheet"
            type="text/css"
            href="//at.alicdn.com/t/font_1735222_euzqrw46d5s.css"
          />
        </Head>
        <Tabs
          defaultActiveKey="1"
          renderTabBar={() => <ScrollableInkTabBar />}
          renderTabContent={() => <TabContent />}
        >
          <TabPane tab="色彩" key="1">
            <div className="p-24">
              <div className="m-b-24">
                <span className="color-6 m-r-24">主题色：color-6</span>
                <span className="color-success m-r-24">
                  success色：color-success
                </span>
                <span className="color-warning m-r-24">
                  warning色：color-warning
                </span>
                <span className="color-error m-r-24">error色：color-error</span>
              </div>
              <div className="m-b-24">
                <span className="color-block color-bg-6 m-r-24">
                  主题背景色：color-bg-6
                </span>
                <span className="color-block color-bg-5 m-r-24">
                  hover背景色：color-bg-5
                </span>
                <span className="color-block color-bg-7 m-r-24">
                  selected背景色：color-bg-7
                </span>
                <span className="color-block color-bg-success m-r-24">
                  success背景色：color-bg-success
                </span>
                <span className="color-block color-bg-error m-r-24">
                  error背景色：color-bg-error
                </span>
                <span className="color-block color-bg-warning m-r-24">
                  warning背景色：color-bg-warning
                </span>
              </div>
              <div className="m-b-24">
                <span className="color-black m-r-24">color-black</span>
                <span className="color-black-1 m-r-24">color-black-1</span>
                <span className="color-black-2 m-r-24">color-black-2</span>
                <span className="color-black-3 m-r-24">color-black-3</span>
                <span className="color-black-4 m-r-24">color-black-4</span>
                <span className="color-black-5 m-r-24">color-black-5</span>
                <span className="color-black-6 m-r-24">color-black-6</span>
                <span className="color-black-7 m-r-24">color-black-7</span>
                <span className="color-black-8 m-r-24">color-black-8</span>
              </div>
              <div className="m-b-24" style={{ background: "black" }}>
                <span className="color-white m-r-24">color-white</span>
                <span className="color-white-1 m-r-24">color-white-1</span>
                <span className="color-white-2 m-r-24">color-white-2</span>
                <span className="color-white-3 m-r-24">color-white-3</span>
                <span className="color-white-4 m-r-24">color-white-4</span>
                <span className="color-white-5 m-r-24">color-white-5</span>
                <span className="color-white-6 m-r-24">color-white-6</span>
                <span className="color-white-7 m-r-24">color-white-7</span>
                <span className="color-white-8 m-r-24">color-white-8</span>
              </div>
            </div>
          </TabPane>
          <TabPane tab="布局" key="2">
            <div className="p-24">
              <h3>container</h3>
              <p className="m-b-24">container: width: 1200px;</p>
              <h3>间距</h3>
              <p className="m-b-24">间距基础值：8</p>
              <h4>margin</h4>
              <p className="m-b-24">
                margin: m-*; margin-right: m-r-*; margin-left: m-l-*;
                margin-top: m-t-*; margin-bottom: m-b-*;
              </p>
              <h4>padding</h4>
              <p className="m-b-24">
                padding: p-*; padding-right: p-r-*; padding-left: p-l-*;
                padding-top: p-t-*; padding-bottom: p-b-*;
              </p>
              <h4>example</h4>
              <p className="m-b-24">比如：m-r-24 => margin-right: 24px;</p>
            </div>
          </TabPane>
          <TabPane tab="字体" key="3">
            <div className="p-24">
              <h1>h1</h1>
              <h2>h2</h2>
              <h3>h3</h3>
              <h4>h4</h4>
              <p>p</p>
              <p>f-* => font-size: *px;</p>
              <p className="f-24">例如：f-24</p>
            </div>
          </TabPane>
          <TabPane tab="border" key="4">
            <div className="p-24">
              <p className="border p-24">border</p>
              <p className="border-t p-24">border-t</p>
              <p className="border-b p-24">border-b</p>
              <p className="border-l p-24">border-l</p>
              <p className="border-r p-24">border-r</p>
            </div>
          </TabPane>
          <TabPane tab="图标" key="5">
            <div className="p-24">
              <h3>采用IconFont (https://www.iconfont.cn/) 图标库</h3>
              <p>
                head里引用iconfont css, 调用例如：
                <i className="iconfont icongongzi"></i>
              </p>
            </div>
          </TabPane>
          <TabPane tab="按钮" key="6">
            <div className="p-24">
              <div className="m-b-24">
                <div className="button button-primary button-xl">button-xl</div>
              </div>
              <div className="m-b-24">
                <div className="button button-primary button-lg">button-lg</div>
              </div>
              <div className="m-b-24">
                <div className="button button-primary">button</div>
              </div>
              <div className="m-b-24">
                <div className="button button-primary button-sm">button-sm</div>
              </div>
            </div>
          </TabPane>
        </Tabs>
        <style jsx>{`
          .color-block {
            display: inline-block;
            height: 50px;
            text-align: center;
            line-height: 50px;
            color: white;
            padding: 0 10px;
            margin-bottom: 24px;
          }
        `}</style>
      </div>
    );
  }
}

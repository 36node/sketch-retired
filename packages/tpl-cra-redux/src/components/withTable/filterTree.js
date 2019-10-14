/**
 * 表格筛选下来菜单
 */

import React, { PureComponent } from "react";
import { Card, Tree } from "antd";

const { TreeNode } = Tree;

function toTreeNodes(columns = []) {
  return columns.map(({ title, key, children, frozen }) => (
    <TreeNode title={title} key={key} disableCheckbox={frozen}>
      {children && toTreeNodes(children)}
    </TreeNode>
  ));
}

class FilterTree extends PureComponent {
  static propTypes = {};

  render() {
    const { className, columns, value, onChange = () => {} } = this.props;
    return (
      <div className={className}>
        <Card title="显示的数据项" bodyStyle={{ padding: 5 }} hoverable>
          <Tree
            checkable
            defaultCheckedKeys={value}
            onCheck={onChange}
            selectable={false}
          >
            {toTreeNodes(columns)}
          </Tree>
        </Card>
      </div>
    );
  }
}

export default FilterTree;

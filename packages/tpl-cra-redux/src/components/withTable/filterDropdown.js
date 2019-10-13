/**
 * 表格筛选下来菜单
 */

import React, { PureComponent } from "react";
import styled from "styled-components";
import { Card, Checkbox, Row } from "antd";

class FilterDropdownComponent extends PureComponent {
  static propTypes = {};

  render() {
    const { className, items, value } = this.props;

    return (
      <div className={className}>
        <Card
          title={<p style={{ margin: 0, fontWeight: "bold" }}>显示的数据项</p>}
          hoverable
          bodyStyle={{
            padding: 0,
          }}
        >
          <Checkbox.Group
            onChange={this.props.onChange}
            value={value}
            defaultValue={items.map(i => i.key)}
          >
            {items.map(i => (
              <Row key={i.key} style={{ padding: "8px 16px" }}>
                <Checkbox value={i.key}>{i.name}</Checkbox>
              </Row>
            ))}
          </Checkbox.Group>
        </Card>
      </div>
    );
  }
}

const FilterDropdown = styled(FilterDropdownComponent)`
  .ant-card-head {
    border-bottom: 0;
  }
`;

export default FilterDropdown;

# IconFont example

```js
import React, { PureComponent } from "react";
import styled from "styled-components";
import IconFont from ".";

const Box = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Icon = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px;
`;

const Icons = [
  "icon-history",
  "icon-popup-alarm",
  "icon-popup-repair",
  "icon-warning",
  "icon-archives",
  "icon-diagram",
  "icon-setting",
  "icon-shanghai",
  "icon-bus",
];

<Box>
  {Icons.map(i => (
    <Icon key={i}>
      <IconFont type={i} />
      <div>{i}</div>
    </Icon>
  ))}
</Box>;
```

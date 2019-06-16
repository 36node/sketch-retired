import * as React from "react";

declare class SampleComponent extends React.Component<
  SampleComponentProps,
  any
> {}

export interface SampleComponentProps {
  className?: string;
}

export default SampleComponent;

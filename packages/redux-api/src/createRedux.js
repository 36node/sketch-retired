import React from "react";
import { register } from "./factory";

const hoc = (key, endpoint, schema) => Component => {
  register(key, endpoint, schema);

  return props => <Component {...props} />;
};

export default hoc;

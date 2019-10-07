import React from "react";
import PropTypes from "prop-types";
import { Button } from "antd";

import { history } from "../../lib";

const ButtonAntd = ({ linkTo, linkMode, ...props }) =>
  linkTo ? (
    <Button
      {...props}
      onClick={() => {
        if (linkMode === "replace") {
          history.replace(linkTo);
        } else {
          console.log("history push to", linkTo);
          history.push(linkTo);
        }
      }}
    />
  ) : (
    <Button {...props} />
  );

ButtonAntd.propTypes = {
  linkTo: PropTypes.string,
  linkMode: PropTypes.oneOf(["replace"]),
};

ButtonAntd.defaultProps = {
  linkTo: null,
  linkMode: null,
};

ButtonAntd.Group = Button.Group;

export default ButtonAntd;

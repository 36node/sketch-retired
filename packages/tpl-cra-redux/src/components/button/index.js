import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { Button } from "antd";

const ButtonAntd = ({
  linkTo,
  linkMode,
  match,
  location,
  history,
  staticContext,
  ...props
}) =>
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
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  staticContext: PropTypes.object,
};

ButtonAntd.defaultProps = {
  linkTo: null,
  linkMode: null,
  staticContext: null,
};

const wrap = withRouter(ButtonAntd);
wrap.Group = Button.Group;

export default wrap;

import React, { PureComponent } from "react";
import PropTypes from "prop-types";

export default class InfoExample extends PureComponent {
  static propTypes = {
    /** An example text */
    text: PropTypes.string,
    requiredText: PropTypes.string.isRequired,
  };

  static defaultProps = {
    text: "withInfo",
  };

  render() {
    const { text, requiredText } = this.props;
    return (
      <div>
        <p>{text}</p>
        <p>{requiredText}</p>
      </div>
    );
  }
}

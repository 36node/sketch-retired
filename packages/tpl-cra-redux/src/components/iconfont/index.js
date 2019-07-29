import { Icon } from "antd";
import PropTypes from "prop-types";

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_885058_o2tguyyqi7l.js",
});

IconFont.propTypes = {
  /** type of icon */
  type: PropTypes.string,
};

/** @component */
export default IconFont;

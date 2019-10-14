import { connect } from "react-redux";
import { makeApiSelector } from "@36node/redux";

export const withSession = key => {
  const selector = makeApiSelector(key);
  return connect(state => ({
    session: selector(state),
  }));
};

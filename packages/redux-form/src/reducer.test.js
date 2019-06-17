import { Types } from "./action";
import reducer, { initFieldState } from "./reducer";
import { Forms } from "./forms";
import { get } from "lodash";

describe("Test redux-form reducer", () => {
  let state;

  const key = "TEST.TEST_FORM";
  const reduxPath = "test.test_form";

  it("should handle register field ", () => {
    const name = "test-field";
    const initialValue = "value";

    Forms.set(key, { reduxPath });

    const action = {
      type: Types.registerField,
      key,
      payload: { name: "test-field", initialValue },
    };

    state = reducer({}, action);

    expect(get(state, [...reduxPath.split("."), "fields", name])).toEqual({
      ...initFieldState,
      name,
      value: initialValue,
    });
  });

  it("should handle register muti fields", () => {
    const fields = [
      { name: "field1", initialValue: "value1" },
      { name: "field2", initialValue: "value2" },
      { name: "field2", initialValue: "value3" }, // repeat register will no effect
    ];

    const action = {
      type: Types.registerMutilFields,
      payload: { fields },
      key,
    };

    state = reducer(state, action);

    const filedsState = get(state, [...reduxPath.split("."), "fields"]);

    expect(filedsState["field1"].value).toEqual("value1");
    expect(filedsState["field2"].value).toEqual("value2");
  });

  it("should handle change field", () => {
    const name = "test-field";

    const action = {
      type: Types.changeField,
      key,
      payload: { name: "test-field", value: "field_value", touched: true },
    };

    state = reducer(state, action);

    expect(
      get(state, [...reduxPath.split("."), "fields", name, "value"])
    ).toEqual("field_value");

    expect(
      get(state, [...reduxPath.split("."), "fields", name, "touched"])
    ).toEqual(true);
  });

  it("should handle change mutile fileds", () => {
    const fields = [
      { name: "field1", value: "changed_value1", touched: false },
      { name: "field2", value: "changed_value2", dirty: true },
      { name: "field3", value: "value3", touched: true }, // repeat register will no effect
    ];

    const action = {
      type: Types.changeMutilFields,
      key,
      payload: { fields },
    };

    state = reducer(state, action);

    const filedsState = get(state, [...reduxPath.split("."), "fields"]);
    expect(filedsState["field1"]).toEqual(expect.objectContaining(fields[0]));
    expect(filedsState["field2"]).toEqual(expect.objectContaining(fields[1]));
    expect(filedsState["field3"]).toEqual(expect.objectContaining(fields[2]));
  });

  it("should handle rest with initial value", () => {
    const name = "test-field";

    const action = {
      type: Types.rest,
      key,
      payload: {
        initialValues: {
          "test-field": "inital_value",
        },
      },
    };

    state = reducer(state, action);

    expect(
      get(state, [...reduxPath.split("."), "fields", name, "value"])
    ).toEqual("inital_value");

    expect(
      get(state, [...reduxPath.split("."), "fields", name, "touched"])
    ).toEqual(false);
  });

  it("should hande rest with no initial value", () => {
    const name = "test-field";

    const action = {
      type: Types.rest,
      key,
    };

    state = reducer(state, action);

    expect(
      get(state, [...reduxPath.split("."), "fields", name, "value"])
    ).toEqual(undefined);

    expect(
      get(state, [...reduxPath.split("."), "fields", name, "touched"])
    ).toEqual(false);
  });
});

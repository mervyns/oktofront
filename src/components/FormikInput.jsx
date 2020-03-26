import { Form, Input, InputNumber } from "antd";
import { connect } from "formik";
import { get } from "lodash";
import React from "react";

const FormikInput = ({
  formik: { values, errors, touched, setFieldValue, setFieldTouched },
  name,
  label,
  required,
  placeholder,
  defaultValue,
  layout = {},
  type = "input",
  validateOnchange = false,
  help,
  extra,
  validateStatus,
  ...props
}) => {
  let TextInput;
  let onChange = event =>
    setFieldValue(name, event.target.value, validateOnchange);
  if (type === "textArea") {
    TextInput = Input.TextArea;
  } else if (type === "number") {
    TextInput = InputNumber;
    onChange = value => {
      const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
      if (value === "") {
        setFieldValue(name, undefined, validateOnchange);
      } else if (!Number.isNaN(value) && reg.test(value)) {
        setFieldValue(name, value, validateOnchange);
      }
    };
  } else {
    TextInput = Input;
  }
  const fLabel = required ? label : "Optional";

  return (
    <Form.Item
      required={required}
      id={name}
      label={fLabel}
      hasFeedback={!!(get(touched, name, "") && !get(errors, name, ""))}
      validateStatus={(() => {
        if (validateStatus) {
          return validateStatus;
        } else if (get(touched, name, "") && get(errors, name, "")) {
          return "error";
        } else {
          return "success";
        }
      })()}
      extra={extra}
      help={(() => {
        if (help) {
          return help;
        } else if (get(touched, name, "") && get(errors, name, "")) {
          return get(errors, name, "");
        } else {
          return "";
        }
      })()}
      {...layout}
    >
      <TextInput
        defaultValue={defaultValue}
        name={name}
        rows={5}
        placeholder={placeholder}
        value={get(values, name, "")}
        onChange={onChange}
        onBlur={() => {
          setFieldValue(name, get(values, name, undefined), true);
          // wait for validate complete
          setTimeout(() => setFieldTouched(name));
        }}
        {...props}
      />
    </Form.Item>
  );
};
export default connect(FormikInput);

import React from "react";
import { useField } from "formik";
import { FormFeedback, Input, Label } from "reactstrap";
import styles from "../../global.module.css";

export const CustomCheckBox = ({ children, ...props }) => {
  // React treats radios and checkbox inputs differently other input types, select, and textarea.
  // Formik does this too! When you specify `type` to useField(), it will
  // return the correct bag of props for you -- a `checked` prop will be included
  // in `field` alongside `name`, `value`, `onChange`, and `onBlur`
  const [field, meta] = useField({ ...props, type: "checkbox" });
  return (
    <div>
      <Label
        className={`checkbox-input${styles.customCheckBox} ${styles.textalign}`}
      >
        <Input
          type="checkbox"
          {...field}
          {...props}
          invalid={meta.touched && meta.error}
          className={`${styles.customCheckBox}`}
        />
        {"  "}
        {children}
      </Label>
      {meta.touched && meta.error ? (
        <FormFeedback>{meta.error}</FormFeedback>
      ) : null}
      <div className="error">{meta.error}</div>
    </div>
  );
};
import React from "react";
import { useField } from "formik";
import { FormFeedback, FormGroup, Input, Label } from "reactstrap";
import styles from "../../global.module.css";

export const CustomTextInput = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input>. We can use field meta to show an error
  // message if the field is invalid and it has been touched (i.e. visited)
  const [field, meta] = useField(props);

  return (
    <>
      <FormGroup>
        <Label htmlFor={props.id || props.name} className={styles.formLabel}>
          {label} {props.require && <span className="text-danger">*</span>}
        </Label>
        <Input
          className={styles.textInput}
          {...field}
          {...props}
          invalid={meta.touched && meta.error}
        />
        {meta.touched && meta.error ? (
          <FormFeedback className={`${styles.errorText} ${styles.errorText}`}>
            {meta.error}
          </FormFeedback>
        ) : null}
      </FormGroup>
    </>
  );
};

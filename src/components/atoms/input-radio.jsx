import React from "react";
import styles from "../../styles/input-radio.module.css";

const RadioInput = ({ type, id, name, value, checked, onChange }) => {
  return (
    <div className={styles.container_input_radio}>
      <label htmlFor={id} className={styles.label_input_radio}>
        <input
          type={type}
          id={id}
          name={name}
          value={value}
          checked={checked}
          onChange={onChange}
          className={styles.input_radio}
        />

        {value}
      </label>
    </div>
  );
};

export default RadioInput;

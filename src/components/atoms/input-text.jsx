import React from "react";
import styles from "../../styles/input-text.module.css";

const InputText = ({ name, label, placeholder, value, onChange }) => {
  return (
    <div className={styles.coolinput}>
      <label for={name} className={styles.my_text}>
        {label}
      </label>
      <input
        type="text"
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={styles.my_input}
      />
    </div>
  );
};

export default InputText;

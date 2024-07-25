import React from "react";
import styles from "../../styles/primary-button.module.css";

const PrimaryButton = ({ value, type }) => {
  return (
    <div className={styles.button_space}>
      <button type={type} className={styles.primary_button}>
        {value}
      </button>
    </div>
  );
};

export default PrimaryButton;

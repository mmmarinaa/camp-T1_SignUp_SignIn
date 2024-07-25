import React from "react";
import styles from "../../styles/h2.module.css";

const SecondTitle = ({ value }) => {
  return <h2 className={styles.my_title}>{value}</h2>;
};

export default SecondTitle;

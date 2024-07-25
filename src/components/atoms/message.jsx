import React from "react";
import styles from "../../styles/message.module.css";

const Message = ({ text, type }) => {
  let messageClass = styles.message;

  if (type === "error") {
    messageClass = `${styles.message} ${styles.error}`;
  } else if (type === "success") {
    messageClass = `${styles.message} ${styles.success}`;
  }

  return <p className={messageClass}>{text}</p>;
};

export default Message;

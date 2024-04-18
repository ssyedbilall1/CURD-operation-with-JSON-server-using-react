import React from "react";
//@import button styles
import styles from "./index.module.scss";
const Button = ({ children, onClick, type }) => {
  return (
    <button className={styles.btn} onClick={onClick} type={type}>
      {children}
    </button>
  );
};

export default Button;

import React from "react";
import styles from "./Header.module.css";

function Header() {
  return (
    <>
    <div className={styles.headerContainer}>
      <h1>ToDo</h1>
    </div>
    </>
  );
}

export { Header };

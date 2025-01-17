import React from "react";
import styles from "./Header.module.css";

function Header() {
  return (
    <>
      <div className={styles.headerContainer}>
        <div className={styles.header}>
          <h1>ToDo</h1>
        </div>
      </div>
    </>
  );
}

export { Header };

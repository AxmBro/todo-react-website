import React, { useContext, useState } from "react";
import { ListsContext } from "../contexts/ListsContext";
import styles from "./AddTodo.module.css";

function AddTodo() {
  const [input, setInput] = useState("");
  const { lists, setLists } = useContext(ListsContext);

  const addNewList = (event) => {
    event.preventDefault();
    if (!input) return;
    setLists((prev) => {
      const listId = lists.length ? lists[lists.length - 1].id + 1 : 1;
      const newUpdatedList = { id: listId, name: input };
      const updatedLists = [...prev, newUpdatedList];
      localStorage.setItem("lists", JSON.stringify(updatedLists));
      return updatedLists;
    });
    setInput("");
  };

  const handleInputChange = ({ target }) => {
    setInput(target.value);
  };

  return (
    <>
      <div className={styles.addTodo}>
        <form action="" onSubmit={addNewList}>
          <input
            placeholder="Add New Todo List"
            type="text"
            name="addNewTodo"
            value={input}
            onChange={handleInputChange}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}

export { AddTodo };

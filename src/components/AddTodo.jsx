import React, { useContext, useState } from "react";
import { ListsContext } from "../contexts/ListsContext";

function AddTodo() {
  const [input, setInput] = useState("");
  const { setLists } = useContext(ListsContext);

  const addNewList = (event) => {
    event.preventDefault();
    setLists((prev) => {
      const updatedLists = [...prev, input];
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
      <form action="" onSubmit={addNewList}>
        <label htmlFor="addNewTodo">{"Add New Todo List: "}</label>
        <input
          type="text"
          name="addNewTodo"
          value={input}
          onChange={handleInputChange}
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export { AddTodo };

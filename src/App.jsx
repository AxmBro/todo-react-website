import React, { useState } from "react";
import "./App.css";
import { Todo } from "./components/Todo";
import { AddTodo } from "./components/AddTodo";
import { ListsContext } from "./contexts/ListsContext";

function App() {
  const [lists, setLists] = useState(() => {
    const lists = localStorage.getItem("lists");
    return lists ? JSON.parse(lists) : localStorage.setItem("lists", JSON.stringify([]));;
  });
  return (
    <>
      <ListsContext.Provider value={{ lists, setLists }}>
        <h1>ToDo</h1>
        <br />
        <AddTodo></AddTodo>
        <br />
        <h2>Lists:</h2>
        {lists.map((list) => {
          return (
            <Todo key={list} title={"test"} localStoragePrefix={list}></Todo>
          );
        })}
      </ListsContext.Provider>
    </>
  );
}

export { App };

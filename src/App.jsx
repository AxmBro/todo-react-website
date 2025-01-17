import React, { useState } from "react";
import "./App.css";
import { TodoContainer } from "./components/Todo";
import { Header } from "./components/Header";
import { ListsContext } from "./contexts/ListsContext";

function App() {
  const [lists, setLists] = useState(() => {
    const lists = localStorage.getItem("lists");
    return lists
      ? JSON.parse(lists)
      : localStorage.setItem(
          "lists",
          JSON.stringify([{ id: 1, name: "E.g. Work" }])
        );
  });
  return (
    <>
      <ListsContext.Provider value={{ lists, setLists }}>
        <Header />
        <div className="mainContrainer">
          <main>
            <TodoContainer />
          </main>
        </div>
      </ListsContext.Provider>
    </>
  );
}

export { App };

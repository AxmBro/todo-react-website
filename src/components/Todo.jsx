import React, { useEffect, useState, useContext } from "react";
import styles from "./Todo.module.css";
import { ListsContext } from "../contexts/ListsContext";

function TodoContainer() {
  const { lists } = useContext(ListsContext);
  return (
    <>
      <div className={styles.headerContainer}>
        <h1 className={styles.header}>ToDo Lists:</h1>
        <p>
          Simple todo website created using react and vite. All created lists
          and content inside is saved using local storage.
        </p>
        <AddTodo />
        <div className={styles.todoGridContainer}>
          {lists.map((list, index) => {
            return (
              <>
                <TodoItem
                  key={`${list.name}${list.id}`}
                  title={list.name}
                  listId={list.id}
                  index={index}
                  localStoragePrefix={`${list.name}${list.id}`}
                />
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}

function TodoItem({ localStoragePrefix, title, listId, index }) {
  const { lists, setLists } = useContext(ListsContext);
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState(() => {
    const tasks = localStorage.getItem(localStoragePrefix);
    return tasks ? JSON.parse(tasks) : [];
  });

  const handleChangeInput = ({ target }) => {
    setInput(target.value);
  };

  const handleAddTask = (event) => {
    event.preventDefault();
    if (!input) return;

    const taskId = tasks.length ? tasks[tasks.length - 1].id + 1 : 1;
    const newTask = { id: taskId, task: input, checked: false };
    setTasks((prev) => {
      const updatedTasks = [...prev, newTask];
      localStorage.setItem(localStoragePrefix, JSON.stringify(updatedTasks));
      return updatedTasks;
    });

    setInput("");
  };

  const handleRemoveList = () => {
    setLists(lists.filter((item) => item.id !== listId));
    localStorage.removeItem(localStoragePrefix);
    if (lists.length === 1) localStorage.setItem("lists", "[]");
  };

  useEffect(() => {
    localStorage.setItem(localStoragePrefix, JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(lists));
  }, [lists]);

  return (
    <>
      <div className={styles.todoContainer}>
        <div className={styles.titleContainer}>
          <h2 className={styles.title}>{`${title}: `}</h2>
          <div className={styles.titleButtonsContainer}>
            <TodoMoveOptions currentIndex={index} />
            <button onClick={handleRemoveList}>X</button>
          </div>
        </div>
        <div className={styles.todoAddNewTaskContainer}>
          <input
            placeholder="Add new task"
            className={styles.todoAddNewTaskInput}
            type="text"
            name={`input${localStoragePrefix}`}
            id={`title${localStoragePrefix}`}
            value={input}
            onChange={handleChangeInput}
          />
          <button onClick={handleAddTask}>submit</button>
        </div>
        {tasks && (
          <ul className={styles.ul}>
            {tasks.map((item, index) => {
              return (
                <TodoTaskItem
                  key={item.id}
                  task={item}
                  tasks={tasks}
                  index={index}
                  setTasks={setTasks}
                />
              );
            })}
          </ul>
        )}
      </div>
    </>
  );
}

function TodoTaskItem({ task, tasks, setTasks, index }) {
  const handleRemoveTask = () => {
    setTasks(tasks.filter((item) => item.id !== task.id));
  };

  const handleCheckChange = (event) => {
    const updatedTasks = tasks.map((item) =>
      item.id === task.id ? { ...item, checked: event.target.checked } : item
    );
    setTasks(updatedTasks);
  };

  const checkedStyle = {
    opacity: 0.5,
    textDecoration: "line-through",
  };

  return (
    <div className={styles.taskItemContainer}>
      <div className={styles.container}>
        <input
          type="checkbox"
          onChange={handleCheckChange}
          checked={task.checked || false}
        />
        <p style={task.checked ? checkedStyle : {}}>
          {/* {`ID: ${index + 1}, TASK: ${task.task}`}{" "} */}
          {`${task.task}`}{" "}
        </p>
      </div>
      <button onClick={handleRemoveTask}>X</button>
    </div>
  );
}

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

const TodoMoveOptions = ({ currentIndex }) => {
  const { lists, setLists } = useContext(ListsContext);

  const moveNext = () => {
    if (currentIndex < lists.length - 1) {
      const updatedLists = [...lists];
      const [movedItem] = updatedLists.splice(currentIndex, 1);
      updatedLists.splice(currentIndex + 1, 0, movedItem);
      setLists(updatedLists);
    }
  };

  const moveBack = () => {
    if (currentIndex > 0) {
      const updatedLists = [...lists];
      const [movedItem] = updatedLists.splice(currentIndex, 1);
      updatedLists.splice(currentIndex - 1, 0, movedItem);
      setLists(updatedLists);
    }
  };

  return (
    <div className={styles.moveOptionsContainer}>
      <p
        onClick={moveBack}
        disabled={currentIndex <= 0}
        style={{ display: currentIndex <= 0 ? "none" : "" }}
      >
        {"<-"}
      </p>
      <p
        onClick={moveNext}
        disabled={currentIndex >= lists.length - 1}
        style={{ display: currentIndex >= lists.length - 1 ? "none" : "" }}
      >
        {"->"}
      </p>
    </div>
  );
};

export { TodoContainer };

import React, { useEffect, useState, useContext } from "react";
import styles from "./Todo.module.css";
import { ListsContext } from "../contexts/ListsContext";
import { AddTodo } from "./AddTodo";

function TodoContainer() {
  const { lists } = useContext(ListsContext);
  return (
    <>
      <div className={styles.headerContainer}>
        <h1 className={styles.header}>ToDo Lists:</h1>
        <AddTodo />
        <div className={styles.todoGridContainer}>
          {lists.map((list) => {
            return (
              <TodoItem
                key={`${list.name}${list.id}`}
                title={list.name}
                listId={list.id}
                localStoragePrefix={`${list.name}${list.id}`}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

function TodoItem({ localStoragePrefix, title, listId }) {
  const { lists, setLists } = useContext(ListsContext);
  const [value, setValue] = useState("");
  const [tasks, setTasks] = useState(() => {
    const tasks = localStorage.getItem(localStoragePrefix);
    return tasks ? JSON.parse(tasks) : [];
  });

  const handleChangeInput = ({ target }) => {
    setValue(target.value);
  };

  const handleAddTask = (event) => {
    event.preventDefault();
    if (!value) return;

    const taskId = tasks.length ? tasks[tasks.length - 1].id + 1 : 1;
    const newTask = { id: taskId, task: value, checked: false };
    setTasks((prev) => {
      const updatedTasks = [...prev, newTask];
      localStorage.setItem(localStoragePrefix, JSON.stringify(updatedTasks));
      return updatedTasks;
    });

    setValue("");
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
          <h2>{`${title}: `}</h2>
          <button onClick={handleRemoveList}>X</button>
        </div>
        <div className={styles.todoAddNewTaskContainer}>
          <input
            placeholder="Add new task"
            className={styles.todoAddNewTaskInput}
            type="text"
            name={`input${localStoragePrefix}`}
            id={`title${localStoragePrefix}`}
            value={value}
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

export { TodoContainer };

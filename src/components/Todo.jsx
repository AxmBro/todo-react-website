import React, { useEffect, useState } from "react";
import "./Todo.css";

function Todo({ localStoragePrefix, title }) {
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

  useEffect(() => {
    localStorage.setItem(localStoragePrefix, JSON.stringify(tasks));
  }, [tasks]);

  return (
    <>
      <form action="" onSubmit={handleAddTask}>
        <label htmlFor={`input${localStoragePrefix}`}>{`${title}: `}</label>
        <input
          type="text"
          name={`input${localStoragePrefix}`}
          id={`title${localStoragePrefix}`}
          value={value}
          onChange={handleChangeInput}
        />
        <button type="submit">submit</button>
        {tasks && (
          <ul>
            {tasks.map((item, index) => {
              return (
                <TaskItem
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
      </form>
    </>
  );
}

function TaskItem({ task, tasks, setTasks, index }) {
  const handleRemoveTask = (event) => {
    event.preventDefault();
    setTasks(tasks.filter((item) => item.id !== task.id));
  };

  const handleCheckChange = (event) => {
    const updatedTasks = tasks.map((item) =>
      item.id === task.id ? { ...item, checked: event.target.checked } : item
    );
    setTasks(updatedTasks);
  };

  return (
    <li>
      <input
        type="checkbox"
        onChange={handleCheckChange}
        checked={task.checked || false}
      />
      {`ID: ${index + 1}, TASK: ${task.task}`}{" "}
      <button onClick={handleRemoveTask}>X</button>
    </li>
  );
}

export { Todo };

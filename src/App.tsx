import React, { useState } from "react";
import { Row, Col } from "antd";
import styles from "./App.module.scss";
import TodoForm from "./components/TodoForm";
import useTodoStore from "./stores/TodoStore";
import TodoList from "./components/TodoList";
function App(): JSX.Element {
  const todoList = useTodoStore((state) => state.todoList);

  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <div className={styles.app__title}>Todo List</div>
        <div className={styles.app__content}>
          <TodoList title="Finished" todoList={todoList} />
          <TodoList title="Unfinished" todoList={todoList} />
        </div>
        <TodoForm />
      </div>
    </div>
  );
}

export default App;

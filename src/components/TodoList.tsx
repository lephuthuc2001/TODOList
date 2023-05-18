import React from "react";
import type { Todo } from "../models/Todo";
import { List } from "antd";
import styles from "./TodoList.module.scss";
import TodoElement from "./TodoElement";
type Props = {
  title: "Finished" | "Unfinished";
  todoList: Todo[];
};
function TodoList(props: Props): JSX.Element {
  const isDone = props.title === "Finished" ? true : false;
  return (
    <div className={styles.todoListContainer}>
      <div className={styles.title}>{props.title}</div>
      <ul className={styles.todoList}>
        {props.todoList
          .filter((todo) => todo.isDone === isDone)
          .map((todo) => (
            <TodoElement todo={todo} />
          ))}
      </ul>
    </div>
  );
}

export default TodoList;

import React from "react";
import type { Todo } from "../models/Todo";
import { Checkbox } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import { Button } from "antd";
import { DeleteFilled } from "@ant-design/icons";
import styles from "./Todo.module.scss";
import useTodoStore from "../stores/TodoStore";
type Props = {
  todo: Todo;
};

function TodoElement({ todo }: Props) {
  const checkDone = useTodoStore((state) => state.checkDone);
  const removeTodo = useTodoStore((state) => state.removeTodo);
  const onChange = (e: CheckboxChangeEvent) => {
    console.log(`checked = ${e.target.checked}`);
    checkDone(todo.id, e.target.checked);
  };

  return (
    <li className={styles.todo}>
      <div className={styles.todoName}>{todo.name}</div>
      <div className={styles.icons__group}>
        <Checkbox
          className={styles.todoName}
          checked={todo.isDone}
          onChange={onChange}
        >
          Done
        </Checkbox>
        <Button
          onClick={() => {
            removeTodo(todo.id);
          }}
          size="small"
          icon={<DeleteFilled />}
        />
      </div>
    </li>
  );
}

export default TodoElement;

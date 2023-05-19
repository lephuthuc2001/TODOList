import React from "react";
import type { Todo } from "../models/Todo";
import { Button } from "antd";
import { DeleteFilled } from "@ant-design/icons";
import styles from "./Todo.module.scss";
import useTodoStore from "../stores/TodoStore";
import { Switch } from "antd";
type Props = {
  todo: Todo;
};

function TodoElement({ todo }: Props) {
  const checkDone = useTodoStore((state) => state.checkDone);
  const removeTodo = useTodoStore((state) => state.removeTodo);

  const onChange = (checked: boolean) => {
    console.log(`checked = ${checked}`);
    checkDone(todo.id, checked);
  };

  return (
    <li className={styles.todo}>
      <div className={styles.todoName}>{todo.name}</div>
      <div className={styles.icons__group}>
        <Switch
          size="default"
          checked={todo.isDone}
          checkedChildren="Done"
          unCheckedChildren="Not Done"
          onChange={onChange}
        ></Switch>
        <Button
          onClick={() => {
            removeTodo(todo.id);
          }}
          type="primary"
          size={"small"}
          icon={<DeleteFilled />}
        />
      </div>
    </li>
  );
}

export default TodoElement;

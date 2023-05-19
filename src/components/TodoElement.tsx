import React from "react";
import type { Todo } from "../models/Todo";
import { Checkbox, ConfigProvider } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import { Button } from "antd";
import { DeleteFilled } from "@ant-design/icons";
import styles from "./Todo.module.scss";
import useTodoStore from "../stores/TodoStore";
import { useMediaQuery } from "react-responsive";
import { Typography } from "antd";
type Props = {
  todo: Todo;
};

function TodoElement({ todo }: Props) {
  const checkDone = useTodoStore((state) => state.checkDone);
  const removeTodo = useTodoStore((state) => state.removeTodo);

  const isSm = useMediaQuery({ query: "(min-width: 576px)" });
  const isMd = useMediaQuery({ query: "(min-width: 768px)" });
  const isLg = useMediaQuery({ query: "(min-width: 992px)" });
  const isXl = useMediaQuery({ query: "(min-width: 1200px)" });

  const onChange = (e: CheckboxChangeEvent) => {
    console.log(`checked = ${e.target.checked}`);
    checkDone(todo.id, e.target.checked);
  };

  return (
    <li className={styles.todo}>
      <div className={styles.todoName}>{todo.name}</div>
      <div className={styles.icons__group}>
        <ConfigProvider
          componentSize={isLg ? "large" : isMd ? "middle" : "small"}
        >
          <Checkbox checked={todo.isDone} onChange={onChange}>
            Done
          </Checkbox>
        </ConfigProvider>
        <Button
          onClick={() => {
            removeTodo(todo.id);
          }}
          size={isLg ? "middle" : "small"}
          icon={<DeleteFilled />}
        />
      </div>
    </li>
  );
}

export default TodoElement;

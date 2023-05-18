import React from "react";
import { Input, Button } from "antd";
import { UnorderedListOutlined } from "@ant-design/icons";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useMediaQuery } from "react-responsive";
import useTodoStore from "../stores/TodoStore";
import type { Todo } from "../models/Todo";
import { v4 as uuidv4 } from "uuid";
// $sm: 576px;
// $md: 768px;
// $lg: 992px;
// $xl: 1200px;
import styles from "./TodoForm.module.scss";
function TodoForm() {
  const addTodo = useTodoStore((state) => state.addTodo);
  const isSm = useMediaQuery({ query: "(min-width: 576px)" });
  const isMd = useMediaQuery({ query: "(min-width: 768px)" });
  const isLg = useMediaQuery({ query: "(min-width: 992px)" });
  const isXl = useMediaQuery({ query: "(min-width: 1200px)" });

  type FormValues = {
    todo: string;
  };
  const { register, handleSubmit, control, reset } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = ({ todo }) => {
    const newTodo: Todo = {
      id: uuidv4(),
      isDone: false,
      name: todo,
    };

    addTodo(newTodo);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.todoForm}>
      <Controller
        name="todo"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <Input
            id="todo-input"
            size={isLg ? "large" : isMd ? "middle" : "small"}
            placeholder="Some todo..."
            prefix={<UnorderedListOutlined />}
            {...field}
          />
        )}
      />

      <Button
        size={isLg ? "large" : isMd ? "middle" : "small"}
        htmlType="submit"
        shape="default"
      >
        Add
      </Button>
    </form>
  );
}

export default TodoForm;
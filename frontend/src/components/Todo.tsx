// src/components/Todo.tsx
import React from "react";
import { TogleTodoCompleted, DeleteTodo } from "../../wailsjs/go/todo/TodoApp";
import { Checkbox } from "@nextui-org/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { todo } from "wailsjs/go/models";
import SelectCategories from "./SelectCategories";
import { AppState } from "../App";
import { FileText } from "lucide-react";


interface TodoProps {
  todo: todo.Todo;
  appState: AppState;
  SyncApp: () => void;
}

const Todo: React.FC<TodoProps> = ({ todo, appState, SyncApp }) => {
  
  // Open edit modal in todo
  const openEditModal = () => {
    appState.editTodo = todo;
     SyncApp();
  };
  
  return (
    <li
      key={todo.id}
      className="flex w-full hover:bg-slate-50 p-2 rounded-md  gap-4 justify-between mb-2"
    >
      <Checkbox
        isSelected={todo.completed}
        onChange={() => {
          TogleTodoCompleted(todo.id).then(() => {
            SyncApp();
          });
        }}
      ></Checkbox>
      <span
        className={`text-gray-700 w-fill text-nowrap ${
          todo.completed ? "line-through" : ""
        }`}
        onClick={openEditModal}
      >
        {todo.title}
      </span>
      {todo.description == "" ? null : <FileText className="text-gray-400" />}
      <div className="w-full" />
      <SelectCategories
        todo={todo}
        SyncApp={SyncApp}
        categories={appState.categories}
      />

      <DropdownMenu>
        <DropdownMenuTrigger>...</DropdownMenuTrigger>
        <DropdownMenuContent className="w-46 gap-4">
          <DropdownMenuItem key="Edit" onClick={openEditModal}>
            <span className="text-gray-600">Edit</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            key="Delete"
            onClick={() => DeleteTodo(todo.id).then(() => SyncApp())}
          >
            <span className="text-red-600">Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </li>
  );
};

export default Todo;

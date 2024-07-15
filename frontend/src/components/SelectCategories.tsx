// src/components/SelectCategories.tsx
import React from "react";
import { UpdateTodoCategory } from "../../wailsjs/go/todo/TodoApp";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Chip } from "@nextui-org/react";
import { todo } from "wailsjs/go/models";

interface SelectCategoriesProps {
  todo: todo.Todo;
  categories: string[];
  SyncApp: () => void;
}

const SelectCategories: React.FC<SelectCategoriesProps> = ({
  todo,
  categories,
  SyncApp,
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Chip variant="bordered" color={todo.category ? "primary" : "default"}>
          {todo.category || "+"}
        </Chip>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40">
        {categories.map((category) => (
          <DropdownMenuItem
            key={category}
            onClick={() => {
              let newCat = category;
              if (category === todo.category) newCat = "";

              console.log("Change Todo Category", {todo, newCat})

              UpdateTodoCategory(todo.id, newCat).then(() => {
                SyncApp();
              });
            }}
          >
            <span
              className={
                todo.category === category ? "font-bold w-full" : "w-full"
              }
            >
              {category}
            </span>
            {todo.category === category? <span>x</span> : null}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SelectCategories;

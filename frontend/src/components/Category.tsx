// src/components/Category.tsx
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "@nextui-org/react";
import { DeleteCategory } from "../../wailsjs/go/todo/TodoApp";

interface CategoryProps {
  category: string;
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  SyncApp: () => void;
}

const Category: React.FC<CategoryProps> = ({
  category,
  selectedCategory,
  setSelectedCategory,
  SyncApp,
}) => {
  return (
    <li
      className={`cursor-pointer p-2 flex items-center justify-between gap-2 rounded-md hover:bg-slate-50 ${
        selectedCategory === category ? "bg-gray-200" : ""
      }`}
      onClick={() => setSelectedCategory(category)}
    >
      {category}
      <DropdownMenu>
        <DropdownMenuTrigger>...</DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuItem>
            <Button
              fullWidth
              className="text-red-600"
              variant="flat"
              key="Delete"
              onClick={() =>
                DeleteCategory(category).then(() => {
                  SyncApp();
                  setSelectedCategory(null);
                })
              }
            >
              Delete
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </li>
  );
};

export default Category;

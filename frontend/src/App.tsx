import React from "react";
import {
  GetCategories,
  GetTodos,
  AddCategory,
  AddTodo,
  DeleteTodo,
  TogleTodoCompleted,
  DeleteCategory,
  UpdateTodoCategory,
} from "../wailsjs/go/todo/TodoApp";
import { todo } from "wailsjs/go/models";
import {
  Chip,
  Button,
  Input,
  Divider,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownSection,
  Select,
  SelectItem,
} from "@nextui-org/react";

function App() {
  const [categories, setCategories] = React.useState<string[]>([]);
  const [todos, setTodos] = React.useState<todo.Todo[]>([]);
  const [newTodoTitle, setNewTodoTitle] = React.useState<string>("");
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(
    null
  );
  const [newCategoryTitle, setNewCategoryTitle] = React.useState<string>("");

  function Category(category: string, index: number) {
    return (
      <li
        key={index}
        className={`cursor-pointer p-2 flex items-center justify-between gap-2 rounded-md hover:bg-slate-50 ${
          selectedCategory === category ? "bg-gray-200" : ""
        }`}
        onClick={() => setSelectedCategory(category)}
      >
        {category}

        <Dropdown>
          <DropdownTrigger>...</DropdownTrigger>
          <DropdownMenu>
            <DropdownItem key="new" shortcut="⌘N">
              New file
            </DropdownItem>
            <DropdownItem
              key="delete"
              className="text-danger"
              variant="bordered"
              color="danger"
              shortcut="del"
              onClick={() => {
                DeleteCategory(category).then(() => {
                  SyncApp();
                });
              }}
            >
              Delete
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </li>
    );
  }

  function Todo(todo: todo.Todo, index: number) {
    return (
      <li
        key={index}
        className="flex bg-slate-50 p-2 rounded-md items-center gap-4 justify-between mb-2"
      >
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => {
            TogleTodoCompleted(todo.id).then(() => {
              SyncApp();
            });
          }}
          className="mr-2"
        />
        <span
          className={`text-gray-700 w-full text-left ${
            todo.completed ? "line-through" : ""
          }`}
        >
          {todo.title}
        </span>
        {todo.category.length < 1 ? null : (
          <Chip variant="bordered" color="primary">
            {todo.category}
          </Chip>
        )}
        <Dropdown>
          <DropdownTrigger>...</DropdownTrigger>
          <DropdownMenu>
            <DropdownSection title="Actions">
              <DropdownItem
                key="delete"
                className="text-danger"
                variant="flat"
                color="danger"
                onClick={() => {
                  DeleteTodo(todo.id).then(() => {
                    SyncApp();
                  });
                }}
              >
                Delete
              </DropdownItem>
            </DropdownSection>
          </DropdownMenu>
        </Dropdown>
      </li>
    );
  }

  // Update func
  const SyncApp = () => {
    GetTodos().then((todos) => {
      setTodos(todos);
    });

    GetCategories().then((categories) => {
      setCategories(categories);
    });

    if (selectedCategory) {
      if (!categories.includes(selectedCategory)) {
        setSelectedCategory(null);
      }
    }
  };

  React.useEffect(() => {
    SyncApp();
  }, []);

  return (
    <div className="container mx-auto p-4 flex h-screen">
      <div className="w-1/4 mr-4 px-[2em] py-[4em]">
        <h2 className="text-xl font-bold mb-2">Categories</h2>
        {!selectedCategory ? null : (
          <Button className="mb-5" onClick={() => setSelectedCategory(null)}>
            {selectedCategory} x
          </Button>
        )}
        <ul className="gap-2 flex flex-col">{categories.map(Category)}</ul>
        <div className="mt-2">
          <Input
            placeholder="New Category"
            value={newCategoryTitle}
            onChange={(e) => setNewCategoryTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                AddCategory(newCategoryTitle).then(() => {
                  SyncApp();
                  setNewCategoryTitle(""); // Clear the input field after adding
                });
              }
            }}
          />
        </div>
      </div>
      <div>
        <Divider orientation="vertical" />
      </div>
      <div className="w-3/4 px-[2em] py-[4em]">
        <h1 className="text-3xl font-bold mb-4">Todo App</h1>

        <ul className="list-disc">
          {todos
            .filter((todo) =>
              selectedCategory ? todo.category === selectedCategory : true
            )
            .map(Todo)}
        </ul>

        <div className="mt-2">
          <Input
            placeholder="New Todo"
            value={newTodoTitle}
            onChange={(e) => setNewTodoTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                AddTodo(newTodoTitle).then(() => {
                  SyncApp();
                  setNewTodoTitle(""); // Clear the input field after adding
                });
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default App;

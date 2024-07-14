import React from "react";
import {
  GetCategories,
  GetTodos,
  AddCategory,
  AddTodo,
  TogleTodoCompleted,
  DeleteCategory,
  UpdateTodoCategory,
  DeleteTodo,
} from "../wailsjs/go/todo/TodoApp";
import { todo } from "wailsjs/go/models";
import { Chip, Button, Input, Divider, Checkbox } from "@nextui-org/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./components/ui/dropdown-menu";
export function DropdownMenuRadioGroupDemo() {
  const [position, setPosition] = React.useState("bottom");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>...</DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
          <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="right">Right</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function App() {
  const [categories, setCategories] = React.useState<string[]>([]);
  const [todos, setTodos] = React.useState<todo.Todo[]>([]);
  const [newTodoTitle, setNewTodoTitle] = React.useState<string>("");
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(
    null
  );
  const [newCategoryTitle, setNewCategoryTitle] = React.useState<string>("");

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
  }
  // receives todo
  function SelectCatagories({ todo }: { todo: todo.Todo }) {
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
                UpdateTodoCategory(todo.id, newCat).then(() => {
                  SyncApp();
                });
              }}
            >
              <span className={todo.category === category ? "font-bold" : ""} >{category}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  function Todo(todo: todo.Todo, index: number) {
    return (
      <li
        key={index}
        className="flex hover:bg-slate-50 p-2 rounded-md items-center gap-4 justify-between mb-2"
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
          className={`text-gray-700 w-full text-left ${
            todo.completed ? "line-through" : ""
          }`}
          onClick={() => {
            TogleTodoCompleted(todo.id).then(() => {
              SyncApp();
            });
          }}
        >
          {todo.title}
        </span>
        <SelectCatagories todo={todo} />
        <DropdownMenu>
          <DropdownMenuTrigger>...</DropdownMenuTrigger>
          <DropdownMenuContent className="w-46 gap-4">
            <DropdownMenuItem>
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
  }

  

  React.useEffect(() => {
    SyncApp();
  }, []);

  return (
    <div className="container mx-auto p-8 flex h-screen">
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

        <div className="my-5">
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
        <ul className="list-disc">
          {todos
            .filter((todo) =>
              selectedCategory ? todo.category === selectedCategory : true
            )
            .map(Todo)}
        </ul>

      </div>
    </div>
  );
}

export default App;

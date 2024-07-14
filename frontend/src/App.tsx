import { Button } from "@/components/ui/button";
import React from "react";
import {
  GetCategories,
  GetTodos,
  AddCategory,
  AddTodo,
  DeleteTodo,
  DeleteCategory,
  MarkTodoCompleted,
  TogleTodoCompleted,
} from "../wailsjs/go/todo/TodoApp";
import { todo } from "wailsjs/go/models";

function App() {
  const [categories, setCategories] = React.useState<string[]>([]);
  const [todos, setTodos] = React.useState<todo.Todo[]>([]);
  const [newTodoTitle, setNewTodoTitle] = React.useState<string>("");
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);

  // Update func
  const SyncApp = () => {
    GetTodos().then((todos) => {
      setTodos(todos);
    });

    GetCategories().then((categories) => {
      setCategories(categories);
    });
  };

  React.useEffect(() => {
    SyncApp();
  }, []);

  return (
    <div className="container mx-auto p-4 flex">
      <div className="w-1/4 mr-4">
        <h2 className="text-xl font-bold mb-2">Categories</h2>
        <ul>
          {categories.map((category, index) => (
            <li
              key={index}
              className={`cursor-pointer p-2 rounded-md ${
                selectedCategory === category ? "bg-gray-200" : ""
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </li>
          ))}
        </ul>
        <div className="mt-2">
          <Button
            onClick={() => {
              AddCategory("New Category").then(() => {
                SyncApp();
              });
            }}
          >
            Add Category
          </Button>
        </div>
      </div>
      <div className="w-3/4">
        <h1 className="text-3xl font-bold mb-4">Todo App</h1>

        <ul className="list-disc">
          {todos
            .filter((todo) =>
              selectedCategory ? todo.category === selectedCategory : true
            )
            .map((todo, index) => (
              <li
                key={index}
                className="flex items-center justify-between mb-2"
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
                  className={`text-gray-700 ${
                    todo.completed ? "line-through" : ""
                  }`}
                >
                  {todo.title}
                </span>
                <span className="text-gray-500 text-sm">
                  Category: {todo.category}
                </span>
                <div className="flex">
                  <Button
                    onClick={() => {
                      DeleteTodo(todo.id).then(() => {
                        SyncApp();
                      });
                    }}
                    variant="destructive"
                  >
                    Delete
                  </Button>
                </div>
              </li>
            ))}
        </ul>

        <div className="mt-2">
          <input
            type="text"
            placeholder="New Todo"
            value={newTodoTitle}
            onChange={(e) => setNewTodoTitle(e.target.value)}
            className="border rounded-md px-3 py-2"
          />
          <Button
            onClick={() => {
              AddTodo(newTodoTitle).then(() => {
                SyncApp();
                setNewTodoTitle(""); // Clear the input field after adding
              });
            }}
          >
            Add Todo
          </Button>
        </div>
      </div>
    </div>
  );
}

export default App;

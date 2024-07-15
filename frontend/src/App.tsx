// src/App.tsx
import React from "react";
import {
  GetCategories,
  GetTodos,
  AddCategory,
  AddTodo,
} from "../wailsjs/go/todo/TodoApp";

import { Input, Divider, Button } from "@nextui-org/react";
import Category from "./components/Category";
import Todo from "./components/Todo";
import { todo } from "wailsjs/go/models";
import EditTodo from "./components/EditTodo";

export interface AppState {
  categories: string[];
  todos: todo.Todo[];
  newTodoTitle: string;
  selectedCategory: string | null;
  newCategoryTitle: string;
  editTodo: todo.Todo | null;
}

function App() {
  const [state, setState] = React.useState<AppState>({
    categories: [],
    todos: [],
    newTodoTitle: "",
    selectedCategory: null,
    newCategoryTitle: "",
    editTodo: null,
  });

  // Update func
  const SyncApp = () => {
    GetTodos().then((todos) => {
      setState((prevState) => ({ ...prevState, todos }));
    });

    GetCategories().then((categories) => {
      setState((prevState) => ({ ...prevState, categories }));
    });

    if (state.selectedCategory) {
      if (!state.categories.includes(state.selectedCategory)) {
        setState((prevState) => ({ ...prevState, selectedCategory: null }));
      }
    }

  };

  React.useEffect(() => {
    SyncApp();
  }, []);

  return (
    <div className="container mx-auto p-8 flex h-screen">
      <EditTodo SyncApp={SyncApp} appState={state} />
      <div className="w-1/4 mr-4 px-[2em] py-[4em]">
        <h2 className="text-xl font-bold mb-2">Categories</h2>
        {!state.selectedCategory ? null : (
          <Button
            className="mb-5"
            onClick={() =>
              setState((prevState) => ({
                ...prevState,
                selectedCategory: null,
              }))
            }
          >
            {state.selectedCategory} x
          </Button>
        )}
        <ul className="gap-2 flex flex-col">
          {state.categories.map((category) =>
            Category({
              category,
              selectedCategory: state.selectedCategory,
              setSelectedCategory: (category) =>
                setState((prevState) => ({
                  ...prevState,
                  selectedCategory: category,
                })),
              SyncApp,
            })
          )}
        </ul>
        <div className="mt-2">
          <Input
            placeholder="New Category"
            value={state.newCategoryTitle}
            onChange={(e) =>
              setState((prevState) => ({
                ...prevState,
                newCategoryTitle: e.target.value,
              }))
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                AddCategory(state.newCategoryTitle).then(() => {
                  SyncApp();
                  setState((prevState) => ({
                    ...prevState,
                    newCategoryTitle: "",
                  })); // Clear the input field after adding
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
            value={state.newTodoTitle}
            onChange={(e) =>
              setState((prevState) => ({
                ...prevState,
                newTodoTitle: e.target.value,
              }))
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                AddTodo(state.newTodoTitle).then(() => {
                  SyncApp();
                  setState((prevState) => ({ ...prevState, newTodoTitle: "" })); // Clear the input field after adding
                });
              }
            }}
          />
        </div>
        <ul className="list-disc">
          {state.todos
            .filter((todo) =>
              state.selectedCategory
                ? todo.category === state.selectedCategory
                : true
            )
            .map((todo) => Todo({ todo, SyncApp, appState: state }))}
        </ul>
      </div>
    </div>
  );
}

export default App;

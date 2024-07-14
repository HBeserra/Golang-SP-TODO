package todo

import (
	"errors"
	"time"

	"golang.org/x/exp/slog"
)

type Todo struct {
	ID        int    `json:"id"`
	Title     string `json:"title"`
	Category  string `json:"category"`
	Completed bool   `json:"completed"`
	deadline  time.Time
	createdAt time.Time
}

type TodoApp struct {
	todos      []Todo
	categories []string
}

func NewTodoApp() *TodoApp {
	return &TodoApp{
		todos: []Todo{
			{
				ID:        1,
				Title:     "Buy groceries",
				Category:  "Personal",
				Completed: true,
				createdAt: time.Now(),
			},
			{
				ID:        3,
				Title:     "Clean the house",
				Category:  "",
				Completed: false,
				createdAt: time.Now(),
			},
		},
		categories: []string{
			"Personal",
			"Work",
			"Home",
		},
	}
}

// AddTodo adds a new todo item
func (app *TodoApp) AddTodo(title string) int {
	newTodo := Todo{
		ID:        len(app.todos) + 1, // Simple ID generation
		Title:     title,
		Completed: false,
		createdAt: time.Now(),
	}
	app.todos = append(app.todos, newTodo)
	slog.Info("new todo added", "id", newTodo.ID, "title", newTodo.Title)
	return newTodo.ID
}

func (app *TodoApp) GetTodos() []Todo {
	// filteredTodos := app.todos
	// for _, opt := range opts {
	// 	filteredTodos = opt(filteredTodos)
	// }
	return app.todos
}

// GetTodoByID retrieves a todo by its ID
func (app *TodoApp) GetTodoByID(id int) (*Todo, error) {
	for i, todo := range app.todos {
		if todo.ID == id {
			return &app.todos[i], nil
		}
	}
	return nil, ErrTodoNotFound
}

// MarkTodoCompleted marks a todo as completed
func (app *TodoApp) MarkTodoCompleted(id int) error {
	todo, err := app.GetTodoByID(id)
	if err != nil {
		return err
	}
	todo.Completed = true
	return nil
}

func (app *TodoApp) MarkTodoUncompleted(id int) error {
	todo, err := app.GetTodoByID(id)
	if err != nil {
		return err
	}
	todo.Completed = false
	return nil
}

func (app *TodoApp) MarkAllTodosUncompleted() {
	for i := range app.todos {
		app.todos[i].Completed = false
	}
}

func (app *TodoApp) MarkAllTodosCompleted() {
	for i := range app.todos {
		app.todos[i].Completed = true
	}
}

func (app *TodoApp) TogleTodoCompleted(id int) error {
	todo, err := app.GetTodoByID(id)
	if err != nil {
		return err
	}
	todo.Completed = !todo.Completed
	return nil
}

// UpdateTodo updates an existing todo
func (app *TodoApp) UpdateTodo(id int, title string, category string, completed bool, deadline time.Time) error {
	todo, err := app.GetTodoByID(id)
	if err != nil {
		return err
	}
	todo.Title = title
	todo.Category = category
	todo.Completed = completed
	todo.deadline = deadline
	return nil
}

// UpdateTodoCategory
func (app *TodoApp) UpdateTodoCategory(id int, category string) error {
	todo, err := app.GetTodoByID(id)
	if err != nil {
		return err
	}
	todo.Category = category
	return nil
}

// UpdateTodoDeadline
func (app *TodoApp) UpdateTodoDeadline(id int, deadline time.Time) error {
	todo, err := app.GetTodoByID(id)
	if err != nil {
		return err
	}
	todo.deadline = deadline
	return nil
}

// DeleteTodo removes a todo by its ID
func (app *TodoApp) DeleteTodo(id int) error {
	for i, todo := range app.todos {
		if todo.ID == id {
			app.todos = append(app.todos[:i], app.todos[i+1:]...)
			return nil
		}
	}
	return ErrTodoNotFound
}

// Error for todo not found
var ErrTodoNotFound = errors.New("todo not found")

func (app *TodoApp) AddCategory(category string) {
	if category == "" {
		return
	}
	for _, c := range app.categories {
		if c == category {
			return
		}
	}
	app.categories = append(app.categories, category)
}

func (app *TodoApp) GetCategories() []string {
	return app.categories
}

func (app *TodoApp) DeleteCategory(category string) {
	for i, c := range app.categories {
		if c == category {
			app.categories = append(app.categories[:i], app.categories[i+1:]...)
			return
		}
	}
}

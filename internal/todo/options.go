package todo

import (
	"sort"
	"strings"
)

// GetTodosOption is a function that modifies a slice of todos
type GetTodosOption func([]Todo) []Todo

// FilterByCompleted filters todos by their completed status
func FilterByCompleted(completed bool) GetTodosOption {
	return func(todos []Todo) []Todo {
		var filteredTodos []Todo
		for _, todo := range todos {
			if todo.Completed == completed {
				filteredTodos = append(filteredTodos, todo)
			}
		}
		return filteredTodos
	}
}

func FilterByTitle(title string) GetTodosOption {
	return func(todos []Todo) []Todo {
		var filteredTodos []Todo
		for _, todo := range todos {
			if strings.Contains(strings.ToLower(todo.Title), strings.ToLower(title)) {
				filteredTodos = append(filteredTodos, todo)
			}
		}
		return filteredTodos
	}
}

func FilterByCategory(category string) GetTodosOption {
	return func(todos []Todo) []Todo {
		var filteredTodos []Todo
		for _, todo := range todos {
			if todo.Category == category {
				filteredTodos = append(filteredTodos, todo)
			}
		}
		return filteredTodos
	}
}

// SortByDeadline
func SortByDeadline(ascending bool) GetTodosOption {
	return func(todos []Todo) []Todo {
		if ascending {
			// Sort in ascending order
			sort.Slice(todos, func(i, j int) bool {
				return todos[i].Deadline.Before(todos[j].Deadline)
			})
		} else {
			// Sort in descending order
			sort.Slice(todos, func(i, j int) bool {
				return todos[i].Deadline.After(todos[j].Deadline)
			})
		}
		return todos
	}
}

// SortByCreatedAt sorts todos by their creation date
func SortByCreatedAt(ascending bool) GetTodosOption {
	return func(todos []Todo) []Todo {
		if ascending {
			// Sort in ascending order
			sort.Slice(todos, func(i, j int) bool {
				return todos[i].CreatedAt.Before(todos[j].CreatedAt)
			})
		} else {
			// Sort in descending order
			sort.Slice(todos, func(i, j int) bool {
				return todos[i].CreatedAt.After(todos[j].CreatedAt)
			})
		}
		return todos
	}
}

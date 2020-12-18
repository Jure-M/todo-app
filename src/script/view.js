const h = require("virtual-dom/h");

import {
  toggleTodo,
  prepareTodo,
  prepareEditTodo,
  addTodo,
  editTodo,
  deleteTodo,
} from "./model";

function view(dispatch, model) {
  console.log(model);
  return h("div", { className: "todo__container" }, [
    heading(),
    switchTodoInput(dispatch, model),
    todoList(dispatch, model.todos),
  ]);
}

const heading = () =>
  h("h1", { className: "todo__heading", value: "My Todo App" }, "My Todo App");

const switchTodoInput = (dispatch, model) =>
  model.editMode
    ? todoInput(
        dispatch,
        model,
        (e) => dispatch(editTodo()),
        (e) => dispatch(prepareEditTodo(model.activeTodo.id, e.target.value)),
        "Update"
      )
    : todoInput(
        dispatch,
        model,
        (e) => dispatch(addTodo()),
        (e) => dispatch(prepareTodo(e.target.value)),
        "Add"
      );

const todoInput = (dispatch, model, onclickButton, onclickInput, text) => {
  return h("div", { className: "todo__input-container" }, [
    h("input", {
      type: "text",
      oninput: onclickInput,
      value: model.activeTodo.description ? model.activeTodo.description : "",
    }),
    h("button", { onclick: onclickButton }, text),
  ]);
};

const todoList = (dispatch, todoList) => {
  return h("ul", { className: "todo__list" }, [listItem(dispatch, todoList)]);
};

const listItem = (dispatch, todoList) => {
  return todoList.map((todo) => {
    return h("li", { className: "todo__list-item" }, [
      h(
        "p",
        {
          className: `${!todo.compleated ? "compleated" : "uncompleated"}`,
          onclick: (e) => dispatch(toggleTodo(todo.id)),
        },
        `${todo.description}`
      ),
      h("i", {
        className: "edit fas fa-edit",
        onclick: () => dispatch(prepareEditTodo(todo.id, todo.description)),
      }),
      h("i", {
        className: "edit fas fa-trash",
        onclick: () => dispatch(deleteTodo(todo.id)),
      }),
    ]);
  });
};

export default view;

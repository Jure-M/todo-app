export const initState = {
  todos: [],
  activeTodo: {},
  editMode: false,
  nextId: 0,
};

const TYPES = {
  TOOGLE_TODO: "TOOGLE_TODO",
  PREPARE_TODO: "PREPARE_TODO",
  PREPARE_EDIT_TODO: "PREPARE_EDIT_TODO",
  ADD_TODO: "ADD_TODO",
  EDIT_TODO: "EDIT_TODO",
  DELETE_TODO: "DELETE_TODO",
};

export function toggleTodo(id) {
  return {
    type: TYPES.TOOGLE_TODO,
    id,
  };
}

export function prepareTodo(description) {
  return {
    type: TYPES.PREPARE_TODO,
    description,
  };
}

export function prepareEditTodo(id, description) {
  return {
    type: TYPES.PREPARE_EDIT_TODO,
    id,
    description,
  };
}

export function addTodo(description) {
  return {
    type: TYPES.ADD_TODO,
    description,
  };
}

export function editTodo(id) {
  return {
    type: TYPES.EDIT_TODO,
    id,
  };
}

export function deleteTodo(id) {
  return {
    type: TYPES.DELETE_TODO,
    id,
  };
}

function reducer(msg, model) {
  switch (msg.type) {
    case TYPES.TOOGLE_TODO: {
      const { id } = msg;
      const todos = model.todos.map((todo) =>
        todo.id === id ? { ...todo, compleated: !todo.compleated } : todo
      );
      return { ...model, todos };
    }
    case TYPES.PREPARE_TODO: {
      const { description } = msg;
      const activeTodo = { description, id: model.nextId, compleated: false };
      return { ...model, activeTodo };
    }
    case TYPES.PREPARE_EDIT_TODO: {
      const { id, description } = msg;
      const todo = model.todos.find((todo) => todo.id === id);
      const activeTodo = { ...todo, description };
      return { ...model, activeTodo, editMode: true };
    }
    case TYPES.ADD_TODO: {
      const todos = [...model.todos, model.activeTodo];
      return { ...model, todos, activeTodo: {}, nextId: model.nextId + 1 };
    }
    case TYPES.EDIT_TODO: {
      const id = model.activeTodo.id;
      console.log(model.activeTodo);
      console.log(model.todos);
      const todos = model.todos.map((todo) =>
        todo.id === id ? model.activeTodo : todo
      );
      console.log(todos);
      return { ...model, todos, activeTodo: {}, editMode: false };
    }
    case TYPES.DELETE_TODO: {
      const { id } = msg;
      const todos = model.todos.filter((todo) => todo.id !== id);
      return { ...model, todos };
    }
    default:
      return model;
  }
}

export default reducer;

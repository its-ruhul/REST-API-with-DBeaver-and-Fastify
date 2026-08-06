import { 
  getTodoList, 
  getFilteredList, 
  postTodo, 
  updateTodo,
  finishTodo,
  deleteTodo 
} from "../controllers/todo-controllers";

export const getTodoListOpts = {
  schema: {
    respose: {

    }

  },
  handler: getTodoList
}

export const getFilteredListOps = {
  schema: {
    params: todoStatParams,
    response: {

    }

  },
  handler: getFilteredList
}

export const postTodoOpts = {
  schema: {
    body: todoBody,
    reponse: {

    }

  },
  handler: postTodo
}

export const updateTodoOpts = {
  schema: {
    body: todoBodyToUpdate,
    reponse: {

    }

  },
  handler: updateTodo
}

export const finishTodoOpts = {
  schema: {
    body: todoBodyWithId,
    reponse: {

    }

  },
  handler: finishTodo
}

export const deleteTodoOpts = {
  schema: {
    body: todoBodyWithId,
    response: {

    }

  },
  handler: deleteTodo
}
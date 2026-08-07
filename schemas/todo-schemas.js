import { 
  getTodoList, 
  getFilteredList, 
  postTodo, 
  updateTodo,
  finishTodo,
  deleteTodo 
} from "../controllers/todo-controllers.js";

const itemResponse = {
  type: 'object',
  properties: {
    body: {type: 'string'},
    created_at: {type: 'string'},
  }
}

export const getTodoListOpts = {
  schema: {
    respose: {
      200: {
        type: 'array',
        items: itemResponse
      }
    }

  },
  handler: getTodoList
}

export const getFilteredListOpts = {
  schema: {
    // params: todoStatParams,
    response: {

    }

  },
  handler: getFilteredList
}

export const postTodoOpts = {
  schema: {
    // body: todoBody,
    reponse: {

    }

  },
  handler: postTodo
}

export const updateTodoOpts = {
  schema: {
    // body: todoBodyToUpdate,
    reponse: {

    }

  },
  handler: updateTodo
}

export const finishTodoOpts = {
  schema: {
    // body: todoBodyWithId,
    reponse: {

    }

  },
  handler: finishTodo
}

export const deleteTodoOpts = {
  schema: {
    // body: todoBodyWithId,
    response: {

    }

  },
  handler: deleteTodo
}
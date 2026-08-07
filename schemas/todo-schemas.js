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
    stat: {type: 'string'},
    created_at: {type: 'string'},
    todo_uuid: {type: 'string'}
  }
}

const todoStatParams = {
  type: 'object',
  required: ['stat'],
  properties: {
    stat: {
      type: 'string'
    }
  }

}

const postTodoBody = {
  type: 'object',
  required: ['body', 'stat'],
  properties: {
    body: {
      type: 'string'
    },
    stat: {
      type: 'string'
    }
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
    params: todoStatParams,
    response: {
      200: {
        type: 'array',
        items: itemResponse
      }
    }
  },
  handler: getFilteredList
}

export const postTodoOpts = {
  schema: {
    body: postTodoBody,
    reponse: {
      200: itemResponse
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
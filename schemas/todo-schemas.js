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
    body: { type: 'string' },
    stat: { type: 'string' },
    created_at: { type: 'string' },
    todo_uuid: { type: 'string' },
    is_finished: { type: 'boolean' }
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

const todoBodyToUpdate = {
  type: 'object',
  required: ['todo_uuid', 'body', 'stat'],
  properties: {
    body: { type: 'string' },
    stat: { type: 'string' },
    todo_uuid: { type: 'string', format: 'uuid' }
  }
}

const todoBodyById = {
  type: 'object',
  required: ['todo_uuid'],
  properties: {
    todo_uuid: { type: 'string', format: 'uuid' }
  }
}

const deleteTodoCheck = {
  type: 'object',
  properties: {
    is_active: { type: 'boolean' }
  }
}

//SCHEMAS

export const getTodoListOpts = {
  schema: {
    response: {
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
    response: {
      201: itemResponse
    }
  },
  handler: postTodo
}

export const updateTodoOpts = {
  schema: {
    body: todoBodyToUpdate,
    response: {
      201: itemResponse,
    }
  },
  handler: updateTodo
}

export const finishTodoOpts = {
  schema: {
    body: todoBodyById,
    response: {
      201: itemResponse
    }
  },
  handler: finishTodo
}

export const deleteTodoOpts = {
  schema: {
    body: todoBodyById,
    response: {
      201: deleteTodoCheck
    }
  },
  handler: deleteTodo
}
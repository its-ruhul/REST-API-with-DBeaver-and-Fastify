import {
  getTodoListOpts, 
  getFilteredListOpts, 
  postTodoOpts, 
  updateTodoOpts,
  finishTodoOpts,
  deleteTodoOpts
} from '../schemas/todo-schemas.js'

import fastify from "fastify";

export function todoRoutes(fastify, options, done) {

  //Get a list of all the Todos
  fastify.get('/list', getTodoListOpts);

  //Get list of Todos based on: Urgent and Important, Urgent, Important
  fastify.get('/list/:stat', getFilteredListOpts)
  
  //Post a new Todo
  fastify.post('/list', postTodoOpts);

  //Update and existing Todo
  fastify.put('/update', updateTodoOpts);

  //Mark a Todo as completed
  fastify.put('/finish', finishTodoOpts);

  //Deleting a todo
  fastify.delete('/delete', deleteTodoOpts);

  done();
}
import {ITodos} from '@/types/todos';
const baseUrl = 'http://localhost:3001';

export const getAllTodos = async(): Promise<ITodos[]> =>{
  const todos = await fetch(`${baseUrl}/tasks`,{cache:'no-store'});
  const res = await todos.json();
  return res;
}

export const addTodo = async(todo:ITodos) : Promise<ITodos> =>{
  const addTask= await fetch(`${baseUrl}/tasks`,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(todo)
  })

  const res = await addTask.json();
  return res;
}

export const editTodo = async(todo:ITodos) : Promise<ITodos> =>{
  const updateTodo= await fetch(`${baseUrl}/tasks/${todo.id}`,{
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(todo)
  })

  const updatedTodo = await updateTodo.json();
  return updatedTodo;
}

export const deleteTodo = async(id:string) : Promise<void> =>{
  await fetch(`${baseUrl}/tasks/${id}`,{
    method: 'DELETE',
  })
}
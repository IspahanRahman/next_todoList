import {ITodos} from '@/types/todos';
const baseUrl = 'http://localhost:3001';

export const getAllTodos = async(): Promise<ITodos[]> =>{
  const todos = await fetch(`${baseUrl}/tasks`);
  const res = await todos.json();
  return res;
}
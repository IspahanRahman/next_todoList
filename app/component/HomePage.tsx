"use client";
import React, { FormEventHandler, useState } from 'react'
import { ITodos } from '@/types/todos';
interface TodoListProps{
  todos: ITodos[];
}
const HomePage: React.FC<TodoListProps> = ({todos}) => {
  const [newTodo, setNewTodo] = useState<string>('');

  const handleSubmit : FormEventHandler<HTMLFormElement> = (e) =>{
    e.preventDefault();
    console.log(newTodo);
    setNewTodo("");
  }
  return (
    <div className='m-2 md:m-5 flex flex-col gap-4'>
      <h1 className=' text-xl text-black font-bold '>ADD ITEM</h1>
      <hr className="h-1 bg-red-200 border-0 dark:bg-black"/>
     <form onSubmit={handleSubmit} className='mb-5'>
      <input
        value={newTodo}
        onChange={(e)=>setNewTodo(e.target.value)}
        className='px-4 py-3 w-4/5 bg-white text-black border-2 rounded-lg '
        type='text'
        placeholder='Enter you list'
      />
      <button className='pl-6'>Add</button>
     </form>
     <h1 className=' text-xl text-black font-bold '>TODO</h1>
     <hr className="h-1 bg-red-200 border-0 dark:bg-black"/>
     <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Task</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo)=>(
              <tr key={todo.id}>
                <td></td>
                <td>{todo.text}</td>
                <td><button>Edit</button></td>
                <td><button>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default HomePage
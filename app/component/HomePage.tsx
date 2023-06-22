"use client";
import React, { FormEventHandler, useState } from 'react'
import { ITodos } from '@/types/todos';
import { addTodo, deleteTodo, editTodo } from '@/api';
import { useRouter } from 'next/navigation';
import { v4 as uuid4 } from 'uuid';

interface TodoListProps{
  todos: ITodos[];
}
const HomePage: React.FC<TodoListProps> = ({todos}) => {
  const [ newTodo, setNewTodo ] = useState<string>('');
  const [ editingTodo, setEditingTodo ] = useState('');
  const [ editTodoText, setEditTodoText ] = useState('');

  const router = useRouter();
  const handleSubmit : FormEventHandler<HTMLFormElement> = async(e) =>{
    e.preventDefault();
    await addTodo({
      id:uuid4(),
      text:newTodo
    });

    setNewTodo("");
    router.refresh();
  }

  const updateTodo : FormEventHandler<HTMLFormElement> = async(value:any)=>{
   await editTodo({
    id:editingTodo,
    text:editTodoText,
   })
   router.refresh();
  }

  const handleDelete = async(value:any) =>{
    try{
      await deleteTodo(value);
      router.refresh();
    }catch(e){
      console.log(e)
    }
  }

  const rerenderUpdateForm = (value:any) =>(
    <td>
      <form onSubmit={(e)=>updateTodo(e)}>
        <input
          className='px-4 py-3 w-4/5 bg-white text-black border-2 rounded-lg '
          type='text'
          value={editTodoText}
          placeholder={value}
          onChange={(e)=>setEditTodoText(e.target.value)}
        />
      </form>
    </td>
  )
 
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
                <td>
                  <input 
                    type="checkbox" 
                    className="checkbox" 
                  />
                </td>
               
                {editingTodo=== todo.id ? rerenderUpdateForm(todo.text)
                :
                <>
                   <td>{todo.text}</td>
                </>
                }
               
                <td className='flex gap-5'>
                  <button className='text-blue-500' onClick={()=>setEditingTodo(todo.id)}>Edit</button>
                  <button className='text-red-500' onClick={()=>handleDelete(todo.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default HomePage
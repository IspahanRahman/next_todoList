"use client";
import React, { FormEventHandler, useState } from 'react'
import { ITodos } from '@/types/todos';
import { addTodo, deleteTodo, editTodo } from '@/api';
import { useRouter } from 'next/navigation';
import { v4 as uuid4 } from 'uuid';

interface TodoListProps{
  todos: ITodos[];
}
const HomePage: React.FC<TodoListProps> = ({ todos }) => {
  const [newTodo, setNewTodo] = useState<string>('');
  const [editingTodo, setEditingTodo] = useState<string>('');
  const [editTodoText, setEditTodoText] = useState<string>('');
  const [checkTodos, setCheckTodos] = useState<string[]>([]);
  const [ line, setLine ] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await addTodo({
      id: uuid4(),
      text: newTodo,
      completed: false,
    });
    setNewTodo('');
    router.refresh();
  };

  const updateTodo: FormEventHandler<HTMLFormElement> = async (value: any) => {
    await editTodo({
      id: editingTodo,
      text: editTodoText,
      completed: value.completed,
    });
    router.refresh();
  };

  const handleDelete = async (value: any) => {
    try {
      await deleteTodo(value);
      router.refresh();
    } catch (e) {
      console.log(e);
    }
  };

  const handleToggleComplete = async (id: string) => {
    const updatedCheckTodos = [...checkTodos];
    const index = updatedCheckTodos.indexOf(id);

    if (index === -1) {
      updatedCheckTodos.push(id);
    } else {
      updatedCheckTodos.splice(index, 1);
    }

    setCheckTodos(updatedCheckTodos);
    setLine(true);
  };

  const rerenderUpdateForm = (value: any) => (
    <td>
      <form onSubmit={() => updateTodo(value)}>
        <input
          className="px-4 py-3 w-4/5 bg-white text-black border-2 rounded-lg"
          type="text"
          value={editTodoText}
          placeholder={value}
          onChange={(e) => setEditTodoText(e.target.value)}
        />
      </form>
    </td>
  );

  const filteredTodos = todos.filter((todo) => !checkTodos.includes(todo.id));
  const completedTodos = todos.filter((todo) => checkTodos.includes(todo.id));

  return (
    <div className="m-2 md:m-5 flex flex-col gap-4">
      <h1 className="text-xl text-black font-bold">ADD ITEM</h1>
      <hr className="h-1 bg-red-200 border-0 dark:bg-black" />
      <form onSubmit={handleSubmit} className="mb-5">
        <input
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          className="px-4 py-3 w-4/5 bg-white text-black border-2 rounded-lg"
          type="text"
          placeholder="Enter your list"
        />
        <button className="pl-6">Add</button>
      </form>
      {filteredTodos.length !== 0 && (
        <>
          <h1 className="text-xl text-black font-bold">TODO</h1>
          <hr className="h-1 bg-red-200 border-0 dark:bg-black" />
          <div className="overflow-x-auto">
            <table className="table mb-10">
              <thead>
                <tr>
                  <th></th>
                  <th>Task</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredTodos.map((todo) => (
                  <tr key={todo.id}>
                    <td>
                      <input
                        type="checkbox"
                        className="checkbox"
                        checked={checkTodos.includes(todo.id)}
                        onChange={() => handleToggleComplete(todo.id)}
                      />
                    </td>
                    {editingTodo === todo.id ? (
                      rerenderUpdateForm(todo.text)
                    ) : (
                      <td>{todo.text}</td>
                    )}
                    <td className="flex gap-5">
                      <button
                        className="text-blue-500"
                        onClick={() => setEditingTodo(todo.id)}
                      >
                        Edit
                      </button>
                      <button
                        className="text-red-500"
                        onClick={() => handleDelete(todo.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
      {completedTodos.length !== 0 && (
        <>
          <h1 className="text-xl text-black font-bold">Completed</h1>
          <hr className="h-1 bg-red-200 border-0 dark:bg-black" />
          <div className="overflow-x-auto">
            <table className="table mb-10">
            <thead>
                <tr>
                  <th></th>
                  <th>Task</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {completedTodos.map((todo) => (
                  <tr key={todo.id}>
                    <td>
                      <input
                        type="checkbox"
                        className="checkbox"
                        checked={checkTodos.includes(todo.id)}
                        onChange={() => handleToggleComplete(todo.id)}
                      />
                    </td>
                    {editingTodo === todo.id ? (
                      rerenderUpdateForm(todo.text)
                    ) : (
                      <td className={line ? 'line-through':''}>{todo.text}</td>
                    )}
                    <td className="flex gap-5">
                      <button
                        className="text-blue-500"
                        onClick={() => setEditingTodo(todo.id)}
                      >
                        Edit
                      </button>
                      <button
                        className="text-red-500"
                        onClick={() => handleDelete(todo.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default HomePage;
import Image from 'next/image'
import HomePage from '@/app/component/HomePage'
import { getAllTodos } from '@/api'
import Footer from './component/Footer';
import Navbar from './component/Navbar';

export default async function Home() {
  const todos = await getAllTodos();
  console.log(todos);
  return (
    <main className='w-screen h-screen space-y-0 bg-gray-300 flex flex-col  items-center'>
      <Navbar/>
      <div className='w-3/4 overflow-y-auto h-2/3 bg-white border rounded-lg items-start'>
        <h1 className='text-4xl text-black font-bold mt-5 text-center'>TODO LIST</h1>
        <HomePage todos={todos}/>
      </div>
      <Footer/>
    </main>
  )
}

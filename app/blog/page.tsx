import React from 'react'
import Navbar from '../component/Navbar'
import Footer from '../component/Footer'

const page = () => {
  return (
    <main className='w-screen h-screen space-y-0 bg-gray-300 flex flex-col  items-center'>
      <Navbar/>
      <div className='w-3/4 overflow-y-auto h-2/3 bg-white border rounded-lg items-start'>
        <h1 className='text-4xl text-black font-bold mt-5 text-center'>Blog Page</h1>
      </div>
      <Footer/>
    </main>
  )
}

export default page
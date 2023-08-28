import React from 'react'
import Nav from './nav'
import { useGlobal } from "./context";
import Todo from './todo'
function Home() {
  const {  mode, setMode, completed } = useGlobal();
  return (
    <div className={`h-screen overflow-y-scroll w-[100%] ${!mode?'dark':'bg-white'}`}>
      <Nav />
      <div className='flex  relative w-full items-center justify-center '>
        <Todo />
      </div>
    </div>
  );
}

export default Home

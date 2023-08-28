import React, { useState,useEffect } from "react";
import { BsMoonFill, BsSunFill } from "react-icons/bs";
import Foot from "./foot";
import { useGlobal } from "./context";
import {motion,AnimatePresence}from 'framer-motion'
const Item = ({ text, id }) => {
  const { list, setList, setCompleted, mode, setMode,itemVariant, completed } = useGlobal();
  const [ch, setCh] = useState(false);

  const handleDelete = () => {
    const updatedList = list.filter((item) => item.id !== id);
    setList(updatedList);
    localStorage.setItem("todoList", JSON.stringify(updatedList));
  };

  const isCompleted = completed.some((item) => item.id === id);

  return (
    <motion.div
      variants={itemVariant}
      initial="initial"
      animate="animate"
      exit="exit"
      whileHover="whileHover"
      transition="transition"
      onClick={() => {
        setCh(!ch);
       if(!isCompleted){
         const newComplete = { id, text };
         setCompleted((prev) => [...prev, newComplete]);
          localStorage.setItem(
            "completedList",
            JSON.stringify([...completed, newComplete])
          );
       }
      }}
      className="flex w-full px-8 bb py-6 items-center justify-between"
    >
      <div className="flex items-center gap-6">
        <div>
          {isCompleted ? (
            <div className="check2">
              <img className="h-[12px]" src="/images/icon-check.svg" alt="" />
            </div>
          ) : (
            <div className="check" />
          )}
        </div>
        <p className={`${isCompleted ? "text-gray-400 line-through" : ""}`}>
          {text}
        </p>
      </div>
      <img
        onClick={handleDelete}
        className="h-[17px]"
        src="/images/icon-cross.svg"
        alt=""
      />
    </motion.div>
  );
};

const Item2 = ({ text, id }) => {
  const { setCompleted, itemVariant,completed } = useGlobal();
  const [ch, setCh] = useState(false);

  const handleDelete = () => {
    const updatedCompletedList = completed.filter((item) => item.id !== id);
    setCompleted(updatedCompletedList);
    localStorage.setItem("completedList", JSON.stringify(updatedCompletedList));
  };

  return (
    <motion.div
      variants={itemVariant}
      initial="initial"
      animate="animate"
      exit="exit"
      whileHover="whileHover"
      transition="transition"
      className="flex w-full px-8 bb py-6 items-center justify-between"
    >
      <div className="flex items-center gap-6">
        <div className="check2">
          <img className="h-[12px] " src="/images/icon-check.svg" alt="" />
        </div>
        <p className={`${ch && "text-gray-400 line-through"}`}>{text}</p>
      </div>
      <img
        onClick={handleDelete}
        className="h-[17px]"
        src="/images/icon-cross.svg"
        alt=""
      />
    </motion.div>
  );
};

function Todo() {
  const { todo, setTodo, list,view,completed, setList,mode,setMode } = useGlobal();

  const handleAddTodo = () => {
    if (todo.trim() !== "") {
      const newTodo = { id: Date.now(), text: todo };
      setList((prev) => [...prev, newTodo]);
      setTodo("");
      localStorage.setItem("todoList", JSON.stringify([...list, newTodo]));
    }
  };

  return (
    <div className="cont absolute -top-90 sm:px-12 px-2  z-10 sm:w-[700px] w-[100%]">
      <div className="flex justify-between mb-6 uppercase tracking-[0.7em] items-center w-full">
        <div className="text-white text-[38px] font-[500]">Todo</div>
        <div
          className="cursor-pointer"
          onClick={() => {
            setMode(!mode);
          }}
        >
          {mode ? (
            <img src="/images/icon-moon.svg" className="text-white" alt="" />
          ) : (
            <img src="/images/icon-sun.svg" className="text-white" alt="" />
          )}
        </div>
      </div>

      <div
        className={`w-full flex gap-2 py-2 pl-8 ${
          mode ? "bg-white" : "dark2"
        } rounded-md mt-3 h-[60px] items-center `}
      >
        <div onClick={handleAddTodo} className="check" />
        <input
          value={todo}
          onChange={(e) => {
            setTodo(e.target.value);
          }}
          placeholder="Create a new todo..."
          className={`w-full bg-transparent  ${
            mode ? "" : "text-white"
          } outline-none px-2`}
          type="text"
        />
      </div>

      <div
        className={`w-full  sh flex flex-col relative  ${
          mode ? "bg-white" : "dark2"
        } rounded-md mt-3 h-auto`}
      >
        {view === "all" && (
          <AnimatePresence>
            {list.map((item) => (
              <Item
                key={item.id}
                id={item.id}
                checked={false}
                text={item.text}
              />
            ))}
            {list.length < 1 && (
              <div className="w-full flex items-center justify-center py-10 ">
                <p className="text-gray-500  font-[500] ">
                  Your todo list is empty
                </p>
              </div>
            )}
          </AnimatePresence>
        )}
        {view === "completed" && (
          <AnimatePresence>
            {completed.map((item) => (
              <Item2 key={item.id} id={item.id} text={item.text} />
            ))}
            {completed.length < 1 && (
              <div className="w-full flex items-center justify-center py-10 ">
                <p className="text-gray-500 font-[500] ">
                  You haven't completed any task yet
                </p>
              </div>
            )}
          </AnimatePresence>
        )}
        <Foot />
      </div>
    </div>
  );
}

export default Todo;

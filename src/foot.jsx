import React from 'react'
import { useGlobal } from "./context";

function Foot() {
    const { list, setList,setView,view,completed,mode,setCompleted } = useGlobal();
  return (
    <div
      className={`flex justify-between duration-[0.4] text-gray-400 items-center px-6 ${
        mode ? "bg-white" : "dark2"
      } py-6`}
    >
      <div>
        {view === "all" ? (
          <p>
            {list.length} {list.length > 1 ? "items" : "item"} left
          </p>
        ) : (
          <p>
            {completed.length} {completed.length > 1 ? "items" : "item"}{" "}
            completed
          </p>
        )}
      </div>
      <div
        className={`${
          !mode && "diff2"
        } font-[500] py-6 text-[16px] diff capitalize flex gap-4`}
      >
        <p
          onClick={() => {
            setView("all");
          }}
          className={`${
            view === "all" && "text-blue-500 font-[600]"
          } hover:text-gray-700`}
        >
          all
        </p>
        <p className="hover:text-gray-700">active</p>
        <p
          className={`${
            view === "completed" && "text-blue-500 font-[600]"
          } hover:text-gray-700`}
          onClick={() => {
            setView("completed");
            console.log(completed);
            console.log(list);
          }}
        >
          completed
        </p>
      </div>
      <p
        className="hover:text-gray-700"
        onClick={() => {
          setCompleted([]);
        }}
      >
        clear completed
      </p>
    </div>
  );
}

export default Foot

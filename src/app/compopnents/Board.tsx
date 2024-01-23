"use client";
import React, { useState, useEffect } from "react";
//import cardData fro data
import { cardData } from "../data/data";
//import DragDropContext Droppable Dragable
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
interface Data {
  id: number;
  title: string;
  components: {
    id: number;
    name: string;
  };
}
[];

const Board = (lane) => {
  const [board, setData] = useState<Data[]>(() => {
    const savedBoard = localStorage.getItem('board');
    return savedBoard ? JSON.parse(savedBoard) :cardData;
  });
  const [newTaskContent, setNewTaskContent] = useState('');
  // useEffect(() => {
  //   setData(cardData);
  // }, []);
  
  useEffect(() => {
    localStorage.setItem('board', JSON.stringify(board));
  }, [board]);

  const handleTaskAdd = () => {
    if (newTaskContent.trim() !== '') {
     
      setNewTaskContent('');
    }
  };
  const onDragEnd=(e:dropResult)=>{
// console.log(e)
const {source,destination}=e
if(!destination)
return 
if(source.droppableId===destination.droppableId){
    // const newData=[...data]
    const newData = JSON.parse(JSON.stringify(data));

    const index=parseInt(source.droppableId.split('droppable')[1])

    // console.log(index)
    const temp=newData[index].components.splice(source.index,1)
    newData[index].components.splice(destination.index,0,...temp)
    setData(newData)


}else
{
// const newData=[...data]
const newData = JSON.parse(JSON.stringify(data));
const oldIndex = parseInt(source.droppableId.split('droppable')[1]);
const newIndex = parseInt(destination.droppableId.split('droppable')[1]);
const temp = newData[oldIndex].components.splice(source.index, 1);
newData[newIndex].components.splice(destination.index, 0, ...temp);
}

  }
  return (
    <DragDropContext onDragEnd={onDragEnd}>
    <div>
      <h1 className="text-center font-bold text-black my-10 text-xl">
        Drag And Drop application
      </h1>
      <div className="flex justify-between my-10 mx-5 gap-5">
        {board.length > 0 &&
          board.map((data, index) => (
            <Droppable key={data.id} droppableId={`droppable${data.id}`}>
              {(provided) => (
                <div
                  className="border-gray-400 border border-dashed p-4 w-1/3"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  <h2 className="text-center font-bold text-black">
                    {data.title}
                  </h2>
                  {data.components.map((component, index) => (
                    <Draggable
                      key={component.id}
                      draggableId={`draggable${component.id}`}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          className="p-4 m-4 border bg-gray-300"
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                        >
                          {component.name}
                          
                        </div>
                      )}
                    </Draggable>
                  ))}
                  <div className="mt-4">
            <input
              type="text"
              value={newTaskContent}
              onChange={(e) => setNewTaskContent(e.target.value)}
              placeholder="Enter task content"
              className="p-2 border rounded-md mr-2"
            />
            <button onClick={handleTaskAdd} className="p-2 bg-blue-500 text-white rounded-md">
              Add Task
            </button>
          </div>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        {/* <div className="bg-gray-400 border border-dashed"></div> */}
        
      </div>
    </div>
  </DragDropContext>
  );
};

export default Board;

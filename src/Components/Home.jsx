import React, { useEffect, useState } from "react";
import "./Home.css";
import axios from "axios";
import '../services/allAPI.js'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchTasks,addTasks,deleteTask } from "../services/allAPI.js";
import { Link } from "react-router-dom";

function Home() {
  const [taskInput,setTaskInput] = useState("");
  const [tasks,setTasks] = useState([]);
  useEffect(() => {
    const fetchData = async ()=>{
      try{
        const data = await fetchTasks();
        setTasks(data);
      }catch(error){
        console.log("Error fetching tasks:",error);
      }
    };
    fetchData();
  }, []);
  const handleInputChange=(e)=>{
    setTaskInput(e.target.value);
  }
  const handleAddTask = async () => {
    console.log("====>", taskInput.trim()); 
  
    if (taskInput.trim()) {
      const newTask = { text: taskInput }; 
  
      try {
        const response = await addTasks(newTask);
        setTasks([...tasks,response]);
        console.log(tasks);
        toast.success("Notes added successfully")
        setTaskInput("");
      } catch (error) {
        console.error("Error adding task:", error);
      }
    }
  };
  const handleDeleteTask= async (taskId)=>{
   try{
    await deleteTask(taskId);
    setTasks(tasks.filter((task)=> task.id !== taskId));
   }catch(error){ 
    console.error("Error adding task:", error);
   }
  }
  console.log(tasks);
  return (
    <div className="container">
      <h1>TO DO APP</h1>
      <h4>GET THINGS DONE!!!</h4>

      <div className="add-task">
        <input
          type="text"
          placeholder="What is the task today?"
          className="input"
          value={taskInput}
          onChange={handleInputChange}
        />
        <button className="button" onClick={handleAddTask}>Add Task</button>
      </div>

      <div className="task-list">
       {tasks.map(item=>
       <div key={item?.id} className="task-item">
          <span>{item.text}</span>
          <div>
            <Link to={`/update/${item.id}`}>
              <button className="button edit">
                <i className="fas fa-edit"></i>
              </button>
            </Link>
            <button className="button delete" onClick={()=>handleDeleteTask(item.id)}>
              <i className="fas fa-trash-alt"></i>
            </button>
          </div>
        </div>
        )}
      </div>
      <ToastContainer position='top-right' theme='colored' autoClose={2000} />
    </div>
  );
}

export default Home;
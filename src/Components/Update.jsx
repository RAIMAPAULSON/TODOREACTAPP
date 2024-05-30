import React, { useEffect, useState } from 'react'
import './Update.css'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchTaskById, updateTask } from '../services/allAPI';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Update = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [taskText, setTaskText] = useState("");
  console.log("ggghhh", id);
  useEffect(() => {
    console.log("useEffect Update")
    fetchTaskById(id)
      .then((data) => {
        console.log(data)
        setTask(data);
        setTaskText(data.text);
      })
      .catch((error) => console.error("Error fetching task:", error));
  }, []);
  const handleUpdateTask = async () => {
    try {
      if (taskText.trim()) {
        const updatedTask = { ...task, text: taskText };
        await updateTask(id, updatedTask);
        toast.info("successful")
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleCancel = () => {
    navigate("/");
  };
  return (
    <div className='update-container'>
      <ToastContainer position='top-right' theme='colored' autoClose={1000} />
      <h1>Edit Notes</h1>
      <textarea type="text" value={taskText}
        onChange={(e) => setTaskText(e.target.value)} />
      <button className='update-btn' onClick={handleUpdateTask}>Update</button>
      <button className='cancel-btn' onClick={handleCancel}>Cancel</button>
    </div>
  )
}

export default Update
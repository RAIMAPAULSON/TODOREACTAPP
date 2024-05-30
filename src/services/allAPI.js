import axios from "axios";

const baseURL = "https://todoserver-xnm7.onrender.com/todos";

export const fetchTasks = async () => {
    try {
        const response = await axios.get(baseURL);
        return response.data;
    } catch (error) {
        console.error("Error fetching todos:", error);
        throw error;
    }
};
export const addTasks = async (newTask) => {
    try {
        const response = await axios.post(baseURL,newTask);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching todos:", error);
        throw error;
    }
};
export const deleteTask = async(taskId) =>{
    try{
       await axios.delete(`${baseURL}/${taskId}`);
    }catch(error){
        console.error("Error deleting task:", error);
        throw error;
    }
}
export const fetchTaskById = async (taskId) => {
    try {
        const response = await axios.get(`${baseURL}/${taskId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching task:', error);
        throw error;
    }
};

export const updateTask = async (taskId, updatedTask) => {
    try {
        const response = await axios.put(`${baseURL}/${taskId}`, updatedTask);
        return response.data;
    } catch (error) {
        console.error('Error updating task:', error);
        throw error;
    }
};
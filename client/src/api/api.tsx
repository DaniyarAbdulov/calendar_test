import axios from "axios";

const API_URL = "http://localhost:4000";

export interface CalendarDay {
  date: string;
  taskCount: number;
}

export const fetchTasksByDate = async (date: string) => {
  try {
    const response = await axios.get(`${API_URL}/tasks?date=${date}`);
    return response.data;
  } catch (error) {
    console.error("Ошибка загрузки задач:", error);
    return [];
  }
};

export const fetchCalendar = async () => {
  try {
    const response = await axios.get(`${API_URL}/calendar`);
    return response.data;
  } catch (error) {
    console.error("Ошибка загрузки календаря:", error);
    return {};
  }
};

export const addTask = async (title: string, date: string) => {
  try {
    const response = await axios.post(`${API_URL}/tasks`, { title, date });
    return response.data;
  } catch (error) {
    throw new Error("Ошибка добавления задачи");
  }
};

export const deleteTask = async (taskId: string) => {
  try {
    await axios.delete(`${API_URL}/tasks/${taskId}`);
  } catch (error) {
    throw new Error("Ошибка удаления задачи");
  }
};

import { useState, useEffect } from "react";
import Calendar from "../components/Calendar/Calendar";
import TaskForm from "../components/TaskForm/TaskForm";
import TaskList from "../components/TaskList/TaskList";
import { fetchCalendar, fetchTasksByDate } from "../api/api";
import styles from "./CalendaPage.module.css";

const CalendarPage = () => {
  const [taskCounts, setTaskCounts] = useState<{ [key: string]: number }>({});
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [tasks, setTasks] = useState<{ id: number; title: string; completed: boolean }[]>([]);


  useEffect(() => {
    fetchCalendar()
      .then(setTaskCounts)
      .catch((error) => console.error("Ошибка загрузки календаря:", error));

    const today = new Date().toISOString().split("T")[0];
    setSelectedDate(today);
    fetchTasks(today);
  }, []);

  const fetchTasks = (date: string) => {
    fetchTasksByDate(date)
      .then(setTasks)
      .catch((error) => console.error("Ошибка загрузки задач:", error));
  };

  const handleDayClick = (date: string) => {
    setSelectedDate(date);
    fetchTasks(date);
  };

  const handleTaskAdded = () => {
    fetchCalendar().then(setTaskCounts);

    setSelectedDate((prevDate) => {
      fetchTasks(prevDate);
      return prevDate;
    });
  };

  return (
    <div className={styles.wrapper}>
      <Calendar taskCounts={taskCounts} onDayClick={handleDayClick} />
      <TaskForm onTaskAdded={handleTaskAdded} />
      <TaskList tasks={tasks} selectedDate={selectedDate} />
    </div>
  );
};

export default CalendarPage;

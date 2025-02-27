import { useState, useEffect } from "react";
import styles from "./TaskList.module.css";

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

interface TaskListProps {
  tasks: Task[];
  selectedDate: string;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, selectedDate }) => {
  const [checkedTasks, setCheckedTasks] = useState<number[]>([]);

  useEffect(() => {
    // Устанавливаем изначально выполненные задачи
    setCheckedTasks(tasks.filter((task) => task.completed).map((task) => task.id));
  }, [tasks]);

  const toggleCheckbox = (id: number) => {
    setCheckedTasks((prev) =>
      prev.includes(id) ? prev.filter((taskId) => taskId !== id) : [...prev, id]
    );
  };

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.header}>Задачи на {selectedDate}</h3>
      {tasks.length === 0 ? (
        <p className={styles.noTasks}>Нет задач</p>
      ) : (
        <ul className={styles.taskList}>
          {tasks.map((task) => (
            <li
              key={task.id}
              className={`${styles.taskItem} ${checkedTasks.includes(task.id) ? styles.completed : ""}`}
              onClick={() => toggleCheckbox(task.id)}
            >
              <input
                type="checkbox"
                checked={checkedTasks.includes(task.id)}
                readOnly
                className={styles.checkbox}
              />
              <span className={styles.taskTitle}>{task.title}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;

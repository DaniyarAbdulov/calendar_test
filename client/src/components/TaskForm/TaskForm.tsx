import { useState } from "react";
import { addTask } from "../../api/api";
import styles from "./TaskForm.module.css"; 

const TaskForm: React.FC<{ onTaskAdded: () => void }> = ({ onTaskAdded }) => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState(""); 

  const validateForm = () => {
    const trimmedTitle = title.trim();
    const today = new Date().toISOString().split("T")[0]; 

    if (!trimmedTitle) return "Название задачи не может быть пустым!";
    if (trimmedTitle.length < 3 || trimmedTitle.length > 50) return "Название должно содержать от 3 до 50 символов!";
    if (!date) return "Выберите дату!";
    if (date < today) return "Нельзя выбрать прошедшую дату!";
    
    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      await addTask(title.trim(), date);
      onTaskAdded();
      setTitle("");
      setDate("");
      setError(""); 
    } catch (error) {
      setError("Ошибка при добавлении задачи. Попробуйте еще раз.");
      console.error("Ошибка при добавлении задачи:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Название задачи"
        className={styles.input}
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className={styles.input}
      />
      <button type="submit" className={styles.button}>
        Добавить
      </button>
      {error && <p className={styles.error}>{error}</p>} {/* Отображение ошибки */}
    </form>
  );
};

export default TaskForm;

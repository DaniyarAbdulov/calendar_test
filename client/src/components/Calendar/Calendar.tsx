import { useState } from "react";
import styles from "./Calendar.module.css";

const daysOfWeek = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

const Calendar: React.FC<{ taskCounts: { [key: string]: number }, onDayClick: (date: string) => void }> = ({ taskCounts, onDayClick }) =>{
  const [currentDate, setCurrentDate] = useState(new Date());

  const today = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const adjustedFirstDay = (firstDayOfMonth === 0 ? 7 : firstDayOfMonth) - 1; 

  const changeMonth = (offset: number) => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() + offset);
      return newDate;
    });
  };
  console.log("Все ключи в taskCounts:", Object.keys(taskCounts));

  return (
    <div className={styles.calendar}>
      <div className={styles.header}>
        <button onClick={() => changeMonth(-1)} className={styles.navButton}>
          {"<"}
        </button>
        <h2>
          {currentDate.toLocaleString("ru-RU", { month: "long" })} {year}
        </h2>
        <button onClick={() => changeMonth(1)} className={styles.navButton}>
          {">"}
        </button>
      </div>
  
     
      <div className={styles.week}>
        {daysOfWeek.map((day) => (
          <div key={day} className={styles.weekDay}>
            {day}
          </div>
        ))}
      </div>
  
      
      <div className={styles.days}>
        
        {Array(adjustedFirstDay)
          .fill(null)
          .map((_, index) => (
            <div key={`empty-${index}`} className={styles.dayEmpty}></div>
          ))}
  
        
        {Array.from({ length: daysInMonth }, (_, i) => {
          const day = i + 1;
          const dateKey = `${year}-${(month + 1).toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
          const taskCount = taskCounts[dateKey] || 0;
          const isToday =
            day === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear();
  
          return (
            <div 
              key={day} 
              className={`${styles.day} ${isToday ? styles.today : ""}`} 
              onClick={() => onDayClick(dateKey)}
            >
              <p>{day}</p>
              {taskCount > 0 && <span className={styles.taskCount}>{taskCount} задач</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
  
};

export default Calendar;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CalendarPage from "./pages/CalendarPage";
import "./App.css"


const App = () => {
  return (
    <div className="wrapper"> 
      <Router>
      <Routes>
        <Route path="/" element={<CalendarPage />} />
      </Routes>
    </Router>
    </div>
   
  );
};

export default App;

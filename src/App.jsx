
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./layout/Header";
// import PomodoroApp from "./components/pomo/PomodoroApp";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={
            <>
              <Header /> <Home />
              {/* <PomodoroApp/> */}
              
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./layout/Header";
import YoutubePlayer from "./components/test";
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
              {/* <YoutubePlayer apiKey={"AIzaSyA-dDgWF8zewr_ERPzQFaErWGjTyJtlIuo"} /> */}
              
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import { BrowserRouter, Routes, Route } from "react-router";
import InterviewIntroduction from "./pages/interviewes";
import ScreenRecordApp from "./pages/interviewes/ScreenRecorder";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<InterviewIntroduction />} index />
        <Route path="/interview" element={<ScreenRecordApp />} index />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

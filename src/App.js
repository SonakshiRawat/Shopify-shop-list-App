import "./App.css";
import { Routes, Route } from "react-router-dom";
import Form from "./components/Form";
import MainPage from "./components/MainPage";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainPage />}></Route>
        <Route path="/form" element={<Form />}></Route>
      </Routes>
    </div>
  );
}

export default App;

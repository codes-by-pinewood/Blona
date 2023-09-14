import "./App.css";
import HomePage from "./Components/HomePage";
import LoginPage from "./Components/LoginPage";
import { Route, Routes } from "react-router-dom";
import ImportFromFileBody from "./Components/ImportFromFileBody";

function App() {
  return (
    <div className="App">
      <h1>Blona</h1>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/path" element={<ImportFromFileBody />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default App;

/*
<Routes>
<Route path="/" element={<LoginPage />} />
<Route path="/home" element={<HomePage />} />
</Routes>*/

import "./App.css";
import HomePage from "./Components/HomePage";
import LoginPage from "./Components/LoginPage";
import { Route, Routes } from "react-router-dom";
import ReactLogo from "./logo.svg";
//import ImportFromFileBody from "./Components/ImportFromFileBody";

function App() {
  return (
    <div className="App">
      <img src={ReactLogo} alt="React Logo" width="1500px" />

      <Routes>
        <Route path="/" element={<LoginPage />} />

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

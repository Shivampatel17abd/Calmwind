import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./login";
import CreateAccount from "./createacc";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/create-account" element={<CreateAccount />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
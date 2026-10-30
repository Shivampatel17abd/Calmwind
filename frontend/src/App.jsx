import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./login";
import CreateAccount from "./createacc";
import Movie_Music from "./Movie_music";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/movie-music" element={<Movie_Music />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
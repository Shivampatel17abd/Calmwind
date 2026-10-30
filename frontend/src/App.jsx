import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./login";
import Movie_Music from "./movie_music";
import CreateAccount from "./createacc";

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
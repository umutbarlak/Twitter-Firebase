import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./pages/AuthPage";
import FeedPage from "./pages/FeedPage";
import ProtectedRoute from "./pages/ProtectedRoute";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<FeedPage />} />
          <Route path="/profile" element={<h1>profile</h1>} />
          <Route path="/ayar" element={<h1>ayar</h1>} />
          <Route path="/mesaj" element={<h1>mesaj</h1>} />
          <Route path="/mail" element={<h1>mail</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

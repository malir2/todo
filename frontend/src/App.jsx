import React from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import { ThemeProvider } from "./context/Theme";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { Toaster } from "react-hot-toast";

function App() {
  const location = useLocation();
  const hideNavbar = ["/register", "/login"].some((path) =>
    location.pathname.includes(path)
  );
  return (
    <Provider store={store}>
      <Toaster position="top center" />
      <ThemeProvider>
        {!hideNavbar && <Navbar />}
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
        </Routes>
      </ThemeProvider>
    </Provider>
  );
}

function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

export default AppWrapper;

import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//@import pages
import Home from "./pages/home";

function App() {
  return (
    <div>
      <ToastContainer theme="colored"></ToastContainer>
      <Home />
    </div>
  );
}

export default App;

import React from "react";

// Router
import { Routes, Route } from "react-router-dom";

// Pages
import SignInPage from "./Pages/SignInPage";
import SignUpPage from "./Pages/SignUpPage";

// Components
import Header from "./Components/Header/Header.tsx";

const App = () => {
  return (
    <div className="container rounded-2xl mx-auto mt-20 bg-[#eeeeee] p-5">
      <Header />
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
      </Routes>
    </div>
  );
};

export default App;

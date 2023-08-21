import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import Home from "./Pages/HomePage.jsx";
import Register from "./Pages/RegisterPage.jsx";
import Login from "./Pages/LoginPage.jsx";
import Navbar from "./Components/Navbar.jsx";
import Footer from "./Components/Footer.jsx";
import Modal from "./Components/utils/Modal";

import { getPeeps, submitPeep } from "./api/peepAPI.js";
import { registerUser, loginUser } from "./api/userAPI.js";

function App() {
  const [peeps, setPeeps] = useState([]);
  const [userId, setUserId] = useState("");
  const isLoggedIn = userId.length > 0;
  const [message, setMessage] = useState({
    title: ``,
    message: ``,
    showModal: false,
  });
  const navigate = useNavigate();

  const getPeepsHandler = async () => {
    const externalDataCallResult = await getPeeps();
    if (externalDataCallResult?.error) {
      console.error(
        "Error retrieving peeps:",
        externalDataCallResult.error.message
      );
      setMessage({
        title: "Unable to retrieve peeps",
        message: externalDataCallResult.error.message,
        showModal: true,
      });
    }

    const peepList = externalDataCallResult?.peepList
      ? externalDataCallResult.peepList
      : [];
    console.log(peepList);
    setPeeps(peepList);
  };

  useEffect(() => {
    getPeepsHandler();
  }, []);

  const logoutHandler = () => {
    setUserId("");
  };

  const submitPeepHandler = async (peep) => {
    const response = await submitPeep(peep);
    if (response?.error) {
      console.error("Error submitting peep:", response.error.message);
      setMessage({
        title: "Error submitting peep",
        message: response.error.message,
        showModal: true,
      });
    } else {
      console.log("Peep submitted successfully");
    }
    getPeepsHandler();
  };

  const submitRegisterHandler = async (user) => {
    const response = await registerUser(user);
    if (response?.error) {
      console.error("Error submitting registration:", response.error.message);
      setMessage({
        title: "Error submitting registration information",
        message: response.error.message,
        showModal: true,
      });
    } else {
      console.log("Registration submitted successfully:", response.message);
      setMessage({
        title: "Registration successful",
        message: "Please login to start posting peeps!",
        showModal: true,
      });
      navigate("/login");
    }
  };

  const submitLoginHandler = async (user) => {
    const response = await loginUser(user);
    if (response?.error) {
      console.error(
        "Error submitting login information:",
        response.error.message
      );
      setMessage({
        title: "Error submitting login information",
        message: response.error.message,
        showModal: true,
      });
    } else {
      console.log("Logged in successfully:", response.message);
      setUserId(response.userId);
      setMessage({
        title: "Login successful",
        message: "Welcome to Chitter!",
        showModal: true,
      });
      navigate("/");
    }
  };

  const handleModalClose = () => {
    setMessage({ ...message, showModal: false });
  };

  return (
    <>
      {message.title && message.showModal && (
        <Modal
          handleClose={handleModalClose}
          message={message.message}
          title={message.title}
        />
      )}
      <Navbar isLoggedIn={isLoggedIn} logoutHandler={logoutHandler} />
      <div className="app">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                submitAction={submitPeepHandler}
                peepList={peeps}
                userId={userId}
              />
            }
          />
          <Route
            path="/register"
            element={<Register submitAction={submitRegisterHandler} />}
          />
          <Route
            path="/login"
            element={<Login submitAction={submitLoginHandler} />}
          />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;

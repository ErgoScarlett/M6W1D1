import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import  AuthContextProvider  from './components/context/authContext.js';
import NavBar from "./components/navbar/BlogNavbar";
import Footer from "./components/footer/Footer";
import Home from "./views/home/Home";
import Login from "./views/login/LoginPage.jsx";
import Register from "./views/register/RegisterPage.jsx";
import PrivateRoute from "./components/privateroutes/privateRoutes.js";
import Blog from "./views/blog/Blog";
import NewBlogPost from "./views/new/New";

function App() {
  return (
    <AuthContextProvider>
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route 
        path="/"
        element={
          <PrivateRoute>
            <NavBar />
            <Home />
            <Footer />
          </PrivateRoute>
        }
        />

        <Route
          path="/blog/:id"
          element={
            <PrivateRoute>
              <NavBar />
              <Blog />
              <Footer />
            </PrivateRoute>
          }
        />
        <Route
          path="/new"
          element={
            <PrivateRoute>
              <NavBar />
              <NewBlogPost />
              <Footer />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
    </AuthContextProvider>
  );
}

export default App;


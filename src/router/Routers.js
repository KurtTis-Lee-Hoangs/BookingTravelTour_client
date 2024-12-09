import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Blogs from "../components/Blog/Blogs";
import BlogDetails from "../components/Blog/BlogDetails";
import Tours from "../components/Tour/Tours";
import TourDetails from "../components/Tour/TourDetails";
import Login from "../pages/Login";
import Register from "../pages/Register";
import SearchResultList from "../components/SearchTour/SearchResultList";
import ThankYou from "../pages/ThankYou";
import Profile from "../pages/Profile";
import Admin from "../components/Admin/Admin";
import BookingHistory from "../components/User/BookingHistory";
import SearchResultListBlog from "../components/SearchBlog/SearchResultListBlog";
import FavouriteTour from "../components/Favourite-tours/Favourite.Tour"
import ForgotPassword from "../components/Forgot-Password/ForgotPassword"
import RegistrationSuccess from "../pages/RegisterSuccess"
import Weather from "../components/Weather/Weather"
import About from "../components/About/About";


const Routers = () => (
  <Routes>
    <Route path="/" element={<Navigate to="/homepage" />} />
    <Route path="/homepage" element={<HomePage />} />
    <Route path="/blogs" element={<Blogs />} />
    <Route path="/blogs/:id" element={<BlogDetails />} />
    <Route path="/tours" element={<Tours />} />
    <Route path="/tours/:id" element={<TourDetails />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/thankyou" element={<ThankYou />} />
    <Route path="/tours/search" element={<SearchResultList />} />
    <Route path="/blogs/search" element={<SearchResultListBlog />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="/admin" element={<Admin />} />
    <Route path="/history" element={<BookingHistory />} />
    <Route path="/favourite" element={<FavouriteTour />} />
    <Route path="/forgotpassword" element={<ForgotPassword />} />
    <Route path="/registration-success" element={<RegistrationSuccess />} />
    <Route path="/weather" element={<Weather />} />
    <Route path="/about" element={<About />} />
  </Routes>
);

export default Routers;
      
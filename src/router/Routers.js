import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Posts from "../pages/Posts";
import PostDetails from "../pages/PostDetails";
import Tours from "../pages/Tours";
import TourDetails from "../pages/TourDetails";
import Login from "../pages/Login";
import Register from "../pages/Register";
import SearchResultList from "../pages/SearchResultList";
import ThankYou from "../pages/ThankYou";
import Profile from "../pages/Profile";
import Admin from "../components/Admin/Admin";
import BookingHistory from "../components/User/BookingHistory";
import SearchResultListPost from "../pages/SearchResultListPost";
import FavouriteTour from "../components/Favourite-tours/FavouriteTour"
import ForgotPassword from "../components/Forgot-Password/ForgotPassword"
import RegistrationSuccess from "../pages/RegisterSuccess"


const Routers = () => (
  <Routes>
    <Route path="/" element={<Navigate to="/homepage" />} />
    <Route path="/homepage" element={<HomePage />} />
    <Route path="/posts" element={<Posts />} />
    <Route path="/posts/:id" element={<PostDetails />} />
    <Route path="/tours" element={<Tours />} />
    <Route path="/tours/:id" element={<TourDetails />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/thankyou" element={<ThankYou />} />
    <Route path="/tours/search" element={<SearchResultList />} />
    <Route path="/posts/search" element={<SearchResultListPost />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="/admin" element={<Admin />} />
    <Route path="/history" element={<BookingHistory />} />
    <Route path="/favourite" element={<FavouriteTour />} />
    <Route path="/forgotpassword" element={<ForgotPassword />} />
    <Route path="/registration-success" element={<RegistrationSuccess />} />
  </Routes>
);

export default Routers;
      
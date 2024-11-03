import React from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'
import HomePage from '../pages/HomePage'
import Posts from '../pages/Posts'
import Tours from '../pages/Tours'
import TourDetails from '../pages/TourDetails'
import Login from '../pages/Login'
import Register from '../pages/Register'
import SearchResultList from '../pages/SearchResultList'
import ThankYou from '../pages/ThankYou'

const Routers = () => {
  return (
    <Routes>
        <Route path='/' element={<Navigate to='/homepage'/> }/>
        <Route path='/homepage' element={<HomePage/>}/>
        <Route path='/posts' element={<Posts/>}/>
        <Route path='/tours' element={<Tours/>}/>
        <Route path='/tours/:id' element={<TourDetails/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/thankyou' element={<ThankYou/>}/>
        <Route path='/tours/search' element={<SearchResultList/>}/>
    </Routes>
  )
}

export default Routers

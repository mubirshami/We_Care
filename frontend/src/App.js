import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Signup from './components/signup';
import Signin from './components/signin';
import Home from './components/home';
import Videos from './components/videos';
import Books from './components/books';
import ForgotPassword from './components/forgetpassword';
import PasswordReset from './components/resetpassword';
import Navbar from './components/navbar';
import Journal from './components/journal';
import Emotion_Detection from './components/emotion_detection';
import ChatbotPage from './components/bot';
import JournalsPage from './components/getjournals';
import AddBooks from './components/addbooks';
import AddVideo from './components/addvideos';
import AddReview from './components/addreview';
import UpdateReviews from './components/updatereview';
import Analysis from './components/analysis';
import DeleteBooks from './components/deletebooks';
import DeleteVideo from './components/deletevideos';
import AdminPanel from './components/adminpanel';
import ViewReviews from './components/viewreviews';
import ViewUsers from './components/viewusers';
import { useState } from 'react';
import { useEffect } from 'react';

function App() {
  
  // const [shownavbar,setshownavbar] = useState(false);
  // useEffect(() => {
  //   const url = window.location.pathname
  //   if(url.includes('/chatbot') || url.includes('/home')){
  //     setshownavbar(true);
  //   }
  //   else{
  //     setshownavbar(false);
  //   }
  //   console.log("Current URL",url)
  // },[]);


  return (
    <div>
      <Router>
      <Navbar/>
        <Routes>
          <Route path='/signup' element={<Signup/>}></Route>
          <Route path='/signin' element={<Signin/>}></Route>
          <Route path='/home' element={<Home/>}></Route>
          <Route path='/videocategorized' element={<Videos/>}></Route>
          <Route path='/books' element={<Books/>}></Route>
          <Route path='/forgotpassword' element={<ForgotPassword/>}></Route>
          <Route path='/passwordreset/:id/:token' element={<PasswordReset/>}></Route>
          <Route path='/journal' element={<Journal/>}></Route>
          <Route path='/emotiondetection' element={<Emotion_Detection/>}></Route>
          <Route path='/chatbot' element={<ChatbotPage/>}></Route>
          <Route path='/getjournals' element={<JournalsPage/>}></Route>
          <Route path='/addbooks' element={<AddBooks/>}></Route>
          <Route path='/addvideos' element={<AddVideo/>}></Route>
          <Route path='/addreview' element={<AddReview/>}></Route>
          <Route path='/updatereviews' element={<UpdateReviews/>}></Route>
          <Route path='/analysis' element={<Analysis/>}></Route>
          <Route path='/deletebooks' element={<DeleteBooks/>}></Route>
          <Route path='/deletevideos' element={<DeleteVideo/>}></Route>
          <Route path='/viewreviews' element={<ViewReviews/>}></Route>
          <Route path='/admin-panel' element={<AdminPanel/>}></Route>
          <Route path='/viewusers' element={<ViewUsers/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
// {shownavbar && <Navbar/>}
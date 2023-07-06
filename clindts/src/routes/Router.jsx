import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignInForm from '../components/SignIn';
import Profile from '../components/Profile';
import Todos from '../components/Todos';
import SignUp from '../components/SignUp';


const Routing = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<SignInForm />} />
                <Route path="/todo" element={<Todos />} />
                <Route path="/signUp" element={<SignUp />} />
                <Route path="/profile" element={<Profile />} />

            </Routes>
        </BrowserRouter>
    )
}

export default Routing
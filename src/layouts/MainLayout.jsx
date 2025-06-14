import React from 'react';
import Home from '../pages/Home';
import { Outlet } from 'react-router-dom';
import Logo from '../Components/Logo';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';


const MainLayout = () => {
    return (
        <div>
            <Logo></Logo>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;
import React from 'react';
import Logo from '../Components/Logo';
import Banner from '../Components/Banner';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

const Home = () => {
    return (
        <div>
            <Logo></Logo>
            <Banner></Banner>
            <Navbar></Navbar>
            <Footer></Footer>
        </div>
    );
};

export default Home;
import React, { useEffect, useState } from "react";
import Banner from '../Components/Banner';
import RecentBlogs from '../pages/Home/RecentBlogs';  // the recent blogs section we discussed
import Newsletter from '../pages/Home/Newsletter'; // your newsletter section component
import TipsAndInsights from "./Home/TipsAndInsights";
import WhyChooseUs from "./Home/WhyChooseUs";
//import Header from '../Components/Header';  // your navbar/header component
//import Footer from '../Components/Footer';  // footer component

const Home = () => {
  const [recentBlogs, setRecentBlogs] = useState([]);

  useEffect(() => {
    // Fetch recent 6 blogs from your backend API
    fetch('http://localhost:3000/blogs?limit=6&sort=recent')
      .then(res => res.json())
      .then(data => setRecentBlogs(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      

      <Banner />

      <RecentBlogs blogs={recentBlogs} />

      {/* Add your two extra custom sections here */}

<TipsAndInsights></TipsAndInsights>

<WhyChooseUs></WhyChooseUs>


      <Newsletter />

      
    </div>
  );
};

export default Home;

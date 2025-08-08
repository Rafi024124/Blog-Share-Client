import React, { useEffect, useState } from "react";
import Banner from '../Components/Banner';
import RecentBlogs from '../pages/Home/RecentBlogs';  // the recent blogs section we discussed
import Newsletter from '../pages/Home/Newsletter'; // your newsletter section component
import TipsAndInsights from "./Home/TipsAndInsights";
import WhyChooseUs from "./Home/WhyChooseUs";
import BlogLoader from "../Components/BlogLoader";
//import Header from '../Components/Header';  // your navbar/header component
//import Footer from '../Components/Footer';  // footer component

const Home = () => {
  const [recentBlogs, setRecentBlogs] = useState([]);
   const [loading, setLoading] = useState(true);

  useEffect(() => {
   
    fetch('http://localhost:3000/blogs?limit=6&sort=recent')
      .then(res => res.json())
      .then(data => {
        setRecentBlogs(data)
        setLoading(false); 
      })
      .catch(err => {
        console.error(err);
            setLoading(false); 
      })
  }, []);

  return (
    <div>
      

      <Banner />

      {loading ? <BlogLoader></BlogLoader> : (
        <RecentBlogs blogs={recentBlogs} />
      )}

      {/* Add your two extra custom sections here */}

<TipsAndInsights></TipsAndInsights>

<WhyChooseUs></WhyChooseUs>


      <Newsletter />

      
    </div>
  );
};

export default Home;

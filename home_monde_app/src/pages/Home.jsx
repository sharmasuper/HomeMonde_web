import React from "react";

import CardSlider from "../components/Home/CardScroll";
import FeatureSection from "../components/Home/FeatureSection";
import HomeScroll from "../components/Home/HomeScroll";
import AdvancedScroll from "../components/Home/AdvancedScroll";

// import HomeScroll from "../components/Home/HomeScroll";

function Home() {
  return (
    <>
      {/* <AdvancedScroll /> */}
      {/* <HomeScroll /> */}
      {/* <AdvancedScroll /> */}
      <CardSlider />
      <FeatureSection />
    </>
  );
}

export default Home;

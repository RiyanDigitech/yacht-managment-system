import WhatWeOffer from "@/components/WhatWeOffer"
import AboutBottom from "@/components/AboutBottom"
import AboutTop from "@/components/AboutTop"
import Discover from "@/components/Discover"
import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"


const AboutPage = () => {
  return (
    <div>
        <Navbar/>
        <AboutTop/>
        <AboutBottom/>
        <Discover/>
        <WhatWeOffer/>
        <Footer/>

    </div>
  )
}

export default AboutPage
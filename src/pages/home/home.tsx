import CardSection from "@/components/CardSection"
import HeroSection from "@/components/HeroSection"
import Navbar from "@/components/Navbar"
import NewSpaceSection from "@/components/NewSpaceSection"
import Booking from "@/components/Booking"
import Ship from "@/components/Ship"
import Footer from "@/components/Footer"





const Home = () => {
  return (
    <div>
      <Navbar/>
      <HeroSection />
      <CardSection />
      <NewSpaceSection />
      <Booking />
      <Ship />
      <Footer />
    </div>
  )
}

export default Home
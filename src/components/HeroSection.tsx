import heroBg from "../../public/heroSection.png";

import '../lib/css/Font.css'

function HeroSection() {
  return (
    <section
      className="relative h-[90vh] flex items-center justify-center bg-cover"
      style={{
        backgroundImage: `url(${heroBg})`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0"></div>

      {/* Content */}
      <div className="relative text-center text-white z-10 mb-50">
        <p className="uppercase tracking-[4px] text-[14.34px] mb-3 text-[#BFA888] inconsolata font-medium">
          Explore the Ocean
        </p>
        <h1 className="text-5xl md:text-6xl  font-semibold tracking-widest fonts-Cormorant">
          RENT A YACHT
        </h1>
        {/* <button className="mt-8 px-10 py-3 bg-[#BFA888] text-white text-sm tracking-widest rounded-md hover:bg-[#a8906f] transition-all duration-300">
          EXPLORE NOW
        </button> */}
      </div>
    </section>
  );
}

export default HeroSection;

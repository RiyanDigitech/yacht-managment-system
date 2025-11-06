import mapBg from "../../public/map.png";
import place1 from "../../public/b1.png";
import place2 from "../../public/b2.png";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

function NewSpaceSection() {
  return (
    <section className="relative flex justify-between items-center bg-[#021426] text-white px-10 md:px-20 py-20 overflow-hidden">
      {/* ===== Left: Text Section ===== */}
      <div className="relative z-10 w-full md:w-1/2">
        {/* Watermark Behind */}
        <h1
          className="absolute top-0 left-0 text-[70px] sm:text-[100px] md:text-[130px] font-serif text-white/5 leading-none tracking-tight select-none fonts-Cormorant"
          style={{ lineHeight: "0.8" }}
        >
          EXPLORE
        </h1>

        {/* Foreground Text */}
        <div className="relative">
          <p className="text-[#BFA888] tracking-[4px] text-xs mb-2 uppercase fonts-Inconsolata">
            Exotic Destinations
          </p>
          <h2 className="text-4xl md:text-5xl font-serif tracking-wide fonts-Cormorant text-[#FFFFFF]">
            NEW PLACES
          </h2>
        </div>
      </div>

      {/* ===== Right: Map and Circles ===== */}
      <div className="relative w-full md:w-1/2 flex justify-center items-center">
        {/* Map */}
        <LazyLoadImage
         effect="blur"
          src={mapBg}
          alt="map background"
          className="w-[85%] max-w-[550px] opacity-80 object-contain pointer-events-none"
        />

        {/* Left Circular Image */}
        <div className="absolute bottom-[22%] left-[10%]">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-[#d4b37f] shadow-lg">
            <LazyLoadImage
             effect="blur"
              src={place1}
              alt="place1"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Right Circular Image */}
        <div className="absolute top-[20%] right-[8%]">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-[#d4b37f] shadow-lg">
            <img
              src={place2}
              alt="place2"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Dashed Travel Path */}
        <svg
          className="absolute w-[60%] max-w-[450px] h-[180px] top-[40%] left-[20%]"
          fill="none"
          stroke="#d4b37f"
          strokeWidth="2"
          strokeDasharray="6 6"
          strokeLinecap="round"
        >
          <path d="M10 150 C150 50, 250 250, 400 100" />
        </svg>
      </div>
    </section>
  );
}

export default NewSpaceSection;

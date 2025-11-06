import { useEffect, useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { message } from "antd";
import backGroundImage from "../../public/backGround.png";
import BookingModal from "./BookingModal";
import { getAllyacth, getAvailableYachts } from "@/services/BookingService/BookingService";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useNavigate } from "react-router-dom";
import tokenService from "@/services/token.service";

function CardSection() {
  const [visibleCount, setVisibleCount] = useState(6);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showAvailable, setShowAvailable] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLogin = () => {
      const token = tokenService.getLocalAccessToken();
      setIsLoggedIn(!!token);
    };

    checkLogin(); // check immediately

    window.addEventListener("storage", checkLogin);
    return () => window.removeEventListener("storage", checkLogin);
  }, []);


  const navigate = useNavigate();

  // Fetch all yachts
  const { data: allYachts } = useQuery({
    queryKey: ["yachts"],
    queryFn: getAllyacth,
    staleTime: 5000,
    placeholderData: keepPreviousData,
  });

  // Fetch available yachts
  const { data: availableYachts, refetch: fetchAvailableYachts } = useQuery({
    queryKey: ["available-yachts", startDate, endDate],
    queryFn: () => getAvailableYachts({ start_time: startDate, end_time: endDate }),
    enabled: false,
  });

  // Handle Check Availability
  const handleCheckAvailability = async () => {
    if (!startDate || !endDate) {
      message.error("Please select both start and end dates!");
      return;
    }
    try {
      await fetchAvailableYachts();
      setShowAvailable(true);
    } catch (err:any) {
      console.error(err);
      message.error(err?.response?.data?.message || "Failed to fetch available yachts!");
    }
  };

  const handleBookNow = () => {
  if (isLoggedIn) {
    setIsOpen(true); // open modal if logged in
  } else {
    navigate("/login"); // redirect if not logged in
  }
};

  // Show either all or available yachts
  const yachts = showAvailable
    ? availableYachts?.data || []
    : allYachts?.data || [];

  const handleLoadMore = () => setVisibleCount((prev) => prev + 6);

  return (
    <div
      className="bg-cover bg-center text-white py-20 px-6 md:px-20"
      style={{ backgroundImage: `url(${backGroundImage})` }}
    >
      {/* Top Inputs */}
      <div className="flex flex-col md:flex-row gap-6 justify-center mb-14 items-end">
        <div className="flex flex-col w-full md:w-auto">
          <label className="text-white text-xs font-medium mb-1 tracking-wider fonts-Inconsolata">
            CHECK - IN
          </label>
          <input
            type="date"
            className="bg-transparent border border-gray-500 text-white px-6 py-3 w-full h-12 focus:outline-none"
            style={{ height: "48px" }}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

        <div className="flex flex-col w-full md:w-auto">
          <label className="text-white text-xs font-medium mb-1 tracking-wider fonts-Inconsolata">
            CHECK - OUT
          </label>
          <input
            type="date"
            className="bg-transparent border border-gray-500 text-white px-6 py-3 w-full h-12 focus:outline-none"
            style={{ height: "48px" }}
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

        <button
          onClick={handleCheckAvailability}
          className="bg-[#BFA888] text-white font-semibold px-8 hover:bg-[#c3a36f] transition fonts-Inconsolata
               h-12 flex items-center justify-center"
        >
          CHECK AVAILABILITY
        </button>
      </div>

        {/* <div className="flex flex-col md:flex-row gap-6 justify-center mb-14">

           <div className="flex flex-col w-full md:w-auto">
    <label 
      htmlFor="Check-In" 
      className="text-white text-xs font-medium mb-1 tracking-wider fonts-Inconsolata"
    >
      CHECK - IN
    </label>
        
        <input
          type="date"
          className="bg-transparent border border-gray-500 text-white px-6 py-3 w-full md:w-auto"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        </div>
        <div className="flex flex-col w-full md:w-auto">
    <label 
      htmlFor="Check-Out" 
      className="text-white text-xs font-medium mb-1 tracking-wider fonts-Inconsolata"
    >
    CHECK - OUT
    </label>
        <input
          type="date"
          className="bg-transparent border border-gray-500 text-white px-6 py-3 w-full md:w-auto"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        </div>
        <button
          onClick={handleCheckAvailability}
          className="bg-[#BFA888] text-white font-semibold px-8 py-3 hover:bg-[#c3a36f] transition fonts-Inconsolata "
        >
          CHECK AVAILABILITY
        </button>
      </div> */}

      {/* Section Heading */}
      <div className="text-center mb-12">
        <h4 className="tracking-widest text-[#BFA888] text-sm mb-2 fonts-Inconsolata font-medium">
          YACHT TYPE VARIETY
        </h4>
        <h1 className="text-5xl lg:text-6xl md:text-5xl mb-3 tracking-wider fonts-Cormorant text-[#FFFFFF]">
          YACHT RENTAL SINCE ‘80
        </h1>
        <p className="max-w-3xl mx-auto text-[#FFFFFF] text-[16px] fonts-Roboto">
          Discover the ultimate yacht party experience with Smart Choice.
          Whether celebrating a special occasion or simply enjoying a day on the
          sea, our luxurious yachts provide the perfect backdrop for
          unforgettable memories.
        </p>
      </div>

      {/* Yacht Cards */}
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8 justify-center">
        {yachts.slice(0, visibleCount).map((yacht:any, index:any) => (
          <div
            key={index}
            className="border-[3px] border-[#BFA888] backdrop-blur-sm overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300"
          >
            {/* Image */}
            <img
              effect="blur"
              src={
                yacht.image_paths && yacht.image_paths.length > 0
                  ? yacht.image_paths[0]
                  : "/placeholder.jpg"
              }
              alt={yacht.name}
              className="w-full h-60 object-cover"
            />

            {/* Content */}
            <div className="p-6 text-center">
              <h2 className="text-2xl font-serif mb-2 text-[#BFA888] fonts-Inconsolata">
                {yacht.name}
              </h2>
              <p className="text-[#FFFFFF] text-[16px]  mb-3 ">
                {yacht.per_hour_rate
                  ? `$${yacht.per_hour_rate} ${yacht.currency}`
                  : "Contact for price"}
              </p>

              {/* Details */}
              <div className="grid grid-cols-3 text-center text-xs text-gray-300 border border-gray-700 rounded-lg overflow-hidden mb-5">
                {/* <div className="border-r border-gray-700 py-2">
                  <p className="text-[#BFA888]">LENGTH</p>
                  <p>{yacht.length || "-"}</p>
                </div> */}
                <div className="border-r border-gray-700 py-2">
                  <p className="text-[#BFA888] fonts-Roboto">CAPACITY</p>
                  <p className="fonts-Inconsolata text-[#FFFFFF]">
                    {yacht.capacity || "-"}
                  </p>
                </div>
                <div className="border-r border-gray-700 py-2">
                  <p className="text-[#BFA888] fonts-Roboto">ROOMS</p>
                  <p className="fonts-Inconsolata text-[#FFFFFF]">
                    {yacht.rooms || "-"}
                  </p>
                </div>
                <div className="py-2">
                  <p className="text-[#BFA888] fonts-Roboto">Washrooms</p>
                  <p className="fonts-Inconsolata text-[#FFFFFF]">
                    {yacht.washrooms || "-"}
                  </p>
                </div>
              </div>

              {/* Facilities (small tags) */}
              <div className="flex flex-wrap justify-center gap-2 mb-5">
                {yacht.facilities?.slice(0, 4)?.map((f:any, i:any) => (
                  <span
                    key={i}
                    className="bg-[#BFA888]/20 text-[#BFA888] text-[10px] px-2 py-[2px] rounded-md"
                  >
                    {f}
                  </span>
                ))}
                {yacht.facilities?.length > 4 && (
                  <span className="text-[10px] text-gray-400">
                    +{yacht.facilities.length - 4} more
                  </span>
                )}
              </div>

              {/* Book Now Button */}

              <button 
              onClick={handleBookNow}
              className="bg-[#BFA888] text-white tracking-widest font-medium px-6 py-2 hover:bg-[#c3a36f] transition fonts-Inconsolata">

                BOOK NOW
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      {visibleCount < yachts.length && (
        <div className="text-center mt-12">
          <button
            onClick={handleLoadMore}
            className="bg-transparent border border-[#BFA888] text-[#BFA888] tracking-widest font-medium px-8 py-3 rounded-md hover:bg-[#BFA888] hover:text-white transition"
          >
            LOAD MORE
          </button>
        </div>
      )}

      <BookingModal openModal={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}

export default CardSection;

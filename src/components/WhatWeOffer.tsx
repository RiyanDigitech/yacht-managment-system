import React from "react";
import offerImage from '../../public/offer-img.png'

const WhatWeOffer: React.FC = () => {
  return (
    <section className="relative bg-white py-16 overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-12">
        <div className="relative px-6 md:px-14 lg:px-24">
          <h1 className="absolute text-[70px] md:text-[80px] lg:text-[105px] font-semibold text-[#ECE8DF] opacity-70 top-[-11%] left-[7%] tracking-widest select-none pointer-events-none fonts-Cormorant">
            CRUISES
          </h1>

          <p className="text-[#BFA888] tracking-[0.3em] uppercase  font-medium text-[16px] fonts-Inconsolata relative z-10 text-center md:text-left mt-1">
            NAUTICAL COMPANY
          </p>

          <h2 className="text-[42px] md:text-[48px] lg:text-[60px] font-semibold fonts-Cormorant text-gray-900 mb-8 relative z-10 whitespace-nowrap text-center md:text-left">
            WHAT WE OFFER
          </h2>

          <ul className="space-y-5 list-disc text-![#000000] fonts-Roboto font-light sm:text-[12px] !text-[13px] leading-relaxed relative z-10">
            <li>
              Smart Choice is your premier destination for luxury yacht bookings
              in Dubai. We are committed to providing an unforgettable
              experience on the water, combining the highest standards of
              comfort, safety, and customer satisfaction.
            </li>
            <li>
              Our mission is to offer our clients a seamless booking experience,
              ensuring they have access to the most exclusive yachts and
              services available in Dubai. Whether it’s a day of leisure, a
              corporate event, or a special celebration, Smart Choice provides
              the perfect yacht for every occasion.
            </li>
            <li>
              Through innovation and a deep understanding of our clients’
              desires, we strive to deliver a personalized and exceptional yacht
              experience, allowing our guests to explore the waters of Dubai in
              ultimate luxury and comfort.
            </li>
          </ul>
        </div>

        <div className="flex justify-center md:justify-end">
          <img
            src={offerImage}
            alt="Luxury Yacht"
            className="w-full md:w-[500px] lg:w-[700px] object-contain drop-shadow-xl"
          />
        </div>
      </div>
    </section>
  );
};

export default WhatWeOffer;
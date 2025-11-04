import '../pages/About/AboutPage';
import Group1 from '../../public/Group 1 (1).png';
import YatchImage from '../../public/Yacht.png';


const AboutTop = () => {
  return (
    <section className="bg-[#F3F2ED] text-center ">
      {/* Anchor Icon */}
      <div className="flex justify-center items-center">
        <img
          src={Group1}
          alt="Luxury Yacht"
          className="w-100 h-100 object-contain group1-img"
        />
      </div>

      {/* Main Heading */}
      <div className="margin">
        <h2 className="text-3xl md:text-6xl tracking-wide mb-4 text-gray-900 fonts-Cormorant font-semibold">
          SUPERYACHT SINCE 1971
        </h2>

        {/* Paragraph */}
        <p className="fonts-Roboto font-light text-[12px] md:text-[15px] leading-[33px] text-center tracking-[0%] max-w-2xl mx-auto">
          At Smart Choice, our vision is to redefine luxury yacht experiences in
          Dubai by offering unparalleled service, luxury, and style. We aim to
          become the leading yacht rental service in Dubai, trusted by both
          locals and international visitors.
        </p>
      </div>

      {/* Yacht Image */}
      <div className="flex justify-center">
        <img
          src={YatchImage}
          alt="Luxury Yacht"
          className=" object-contain img-width"
        
        />
      </div>
    </section>
  );
};

export default AboutTop;

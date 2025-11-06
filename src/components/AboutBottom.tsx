import handle1 from '../../public/handle-1.png';
import steering1 from '../../public/steering1.png';
import fan1 from '../../public/fan1.png';
import boat1 from '../../public/boat1.png';


const AboutBottom = () => {
  return (
    <>
       <section className="max-w-[1200px] mx-auto px-10 md:px-16 lg:px-24  grid grid-cols-1 md:grid-cols-2 gap-12 text-center md:text-left my-20">
        <div className="flex flex-col sm:flex-row items-center">
          <img
            src={handle1}
            alt="Yacht"
            className="w-[120px] sm:w-[145px] h-[120px] sm:h-[145px] object-cover mb-4 sm:mb-0"
          />
          <div className="flex flex-col sm:ml-6 mt-2 sm:mt-0">
            <h2 className="fonts-Cormorant font-normal text-[20px] sm:text-[24px] leading-[100%] tracking-[0.06em] uppercase mb-4 sm:mb-6">
              100s Of Yachts
            </h2>
            <p className="text-black w-full sm:max-w-[360px] md:max-w-[380px] font-roboto font-light text-[12px] md:text-[15px] leading-[26px] sm:leading-[33px] tracking-[0%] fonts-Roboto">
              Lorem ipsum proin gravida velit auctor alueut aenean sollicitu
              din, lorem auci elit consequat ipsutissem niuis sed odio sit amet
              a sit amet.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center ">
          <img
            src={steering1}
            alt="Yacht"
            className="w-[120px] sm:w-[145px] h-[120px] sm:h-[145px] object-cover  mb-4 sm:mb-0"
          />
          <div className="flex flex-col sm:ml-6 mt-2 sm:mt-0">
            <h2 className="fonts-Cormorant font-normal text-[20px] sm:text-[24px] leading-[100%] tracking-[0.06em] uppercase mb-4 sm:mb-6">
              PROFESSIONAL CREW
            </h2>
            <p className="text-black w-full sm:max-w-[360px] md:max-w-[380px] font-roboto font-light text-[12px] md:text-[15px] leading-[26px] sm:leading-[33px] tracking-[0%] fonts-Roboto">
              Lorem ipsum proin gravida velit auctor alueut aenean sollicitu
              din, lorem auci elit consequat ipsutissem niuis sed odio sit amet
              a sit amet.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center ">
          <img
            src={fan1}
            alt="Yacht"
            className="w-[120px] sm:w-[145px] h-[120px] sm:h-[145px] object-cover  mb-4 sm:mb-0"
          />
          <div className="flex flex-col sm:ml-6 mt-2 sm:mt-0">
            <h2 className="fonts-Cormorant font-normal text-[20px] sm:text-[24px] leading-[100%] tracking-[0.06em] uppercase mb-4 sm:mb-6">
              AMAZING PORTS
            </h2>
            <p className="text-black w-full sm:max-w-[360px] md:max-w-[380px] font-roboto font-light text-[12px] md:text-[15px] leading-[26px] sm:leading-[33px] tracking-[0%] fonts-Roboto">
              Lorem ipsum proin gravida velit auctor alueut aenean sollicitu
              din, lorem auci elit consequat ipsutissem niuis sed odio sit amet
              a sit amet.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center ">
          <img
            src={boat1}
            alt="Yacht"
            className="w-[120px] sm:w-[145px] h-[120px] sm:h-[145px] object-cover  mb-4 sm:mb-0"
          />
          <div className="flex flex-col sm:ml-6 mt-2 sm:mt-0">
            <h2 className="fonts-Cormorant font-normal text-[20px] sm:text-[24px] leading-[100%] tracking-[0.06em] uppercase mb-4 sm:mb-6">
              DISCOVER NEW PLACES
            </h2>
            <p className="text-black w-full sm:max-w-[360px] md:max-w-[380px] font-roboto font-light text-[12px] md:text-[15px] leading-[26px] sm:leading-[33px] tracking-[0%] fonts-Roboto">
              Lorem ipsum proin gravida velit auctor alueut aenean sollicitu
              din, lorem auci elit consequat ipsutissem niuis sed odio sit amet
              a sit amet.
            </p>
          </div>
        </div>
      </section> 
    </>
  );
};

export default AboutBottom;

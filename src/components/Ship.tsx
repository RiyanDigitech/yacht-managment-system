import ship from '../../public/ship-img.png'
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const Ship = () => {
  return (
    <section className="relative w-full bg-white overflow-hidden">
      <div className="flex justify-center items-center">
        <LazyLoadImage
          src={ship}
          effect="blur"
          alt="Luxury Yacht"
          className="w-screen  object-cover md:object-fill h-screen"
        />
      </div>

    </section>
  );
};

export default Ship;

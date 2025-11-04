import ship from '../../public/ship-img.png'

const Ship = () => {
  return (
    <section className="relative w-full bg-white overflow-hidden">
      <div className="flex justify-center items-center">
        <img
          src={ship}
          alt="Luxury Yacht"
          className="w-screen  object-cover md:object-fill h-screen"
        />
      </div>

    </section>
  );
};

export default Ship;

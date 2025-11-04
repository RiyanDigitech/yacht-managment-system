//import discoverImage from '/public/discover-img.png';

const Discover = () => {
  const sectionStyle = {
    backgroundImage: `url('/discover-img.png')`, // ✅ public folder se direct URL
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <section
      className="relative w-full h-[300px] sm:h-[400px] md:h-[450px] lg:h-[500px] bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center text-center px-6"
      style={sectionStyle}
    >
      <div className="relative z-10 max-w-4xl mx-auto">
        <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-semibold text-white uppercase tracking-wider mb-4 sm:mb-6 animate-fadeIn fonts-Cormorant items-center">
          Discover New Yachts
        </h1>
      </div>
    </section>
  );
};

export default Discover;

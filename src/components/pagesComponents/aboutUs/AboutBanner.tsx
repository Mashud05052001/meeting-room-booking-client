const AboutBanner = () => {
  return (
    <section className="sm:text-center min-h-80 flex flex-col justify-center ">
      <h1 className=" text-3xl sm:text-[2.5rem] font-bold sm:mb-2">
        <p>Elevate Your Meetings with Our</p>
        <p className="text-[1.75rem] sm:text-4xl sm:mt-1 md:mt-1.5">
          Advanced Booking Solutions
        </p>
        <p className="text-[1.75rem] sm:text-4xl text-common-600 sm:mt-1 md:mt-1.5">
          QMeet
        </p>
      </h1>
      <p className="text-lg mt-4 text-gray-600 leading-7 font-medium  max-w-3xl mx-auto">
        Revolutionizing the way you manage meeting spaces with an easy-to-use
        and efficient platform for booking meeting rooms, events, and more.
      </p>
    </section>
  );
};

export default AboutBanner;

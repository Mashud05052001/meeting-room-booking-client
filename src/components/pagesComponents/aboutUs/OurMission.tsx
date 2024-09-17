import banner from "@/assets/about-company-mission.jpg";

const OurMission = () => {
  return (
    <section>
      <div className="flex flex-col md:flex-row lg:items-center">
        <div className="mt-8 px-1 lg:mt-0 md:mr-6 xl:mr-14 mb-8 md:mb-0">
          <h3 className="text-4xl font-bold text-common-600">Our Mission</h3>
          <p className="mt-4 text-gray-600 tracking-wide leading-7 font-medium">
            At <span className="text-common-600 font-bold text-xl">QMeet</span>,
            our purpose is to transform the meeting experience by providing
            exceptional spaces and seamless booking. We aim to support diverse
            needs, from small brainstorming sessions to large conferences, and
            empower our users to achieve their goals with ease.
          </p>
        </div>
        <img
          src={banner}
          alt="Mission Banner"
          className="w-full md:h-96 lg:h-auto md:w-1/2 rounded-lg"
        />
      </div>
    </section>
  );
};

export default OurMission;

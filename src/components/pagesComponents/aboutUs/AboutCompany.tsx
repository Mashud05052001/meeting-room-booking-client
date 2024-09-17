import banner from "@/assets/about-banner.jpg";

const AboutCompany = () => {
  return (
    <section>
      <div className="flex flex-col md:flex-row lg:items-center">
        <img
          src={banner}
          alt="Profile"
          className="w-full md:h-96 lg:h-auto md:w-1/2 rounded-lg"
        />
        <div className="mt-8 px-1 lg:mt-0 md:ml-6 xl:ml-14">
          <h3 className="text-4xl font-bold text-common-600">About Us</h3>
          <p className="mt-4 text-gray-600 tracking-wide leading-7 font-medium">
            At <span className="text-common-600 font-bold text-xl">QMeet</span>,
            we're committed to transforming meeting spaces. Our platform makes
            booking easy and efficient, offering a variety of customizable rooms
            for all types of events. With our tools, you can quickly find and
            reserve the perfect space, so you can focus on what matters most.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutCompany;

import ScrollToTopContainer from "@/components/container/ScrollToTopContainer";
import OpacityMotion from "@/components/motionDiv/OpacityMotion";
import AboutBanner from "@/components/pagesComponents/aboutUs/AboutBanner";
import AboutCompany from "@/components/pagesComponents/aboutUs/AboutCompany";
import OurJourney from "@/components/pagesComponents/aboutUs/OurJourney";
import OurMission from "@/components/pagesComponents/aboutUs/OurMission";
import OurResult from "@/components/pagesComponents/aboutUs/OurResult";
import OurTeam from "@/components/pagesComponents/aboutUs/OurTeam";

const About = () => {
  return (
    <ScrollToTopContainer>
      <OpacityMotion className="px-4 xl:px-0 ">
        {/* About Banner */}
        <AboutBanner />
        {/* About Us */}
        <div className="my-12">
          <AboutCompany />
        </div>
        {/* Our Outcode */}
        <div className="my-12 md:my-24">
          <OurResult />
        </div>
        <div>
          <OurMission />
        </div>
        <div className="my-12 md:my-24">
          <OurTeam />
        </div>
        <div className="mb-12 md:mb-24">
          <OurJourney />
        </div>
      </OpacityMotion>
    </ScrollToTopContainer>
  );
};

export default About;

import CommonMarginTopContainer from "@/components/container/CommonMarginTopContainer";
import ScrollToTopContainer from "@/components/container/ScrollToTopContainer";
import OpacityMotion from "@/components/motionDiv/OpacityMotion";
import CustomerTestimonial from "../../components/pagesComponents/home/CustomerTestimonial";
import HomeBanner from "@/components/pagesComponents/home/HomeBanner";
import HomeFeaturedRoom from "@/components/pagesComponents/home/HomeFeaturedRoom";
import HomeServices from "@/components/pagesComponents/home/HomeServices";
import WhyChooseUs from "@/components/pagesComponents/home/WhyChooseUs";
import HowItWorks from "@/components/pagesComponents/home/HowItWorks";

const Home = () => {
  return (
    <ScrollToTopContainer>
      <OpacityMotion>
        <HomeBanner />
        <div className="mx-4 lg:mx-0">
          <CommonMarginTopContainer>
            <HomeServices />
          </CommonMarginTopContainer>
          <CommonMarginTopContainer>
            <HomeFeaturedRoom />
          </CommonMarginTopContainer>
          <CommonMarginTopContainer>
            <WhyChooseUs />
          </CommonMarginTopContainer>
          <CommonMarginTopContainer>
            <HowItWorks />
          </CommonMarginTopContainer>
          <CommonMarginTopContainer>
            <CustomerTestimonial />
          </CommonMarginTopContainer>
        </div>
      </OpacityMotion>
    </ScrollToTopContainer>
  );
};

export default Home;

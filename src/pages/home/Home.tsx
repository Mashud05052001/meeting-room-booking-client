import CommonMarginTopContainer from "@/components/container/CommonMarginTopContainer";
import ScrollToTopContainer from "@/components/container/ScrollToTopContainer";
import OpacityMotion from "@/components/motionDiv/OpacityMotion";
import HomeBanner from "@/components/pagesComponents/home/HomeBanner";
import HomeFeaturedRoom from "@/components/pagesComponents/home/HomeFeaturedRoom";
import HomeServices from "@/components/pagesComponents/home/HomeServices";

const Home = () => {
  return (
    <ScrollToTopContainer>
      <OpacityMotion>
        <HomeBanner />
        <CommonMarginTopContainer>
          <HomeServices />
        </CommonMarginTopContainer>
        <CommonMarginTopContainer>
          <HomeFeaturedRoom />
        </CommonMarginTopContainer>
      </OpacityMotion>
    </ScrollToTopContainer>
  );
};

export default Home;

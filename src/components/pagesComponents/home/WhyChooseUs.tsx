import { Collapse } from "antd";
import HomeTitle from "./HomeTitle";
import { whyChoosedUsItems } from "@/constant/fixedData.constant";
import "@/styles/antDesign.style.css";

const WhyChooseUs = () => {
  return (
    <section className="py-10">
      <HomeTitle title="Why Choose Us?" />
      <div className="max-w-[50rem] mx-auto">
        <Collapse
          items={whyChoosedUsItems}
          bordered={false}
          defaultActiveKey={["1"]}
        />
      </div>
    </section>
  );
};

export default WhyChooseUs;

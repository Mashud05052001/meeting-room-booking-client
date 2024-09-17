import { Timeline } from "antd";
import "@/styles/antDesign.style.css";

const OurJourney = () => {
  return (
    <div>
      <section className=" px-4">
        <h2 className="text-4xl font-bold text-center text-common-600 mb-14">
          Our Evolution
        </h2>
        <Timeline
          className="text-lg font-semibold "
          items={[
            {
              children: "Journey started during COVID-19 pandemic (2020)",
            },
            {
              children:
                "Overcame financial struggles and pivoted business model (2020)",
            },
            {
              children: "Launched first version of QMeet platform (2021)",
            },
            {
              children:
                "Grew user base significantly through word of mouth and marketing (2021)",
            },
            {
              children: "Faced and resolved platform scalability issues (2022)",
            },
            {
              children:
                "Achieved market recognition and expanded services globally (2023)",
            },
          ]}
        />
      </section>
    </div>
  );
};

export default OurJourney;

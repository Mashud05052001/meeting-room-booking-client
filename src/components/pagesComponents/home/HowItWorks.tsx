import { Button, Steps, theme } from "antd";
import React, { useState } from "react";
import { BiSolidSelectMultiple } from "react-icons/bi";
import { BsFillCalendarDateFill } from "react-icons/bs";
import { FaCheck } from "react-icons/fa";
import { toast } from "sonner";
import HomeTitle from "./HomeTitle";

const steps = [
  {
    title: <p className="font-medium mt-0.5">Select a room</p>,
    content: (
      <div className="flex items-center justify-center h-32 text-lg md:text-xl text-black  space-x-3">
        <BiSolidSelectMultiple className="size-8 md:size-10 text-common-200 " />
        <p className="font-medium ">
          Choose preferred room from our available options.
        </p>
      </div>
    ),
  },
  {
    title: <p className="font-medium mt-0.5">Choose Date & Time</p>,
    content: (
      <div className="flex items-center h-32 text-lg md:text-xl text-black justify-center space-x-3">
        <BsFillCalendarDateFill className="size-8 md:size-10 text-common-200" />
        <p className="font-medium">
          Pick the date and time that suits you best.
        </p>
      </div>
    ),
  },
  {
    title: <p className="font-medium mt-0.5">Confirm Booking</p>,
    content: (
      <div className="flex items-center h-32 text-lg md:text-xl text-black justify-center space-x-3">
        <FaCheck className="size-8 md:size-10 text-common-200" />
        <p className="font-medium">
          Review your choices and confirm your booking.
        </p>
      </div>
    ),
  },
];

const HowItWorks = () => {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const items = steps.map((item) => ({ key: item.title, title: item.title }));
  const contentStyle: React.CSSProperties = {
    lineHeight: "260px",
    textAlign: "center",
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
  };
  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };
  return (
    <div>
      <HomeTitle title="How It Works?" />
      <div className="pt-5">
        <>
          <Steps current={current} items={items} />
          <div style={contentStyle}>{steps[current].content}</div>
          <div style={{ marginTop: 24 }} className="flex">
            {current < steps.length - 1 && (
              <Button type="primary" onClick={() => next()}>
                Next
              </Button>
            )}
            {current === steps.length - 1 && (
              <Button
                type="primary"
                onClick={() =>
                  toast.success("Working process complete", {
                    position: "top-right",
                  })
                }
              >
                Done
              </Button>
            )}
            {current > 0 && (
              <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
                Previous
              </Button>
            )}
          </div>
        </>
      </div>
    </div>
  );
};

export default HowItWorks;

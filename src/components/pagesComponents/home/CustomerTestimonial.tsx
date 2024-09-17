import HomeTitle from "./HomeTitle";
import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { customerTestimonials } from "@/constant/fixedData.constant";
import { FaStar } from "react-icons/fa6";

const CustometTestimonial = () => {
  const totalReviews = customerTestimonials?.length;
  const [activeReview, setActiveReview] = useState(customerTestimonials[0].id);
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    const interval = setInterval(() => {
      const upComingIndex =
        activeReview === totalReviews ? 0 : activeReview + 1;
      setActiveReview(upComingIndex);
      api?.scrollTo(upComingIndex);
    }, 3000);

    return () => clearInterval(interval);
  }, [activeReview, totalReviews, api]);

  const handleNext = () => {
    const upComingIndex = activeReview === totalReviews ? 0 : activeReview + 1;
    setActiveReview(upComingIndex);
    api?.scrollTo(upComingIndex);
  };
  const handlePrev = () => {
    const upComingIndex =
      activeReview === 0 ? totalReviews - 1 : activeReview - 1;
    setActiveReview(upComingIndex);
    api?.scrollTo(upComingIndex);
  };

  return (
    <div className="mb-20 relative  select-none">
      <HomeTitle title="Customers Review" />
      <div className="">
        <Carousel
          opts={{ loop: true, align: "start", duration: 20 }}
          setApi={setApi}
        >
          <CarouselContent>
            {customerTestimonials &&
              customerTestimonials?.map((testimonial) => (
                <CarouselItem
                  className="sm:basis-1/2 lg:basis-1/3"
                  key={testimonial.id}
                >
                  <div className="max-w-sm mx-auto rounded-lg overflow-hidden  p-6 space-y-3 h-full   border-[0.1px] border-b-2 border-r-2   border-gray-200 shadow relative">
                    <div className="flex items-center">
                      <img
                        className="w-16 h-16 rounded-full mr-4"
                        src={testimonial?.img}
                        alt="Avatar"
                      />
                      <div className="text-left">
                        <div className="font-bold text-xl">
                          {testimonial?.name}
                        </div>
                        <div className="text-gray-600">
                          {testimonial?.profession}
                        </div>
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-700 text-base">
                        {testimonial?.review}
                      </p>
                    </div>
                    <div className="absolute flex space-x-1 justify-center items-center top-0 right-3 text-yellow-600">
                      <p>{testimonial?.rating}</p>
                      <div>
                        <FaStar size={14} />
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
          </CarouselContent>
          <div className="bg-red-200 absolute  sm:-top-8 sm:right-14 sm:right-18 right-24 -top-5">
            <CarouselPrevious
              className=" absolute -left-6 border-2"
              onClick={handlePrev}
            />
            <CarouselNext onClick={handleNext} />
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default CustometTestimonial;

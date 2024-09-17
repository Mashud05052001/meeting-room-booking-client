import { customerTestimonials } from "@/constant/fixedData.constant";

const CustomerTestimonial = () => {
  return (
    <section className="py-16 ">
      <h2 className="text-3xl font-bold text-center">
        What our customers say about{" "}
        <span className="text-common-600">QMeet</span>
      </h2>
      <div className="flex flex-wrap justify-center sm:justify-self-auto  gap-8 mt-8">
        {customerTestimonials.map((testimonial, index) => (
          <div
            key={index}
            className="bg-white shadow-lg p-6 max-w-sm rounded-lg relative"
          >
            <div className="flex space-x-3 mb-3">
              <img
                src={testimonial?.img}
                className="w-20 rounded-full"
                alt=""
              />
              <div className="mt-4  text-gray-800">
                <p className="text-lg font-semibold">{testimonial.name}</p>
                <p className="text-sm font-medium">-{testimonial.profession}</p>
              </div>
            </div>
            <p className="text-gray-600 line-clamp-3">{testimonial.review}</p>

            <p className="mt-2 font-semibold text-yellow-600 absolute top-0 right-3">
              {testimonial.rating} ★
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CustomerTestimonial;

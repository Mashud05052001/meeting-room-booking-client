import { allHomeServices } from "@/constant/fixedData.constant";
import HomeTitle from "./HomeTitle";

const HomeServices = () => {
  return (
    <div>
      <HomeTitle title="Our Solutions" />
      {/* Services */}
      <div>
        <div className="h-full w-full  mx-auto">
          <div className="mx-auto relative mb-3 lg:mb-0">
            <div className="lg:space-x-2 grid gap-3 sm:gap-5 grid-cols-2 md:grid-cols-4 ">
              {allHomeServices &&
                allHomeServices?.map((item) => (
                  <div
                    key={item.id}
                    className="space-y-2 hover:scale-105 duration-150 border-[0.1px] border-b-2 border-r-2  p-5 rounded-lg border-gray-200 shadow"
                  >
                    {/* logo */}
                    <div className="flex justify-center text-common-600">
                      <item.icon />
                    </div>
                    <div>
                      <h2 className="text-center sm:text-xl md:text-base lg:text-xl font-semibold">
                        {item.title}
                      </h2>
                      <p className="text-sm text-center">{item.subTitle}</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeServices;

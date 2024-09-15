import MainLoading from "@/components/loading/MainLoading";
import CartSkeleton from "@/components/skeleton/CartSkeleton";
import { TRoom } from "@/types";
import SingleCart from "./SingleCart";

type TMeetingRoomAllCartsProps = {
  allRooms: TRoom[] | undefined;
  roomsDataLoading: boolean;
  roomsDataFetching: boolean;
};

const MeetingRoomAllCarts = ({
  allRooms,
  roomsDataFetching,
  roomsDataLoading,
}: TMeetingRoomAllCartsProps) => {
  if (roomsDataLoading) {
    return (
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-6">
        {Array(12)
          .fill(0)
          .map((_, index) => (
            <CartSkeleton key={index} />
          ))}
      </div>
    );
  }
  if (allRooms?.length === 0)
    return (
      <div className="text-3xl text-red-600 font-semibold flex justify-center mt-10">
        There are no room exist
      </div>
    );

  return (
    <div className="relative">
      {roomsDataFetching && (
        <div className="absolute left-1/2 -translate-x-1/2 bg-opacity-50 bg-gray-100 w-full min-h-[calc(100vh-100px)] h-full z-20">
          <MainLoading />
        </div>
      )}
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-2 gap-5">
        {allRooms &&
          allRooms?.map((room) => (
            <div key={room._id}>
              <SingleCart room={room} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default MeetingRoomAllCarts;

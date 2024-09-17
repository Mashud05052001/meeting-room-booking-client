import { useGetAllRoomsQuery } from "@/redux/features/roomSlotManagement/roomSlotManagement.api";
import HomeTitle from "./HomeTitle";
import MeetingRoomAllCarts from "../meetingRoom/MeetingRoomAllCarts";
import FilledButton from "@/components/button/FilledButton";
import { Link } from "react-router-dom";

const HomeFeaturedRoom = () => {
  const {
    data: allRooms,
    isLoading: roomsDataLoading,
    isFetching: roomsDataFetching,
  } = useGetAllRoomsQuery([{ limit: 4 }]);
  console.log(allRooms);
  return (
    <div>
      <HomeTitle title="Featured Rooms" />
      <div>
        <MeetingRoomAllCarts
          allRooms={allRooms?.data}
          roomsDataLoading={roomsDataLoading}
          roomsDataFetching={roomsDataFetching}
          loadingSkeletonNumber={4}
        />
      </div>
      <div className="flex justify-center mt-6 ">
        <Link to={"/meeting-room"}>
          <FilledButton
            buttonText="Show All Bookings"
            type="button"
            className=""
          />
        </Link>
      </div>
    </div>
  );
};

export default HomeFeaturedRoom;

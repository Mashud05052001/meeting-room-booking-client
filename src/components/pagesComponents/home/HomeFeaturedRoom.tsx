import { useGetAllRoomsQuery } from "@/redux/features/roomSlotManagement/roomSlotManagement.api";
import HomeTitle from "./HomeTitle";
import MeetingRoomAllCarts from "../meetingRoom/MeetingRoomAllCarts";

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
    </div>
  );
};

export default HomeFeaturedRoom;

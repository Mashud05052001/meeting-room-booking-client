import FilterRooms from "@/components/pagesComponents/meetingRoom/FilterRooms";
import MeetingRoomAllCarts from "@/components/pagesComponents/meetingRoom/MeetingRoomAllCarts";
import { useGetAllRoomsQuery } from "@/redux/features/roomSlotManagement/roomSlotManagement.api";
import Hamburger from "hamburger-react";
import { useEffect, useRef, useState } from "react";

const AllMeetingRooms = () => {
  const [openFilterModal, setOpenFilterModal] = useState(false);
  const openFilterModalRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState<Record<string, unknown>[]>([]);
  const {
    data: allRooms,
    isLoading: roomsDataLoading,
    isFetching: roomsDataFetching,
  } = useGetAllRoomsQuery(searchQuery);

  useEffect(() => {
    const closeDropDown = (e: MouseEvent) => {
      if (
        openFilterModalRef.current &&
        !openFilterModalRef?.current?.contains(e?.target as Node)
      ) {
        setOpenFilterModal(false);
      }
    };
    document.addEventListener("mousedown", closeDropDown);
    return () => {
      document.removeEventListener("mousedown", closeDropDown);
    };
  }, []);
  return (
    <div className="mb-20 relative">
      <div className="flex flex-col md:flex-row gap-0 md:gap-6 px-6 xl:px-0">
        {/* below md screen */}
        <div className="md:hidden">
          <div
            ref={openFilterModalRef}
            className="h-10 md:ml-4 mr-3 2xl:mr-0 w-fit"
          >
            <Hamburger
              size={18}
              toggled={openFilterModal}
              toggle={setOpenFilterModal}
            />
            <div
              className={`${
                openFilterModal
                  ? "opacity-100 duration-300 z-10"
                  : "opacity-0 -z-10"
              } absolute left-8 top-16 z-50 p-6 rounded-sm bg-slate-200 `}
            >
              <FilterRooms
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
            </div>
          </div>
        </div>
        <div className="hidden md:block">
          <FilterRooms
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </div>
        <div className="mt-6 flex-grow">
          <MeetingRoomAllCarts
            allRooms={allRooms?.data}
            roomsDataLoading={roomsDataLoading}
            roomsDataFetching={roomsDataFetching}
          />
        </div>
      </div>
    </div>
  );
};

export default AllMeetingRooms;

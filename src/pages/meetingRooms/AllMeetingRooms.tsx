import ScrollToTopContainer from "@/components/container/ScrollToTopContainer";
import FilterRooms from "@/components/pagesComponents/meetingRoom/FilterRooms";
import MeetingRoomAllCarts from "@/components/pagesComponents/meetingRoom/MeetingRoomAllCarts";
import MeetingRoomPagination from "@/components/pagesComponents/meetingRoom/MeetingRoomPagination";
import { useGetAllRoomsQuery } from "@/redux/features/roomSlotManagement/roomSlotManagement.api";
import { TMeta } from "@/types";
import Hamburger from "hamburger-react";
import { useEffect, useRef, useState } from "react";

const AllMeetingRooms = () => {
  const [openFilterModal, setOpenFilterModal] = useState(false);
  const openFilterModalRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState<Record<string, unknown>[]>([
    { page: 1 },
    { limit: 10 },
  ]);
  const {
    data: allRooms,
    isLoading: roomsDataLoading,
    isFetching: roomsDataFetching,
  } = useGetAllRoomsQuery(searchQuery);
  console.log(searchQuery);
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
    <ScrollToTopContainer>
      <div className="mb-20 relative">
        <div className="flex flex-col md:flex-row gap-0 md:gap-6 px-6 xl:px-0">
          {/* Show Hamburger icon with Filter Portion below of medium screen */}
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
                    : "opacity-0 -z-50"
                } absolute left-8 top-16 z-50 p-6 rounded-sm bg-slate-200 `}
              >
                <FilterRooms setSearchQuery={setSearchQuery} />
              </div>
            </div>
          </div>
          {/* Show Filter portion */}
          <div className="hidden md:block">
            <FilterRooms setSearchQuery={setSearchQuery} />
          </div>
          {/* Meeting room section */}
          <div className="mt-6 flex-grow">
            <MeetingRoomAllCarts
              allRooms={allRooms?.data}
              roomsDataLoading={roomsDataLoading}
              roomsDataFetching={roomsDataFetching}
            />
          </div>
        </div>
        {allRooms?.data.length ? (
          <div className="flex justify-end mt-12">
            <MeetingRoomPagination
              setSearchQuery={setSearchQuery}
              metaData={allRooms?.meta as TMeta}
            />
          </div>
        ) : (
          ""
        )}
      </div>
    </ScrollToTopContainer>
  );
};

export default AllMeetingRooms;

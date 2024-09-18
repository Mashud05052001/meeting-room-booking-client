import {
  useGetAllRoomsQuery,
  useGetAllSlotsDateOfARoomQuery,
} from "@/redux/features/roomSlotManagement/roomSlotManagement.api";
import { TSelectOptions } from "@/types";
import { Select } from "antd";
import { useState } from "react";

type TSlotsFilterProps = {
  setSearchQuery: React.Dispatch<React.SetStateAction<Record<string, string>>>;
};

const SlotsFilter = ({ setSearchQuery }: TSlotsFilterProps) => {
  const [roomId, setRoomId] = useState<string>("");

  const { data: allRooms, isLoading: roomDataLoading } = useGetAllRoomsQuery(
    []
  );
  const { data: allDates = [], isLoading: allDatesLoading } =
    useGetAllSlotsDateOfARoomQuery(roomId!, { skip: !roomId });

  const roomOptions: TSelectOptions[] =
    allRooms?.data?.map((room) => {
      return {
        value: room?._id,
        label: `${room?.name}, Capacity:${room.capacity}, PPS:${room.pricePerSlot}`,
      };
    }) || [];
  const dateOptions: TSelectOptions[] =
    allDates?.map((date) => ({ label: date, value: date })) || [];
  const statusOptions: TSelectOptions[] = [
    { label: "Booked", value: "true" },
    { label: "Not Booked", value: "false" },
  ];
  const handleSlotsFilter = (data: Record<string, string>) => {
    setSearchQuery((prevQuery) => {
      const copyQuery = { ...prevQuery };
      const roomId = data?.roomId,
        date = data?.date,
        isBooked = data?.isBooked;
      if (roomId) {
        if (copyQuery?.roomId) copyQuery.roomId = roomId;
        else copyQuery["roomId"] = roomId;
      } else if (date) {
        copyQuery["date"] = date;
      } else if (isBooked) {
        copyQuery["isBooked"] = isBooked;
      }
      return copyQuery;
    });
  };
  return (
    <div className="flex flex-wrap items-center ">
      <div className="flex items-center  mr-4 mb-3">
        <p className="mr-2 font-medium">Room: </p>
        <Select
          allowClear
          options={roomOptions}
          disabled={roomDataLoading}
          value={roomId}
          onChange={(data) => {
            if (data) {
              setRoomId(data);
              handleSlotsFilter({ roomId: data });
            } else {
              setRoomId("");
              setSearchQuery((prevQuery) => {
                const copyObject = { ...prevQuery };
                if (copyObject?.roomId) delete copyObject.roomId;
                return copyObject;
              });
            }
          }}
          style={{ width: "18rem" }}
        />
      </div>
      <div className="flex items-center  mr-4 mb-3">
        <p className="mr-4 md:mr-2 font-medium">Date: </p>
        <Select
          allowClear
          options={dateOptions}
          disabled={!roomId || allDatesLoading}
          onChange={(data) => {
            if (data) {
              handleSlotsFilter({ date: data });
            } else {
              setSearchQuery((prevQuery) => {
                const copyObject = { ...prevQuery };
                if (copyObject?.date) delete copyObject.date;
                return copyObject;
              });
            }
          }}
          style={{ width: "10rem" }}
        />
      </div>
      <div className="flex items-center mr-4 mb-3">
        <p className="mr-2 font-medium">Status: </p>
        <Select
          allowClear
          options={statusOptions}
          onChange={(data) => {
            if (data) {
              handleSlotsFilter({ isBooked: data });
            } else {
              setSearchQuery((prevQuery) => {
                const copyObject = { ...prevQuery };
                if (copyObject?.isBooked) delete copyObject.isBooked;
                return copyObject;
              });
            }
          }}
          style={{ width: "10rem" }}
        />
      </div>
    </div>
  );
};

export default SlotsFilter;

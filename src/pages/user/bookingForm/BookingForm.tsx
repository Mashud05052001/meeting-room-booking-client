import useUserInfoFromToken from "@/hook/useUserInfoFromToken";
import { useGetUserQuery } from "@/redux/features/auth/auth.api";
import {
  useGetAllSlotsDateOfARoomQuery,
  useGetSlotsQuery,
} from "@/redux/features/roomSlotManagement/roomSlotManagement.api";
import "@/styles/form.style.css";
import { TSelectOptions } from "@/types";
import { DatePicker, Select } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

type TCurrentSlot = {
  value: string;
  data: string;
};

const BookingForm = () => {
  const { id: roomId } = useParams();
  const userTokenInfo = useUserInfoFromToken();
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [slotId, setSlotId] = useState<string>("");
  const [query, setQuery] = useState<Record<string, string | boolean>>({
    roomId: roomId!,
    isBooked: false,
  });
  const [slotsAccordingDate, setSlotsAccordingDate] = useState<TCurrentSlot[]>(
    []
  );

  const {
    data: allSlotsInfo,
    isLoading: slotsDataLoading,
    isFetching: slotsDataFetching,
  } = useGetSlotsQuery(query, { skip: !selectedDate });
  const { data: userData, isLoading: userDataLoading } = useGetUserQuery({
    email: userTokenInfo?.email || "",
  });
  const { data: allDates = [], isLoading: allDatesLoading } =
    useGetAllSlotsDateOfARoomQuery(roomId!);

  const userInfo = userData?.data;

  const slotsOptions: TSelectOptions[] =
    slotsAccordingDate?.map((slot) => ({
      label: slot.data,
      value: slot.value,
    })) || [];

  useEffect(() => {
    if (allSlotsInfo) {
      const newArr = allSlotsInfo[0]?.specificDateSlots[0]?.slots
        .filter((slot) => !slot.isBooked && !slot.isDeleted)
        .map((slot) => ({
          data: `${slot.startTime}-${slot.endTime}`,
          value: slot._id,
        }));
      setSlotsAccordingDate(newArr);
    }
  }, [allSlotsInfo]);
  return (
    <div className="mt-12 sm:w-8/12 xl:w-7/12 mx-auto p-8 border-2 rounded-md shadow-md space-y-6">
      <h1 className="mb-6 text-3xl font-semibold ">Bookings</h1>
      {/* User Information */}
      <div>
        <h1 className="mb-2 text-lg font-semibold">User Information</h1>
        <div className="ml-4 w-fit space-y-1">
          <p className="flex">
            <span className="w-[80px]">Name : </span>
            <span
              className={`${
                userDataLoading &&
                "bg-gray-300 w-52 animate-pulse text-gray-300 rounded-md"
              }`}
            >
              {userInfo?.name}
            </span>
          </p>
          <p className="flex">
            <span className="w-[80px]">Email : </span>
            <span
              className={`${
                userDataLoading &&
                "bg-gray-300 w-52 animate-pulse text-gray-300 rounded-md"
              }`}
            >
              {userInfo?.email}
            </span>
          </p>
          <p className="flex">
            <span className="w-[80px]">Phone : </span>
            <span
              className={`${
                userDataLoading &&
                "bg-gray-300 w-52 animate-pulse text-gray-300 rounded-md"
              }`}
            >
              {userInfo?.phone}
            </span>
          </p>
          <p className="flex">
            <span className="w-[80px]">Address : </span>
            <span
              className={`${
                userDataLoading &&
                "bg-gray-300 w-52 animate-pulse text-gray-300 rounded-md"
              }`}
            >
              {userInfo?.address}
            </span>
          </p>
        </div>
      </div>
      {/* Booking Information */}
      <div>
        <h1 className="mb-2 text-lg font-semibold">Booking Information</h1>
        <div className="ml-4 space-y-8 md:space-y-0 grid md:grid-cols-2 gap-x-8">
          <div>
            <label htmlFor="date">Select your booking date: </label>
            <DatePicker
              id="date"
              placeholder={"Select booking date"}
              style={{
                width: "100%",
                height: "2.5rem",
                marginTop: "0.5rem",
              }}
              disabledDate={(current) => {
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                const isBeforeToday = current && current.toDate() < today;
                const formattedDate = current.format("YYYY-MM-DD");
                const isUnavailableDate = !allDates.includes(formattedDate);

                return isBeforeToday || isUnavailableDate;
              }}
              onChange={(date) => {
                const formedDate = date.format("YYYY-MM-DD");
                setQuery({ ...query, date: formedDate });
                setSelectedDate(formedDate);
                // handleDateChange(formedDate);
              }}
              disabled={allDatesLoading || slotsDataLoading}
            />
          </div>
          <div>
            <label htmlFor="slot">Select your booking slot: </label>
            <Select
              showSearch
              placeholder="Select a slot"
              style={{
                width: "100%",
                height: "2.5rem",
                marginTop: "0.5rem",
              }}
              onChange={(data) => {
                setSlotId(data);
              }}
              options={slotsOptions}
              disabled={!selectedDate || slotsDataLoading || slotsDataFetching}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;

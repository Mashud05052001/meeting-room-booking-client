import FilledButton from "@/components/button/FilledButton";
import SingleRoomSkeleton from "@/components/skeleton/SingleRoomSkeleton";
import { useGetARoomQuery } from "@/redux/features/roomSlotManagement/roomSlotManagement.api";
import { Breadcrumb } from "antd";
import { useEffect, useState } from "react";
import { FaHome } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";

const SingleMeetingRoom = () => {
  const [coverImage, setCoverImage] = useState("");
  const { id: roomId } = useParams();

  const { data: roomInfo, isLoading } = useGetARoomQuery(roomId as string);

  useEffect(() => {
    if (roomInfo) {
      setCoverImage(roomInfo.pictures[0] as string);
    }
  }, [roomInfo]);

  if (isLoading) {
    return <SingleRoomSkeleton />;
  }

  return (
    <div className="mt-6">
      <Breadcrumb
        className="mb-4 px-4"
        items={[
          {
            title: (
              <Link to={"/meeting-room"}>
                <div className="inline-flex items-center space-x-1">
                  <FaHome size={20} />
                  <span>All Meeting Room</span>
                </div>
              </Link>
            ),
          },
          {
            title: (
              <Link to={`/meeting-room/${roomId}`}>
                <span>{roomInfo?.name}</span>
              </Link>
            ),
          },
        ]}
      />

      <div className=" flex md:space-x-12 flex-col md:flex-row px-4">
        {/* Image Section */}
        <div className="md:w-1/2 space-y-4">
          <div>
            <img
              src={coverImage}
              alt="Cover Image"
              className="w-full h-[25rem] rounded-lg cursor-pointer"
            />
          </div>
          <div className="flex space-x-3">
            {roomInfo?.pictures.map((img, idx) => (
              <div
                key={idx}
                className={`rounded-lg py-0.5 px-[3px] duration-100 border-2 border-common-600 ${
                  coverImage === img ? "scale-105" : ""
                }`}
                onClick={() => setCoverImage(img)}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${idx}`}
                  className="w-20 h-12 rounded-md cursor-pointer"
                />
              </div>
            ))}
          </div>
        </div>
        {/* Information Section */}
        <div className="md:w-1/2 md:mt-6 mt-14 mb-40 ">
          <h1 className="text-4xl font-semibold mb-10">{roomInfo?.name}</h1>
          <div className="w-96 grid grid-cols-2 gap-y-3 mb-3">
            <p>
              Price per slot:{" "}
              <span className="font-semibold">${roomInfo?.pricePerSlot}</span>
            </p>
            <p>
              Capacity:{" "}
              <span className="font-semibold">{roomInfo?.capacity}</span>
            </p>
            <p>
              Room No: <span className="font-semibold">{roomInfo?.roomNo}</span>
            </p>
            <p>
              Floor No:{" "}
              <span className="font-semibold">{roomInfo?.floorNo}</span>
            </p>
          </div>
          <div className="mb-6">
            <div className="flex">
              <span>Features:</span>
              <span className="font-semibold ml-3 md:w-8/12 ld:w-1/2 w-10/12 ">
                {roomInfo?.amenities.join(", ")}
              </span>
            </div>
          </div>
          <Link to={`/booking-form/${roomId}`}>
            <FilledButton buttonText="Book Now" type="button" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SingleMeetingRoom;

import FilledButton from "@/components/button/FilledButton";
import ScrollToTopContainer from "@/components/container/ScrollToTopContainer";
import BookingForm from "@/components/modal/modalChildren/BookingForm";
import ModalContainer from "@/components/modal/ModalContainer";
import SingleRoomSkeleton from "@/components/skeleton/SingleRoomSkeleton";
import { useCanceledBookingMutation } from "@/redux/features/booking/booking.api";
import {
  useGetAllSlotsDateOfARoomQuery,
  useGetARoomQuery,
} from "@/redux/features/roomSlotManagement/roomSlotManagement.api";
import { Breadcrumb, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { FaHome } from "react-icons/fa";
import { Link, Navigate, useLocation, useParams } from "react-router-dom";
import { toast } from "sonner";

const SingleMeetingRoom = () => {
  const location = useLocation();
  const [roomId, setRoomId] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [coverImage, setCoverImage] = useState("");
  const { id: urlRoomId } = useParams();

  const { data: roomInfo, isLoading } = useGetARoomQuery(roomId, {
    skip: !roomId,
  });
  const { data: allDates = [], isLoading: allDatesLoading } =
    useGetAllSlotsDateOfARoomQuery(roomId!, { skip: !roomId });

  const [canceledBookingIfPaymentCanceled] = useCanceledBookingMutation();

  useEffect(() => {
    if (roomInfo) {
      setCoverImage(roomInfo.pictures[0] as string);
    }
  }, [roomInfo]);
  useEffect(() => {
    if (urlRoomId) {
      setRoomId(urlRoomId);
    }
  }, [urlRoomId]);

  // delete bookings if it was cancelled
  useEffect(() => {
    const searchQuery = location.search;
    if (searchQuery?.includes("?status=payment_canceled&bookingId=")) {
      toast.error("Payment cancelled.");
      const bookingId = searchQuery.split("bookingId=")[1] as string;
      const handlePaymentCancellation = async () => {
        setOpenModal(false);
        await canceledBookingIfPaymentCanceled(bookingId).unwrap();
        return <Navigate to={location.pathname} />;
      };
      handlePaymentCancellation();
    }
  }, [canceledBookingIfPaymentCanceled, location]);

  if (isLoading) {
    return <SingleRoomSkeleton />;
  }

  return (
    <ScrollToTopContainer className="mt-6">
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
              <span>Amenities:</span>
              <span className="ml-3 md:w-8/12 ld:w-1/2 w-10/12 ">
                {roomInfo?.amenities.join(", ")}
              </span>
            </div>
          </div>
          <div onClick={() => setOpenModal(true)} className="w-fit">
            <Tooltip
              title={
                allDatesLoading || allDates?.length === 0
                  ? "This room has no booking date available"
                  : ""
              }
              placement="topLeft"
            >
              <div style={{ display: "inline-block" }}>
                <FilledButton
                  buttonText="Book Now"
                  type="button"
                  disabled={allDatesLoading || allDates?.length === 0}
                />
              </div>
            </Tooltip>
          </div>
        </div>
      </div>

      <ModalContainer
        openModal={openModal}
        setOpenModal={setOpenModal}
        className=" max-w-[90%] sm:max-w-[80%] md:max-w-[65%] lg:max-w-[50%] w-[90%] lg:w-[44rem]"
        children={<BookingForm roomId={roomId} openModal={openModal} />}
      />
    </ScrollToTopContainer>
  );
};

export default SingleMeetingRoom;

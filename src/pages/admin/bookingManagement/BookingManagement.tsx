import FilledButton from "@/components/button/FilledButton";
import ModalContainer from "@/components/modal/ModalContainer";
import {
  useDeleteSingleBookingMutation,
  useGetAllBookingsQuery,
  useUpdateBookingStatusMutation,
} from "@/redux/features/booking/booking.api";
import "@/styles/table.style.css";

import { TBooking, TError } from "@/types";
import type { TableColumnsType } from "antd";
import { Popconfirm, Select, Table } from "antd";
import { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { toast } from "sonner";

type TBookingTableProps = {
  key: string;
  roomId: string;
  userNameId: string;
  roomName: string;
  userName: string;
  userEmail: string;
  date: string;
  time: string;
  totalAmount: number;
  paymentStatus: string;
  status: "confirmed" | "unconfirmed" | "canceled";
};

const BookingManagement = () => {
  const [openModal, setOpenModal] = useState(false);
  const [bookingInfo, setBookingInfo] = useState<Pick<
    TBooking,
    "_id" | "isConfirmed"
  > | null>(null);
  const [openDeleteModalId, setOpenDeleteModalId] = useState<string | null>(
    null
  );

  const { data: bookingsData, isLoading: bookingsDataLoadding } =
    useGetAllBookingsQuery({});

  const [deleteBooking, { isLoading: deleteBookingLoading }] =
    useDeleteSingleBookingMutation();
  const columns: TableColumnsType<TBookingTableProps> = [
    {
      title: "Room Name",
      dataIndex: "roomName",
      render: (roomName) => <p className="min-w-32">{roomName}</p>,
      width: "1%",
    },
    {
      title: "UserName",
      dataIndex: "userName",
      render: (userName) => <p className="min-w-32">{userName}</p>,
      width: "1%",
    },
    {
      title: "Date",
      dataIndex: "date",
      render: (date) => <p className="min-w-24">{date}</p>,
      width: "1%",
    },
    {
      title: "Time",
      dataIndex: "time",
      render: (time) => <p className="min-w-40 md:min-w-60 max-w-60">{time}</p>,
      width: "1%",
    },

    {
      title: "Price",
      dataIndex: "totalAmount",
      render: (price) => <strong>${price}</strong>,
    },
    {
      title: <p className=" w-[6.3rem]">Payment</p>,
      dataIndex: "paymentStatus",
      render: (paymentStatus) => <p>{paymentStatus}</p>,
    },
    {
      title: <p>Status</p>,
      dataIndex: "status",
      render: (status: "confirmed" | "unconfirmed" | "canceled") => (
        <div>
          <p
            className={` font-semibold ${
              status === "confirmed"
                ? "text-green-600"
                : status === "unconfirmed"
                ? "text-yellow-600"
                : "text-red-600"
            }`}
          >
            {status.charAt(0).toUpperCase()}
            {status.slice(1).toLowerCase()}
          </p>
        </div>
      ),
    },

    {
      title: "Action",
      key: "operation",
      render: (_text, record) => {
        const showDeleteConfirm = () => {
          setOpenDeleteModalId(record?.key as string);
        };
        // TODO : Implement delete booking to refund system
        const handleDeleteBooking = async (id: string) => {
          try {
            const result = await deleteBooking(id).unwrap();
            console.log(result);
            if (result?.success) {
              toast.success(
                "Booking is deleted successfully. Delete booking to refund system will be implemented soon."
              );
              setOpenDeleteModalId(null);
            }
          } catch (error) {
            console.log(error);
            toast.error("Failed to delete the room");
            setOpenDeleteModalId(null);
          }
        };

        return (
          <div className={`bg-white duration-100 flex space-x-4 items-center`}>
            <div
              className={` duration-100 w-fit ${
                record?.status === "canceled"
                  ? "opacity-30 hover:cursor-not-allowed"
                  : "hover:cursor-pointer hover:text-[#1677ff]"
              }`}
            >
              <MdEdit
                size={25}
                onClick={() => {
                  if (record?.status !== "canceled") {
                    const findRoomInfo = bookingsData?.find(
                      (item) => item?._id === record?.key
                    );
                    const bookingRoomData = {
                      _id: findRoomInfo?._id as string,
                      isConfirmed: findRoomInfo?.isConfirmed as
                        | "confirmed"
                        | "unconfirmed"
                        | "canceled",
                    };
                    setBookingInfo(bookingRoomData);
                    setOpenModal(true);
                  }
                }}
              />
            </div>
            <div className="hover:cursor-pointer hover:text-red-700 duration-100 w-fit">
              <Popconfirm
                title="Are you sure to delete this booking?"
                description="It won't be recovered"
                open={openDeleteModalId === record.key}
                onConfirm={() => handleDeleteBooking(record?.key as string)}
                okButtonProps={{
                  loading: deleteBookingLoading,
                  danger: true,
                  style: {
                    backgroundColor: "#e83f3f",
                    borderColor: "#e83f3f",
                    color: "white",
                  },
                }}
                onCancel={() => setOpenDeleteModalId(null)}
                icon=""
                okText="Delete"
                cancelButtonProps={{
                  style: { backgroundColor: "#f0f0f0", color: "#000" },
                }}
              >
                <div>
                  <FaTrashAlt size={20} onClick={showDeleteConfirm} />
                </div>
              </Popconfirm>
            </div>
          </div>
        );
      },
    },
  ];

  const bookingsTableData: TBookingTableProps[] =
    bookingsData?.map((booking) => ({
      key: booking?._id,
      roomId: booking?.room?._id,
      roomName: booking?.room?.name,
      userNameId: booking?.user?._id,
      userName: booking?.user?.name,
      userEmail: booking?.user?.email,
      date: booking?.date,
      totalAmount: booking?.totalAmount,
      time: booking?.slots
        ?.map((slot) => `${slot?.startTime}-${slot?.endTime}`)
        .join(", "),
      status: booking?.isConfirmed,
      paymentStatus: `${booking?.paymentStatus
        .charAt(0)
        .toUpperCase()}${booking?.paymentStatus?.slice(1).toLowerCase()}`,
    })) || [];

  return (
    <div className="mt-10">
      <h1 className="text-3xl font-semibold mb-5 ml-3">All Bookings</h1>
      <Table
        className="custom-scrollbar"
        columns={columns}
        dataSource={bookingsTableData}
        pagination={false}
        loading={bookingsDataLoadding}
      />
      <div
        className={`${
          openModal ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <ModalContainer
          openModal={openModal}
          setOpenModal={setOpenModal}
          className="w-[26rem] top-[12rem]"
        >
          <EditBookingStatus
            bookingData={bookingInfo!}
            setOpenModal={setOpenModal}
          />
        </ModalContainer>
      </div>
    </div>
  );
};

export default BookingManagement;

const EditBookingStatus = ({
  bookingData,
  setOpenModal,
}: {
  bookingData: Pick<TBooking, "_id" | "isConfirmed">;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [upcomingStatus, setUpcomingStatus] = useState<
    "unconfirmed" | "confirmed" | "canceled" | ""
  >();
  const [updateBookingStatus, { isLoading: bookingStatusLoading }] =
    useUpdateBookingStatusMutation();

  const previousBookingStatus =
    bookingData?.isConfirmed.charAt(0).toUpperCase() +
    bookingData?.isConfirmed?.slice(1).toLowerCase();
  const statusOptions = [
    {
      label: "Unconfirmed",
      value: "unconfirmed",
      disabled: bookingData?.isConfirmed === "unconfirmed",
    },
    {
      label: "Confirmed",
      value: "confirmed",
      disabled: bookingData?.isConfirmed === "confirmed",
    },
    {
      label: "Canceled",
      value: "canceled",
      disabled: bookingData?.isConfirmed === "canceled",
    },
  ];
  const handleUpdateStatus = async () => {
    if (upcomingStatus) {
      const updatedData = {
        id: bookingData?._id,
        data: { isConfirmed: upcomingStatus },
      };
      const loadingId = toast.loading("Booking status is changing");
      try {
        const result = await updateBookingStatus(updatedData).unwrap();
        console.log(result);
        toast.success(`Booking status has but changed successfully`, {
          id: loadingId,
        });
        setOpenModal(false);
      } catch (err) {
        const error = err as TError;
        toast.error(
          `Failed to change booking status. ${error?.data?.message}`,
          { id: loadingId }
        );
      }
    }
  };
  useEffect(() => {
    if (bookingData) {
      setUpcomingStatus("");
    }
  }, [bookingData]);

  if (!bookingData) {
    return <></>;
  }
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-semibold">Change Status</h1>
      <div>
        <div>
          Current Status : <strong>{previousBookingStatus}</strong>
        </div>
        <div className="flex space-x-4 mt-5">
          <p>Update status :</p>
          <Select
            allowClear
            className="w-52"
            options={statusOptions}
            value={upcomingStatus}
            onChange={(data) => setUpcomingStatus(data)}
          />
        </div>
        <div className="mt-10 w-fit" onClick={handleUpdateStatus}>
          <FilledButton
            buttonText="Update Status"
            disabled={!upcomingStatus}
            isLoading={bookingStatusLoading}
          />
        </div>
      </div>
    </div>
  );
};

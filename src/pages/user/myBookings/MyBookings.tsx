import EditUserRoleModal from "@/components/modal/EditUserRoleModal";
import { useGetSingleUserBookingsQuery } from "@/redux/features/booking/booking.api";
import "@/styles/table.style.css";
import type { TableColumnsType } from "antd";
import { Button, Table, Tooltip } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";

type TBookingsType = {
  key: string;
  roomId: string;
  room: string;
  date: string;
  time: string;
  status: "confirmed" | "unconfirmed" | "canceled";
  totalAmount: number;
  transactionId: string;
};

const MyBookings = () => {
  const [openModal, setOpenModal] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  const columns: TableColumnsType<TBookingsType> = [
    {
      title: <p className="ml-4  min-w-20">Room Name</p>,
      dataIndex: "room",
      render: (room, field) => (
        <Link to={`/meeting-room/${field?.roomId}`} className="min-w-32">
          <Tooltip
            placement="topLeft"
            title={"Click to visit room information page"}
            className="cursor-pointer"
          >
            <Button type="text" htmlType="button">
              {room}
            </Button>
          </Tooltip>
        </Link>
      ),
      width: "1%",
    },
    {
      title: "Date",
      dataIndex: "date",
      render: (date) => <p className="min-w-20">{date}</p>,
    },
    {
      title: "Time",
      dataIndex: "time",
      render: (time) => <p className="max-w-40 min-w-40">{time}</p>,
    },
    {
      title: "Cost",
      dataIndex: "totalAmount",
      render: (cost) => <strong>${cost}</strong>,
    },
    {
      title: "Status",
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
      title: "Transaction Id",
      dataIndex: "transactionId",
      render: (transactionId) => (
        <Tooltip
          placement="topLeft"
          title={transactionId}
          className="cursor-pointer"
        >
          {transactionId ? (
            <p className="min-w-20 ">{transactionId.slice(0, 7)}...</p>
          ) : (
            <p className="text-red-600 font-semibold">Unpaid</p>
          )}
        </Tooltip>
      ),
    },
  ];

  const { data: allBookings, isLoading: bookingsDataLoading } =
    useGetSingleUserBookingsQuery(undefined);

  const bookingsTableData: TBookingsType[] =
    allBookings?.map((item) => ({
      key: item?._id,
      room: item?.room?.name,
      roomId: item?.room?._id,
      date: item?.date,
      totalAmount: item?.totalAmount,
      time: item?.slots
        ?.map((slot) => `${slot?.startTime}-${slot?.endTime}`)
        .join(", "),
      status: item?.isConfirmed,
      transactionId: item?.transactionId,
    })) || [];

  return (
    <div className="mt-10">
      <h1 className="text-3xl font-semibold mb-5 ml-3">My Bookings</h1>
      <Table
        columns={columns}
        dataSource={bookingsTableData}
        pagination={false}
        loading={bookingsDataLoading}
      />
      <div
        className={`${
          openModal ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <EditUserRoleModal
          openModal={openModal}
          setOpenModal={setOpenModal}
          userInfo={userInfo}
          setUserInfo={setUserInfo}
        />
      </div>
    </div>
  );
};

export default MyBookings;

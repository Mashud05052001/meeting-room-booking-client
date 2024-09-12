import EditRoomModal from "@/components/modal/EditRoomModal";
import {
  useDeleteARoomMutation,
  useGetAllRoomsQuery,
} from "@/redux/features/admin/admin.api";
import type { TableColumnsType } from "antd";
import { Popconfirm, Table, Tooltip } from "antd";
import { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { toast } from "sonner";

type TAllRoomsType = {
  key: string;
  name: string;
  roomNo: number;
  floorNo: number;
  capacity: number;
  pricePerSlot: number;
  amenities: string;
};

const AllRooms = () => {
  const [openModal, setOpenModal] = useState(false);
  const [userID, setUserID] = useState("");
  const [openDeleteModalId, setOpenDeleteModalId] = useState<string | null>(
    null
  );

  const { data: allRooms, isLoading: usersDataLoading } =
    useGetAllRoomsQuery(undefined);
  const [deleteRoom, { isLoading: deleteRoomLoading }] =
    useDeleteARoomMutation();

  const columns: TableColumnsType<TAllRoomsType> = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Room No",
      dataIndex: "roomNo",
    },
    {
      title: "Floor No",
      dataIndex: "floorNo",
    },
    {
      title: "Capacity",
      dataIndex: "capacity",
    },
    {
      title: "Price Per Slot",
      dataIndex: "pricePerSlot",
    },
    {
      title: "Amenities",
      dataIndex: "amenities",
      width: 200,
      render: (amenities) => (
        <Tooltip
          placement="leftBottom"
          title={
            <div className="p-2">
              {amenities.split(",").map((amenity: string, idx: number) => (
                <p key={idx} className="mt-1">
                  {amenity}
                </p>
              ))}
            </div>
          }
          className="cursor-pointer py-3 pr-3"
          color="#001529"
        >
          Hover here
        </Tooltip>
      ),
    },
    {
      title: "Action",
      key: "operation",
      render: (text, record) => {
        const showDeleteConfirm = () => {
          setOpenDeleteModalId(record?.key);
        };
        const handleDeleteRoom = async (id: string) => {
          console.log(id);
          try {
            const result = await deleteRoom(id).unwrap();
            console.log(result);
            if (result?.success) {
              toast.success("Room is deleted successfully");
              setOpenDeleteModalId(null);
            }
          } catch (error) {
            console.log(error);
            toast.error("Failed to delete the room");
            setOpenDeleteModalId(null);
          }
        };

        return (
          <div className="bg-white duration-100 flex space-x-4 items-center">
            <div className="hover:cursor-pointer hover:text-[#1677ff] duration-100 w-fit">
              <MdEdit
                size={25}
                onClick={() => {
                  setUserID(record?.key);
                  setOpenModal(true);
                }}
              />
            </div>
            <div className="hover:cursor-pointer hover:text-red-700 duration-100 w-fit">
              <Popconfirm
                title="Are you sure to delete this room?"
                description="It won't be recovered"
                open={openDeleteModalId === record.key}
                onConfirm={() => handleDeleteRoom(record.key)}
                okButtonProps={{
                  loading: deleteRoomLoading,
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

  const roomsTableData: TAllRoomsType[] =
    allRooms?.data.map((room) => ({
      key: room?._id,
      name: room?.name,
      roomNo: room?.roomNo,
      floorNo: room?.floorNo,
      capacity: room?.capacity,
      pricePerSlot: room?.pricePerSlot,
      amenities: room?.amenities.join(",  "),
    })) || [];
  return (
    <div className="mt-10">
      <h1 className="text-3xl font-semibold mb-5 ml-3">All Rooms</h1>
      <Table
        columns={columns}
        dataSource={roomsTableData}
        pagination={false}
        loading={usersDataLoading}
      />
      <div
        className={`${
          openModal ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <EditRoomModal
          openModal={openModal}
          setOpenModal={setOpenModal}
          userID={userID}
          setUserID={setUserID}
        />
      </div>
    </div>
  );
};

export default AllRooms;

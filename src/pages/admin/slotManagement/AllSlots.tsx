import EditRoomModal from "@/components/modal/EditRoomModal";
import {
  useDeleteASlotMutation,
  useGetSlotsQuery,
} from "@/redux/features/roomSlotManagement/roomSlotManagement.api";

import { TRoom, TSlotsFlatData } from "@/types";
import { generateSlotsFlatData } from "@/utils/function";
import type { TableColumnsType } from "antd";
import { Popconfirm, Table } from "antd";
import { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { toast } from "sonner";

type TAllSlotsType = {
  key: string;
} & Partial<TSlotsFlatData>;

const AllSlots = () => {
  const [openModal, setOpenModal] = useState(false);
  const [roomInfo, setRoomInfo] = useState<TRoom | null>(null);
  const [openDeleteModalId, setOpenDeleteModalId] = useState<string | null>(
    null
  );

  const { data: slotsData, isLoading: slotsDataLoading } = useGetSlotsQuery({});
  const [deleteSlot, { isLoading: deleteSlotLoading }] =
    useDeleteASlotMutation();

  let allSlots: TSlotsFlatData[] = [];
  if (slotsData?.success) allSlots = generateSlotsFlatData(slotsData?.data);

  const columns: TableColumnsType<TAllSlotsType> = [
    {
      title: "Room Name",
      dataIndex: "roomName",
    },
    {
      title: "RoomNo",
      dataIndex: "roomNo",
      render: (roomNo) => <p className="pl-3">{roomNo}</p>,
    },
    {
      title: "Date",
      dataIndex: "date",
    },
    {
      title: "Period",
      dataIndex: "time",
    },
    {
      title: "Capacity",
      dataIndex: "capacity",
      render: (capacity) => <p className="pl-4">{capacity}</p>,
    },

    {
      title: "Price",
      dataIndex: "pricePerSlot",
    },

    {
      title: "Action",
      key: "operation",
      render: (_text, record) => {
        const showDeleteConfirm = () => {
          setOpenDeleteModalId(record?.slotId as string);
        };
        const handleDeleteRoom = async (id: string) => {
          try {
            const result = await deleteSlot(id).unwrap();
            console.log(result);
            if (result?.success) {
              toast.success("Room is deleted successfully");
              setOpenDeleteModalId(null);
            }
          } catch (error) {
            console.log(error, "Mashud");
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
                  const findRoomInfo = allSlots.find(
                    (slot) => slot.slotId === record.slotId
                  );
                  console.log(findRoomInfo);
                  // setRoomInfo(findRoomInfo);
                  setOpenModal(true);
                }}
              />
            </div>
            <div className="hover:cursor-pointer hover:text-red-700 duration-100 w-fit">
              <Popconfirm
                title="Are you sure to delete this slot?"
                description="It won't be recovered"
                open={openDeleteModalId === record.key}
                onConfirm={() => handleDeleteRoom(record.slotId as string)}
                okButtonProps={{
                  loading: deleteSlotLoading,
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

  const roomsTableData: TAllSlotsType[] =
    allSlots?.map((slot) => ({
      key: slot?.slotId,
      roomId: slot?.roomId,
      slotId: slot?.slotId,
      roomName: slot?.roomName,
      roomNo: slot?.roomNo,
      date: slot?.date,
      time: `${slot?.startTime}-${slot?.endTime}`,
      capacity: slot?.capacity,
      pricePerSlot: slot?.pricePerSlot,
      isBooked: slot?.isBooked,
      isDeleted: slot?.isDeleted,
    })) || [];
  return (
    <div className="mt-10">
      <h1 className="text-3xl font-semibold mb-5 ml-3">All Slots</h1>
      <Table
        columns={columns}
        dataSource={roomsTableData}
        pagination={false}
        loading={slotsDataLoading}
      />
      <div
        className={`${
          openModal ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <EditRoomModal
          openModal={openModal}
          setOpenModal={setOpenModal}
          roomInfo={roomInfo}
          setRoomInfo={setRoomInfo}
        />
      </div>
    </div>
  );
};

export default AllSlots;

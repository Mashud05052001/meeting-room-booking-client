import { bookingRoomAmenitiesOptions } from "@/constant/room.constant";
import { updateRoomValidationSchema } from "@/schemas/admin.schema";
import { TRoom } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { RxCross2 } from "react-icons/rx";
import FormButton from "../button/FormButton";
import QForm from "../form/QForm";
import QInput from "../form/QInput";
import QSelect from "../form/QSelect";
import { useUpdateARoomMutation } from "@/redux/features/roomSlotManagement/roomSlotManagement.api";

// TODO : ROOM EDITING REMAINING
const EditRoomModal = ({
  openModal,
  setOpenModal,
  roomInfo,
  setRoomInfo,
}: {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  roomInfo: TRoom | null;
  setRoomInfo: React.Dispatch<React.SetStateAction<TRoom | null>>;
}) => {
  const [updateARoom, { isLoading }] = useUpdateARoomMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
    // const loadingId = toast.loading("Room is creating...");
    // try {
    //   const result = await updateARoom(data).unwrap();
    //   if (result.success) {
    //     toast.success("Room updated successfully", { id: loadingId });
    //   }
    // } catch (error) {
    //   console.log(error);
    //   toast.error("Failed to update room", { id: loadingId });
    // }
  };
  const defaultValues = {
    amenities: roomInfo?.amenities,
    capacity: roomInfo?.capacity,
    floorNo: roomInfo?.floorNo,
    name: roomInfo?.name,
    pricePerSlot: roomInfo?.pricePerSlot,
    roomNo: roomInfo?.roomNo,
  };
  return (
    <div
      onClick={() => {
        setOpenModal(false);
        setRoomInfo(null);
      }}
      className={`fixed z-[100] w-screen ${
        openModal ? "visible opacity-100" : "invisible opacity-0"
      } inset-0 grid place-items-center bg-black/20 backdrop-blur-sm duration-100 dark:bg-transparent`}
    >
      <div
        onClick={(e_) => e_.stopPropagation()}
        className={`absolute min-w-[90%] sm:min-w-[80%] lg:min-w-[70%] rounded-lg bg-white p-8 drop-shadow-lg dark:bg-zinc-900 dark:text-white ${
          openModal
            ? "opacity-1 duration-300"
            : "scale-110 opacity-0 duration-150"
        }`}
      >
        <RxCross2
          onClick={() => {
            setOpenModal(false);
            setRoomInfo(null);
          }}
          size={24}
          className="absolute right-3 top-3 w-6 cursor-pointer fill-zinc-600 dark:fill-white"
        />
        <QForm
          onSubmit={onSubmit}
          resolver={zodResolver(updateRoomValidationSchema)}
          defaultValues={defaultValues}
        >
          <h1 className="text-3xl font-semibold mb-8 ml-3">Update Room</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {roomInfo && (
              <>
                <QInput name="name" label="Room name" type="text" />
                <QInput name="roomNo" min={0} label="Room no" type="number" />
                <QInput name="floorNo" min={0} label="Floor no" type="number" />
                <QInput
                  name="capacity"
                  min={6}
                  label="Capacity"
                  type="number"
                />
                <QInput
                  name="pricePerSlot"
                  label="Price per slot"
                  min={0}
                  type="number"
                />
                <QSelect
                  name="amenities"
                  label="Amenities"
                  options={bookingRoomAmenitiesOptions}
                  mode="multiple"
                />
              </>
            )}
          </div>
          <div className="mt-10">
            <FormButton buttonText="Update Room" isLoading={isLoading} />
          </div>
        </QForm>
      </div>
    </div>
  );
};

export default EditRoomModal;

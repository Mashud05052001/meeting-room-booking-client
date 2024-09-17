import { bookingRoomAmenitiesOptions } from "@/constant/room.constant";
import { useUpdateARoomMutation } from "@/redux/features/roomSlotManagement/roomSlotManagement.api";
import { TRoom } from "@/types";
import { useEffect, useState } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { RxCross2 } from "react-icons/rx";
import { toast } from "sonner";
import FilledButton from "../button/FilledButton";
import QInput from "../form/QInput";
import QSelect from "../form/QSelect";

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
  const [defaultFormValues, setDefaultFormValues] = useState({});
  const [updateARoom, { isLoading }] = useUpdateARoomMutation();
  const methods = useForm({ defaultValues: defaultFormValues });

  const getChangedData = (
    initialValues: FieldValues,
    newValues: FieldValues
  ) => {
    const changedData: FieldValues = {};
    Object.keys(newValues).forEach((key) => {
      if (newValues[key] !== initialValues[key]) {
        changedData[key] = newValues[key];
      }
    });
    const newAmenities =
      newValues?.amenities?.filter(
        (newAminity: string) => !initialValues?.amenities?.includes(newAminity)
      ) || [];
    if (newAmenities?.length > 0) {
      changedData.amenities = newAmenities;
    } else delete changedData.amenities;
    return changedData;
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (!roomInfo) return;
    const changedData = getChangedData(roomInfo, data);
    if (Object.keys(changedData).length === 0) {
      toast.error("First change something before update");
      return;
    }
    const roomUpdatedData = {
      id: roomInfo?._id,
      data: changedData,
    };

    const loadingId = toast.loading("Room is updating...");
    try {
      const result = await updateARoom(roomUpdatedData).unwrap();
      console.log(result);
      if (result.success) {
        setOpenModal(false);
        toast.success("Room updated successfully", { id: loadingId });
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update room", { id: loadingId });
    }
  };

  useEffect(() => {
    if (roomInfo) {
      const initiateValue = {
        amenities: roomInfo?.amenities,
        capacity: roomInfo?.capacity,
        floorNo: roomInfo?.floorNo,
        name: roomInfo?.name,
        pricePerSlot: roomInfo?.pricePerSlot,
        roomNo: roomInfo?.roomNo,
      };
      setDefaultFormValues(initiateValue);
      methods.reset(initiateValue);
    }
  }, [roomInfo, methods]);

  return (
    <div
      onClick={() => {
        setOpenModal(false);
        setRoomInfo(null);
        setDefaultFormValues({});
      }}
      className={`fixed z-[100]  w-screen ${
        openModal ? "visible opacity-100" : "invisible opacity-0"
      } inset-0 grid place-items-center bg-black/20 backdrop-blur-sm duration-100 dark:bg-transparent`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`absolute max-w-[90%] sm:max-w-[70%] lg:max-w-[60%] rounded-lg bg-white mx-3 sm:mx-0 p-8 drop-shadow-lg dark:bg-zinc-900 dark:text-white ${
          openModal
            ? "opacity-1 duration-300"
            : "scale-110 opacity-0 duration-150"
        }`}
      >
        <RxCross2
          onClick={() => {
            setOpenModal(false);
            setRoomInfo(null);
            setDefaultFormValues({});
          }}
          size={24}
          className="absolute right-3 top-3 w-6 cursor-pointer fill-zinc-600 dark:fill-white"
        />
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <h1 className="text-3xl font-semibold mb-8 ml-3">Update Room</h1>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-6 sm:gap-8 md:gap-10">
              {roomInfo && (
                <>
                  <QInput name="name" label="Room name" type="text" />
                  <QInput name="roomNo" min={0} label="Room no" type="number" />
                  <QInput
                    name="floorNo"
                    min={0}
                    label="Floor no"
                    type="number"
                  />
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
                  <div className="col-span-2 sm:col-span-1">
                    <QSelect
                      name="amenities"
                      label="Amenities"
                      options={bookingRoomAmenitiesOptions}
                      mode="multiple"
                    />
                  </div>
                </>
              )}
            </div>
            <div className="mt-10">
              <FilledButton buttonText="Update Room" isLoading={isLoading} />
            </div>
          </form>
        </FormProvider>
        {/* </QForm> */}
      </div>
    </div>
  );
};

export default EditRoomModal;

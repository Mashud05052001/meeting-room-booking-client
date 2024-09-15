import FormButton from "@/components/button/FilledButton";
import QDatePicker from "@/components/form/QDatePicker";
import QForm from "@/components/form/QForm";
import QSelect from "@/components/form/QSelect";
import QTimePickerRange from "@/components/form/QTimePickerRange";
import { slotDuration } from "@/constant/room.constant";
import {
  useCreateSlotMutation,
  useGetAllRoomsQuery,
} from "@/redux/features/roomSlotManagement/roomSlotManagement.api";
import { TError, TSelectOptions } from "@/types";
import { FieldValues, SubmitHandler } from "react-hook-form";
import moment from "moment";
import { zodResolver } from "@hookform/resolvers/zod";
import { createSlotsValidationSchema } from "@/schemas/admin.schema";
import { toast } from "sonner";

const CreateSlots = () => {
  const { data: allRooms, isLoading: roomDataLoading } = useGetAllRoomsQuery(
    []
  );
  const [createSlots, { isLoading }] = useCreateSlotMutation();
  const roomOptions: TSelectOptions[] =
    allRooms?.data?.map((room) => {
      return {
        value: room?._id,
        label: `${room?.name}, Capacity:${room.capacity}, PPS:${room.pricePerSlot}`,
      };
    }) || [];
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const slotsData = {
      room: data?.room,
      date: moment(new Date(data?.date)).format("YYYY-MM-DD"),
      startTime: moment(new Date(data?.time[0])).format("HH:mm"),
      endTime: moment(new Date(data?.time[1])).format("HH:mm"),
      slotDuration: data?.slotDuration,
    };
    const loadingId = toast.loading("Slots are creating...");
    try {
      const result = await createSlots(slotsData).unwrap();
      if (result.success) {
        toast.success("Slots created successfully", { id: loadingId });
      }
    } catch (error) {
      const err = error as TError;
      toast.error(`Failed to create slots. ${err?.data?.message}`, {
        id: loadingId,
      });
    }
  };
  return (
    <div className="mt-10">
      <h1 className="text-3xl font-semibold mb-5 ml-3">Create Slots</h1>
      <QForm
        onSubmit={onSubmit}
        resolver={zodResolver(createSlotsValidationSchema)}
        className="mt-10"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          <QSelect
            name="room"
            label="Room"
            disabled={roomDataLoading}
            options={roomOptions}
          />
          <QSelect
            name="slotDuration"
            label="Slot duration"
            options={slotDuration}
          />
          <QDatePicker
            label="Date"
            name="date"
            disabledAllPreviousDate={true}
            placeholder="Select slots data"
          />
          <QTimePickerRange label="Time" name="time" />
          {/* <button type="submit" className="hidden">
            Mahi
          </button> */}
        </div>
        <div className="mt-10">
          <FormButton buttonText="Create Slots" isLoading={isLoading} />
        </div>
      </QForm>
    </div>
  );
};

export default CreateSlots;

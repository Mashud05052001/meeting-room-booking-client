import FormButton from "@/components/button/FormButton";
import QForm from "@/components/form/QForm";
import QImages from "@/components/form/QImages";
import QInput from "@/components/form/QInput";
import QSelect from "@/components/form/QSelect";
import { bookingRoomAmenitiesOptions } from "@/constant/room.constant";
import { useCreateRoomMutation } from "@/redux/features/roomSlotManagement/roomSlotManagement.api";
import { addRoomValidationSchema } from "@/schemas/admin.schema";
import { generateSingleImageURL } from "@/utils/generateImageUrl";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

const CreateRoom = () => {
  const [createARoom, { isLoading }] = useCreateRoomMutation();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const loadingId = toast.loading("Room is creating...");
    const pictures = data?.pictures;
    let picturesUrl = [];
    if (pictures.length > 0) {
      picturesUrl = await Promise.all(
        pictures.map(async (item: File) => {
          const url = await generateSingleImageURL(item);
          return url;
        })
      );
    }
    delete data.pictures;
    data.pictures = picturesUrl;
    try {
      const result = await createARoom(data).unwrap();
      if (result.success) {
        toast.success("Room created successfully", { id: loadingId });
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to create room", { id: loadingId });
    }
  };
  return (
    <div className="mt-10">
      <h1 className="text-3xl font-semibold mb-5 ml-3">Create Room</h1>
      <QForm
        onSubmit={onSubmit}
        resolver={zodResolver(addRoomValidationSchema)}
        className="mt-10"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          <QInput name="name" label="Room name" type="text" />
          <QInput name="roomNo" min={0} label="Room no" type="number" />
          <QInput name="floorNo" min={0} label="Floor no" type="number" />
          <QInput name="capacity" min={6} label="Capacity" type="number" />
          <QInput
            name="pricePerSlot"
            label="Price per slot"
            min={0}
            type="number"
          />
          {/* <div className="col-span-3"> */}
          <QSelect
            name="amenities"
            label="Amenities"
            options={bookingRoomAmenitiesOptions}
            mode="multiple"
          />
          {/* </div> */}
          <div className="col-span-1 sm:col-span-2 md:col-span-3 ">
            <QImages name="pictures" label="Room pictures" />
          </div>
        </div>
        <div className="mt-10">
          <FormButton buttonText="Add Room" isLoading={isLoading} />
        </div>
      </QForm>
    </div>
  );
};

export default CreateRoom;

import { useUpdateSlotMutation } from "@/redux/features/roomSlotManagement/roomSlotManagement.api";
import { TSlot } from "@/types";
import moment from "moment";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { RxCross2 } from "react-icons/rx";
import { toast } from "sonner";
import FilledButton from "../button/FilledButton";
import QDatePicker from "../form/QDatePicker";
import QForm from "../form/QForm";
import QTimePickerRange from "../form/QTimePickerRange";

type TEditSlotModalProps = {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  slotInfo:
    | (Partial<TSlot> & {
        price: number;
        capacity: number;
      })
    | null;
  setSlotInfo: React.Dispatch<
    React.SetStateAction<
      | (Partial<TSlot> & {
          price: number;
          capacity: number;
        })
      | null
    >
  >;
};

const EditSlotModal = ({
  openModal,
  setOpenModal,
  slotInfo,
  setSlotInfo,
}: TEditSlotModalProps) => {
  const [updateASlot, { isLoading }] = useUpdateSlotMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (!data?.date || !data?.time) {
      toast.error("Please select date & time for update");
      return;
    }
    const updatedData = {
      date: moment(new Date(data?.date)).format("YYYY-MM-DD"),
      startTime: moment(new Date(data?.time[0])).format("HH:mm"),
      endTime: moment(new Date(data?.time[1])).format("HH:mm"),
    };

    const payload = {
      id: slotInfo?._id,
      data: updatedData,
    };
    const loadingId = toast.loading("Slot is updating...");
    try {
      const result = await updateASlot(payload).unwrap();
      console.log(result);
      if (result.success) {
        setOpenModal(false);
        toast.success("Slot updated successfully", { id: loadingId });
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update slot", { id: loadingId });
    }
  };

  return (
    <div
      onClick={() => {
        setOpenModal(false);
        setSlotInfo(null);
      }}
      className={`fixed z-[100]  w-screen ${
        openModal ? "visible opacity-100" : "invisible opacity-0"
      } inset-0 grid place-items-center bg-black/20 backdrop-blur-sm duration-100 dark:bg-transparent`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`absolute max-w-[90%] sm:max-w-[70%] lg:max-w-[60%] rounded-lg bg-white mx-3 sm:mx-0 p-8 drop-shadow-lg dark:bg-zinc-900 dark:text-white  ${
          openModal
            ? "opacity-1 duration-300"
            : "scale-110 opacity-0 duration-150"
        }`}
      >
        <RxCross2
          onClick={() => {
            setOpenModal(false);
            setSlotInfo(null);
          }}
          size={24}
          className="absolute right-3 top-3 w-6 cursor-pointer fill-zinc-600 dark:fill-white"
        />
        <QForm onSubmit={onSubmit}>
          <div>
            <h1 className="text-3xl font-semibold mb-5 ">Update Slot</h1>
            {slotInfo && (
              <div>
                {/* Information Section */}
                <div className="mb-4 space-y-2">
                  <div className="flex space-x-5">
                    <p>
                      Slot price:
                      <span className="ml-2 font-semibold">
                        ${slotInfo?.price}
                      </span>
                    </p>
                    <p>
                      Capacity:
                      <span className="ml-2 font-semibold">
                        {slotInfo?.capacity}
                      </span>
                    </p>
                  </div>
                  <p>
                    Previous Date:{" "}
                    <span className="ml-2">{slotInfo?.date}</span>
                  </p>
                  <p>
                    Previous Slot:{" "}
                    <span className="ml-3">
                      {slotInfo?.startTime}-{slotInfo?.endTime}
                    </span>
                  </p>
                </div>
                {/* Input section */}
                <div className="grid grid-cols-2 gap-4 sm:gap-6 md:gap-8">
                  <QDatePicker
                    name="date"
                    label="Date"
                    disabledAllPreviousDate={true}
                  />
                  <QTimePickerRange name="time" label="Time" />
                </div>
              </div>
            )}
            <div className="mt-10">
              <FilledButton buttonText="Update Slot" isLoading={isLoading} />
            </div>
          </div>
        </QForm>
      </div>
    </div>
  );
};

export default EditSlotModal;

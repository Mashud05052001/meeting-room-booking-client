import { RxCross2 } from "react-icons/rx";

const EditRoomModal = ({
  openModal,
  setOpenModal,
  userID,
  setUserID,
}: {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  userID: string;
  setUserID: React.Dispatch<React.SetStateAction<string>>;
}) => {
  console.log(userID);
  return (
    <div
      onClick={() => {
        setOpenModal(false);
        setUserID("");
      }}
      className={`fixed z-[100] w-screen  ${
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
            setUserID("");
          }}
          size={24}
          className="absolute right-3 top-3 w-6 cursor-pointer fill-zinc-600 dark:fill-white"
        />
      </div>
    </div>
  );
};

export default EditRoomModal;

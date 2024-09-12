import { useUpdateUserRoleMutation } from "@/redux/features/auth/auth.api";
import { TSuccess, TUser, TUserRoleChange } from "@/types";
import { Select } from "antd";
import { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { toast } from "sonner";

const EditUserRoleModal = ({
  openModal,
  setOpenModal,
  userInfo,
  setUserInfo,
}: {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  userInfo: TUser | null;
  setUserInfo: React.Dispatch<React.SetStateAction<null>>;
}) => {
  const [userRole, setUserRole] = useState(userInfo?.role);
  const [updatedRole, setUpdatedRole] = useState("");
  const [userRoleUpdate] = useUpdateUserRoleMutation();
  useEffect(() => {
    setUserRole(userInfo?.role);
  }, [userInfo]);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (userRole === updatedRole) {
      toast.error("Please change role first");
      return;
    }
    const updatedData: TUserRoleChange = {
      email: userInfo?.email as string,
      role: updatedRole as "admin" | "user",
    };
    const loadingId = toast.loading("User role updating...");
    try {
      const result = (await userRoleUpdate(updatedData).unwrap()) as TSuccess;
      console.log(result);
      if (result.success) {
        toast.success("User role updated successfully", { id: loadingId });
        setOpenModal(false);
        setUserInfo(null);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update user role", { id: loadingId });
    }
  };
  return (
    <div
      onClick={() => {
        setOpenModal(false);
        setUserInfo(null);
      }}
      className={`fixed z-[100] w-screen ${
        openModal ? "visible opacity-100" : "invisible opacity-0"
      } inset-0 grid place-items-center bg-black/20 backdrop-blur-sm duration-100 dark:bg-transparent`}
    >
      <div
        onClick={(e_) => e_.stopPropagation()}
        className={`absolute min-w-[25rem] sm:min-w-[30rem] rounded-lg bg-white p-8 drop-shadow-lg dark:bg-zinc-900 dark:text-white ${
          openModal
            ? "opacity-1 duration-300"
            : "scale-110 opacity-0 duration-150"
        }`}
      >
        <RxCross2
          onClick={() => {
            setOpenModal(false);
            setUserInfo(null);
          }}
          size={24}
          className="absolute right-3 top-3 w-6 cursor-pointer fill-zinc-600 dark:fill-white"
        />
        <h1 className="mb-8 text-2xl font-semibold">
          Current Role : {userRole === "user" ? "User" : "Admin"}
        </h1>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <span>Name : </span>
            <span className="font-semibold">{userInfo?.name}</span>
          </div>
          <div>
            <span className="mr-1">Email : </span>
            <span className="font-semibold">{userInfo?.email}</span>
          </div>
          <div>
            <span className="mr-3">Role : </span>
            <Select
              defaultValue={userRole}
              onChange={(value) => {
                setUpdatedRole(value);
              }}
              style={{ width: "50%" }}
              options={[
                { value: "admin", label: "Admin" },
                { value: "user", label: "User" },
              ]}
            />
          </div>
          <div className="flex gap-2 pt-4">
            <button
              type="submit"
              className="rounded-md bg-[#003669] px-6 py-[6px] text-white hover:bg-[#054a8a] duration-150"
            >
              Change Role
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserRoleModal;

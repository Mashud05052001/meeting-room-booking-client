import { useChangePassowrdMutation } from "@/redux/features/auth/auth.api";
import { logout } from "@/redux/features/auth/auth.slice";
import { useAppDispatch } from "@/redux/hook";
import { TError, TSuccess } from "@/types";
import { Button } from "antd";
import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import QForm from "../form/QForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { changePasswordValidationSchema } from "@/schemas/auth.schema";
import QInput from "../form/QInput";

const ChangePasswordModal = () => {
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [changePassword, { error }] = useChangePassowrdMutation();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    delete data.confirmNewPassword;
    const loading = toast.loading("Password changing...");
    try {
      const result = (await changePassword(data).unwrap()) as TSuccess;
      if (result?.success) {
        toast.success("Password changed successfully", { id: loading });
        setOpenModal(false);
        navigate("/login");
        dispatch(logout());
      }
    } catch (error) {
      const msg = (error as TError).data.message;
      toast.error(`Password doesn't changed. ${msg}`, { id: loading });
    }
  };
  return (
    <div className="sm:mx-auto w-fit">
      <Button
        htmlType="button"
        type="text"
        size="large"
        className="border-2 border-gray-400 font-medium"
        onClick={() => setOpenModal(true)}
      >
        Change Password
      </Button>

      <div
        onClick={() => setOpenModal(false)}
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
            onClick={() => setOpenModal(false)}
            size={24}
            className="absolute right-3 top-3 w-6 cursor-pointer fill-zinc-600 dark:fill-white"
          />
          <h1 className="mb-8 text-2xl font-semibold">Changed Password</h1>
          <QForm
            onSubmit={onSubmit}
            className=" space-y-6"
            resolver={zodResolver(changePasswordValidationSchema)}
          >
            <div className="space-y-6 relative">
              <QInput name="oldPassword" label="Old Password" type="password" />
              <QInput name="newPassword" label="New Password" type="password" />
              <QInput
                name="confirmNewPassword"
                label="Confirm New Password"
                type="password"
              />
              {error && (
                <small className="absolute text-red-600 font-semibold -bottom-8">
                  {(error as TError).data.message}
                </small>
              )}
            </div>
            <div className="flex justify-end gap-2 pt-8">
              <button
                type="submit"
                // onClick={() => setOpenModal(false)}
                className="rounded-md bg-[#003669] px-6 py-[6px] text-white hover:bg-[#054a8a] duration-150"
              >
                Change Password
              </button>
            </div>
          </QForm>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordModal;

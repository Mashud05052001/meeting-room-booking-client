import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { RxCross2 } from "react-icons/rx";
import { toast } from "sonner";
import FilledButton from "../../../components/button/FilledButton";
import QForm from "../../../components/form/QForm";
import QInput from "../../../components/form/QInput";
import { useForgetPassowrdMutation } from "../../../redux/features/auth/auth.api";
import { forgetPasswordValidationSchema } from "../../../schemas/auth.schema";
import { TForgetPasswordSuccess } from "../../../types/auth.type";
import { TError } from "../../../types/reduxResponse.type";

type TForgetPasswordProps = {
  forgetPassModal: boolean;
  setForgetPassModal: Dispatch<React.SetStateAction<boolean>>;
};

const ForgetPassword = ({
  forgetPassModal,
  setForgetPassModal,
}: TForgetPasswordProps) => {
  const [forgetUserPassword, { isLoading, error }] =
    useForgetPassowrdMutation();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const loadingId = toast.loading("Request sending...");
    try {
      const result = (await forgetUserPassword(
        data
      ).unwrap()) as TForgetPasswordSuccess;

      if (result?.success) {
        toast.success(
          "An email is send successfully. Please check it and reset password withen 10 minutes.",
          { id: loadingId }
        );
        setForgetPassModal(false);
      }
    } catch (error) {
      console.log(error);
      const errorMessage = (error as TError)?.data?.message;
      toast.error(`Failed. ${errorMessage}`, { id: loadingId });
    }
  };
  return (
    <div
      onClick={() => setForgetPassModal(false)}
      className={`fixed z-[100] w-screen h-[100vh]  ${
        forgetPassModal ? "visible opacity-100" : "invisible opacity-0"
      } inset-0 grid place-items-center bg-black/20 backdrop-blur-sm duration-100 dark:bg-transparent `}
    >
      <div
        onClick={(e_) => e_.stopPropagation()}
        className={`absolute max-w-md rounded-lg bg-white min-w-[32rem] p-6 drop-shadow-lg dark:bg-zinc-900 dark:text-white ${
          forgetPassModal
            ? "opacity-1 duration-300"
            : "scale-110 opacity-0 duration-150"
        }`}
      >
        {/* Modal Close */}
        <div
          className="absolute right-6 cursor-pointer"
          onClick={() => setForgetPassModal(false)}
        >
          <RxCross2 size={20} />
        </div>
        {/* Modal Items */}
        <div>
          <QForm
            onSubmit={onSubmit}
            resolver={zodResolver(forgetPasswordValidationSchema)}
          >
            <div className="space-y-6 mx-auto">
              <div className="space-y-2">
                <h1 className="text-3xl font-semibold tracking-tight">
                  Forget Password<span className="ml-0.5">!</span>
                </h1>
                <p>Fillup this form to get a reset email.</p>
              </div>
              <QInput
                name="email"
                label="Email"
                type="email"
                placeholder="Enter your email"
              />

              {/* Error Message & Forget Password */}
              <div className="flex justify-between text-xs">
                {error ? (
                  <p className="text-red-600 font-medium ml-1 ">
                    {(error as TError)?.data?.message}'asdasdasdasd'
                  </p>
                ) : (
                  <p className="opacity-0 select-none">No error</p>
                )}
              </div>
              <div className="flex justify-start gap-2 ">
                <FilledButton isLoading={isLoading} />
              </div>
            </div>
          </QForm>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;

import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import CenterContainer from "../../../components/container/CenterContainer";
import OpacityMotion from "../../../components/motionDiv/OpacityMotion";
import QForm from "../../../components/form/QForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordValidationSchema } from "../../../schemas/auth.schema";
import QInput from "../../../components/form/QInput";
import FormButton from "../../../components/button/FormButton";
import { useNavigate, useSearchParams } from "react-router-dom";
import { TError } from "../../../types/reduxResponse.type";
import axios, { AxiosError } from "axios";
import { baseURL } from "../../../redux/api/apiBaseQuery";

const ResetPassword = () => {
  const [params] = useSearchParams();
  const userEmail = params.get("email");
  const token = params.get("token");
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const loadingId = toast.loading("Logging in...");
    try {
      const result = await axios.post(`${baseURL}/auth/reset-password`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (result.data?.success) {
        toast.success("Reset password successfull", { id: loadingId });
        navigate("/login");
      }
    } catch (error) {
      const errorMessage = ((error as AxiosError)?.response as TError)?.data
        ?.message;
      if (errorMessage === "jwt expired") {
        toast.error(
          `Failed. Your url has been expired. Again request for reset password`,
          {
            id: loadingId,
          }
        );
        navigate("/login");
      } else {
        toast.error(`Failed. ${errorMessage ? errorMessage : ""}`, {
          id: loadingId,
        });
      }
    }
  };

  return (
    <CenterContainer className="w-[100vw] top-1/3">
      <OpacityMotion>
        <QForm
          onSubmit={onSubmit}
          resolver={zodResolver(resetPasswordValidationSchema)}
          defaultValues={{ email: userEmail }}
        >
          <div className="space-y-6 mx-auto w-96 sm:w-8/12 md:w-1/2 lg:w-5/12 rounded-lg border bg-white p-7 shadow-lg sm:p-10 dark:border-zinc-700 dark:bg-zinc-900 border-common-300">
            <h1 className="text-3xl font-semibold tracking-tight">
              Reset Password
            </h1>
            <QInput name="email" label="Email" type="email" disabled={true} />
            <QInput
              name="password"
              label="Password"
              type="password"
              placeholder="Enter your new password"
            />

            {/* Error Message & Forget Password */}
            {/* <div className="flex justify-between text-xs">
              {error ? (
                <p className="text-red-600 font-medium ml-1">
                  {(error as TError)?.data?.message}
                </p>
              ) : (
                <p className="opacity-0 select-none">No error</p>
              )}
              <a
                href="#"
                className="text-zinc-700 hover:underline dark:text-zinc-300"
              >
                Forgot Password?
              </a>
            </div> */}

            <FormButton isLoading={false} buttonText="Reset Password" />
          </div>
        </QForm>
      </OpacityMotion>
    </CenterContainer>
  );
};

export default ResetPassword;

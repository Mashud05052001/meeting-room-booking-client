import { FieldValues, SubmitHandler } from "react-hook-form";
import CenterContainer from "../../../components/container/CenterContainer";
import QForm from "../../../components/form/QForm";
import QInput from "../../../components/form/QInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginValidationSchema } from "../../../schemas/auth.schema";
import { useLoginMutation } from "../../../redux/features/auth/auth.api";
import { TLoginRegisterSuccess } from "../../../types/auth.type";
import { decodeToken } from "../../../utils/function";
import { setUser, TAuthState } from "../../../redux/features/auth/auth.slice";
import { useAppDispatch } from "../../../redux/hook";
import { TError } from "../../../types/reduxResponse.type";
import FilledButton from "../../../components/button/FilledButton";
import { toast } from "sonner";
import { Link, useLocation, useNavigate } from "react-router-dom";
import OpacityMotion from "../../../components/motionDiv/OpacityMotion";
import { useState } from "react";
import ForgetPassword from "../passwordRecovery/ForgetPassword";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [forgetPassModal, setForgetPassModal] = useState(false);
  const [loginUser, { isLoading: isLoginLoading, error }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const from =
    location.state?.returnUrl || location.state?.from?.pathname || "/";

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const loadingId = toast.loading("Logging in...");
    try {
      const result = (await loginUser(data).unwrap()) as TLoginRegisterSuccess;
      if (result?.success) {
        const token = result.token;
        const user = decodeToken(token);
        const authData: TAuthState = { token, user };
        dispatch(setUser(authData));
        toast.success("Logged in successfully", { id: loadingId });
        navigate(from);
      }
    } catch (error) {
      console.log(error);
      const errorMessage = (error as TError)?.data?.message;
      toast.error(`Failed. ${errorMessage}`, { id: loadingId });
    }
  };

  return (
    <div>
      <CenterContainer className="w-[100vw]">
        <OpacityMotion>
          <QForm
            onSubmit={onSubmit}
            resolver={zodResolver(loginValidationSchema)}
          >
            <div className="space-y-6 mx-auto w-96 sm:w-8/12 md:w-1/2 lg:w-5/12 rounded-lg border bg-white p-7 shadow-lg sm:p-10 dark:border-zinc-700 dark:bg-zinc-900 border-common-300">
              <h1 className="text-3xl font-semibold tracking-tight">Login</h1>
              <QInput
                name="email"
                label="Email"
                type="email"
                placeholder="Enter your email"
              />
              <QInput
                name="password"
                label="Password"
                type="password"
                placeholder="Enter your password"
              />

              {/* Error Message & Forget Password */}
              <div className="flex justify-between text-xs">
                {error ? (
                  <p className="text-red-600 font-medium ml-1">
                    {(error as TError)?.data?.message}
                  </p>
                ) : (
                  <p className="opacity-0 select-none">No error</p>
                )}
                <p
                  onClick={() => setForgetPassModal(true)}
                  className="text-zinc-700 hover:underline dark:text-zinc-300"
                >
                  Forgot Password?
                </p>
              </div>

              <FilledButton isLoading={isLoginLoading} />

              <p className="text-center text-sm text-zinc-700 dark:text-zinc-300">
                Don&apos;t have an account?
                <Link to="/signup" className="font-semibold underline ml-1">
                  Signup
                </Link>
              </p>
            </div>
          </QForm>
        </OpacityMotion>
      </CenterContainer>
      <ForgetPassword
        forgetPassModal={forgetPassModal}
        setForgetPassModal={setForgetPassModal}
      />
    </div>
  );
};

export default Login;

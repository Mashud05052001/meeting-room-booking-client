import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import FilledButton from "../../../components/button/FilledButton";
import CenterContainer from "../../../components/container/CenterContainer";
import QForm from "../../../components/form/QForm";
import QInput from "../../../components/form/QInput";
import { userRolesObj } from "../../../constant/auth.constant";
import { useSignupMutation } from "../../../redux/features/auth/auth.api";
import { setUser, TAuthState } from "../../../redux/features/auth/auth.slice";
import { useAppDispatch } from "../../../redux/hook";
import { signupValidationSchema } from "../../../schemas/auth.schema";
import { TLoginRegisterSuccess } from "../../../types/auth.type";
import { TError } from "../../../types/reduxResponse.type";
import { decodeToken } from "../../../utils/function";
import OpacityMotion from "../../../components/motionDiv/OpacityMotion";

const Signup = () => {
  const [signupUser, { isLoading: isSignupLoading, error }] =
    useSignupMutation();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...signupUserData } = data;
    signupUserData["role"] = userRolesObj.user;
    const loadingId = toast.loading("User registering...");
    try {
      const result = (await signupUser(
        signupUserData
      ).unwrap()) as TLoginRegisterSuccess;
      if (result?.success) {
        const token = result.token;
        const user = decodeToken(token);
        const authData: TAuthState = { token, user };
        dispatch(setUser(authData));
        toast.success("User registered successfull", { id: loadingId });
        navigate(from);
      }
    } catch (error) {
      const errorMessage = (error as TError)?.data?.message;
      toast.error(`Failed. ${errorMessage}`, { id: loadingId });
    }
  };
  return (
    <CenterContainer className="w-[100vw]">
      <OpacityMotion>
        <QForm
          onSubmit={onSubmit}
          resolver={zodResolver(signupValidationSchema)}
        >
          <div className="space-y-6 mx-auto w-96 sm:w-8/12 md:w-1/2 lg:w-5/12 rounded-lg border bg-white p-7 shadow-lg sm:p-10 dark:border-zinc-700 dark:bg-zinc-900 border-common-300">
            <h1 className="text-3xl font-semibold tracking-tight">Sign UP</h1>
            <div className="grid grid-cols-2 gap-x-4 gap-y-6">
              <QInput
                name="name"
                label="Name"
                type="text"
                placeholder="Enter your name"
              />
              <QInput
                name="email"
                label="Email"
                type="email"
                placeholder="Enter your email"
              />
              <QInput
                name="phone"
                label="Phone"
                type="text"
                placeholder="Enter your mobile no"
              />
              <QInput
                name="password"
                label="Password"
                type="password"
                placeholder="Enter your password"
              />
              <QInput
                name="confirmPassword"
                label="Confirm password"
                type="password"
                placeholder="Enter your password"
              />
              <QInput
                name="address"
                label="Address"
                type="textarea"
                placeholder="Enter your address"
                className="col-span-2"
              />
            </div>
            {/* Error Message & Forget Password */}
            {error ? (
              <p className="text-red-600 font-medium ml-1">
                {(error as TError)?.data?.message}
              </p>
            ) : (
              <p className="opacity-0 select-none">No error</p>
            )}

            <FilledButton isLoading={isSignupLoading} />

            <p className="text-center text-sm text-zinc-700 dark:text-zinc-300">
              Already have an account!
              <Link to="/login" className="font-semibold underline ml-1">
                Login
              </Link>
            </p>
          </div>
        </QForm>
      </OpacityMotion>
    </CenterContainer>
  );
};

export default Signup;

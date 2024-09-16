import FilledButton from "@/components/button/FilledButton";
import QForm from "@/components/form/QForm";
import QInput from "@/components/form/QInput";
import MainLoading from "@/components/loading/MainLoading";
import ChangePasswordModal from "@/components/modal/ChangePasswordModal";
import useUserInfoFromToken from "@/hook/useUserInfoFromToken";
import {
  useGetUserQuery,
  useUpdateUserMutation,
} from "@/redux/features/auth/auth.api";
import { TSuccess } from "@/types/reduxResponse.type";
import { generateSingleImageURL } from "@/utils/generateImageUrl";
import { Button, Upload } from "antd";
import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { toast } from "sonner";

type TFormValues = {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
};
const Profile = () => {
  const userInfo = useUserInfoFromToken();
  const [isEdit, setIsEdit] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [profileImageFile, setProfileImageFile] = useState<any | null>(null);

  const { data: userData, isLoading } = useGetUserQuery({
    email: userInfo?.email as string,
  });
  const [updateProfile] = useUpdateUserMutation();

  const user = userData?.data;
  const defaultFormValue: TFormValues = {
    name: user?.name,
    email: user?.email,
    phone: user?.phone,
    address: user?.address,
  };
  const userImageText =
    userInfo?.role === "user" ? "U" : userInfo?.role === "admin" ? "A" : "S.A";

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const loadingId = toast.loading("Profile is updating...");
    // Check if any data has changed
    const changedData = Object.keys(data).reduce((acc, key) => {
      const k = key as keyof TFormValues;
      if (data[k] !== defaultFormValue[k]) acc[key] = data[key];
      return acc;
    }, {} as Record<string, string>);

    // If no changes and no new profile image, show an error
    if (Object.keys(changedData).length === 0 && profileImageFile === null) {
      toast.error("Please change anything before updating!");
      return;
    }
    let profilePicture = "";
    if (profileImageFile) {
      profilePicture = await generateSingleImageURL(profileImageFile);
    }
    const updatedData: Record<string, unknown> = {
      ...changedData,
      email: user?.email,
    };
    if (profilePicture) updatedData.profilePicture = profilePicture;
    console.log(updatedData);
    try {
      const result = (await updateProfile(updatedData).unwrap()) as TSuccess;
      if (result?.success)
        toast.success("Profile update successfully", { id: loadingId });
      setIsEdit(false);
    } catch (error) {
      console.log(error);
      toast.error("Profile update failed.", { id: loadingId });
    }
  };

  if (isLoading) {
    return <MainLoading />;
  }
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-14 border-2 relative">
      {!isEdit && (
        <div
          className="absolute -top-3.5 -right-2.5 bg-white hover:cursor-pointer hover:text-[#1677ff] duration-100 "
          onClick={() => setIsEdit(true)}
        >
          <MdEdit size={28} />
        </div>
      )}

      <p className="text-6xl font-semibold -mt-[3.65rem] text-gray-600 mb-14 w-fit bg-white px-3">
        Profile
      </p>
      <div className="flex flex-col-reverse sm:flex-row sm:justify-between sm:space-x-2 md:space-x-8">
        <QForm
          onSubmit={onSubmit}
          defaultValues={defaultFormValue}
          className="w-full"
        >
          <div className="space-y-5 w-full">
            <div className="font-semibold space-y-3">
              <label className="text-gray-500">USER NAME</label>
              {isEdit ? (
                <QInput name="name" type="text" />
              ) : (
                <p className="text-xl pl-2">{user?.name}</p>
              )}
            </div>
            <div className="font-semibold space-y-3">
              <label className="text-gray-500">EMAIL</label>
              <p className="text-xl pl-2">{user?.email}</p>
            </div>
            <div className="font-semibold space-y-3">
              <label className="text-gray-500">ADDRESS</label>
              {isEdit ? (
                <QInput name="address" type="textarea" />
              ) : (
                <p className="text-xl pl-2">{user?.address}</p>
              )}
            </div>
            <div className="font-semibold space-y-3">
              <label className="text-gray-500">PHONE NO.</label>
              {isEdit ? (
                <QInput name="phone" type="text" />
              ) : (
                <p className="text-xl pl-2">{user?.phone}</p>
              )}
            </div>
            {isEdit && (
              <div>
                <div className="font-semibold space-y-3">
                  <label className="text-gray-500">Profile Picture.</label>
                  <div>
                    <Upload
                      accept="image/*"
                      listType="picture"
                      maxCount={1}
                      beforeUpload={() => {
                        return false;
                      }}
                      onChange={({ file }) => {
                        let image = null;
                        if (!file?.status) image = file;
                        setProfileImageFile(image);
                      }}
                    >
                      <Button icon={<FaCloudUploadAlt />}>
                        Image (Max: 1)
                      </Button>
                    </Upload>
                  </div>
                </div>
                <div className="mt-10 space-x-4">
                  <Button
                    htmlType="button"
                    type="text"
                    size="large"
                    className="border-2 border-gray-400 font-medium"
                    onClick={() => setIsEdit(false)}
                  >
                    Cancle
                  </Button>
                  <FilledButton
                    buttonText="Save"
                    className="border-2 px-8 font-medium"
                  ></FilledButton>
                </div>
              </div>
            )}
          </div>
        </QForm>
        <div className="mb-10">
          {user && (
            <div>
              <div className="w-40 h-40 p-1 rounded-lg border-2 flex items-center justify-center">
                {user?.profilePicture ? (
                  <img
                    src={user?.profilePicture}
                    alt={`${user?.name}'s profile`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <span className="text-gray-500 text-5xl">
                    {userImageText}
                  </span>
                )}
              </div>
            </div>
          )}
          <div className="mt-3 sm:block hidden">
            <ChangePasswordModal />
          </div>
        </div>
      </div>

      {!isEdit && (
        <div className="mt-10 sm:hidden">
          <ChangePasswordModal />
        </div>
      )}
    </div>
  );
};

export default Profile;

import EditUserRoleModal from "@/components/modal/EditUserRoleModal";
import { userRolesObj } from "@/constant/auth.constant";
import { useGetAllUsersQuery } from "@/redux/features/auth/auth.api";
import type { TableColumnsType } from "antd";
import { Table } from "antd";
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { MdAdminPanelSettings, MdEdit } from "react-icons/md";
import { RiAdminFill } from "react-icons/ri";

type TAllUsersType = {
  key: string;
  image: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  address: string;
};

const Dashboard = () => {
  const [openModal, setOpenModal] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  const columns: TableColumnsType<TAllUsersType> = [
    {
      width: "1%",
      title: "Picture",
      dataIndex: "image",
      render: (imageUrl, userInfo) => {
        if (!imageUrl) {
          const role = userInfo?.role;
          const msg =
            role === userRolesObj.admin
              ? "A"
              : role === userRolesObj?.superAdmin
              ? "S.A"
              : "U";
          return (
            <div className="flex items-center justify-center text-white text-xl font-semibold size-10 rounded-full bg-slate-500">
              {msg}
            </div>
          );
        }
        return (
          <img src={imageUrl} alt="Image" className="w-10 h-10 rounded-full" />
        );
      },
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Role",
      dataIndex: "role",
      render: (role) => {
        const icon =
          role === userRolesObj.superAdmin ? (
            <MdAdminPanelSettings size={25} />
          ) : role === userRolesObj.admin ? (
            <RiAdminFill size={25} />
          ) : (
            <FaUser size={20} />
          );
        const msg =
          role === userRolesObj.admin
            ? "Admin"
            : role === userRolesObj?.superAdmin
            ? "S.Admin"
            : "User";

        return (
          <div className={`flex items-center gap-2`}>
            {icon}
            <p className="font-medium">{msg}</p>
          </div>
        );
      },
    },
    {
      title: "Action",
      key: "operation",
      render: (userInfo) => {
        const role = userInfo?.role;
        if (role === userRolesObj.user || role === userRolesObj.admin) {
          return (
            <div className="bg-white hover:cursor-pointer hover:text-[#1677ff] duration-100">
              <MdEdit
                size={25}
                onClick={() => {
                  setUserInfo(userInfo);
                  setOpenModal(true);
                }}
              />
            </div>
          );
        }
      },
    },
  ];

  const { data: allUsers, isLoading: usersDataLoading } =
    useGetAllUsersQuery(undefined);
  const usersTableData: TAllUsersType[] =
    allUsers?.data.map((item) => ({
      key: item._id,
      image: item.profilePicture,
      name: item.name,
      email: item.email,
      role: item.role,
      phone: item.phone,
      address: item.address,
    })) || [];
  return (
    <div className="mt-10">
      <h1 className="text-3xl font-semibold mb-5 ml-3">All Users</h1>
      <Table
        columns={columns}
        dataSource={usersTableData}
        pagination={false}
        loading={usersDataLoading}
      />
      <div
        className={`${
          openModal ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <EditUserRoleModal
          openModal={openModal}
          setOpenModal={setOpenModal}
          userInfo={userInfo}
          setUserInfo={setUserInfo}
        />
      </div>
    </div>
  );
};

export default Dashboard;

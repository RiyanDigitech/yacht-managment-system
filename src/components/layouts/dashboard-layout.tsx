import { useState, useEffect } from "react";
import { MdDashboard, MdGppGood } from "react-icons/md";
import { CustomerServiceOutlined, MenuFoldOutlined, MenuUnfoldOutlined,UserOutlined } from "@ant-design/icons";
import { MdReceipt } from "react-icons/md";
import { IoSettingsSharp } from "react-icons/io5";
import { FaStar } from "react-icons/fa";
import { GiLevelFour, GiShipBow } from "react-icons/gi";

import { Input, Layout, Menu, theme, Dropdown, MenuProps } from "antd";
import {  Outlet, useLocation, useNavigate } from "react-router-dom";
import "../../index.css";
import tokenService from "@/services/token.service";
import AuthService from "@/services/auth.service";
const { Header, Sider, Content } = Layout;


const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState("");

  const [see, setSee] = useState(true);
  // const [lastPersonData, setLastPersonData] = useState("");
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const {
    token: { colorPrimary },
  } = theme.useToken();

 
  const getSiderWidth = () => {
    if (!see && collapsed) return 0;
    if (see && collapsed) return 70;
    if (see && !collapsed) return 240;
    if (!see && !collapsed) return 70;
    return 220;
  };

  const getMarginLeft = () => {
    if (!see && collapsed) return "ml-0";
    if (see && collapsed) return "ml-[73px] mr-[0px]";
    if (see && !collapsed && currentPage !== "Account Details")
      return "ml-[235px] mr-[0px]";
    if (see && !collapsed && currentPage === "Account Details")
      return "ml-[5px] mr-[0px]";
    if (!see && !collapsed) return "ml-[69px]";
    return "ml-[220px]";
  };

  const handleButtonClick = () => {
    navigate("/account-details");
  };
  console.log(see, collapsed);
 
  const items: MenuProps["items"] = [
    // {
    //   key: "",
    //   // label: (
    //     // <div
    //     //   className="flex justify-center cursor-default"
    //     //   // onClick={HomeNavigate}
    //     // >
    //     //   <img src="/profile.png" className="h-10 w-10 rounded-full" alt="" />
    //     // </div>
      // ),
    //   disabled: true,
    // },

    {
      key: "3",
      label: (
        <div className="">
          <button
            // onClick={ChangePassword}
            className="mx-auto flex justify-center font-manrope text-xs  font-semibold"
          >
            Change Password
          </button>
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div className="">
          <button
            onClick={() => logoutMutation.mutate()}
            className="mx-auto flex justify-center font-manrope text-xs  font-semibold"
          >
            LogOut
          </button>
        </div>
      ),
    },
  ];
  const { useFetchTargetedAdmin, useHandleLogout } = AuthService();
  const logoutMutation = useHandleLogout();

  const { data } = useFetchTargetedAdmin();

  console.log("admin data", data?.data);
  return (
    <>
      {" "}
      <Layout className="">
        <Sider
          className={`transition-all duration-300 h-full hide-scrollbar `}
          trigger={null}
          width={getSiderWidth()}
          style={{
            overflowY: "auto",

            position: "fixed",
            left: 0,
            background: colorPrimary,
            zIndex: 1000,
          }}
          collapsible
        >
          {getSiderWidth() > 70 && (
            <div className="flex justify-center items-center opacity-100 h-14 w-45 mt-3 ml-5 ">
              <img
                className=""
                src={"/smartchoice.png"}
                alt="logo"
              />
            </div>
          )}{" "}
          {getSiderWidth() > 70 && (
            <div className="w-full flex  items-center opacity-100 h-17 ml-8 text-[#64748B] font-DMSans">
              MAIN MENU
            </div>
          )}
          {getSiderWidth() === 70 && (
            <div className="w-full flex justify-center items-center bg-[#d4d4d4]">
              <img
                className="py-5 h-19 w-15 object-contain"
                src={"/smartchoice.png"}
                alt="logo"
              />
            </div>
          )}
         {tokenService?.getUserRoleFromCookie() === "Owner" ? (
  <>
    <Menu
      className="mb-[80px] ant-dashboard-layout"
      style={{ background: colorPrimary }}
      mode={!see || (see && collapsed) ? "vertical" : "inline"}
      selectedKeys={[pathname.startsWith("/dashboard") ? "/dashboard" : pathname]}
      onClick={({ key }) => navigate(key)}
      items={[
        {
          key: "/dashboard",
          icon: (
            <MdDashboard
              className={` ${
                collapsed || !see ? "ml-1 h-[20px] w-[20px] mr-5" : ""
              }`}
            />
          ),
          label: <div className="text-textcolor">Dashboard</div>,
        },
        {
          key: "/yacht",
          icon: (
            <GiShipBow
              className={`${
                collapsed || !see ? "ml-1 h-[20px] w-[20px] mr-5" : ""
              }`}
            />
          ),
          label: <div className="text-textcolor">Yacht</div>,
        },
        {
          key: "/addons",
          icon: (
            <FaStar
              className={`${
                collapsed || !see ? "ml-1 h-[20px] w-[20px] mr-5" : ""
              }`}
            />
          ),
          label: <div className="text-textcolor">Addons</div>,
        },
        {
          key: "/blockedperiods",
          icon: (
            <IoSettingsSharp
              className={`${
                collapsed || !see ? "ml-1 h-[20px] w-[20px] mr-5" : ""
              }`}
            />
          ),
          label: <div className="text-textcolor">Maintenance</div>,
        },
        {
          key: "/bookings",
          icon: (
            <MdReceipt
              className={`${
                collapsed || !see ? "ml-1 h-[20px] w-[20px] mr-5" : ""
              }`}
            />
          ),
          label: <div className="text-textcolor">Bookings</div>,
        },
        {
          key: "/customers",
          icon: (
            <CustomerServiceOutlined
              className={`${
                collapsed || !see ? "ml-1 h-[20px] w-[20px] mr-5" : ""
              }`}
            />
          ),
          label: <div className="text-textcolor">Customers</div>,
        },
        {
          key: "/incentivelevels",
          icon: (
            <GiLevelFour
              className={`${
                collapsed || !see ? "ml-1 h-[20px] w-[20px] mr-5" : ""
              }`}
            />
          ),
          label: <div className="text-textcolor">Incentive Levels</div>,
        },
        {
          key: "/users",
          icon: (
            <UserOutlined
              className={`${
                collapsed || !see ? "ml-1 h-[20px] w-[20px] mr-5" : ""
              }`}
            />
          ),
          label: <div className="text-textcolor">Users</div>,
        },
        {
          key: "/facilities",
          icon: (
            <MdGppGood
              className={`${
                collapsed || !see ? "ml-1 h-[20px] w-[20px] mr-5" : ""
              }`}
            />
          ),
          label: <div className="text-textcolor">Facilities</div>,
        },
      ]}
    />
  </>
) : (
  <>
    <Menu
      className="mb-[80px] ant-dashboard-layout"
      style={{ background: colorPrimary }}
      mode={!see || (see && collapsed) ? "vertical" : "inline"}
      selectedKeys={[pathname.startsWith("/dashboard") ? "/dashboard" : pathname]}
      onClick={({ key }) => navigate(key)}
      items={[
        {
          key: "/dashboard",
          icon: (
            <MdDashboard
              className={` ${
                collapsed || !see ? "ml-1 h-[20px] w-[20px] mr-5" : ""
              }`}
            />
          ),
          label: <div className="text-textcolor">Dashboard</div>,
        },
        {
          key: "/bookings",
          icon: (
            <MdReceipt
              className={`${
                collapsed || !see ? "ml-1 h-[20px] w-[20px] mr-5" : ""
              }`}
            />
          ),
          label: <div className="text-textcolor">Bookings</div>,
        },
      ]}
    />
  </>
)}

        </Sider>
        {getSiderWidth() > 70 && currentPage === "Account Details" && (
          <>
            <div className="z-99999 ml-[239px] ">
              <div className="text-textcolor font-bold py-5 ml-4  text-2xl">
                Setting
              </div>{" "}
              <div className="border-b-[1px] w-10/12 mx-auto ">
                <Input
                  // size="large"
                  placeholder="Search in setting"
                  prefix={<img src="/preffixsearch.png" />}
                  className="border-none bg-[#f8fafc] pl-2"
                />
              </div>
              <div
                onClick={handleButtonClick} // Add navigation here
                className={`flex items-center mt-8 mx-auto   w-10/12 p-3 cursor-pointer ${
                  currentPage === "Account Details" ? "bg-[#e2e8f0]" : ""
                }`}
              >
                <span className="ml-0">
                  <img src="man.png" alt="" />
                </span>
                <div
                  className={`ml-2 text-[#1E293B] font-DMSans
                }`}
                >
                  Accounts Details
                </div>
              </div>{" "}
              <div
                className={`flex items-center mt-2 mx-auto   w-10/12 p-3 cursor-pointer `}
              >
                <span className="ml-0">
                  <img src="security.png" alt="" />
                </span>
                <div
                  className={`ml-2 text-[#1E293B] font-DMSans
                }`}
                >
                  Security
                </div>
              </div>{" "}
              <div
                className={`flex items-center mx-auto   w-10/12 p-3 cursor-pointer `}
              >
                <span className="ml-0">
                  <img src="notifications.png" alt="" />
                </span>
                <div
                  className={`ml-2 text-[#1E293B] font-DMSans
                }`}
                >
                  Notification
                </div>
              </div>{" "}
              <div
                className={`flex items-center mx-auto   w-10/12 p-3 cursor-pointer `}
              >
                <span className="ml-0">
                  <img src="billing.png" alt="" />
                </span>
                <div
                  className={`ml-2 text-[#1E293B] font-DMSans
                }`}
                >
                  Plan & Billing
                </div>
              </div>
            </div>
          </>
        )}{" "}
        <Layout>
          <Header
            className={`flex  items-center  ${getMarginLeft()} transition-all duration-300`}
            style={{
              paddingLeft: 6,
              paddingRight: 12,
            }}
          >
            <button
              className="mx-3 text-lg"
              onClick={() => setCollapsed(!collapsed)}
            >
              {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </button>
            <div className=" w-full flex justify-end items-center sm:justify-between">
              <div className="font-DMSans text-textcolor font-bold text-lg max-sm:hidden">
                {currentPage === "Lead" ? "Lead List" : currentPage}
              </div>
              <div className=" w-8/12 sm:w-3/12 lg:w-80 flex items-end justify-end">
                {currentPage !== "Account Details" ? (
                  <>
                    {" "}
                    
                  </>
                ) : (
                  ""
                )}

                <Dropdown className=" " menu={{ items }} placement="top" arrow>
                  <div className="flex items-center cursor-pointer">
                    <div>
                      <img
                        src="/UserProfile.png"
                        className="rounded-full h-10 w-10 border border-black-2"
                        alt="img"
                      />
                    </div>
                    <div className="leading-5 ml-2">
                      <div className="font-bold">{data?.data?.username}</div>
                      <div className={`${see ? "flex" : "hidden"}`}>
                        {data?.data?.email.slice(0, 10)}
                      </div>
                    </div>
                  </div>
                </Dropdown>
              </div>
            </div>
          </Header>
          <Content
            className={`${getMarginLeft()} transition-all duration-300 `}
            style={{
              // paddingLeft: 18,
              minHeight: "100vh",
              backgroundColor: "#f8fafc",
              // paddingTop: 12,
            }}
          >
            <Outlet />
          </Content>{" "}
        </Layout>
      </Layout>{" "}
   
    </>
  );
};

export default DashboardLayout;

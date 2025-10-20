import { Dropdown, Menu, message, Modal, Spin, Table } from "antd";
import {

    DeleteOutlined,
  EditOutlined,
  //EditOutlined,
  LoadingOutlined,
  MoreOutlined,

} from "@ant-design/icons";
import { useState } from "react";
import UserService from "@/services/user-service/UserService";
import CreateUserModal from "./CreateUser";
import UpdateUserModal from "./UpdateUser";


function UserTable() {
  const [open, setOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<boolean>(false);
  const [editingUserData, setEditingUserData] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { useGetUsers,useDeleteUser  } = UserService();
  const { data: users, isLoading } = useGetUsers( page, pageSize);
  
  const deleteUser = useDeleteUser();

  const handleDelete = (id: number, callbacks?: any) => {
  if (!id) return;

  deleteUser.mutate(
    { id },
    {
      onSuccess: (res) => {
        if (res?.success) {
          message.success(res.message || "Deleted successfully");
          callbacks?.onSuccess?.();
        } else {
          message.error(res?.message || "Failed to delete Incentive");
          callbacks?.onError?.();
        }
      },
      onError: (err: any) => {
        message.error(err?.response?.data?.message || "Delete request incentive");
        callbacks?.onError?.();
      },
    }
  );
  };


const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    width: 70,
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
 
  {
    title: "Phone",
    dataIndex: "phone",
    key: "phone",
    render: (value: any) => value || <span className="">—</span>,
  },
  {
    title: "MobileVerifiedAt",
    dataIndex: "mobile_verified_at",
    key: "mobile_verified_at",
    render: (value: any) => value || <span className="">—</span>,
  },
  {
    title: "IncentiveLevelId",
    dataIndex: "incentive_level_id",
    key: "incentive_level_id",
    render: (value: any) => value || <span className="">—</span>,
  },
  {
    title: "CeoSpecialApproval",
    dataIndex: "ceo_special_approval",
    key: "ceo_special_approval",
    render: (value: any) => value || <span className="">—</span>,
  },

  {
    title: "Role",
    dataIndex: "roles",
    key: "role_name",
    render: (roles: any[]) =>
      roles && roles.length > 0
        ? roles.map((role) => role.name).join(", ")
        : <span className="">—</span>,
  },

  // {
  //   title: "is_active",
  //   dataIndex: "is_active",
  //   key: "is_active",
  // },

    // {
    //   title: "Created At",
    //   dataIndex: "created_at",
    //   key: "created_at",
    //   render: (text: string) =>
    //     new Date(text).toLocaleString("en-GB", {
    //       day: "2-digit",
    //       month: "short",
    //       year: "numeric",
    //       hour: "2-digit",
    //       minute: "2-digit",
    //       hour12: true,
    //     }),
    // },
    
    // {
    //   title: "Updated At",
    //   dataIndex: "updated_at",
    //   key: "updated_at",
    //   render: (text:string) =>
    //     new Date(text).toLocaleString("en-GB", {
    //       day: "2-digit",
    //       month: "short",
    //       year: "numeric",
    //       hour: "2-digit",
    //       minute: "2-digit",
    //       hour12: true,
    //     }),
    // },

 
  {
    title: "Actions",
    key: "actions",
    render: (_: any, record: any) => (
      <Dropdown
        overlay={
          <Menu>
            <Menu.Item
              key="edit"
              icon={<EditOutlined />}
              onClick={() => {
                setEditingUserData(record); 
                setEditingUser(true);
                setOpen(false);
              }}
            >
              Edit
            </Menu.Item> 

            <Menu.Item
              key="delete"
              icon={<DeleteOutlined />}
              danger
              onClick={() => {
                Modal.confirm({
                  title: "Confirm Deletion",
                  content: `Are you sure you want to delete "${record.name}"?`,
                  okText: "Yes",
                  cancelText: "No",
                  okButtonProps: {
                    className: "bg-green-600 text-white hover:!bg-green-700",
                  },
                  onOk: () =>
                    new Promise((resolve, reject) => {
                      handleDelete(record.id, {
                        onSuccess: () => resolve(null),
                        onError: (err: any) => reject(err),
                      });
                    }),
                });
              }}
            >
              Delete
            </Menu.Item> 
          </Menu>
        }
        trigger={["click"]}
      >
        <MoreOutlined className="text-lg cursor-pointer" />
      </Dropdown>
    ),
  },
];


  const antIcon = (
    <LoadingOutlined style={{ fontSize: 40, color: "#00a1b3" }} spin />
  );

  return (
    <div className="p-4   rounded-[10px] ">
      
      <div className="flex justify-end ">
           <button className="bg-[#00a1b3] text-white py-2 px-3 rounded-lg" 
           onClick={() => setOpen(true)} 
           >
                Create User</button>
        
      </div>
      <Spin
        spinning={isLoading}
        tip="Loading..."
        size="large"
        indicator={antIcon}
      >
        <div className="overflow-x-auto">
          <Table
            columns={columns}
            dataSource={users?.data || []}
            pagination={{
              current: users?.data?.page || page,
              pageSize: pageSize,
              total: users?.data?.total || 0,
              showSizeChanger: true,
              onChange: (p, ps) => {
                setPage(p);
                setPageSize(ps);
              },
            }}
            rowKey="id"
            bordered={false}
            className="custom-table min-w-[800px]"
          />
        </div>
      </Spin>
       <CreateUserModal isOpen={open} onClose={() => setOpen(false)} />
      <UpdateUserModal
        open={editingUser}
        userData={editingUserData}
        onClose={() => setEditingUser(false)}
      />  
    </div>
  );
}

export default UserTable;

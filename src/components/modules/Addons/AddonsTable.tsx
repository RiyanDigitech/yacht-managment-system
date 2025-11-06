import {  Dropdown, Menu, message, Modal, Spin, Table } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  LoadingOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import AddonsService from "@/services/addons-service/AddonsService";
import CreateAddonsModal from "./CreateAddonsModal";
import UpdateAddonsModal from "./UpdateAddonsModal";



function AddonsTable() {
  const [open, setOpen] = useState(false);
  const [editingAddons, setEditingAddons] = useState<boolean>(false);
  const [editingAddonData, setEditingAddonData] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { useGetAddons,useDeleteAddons } = AddonsService();
  const { data:addons, isLoading } = useGetAddons( page, pageSize);
  //console.log("addons", addons);
  const deleteAddons = useDeleteAddons();

  const handleDelete = (id: number, callbacks?: any) => {
  if (!id) return;

  deleteAddons.mutate(
    { id },
    {
      onSuccess: (res) => {
        if (res?.success) {
          message.success(res.message || "Deleted successfully");
          callbacks?.onSuccess?.();
        } else {
          message.error(res?.message || "Failed to delete addons");
          callbacks?.onError?.();
        }
      },
      onError: (err: any) => {
        message.error(err?.response?.data?.message || "Delete request failed");
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
    title: "Description",
    dataIndex: "description",
    key: "description",
    render: (value: any) => value || <span className="">—</span>,
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
  },
  // {
  //   title: "is_active",
  //   dataIndex: "is_active",
  //   key: "is_active",
  // },

    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
      render: (text: string) =>
        new Date(text).toLocaleString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
    },
    
    {
      title: "Updated At",
      dataIndex: "updated_at",
      key: "updated_at",
      render: (text:string) =>
        new Date(text).toLocaleString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
    },

 
  {
    title: "Actions",
    key: "actions",
    render: (_: string, record: string) => (
      <Dropdown
        overlay={
          <Menu>
            <Menu.Item
              key="edit"
              icon={<EditOutlined />}
              onClick={() => {
                setEditingAddonData(record); 
                setEditingAddons(true);
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
    <div className="p-4  rounded-[10px] ">
      
      <div className="flex justify-end">
           <button className="bg-[#00a1b3] text-white py-2 px-3 rounded-lg" 
           onClick={() => setOpen(true)} 
           >
                Create Addons</button>
        
      </div>
      <Spin
        spinning={isLoading}
        tip="Loading..."
        size="large"
        indicator={antIcon}
      >
        <div className="overflow-x-auto pt-7">
          <Table
            columns={columns}
            dataSource={addons?.data || []}
            pagination={{
              current: addons?.data?.page || page,
              pageSize: pageSize,
              total: addons?.data?.total || 0,
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
      <CreateAddonsModal isOpen={open} onClose={() => setOpen(false)} />
      <UpdateAddonsModal
        open={editingAddons}
        userData={editingAddonData}
        onClose={() => setEditingAddons(false)}
      />
    </div>
  );
}

export default AddonsTable;

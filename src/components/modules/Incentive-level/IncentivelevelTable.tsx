import { Dropdown, Menu, message, Modal, Spin, Table } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  LoadingOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import IncentiveService from "@/services/incentive-level-service/IncentiveLevelService";
import CreateIncentiveModal from "./CreateIncentiveModal";
import UpdateIncentiveModal from "./UpdateIncentive";
import AssignIncentiveModal from "./AssignIncentiveModal";

function IncentiveLevelTable() {
  const [open, setOpen] = useState(false);
  const [openincentive, setIncentiveOpen] = useState(false);
  const [editingIncentive, setEditingIncentive] = useState<boolean>(false);
  const [editingIncentiveData, setEditingIncentiveData] = useState<
    string | null
  >(null);
  
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
    const [selectedIncentiveLevelId, setSelectedIncentiveLevelId] = useState<
    number | null
  >(null); 


  const { useGetIncentive, useDeleteIncentive } = IncentiveService();
  const { data: incentive, isLoading } = useGetIncentive(page, pageSize);


  const deleteIncentive = useDeleteIncentive();

  const handleDelete = (id: number, callbacks?: any) => {
    if (!id) return;

    deleteIncentive.mutate(
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
          message.error(
            err?.response?.data?.message || "Delete request incentive"
          );
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
      title: "DiscountPercentage",
      dataIndex: "discount_percentage",
      key: "discount_percentage",
      render: (value: any) => value || <span className="">—</span>,
    },



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
                  setEditingIncentiveData(record);
                  setEditingIncentive(true);
                  setOpen(false);
                }}
              >
                Edit
              </Menu.Item>

              <Menu.Item
                key="incentive"
                icon={<EditOutlined />}
                onClick={() => {
                  setEditingIncentiveData(record);
                  setIncentiveOpen(true);

                   setSelectedIncentiveLevelId(record.id);
                }}
              >
                Assign Incentive
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
        <button
          className="bg-[#00a1b3] text-white py-2 px-3 rounded-lg"
          onClick={() => setOpen(true)}
        >
          Create Incentive Level
        </button>
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
            dataSource={incentive?.data || []}
            pagination={{
              current: incentive?.data?.page || page,
              pageSize: pageSize,
              total: incentive?.data?.total || 0,
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
      <CreateIncentiveModal isOpen={open} onClose={() => setOpen(false)} />
      <AssignIncentiveModal
        isOpen={openincentive}
        onClose={() => setIncentiveOpen(false)}
        selectedUserId={null} 
        selectedIncentiveLevelId={selectedIncentiveLevelId} 
      />
    
      <UpdateIncentiveModal
        open={editingIncentive}
        userData={editingIncentiveData}
        onClose={() => setEditingIncentive(false)}
      />
    </div>
  );
}

export default IncentiveLevelTable;

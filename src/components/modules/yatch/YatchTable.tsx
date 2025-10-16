import {  Dropdown, Menu, message, Modal, Spin, Table } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  LoadingOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import YatchService from "@/services/yatch-service/YatchService";
import { useNavigate } from "react-router";



function YatchTable() {
 const navigate = useNavigate(); 
  // pagination state
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { useGetYatch, useDeleteYatch } = YatchService();
  const { data:yatch, isLoading } = useGetYatch( page, pageSize);
  const deleteExpense = useDeleteYatch();

const handleDelete = (id: number, callbacks?: any) => {
  if (!id) return;

  deleteExpense.mutate(
    { id },
    {
      onSuccess: (res) => {
        if (res?.success) {
          message.success(res.message || "Deleted successfully");
          callbacks?.onSuccess?.();
        } else {
          message.error(res?.message || "Failed to delete expense");
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
  title: "Image",
  key: "image_paths",
  render: (_: any, record: any) => {
    const url =
      record.image_paths && record.image_paths.length > 0
        ? record.image_paths[0]
        : null;

    return (
      <div className="flex justify-center">
        {url ? (
          <img
            src={url}
            alt={record.name}
            className="w-16 h-16 object-cover rounded-md border cursor-pointer"
            onClick={() => {
              Modal.info({
                title: record.name,
                centered: true,
                width: "auto",
                content: (
                  <img
                    src={url}
                    alt={record.name}
                    className="max-w-full max-h-[80vh] object-contain cursor-zoom-in"
                    onClick={(e) => {
                      e.stopPropagation();
                      const modal = window.open(url, "_blank");
                      if (modal) modal.focus();
                    }}
                  />
                ),
                okButtonProps: {
                  className: "bg-green-600 text-white hover:!bg-green-700",
                },
              });
            }}
          />
        ) : (
          <span className="text-gray-400 text-sm">No Image</span>
        )}
      </div>
    );
  },
},

  {
    title: "Capacity",
    dataIndex: "capacity",
    key: "capacity",
  },
  {
    title: "Rooms",
    dataIndex: "rooms",
    key: "rooms",
  },
  {
    title: "Washrooms",
    dataIndex: "washrooms",
    key: "washrooms",
  },
  {
    title: "Per Hour Rate",
    dataIndex: "per_hour_rate",
    key: "per_hour_rate",
    render: (value: any) => value || <span className="text-gray-400">—</span>,
  },
  {
    title: "Currency",
    dataIndex: "currency",
    key: "currency",
    render: (value: any) => value || <span className="text-gray-400">—</span>,
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
              onClick={() => navigate(`/yatch/${record.id}`)} 
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
    <div className=" rounded-[10px]">
      {/* Table */}
      <Spin
        spinning={isLoading}
        tip="Loading..."
        size="large"
        indicator={antIcon}
      >
        <div className="overflow-x-auto">
          <Table
            columns={columns}
            dataSource={yatch?.data || []}
            pagination={{
    current: yatch?.data?.page || page,
    pageSize: pageSize,
    total: yatch?.data?.total || 0,
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
      {/* <ExpenseModal
      open={open}
      onClose={() => {
        setOpen(false);
        setEditingExpense(null); // reset when closing
      }}
      editingExpense={editingExpense}
    /> */}
    </div>
  );
}

export default YatchTable;

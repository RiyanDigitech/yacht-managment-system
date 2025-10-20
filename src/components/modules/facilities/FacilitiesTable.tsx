import {  Dropdown, Menu, Spin, Table,message,Modal} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  LoadingOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import { useState } from "react";
// import { useNavigate } from "react-router";
import FacilitiesService from "@/services/facilities-service/facilities-service";
import EditFacilitiesModal from "./EditModal";

function FacilitiesTable() {
//  const navigate = useNavigate(); 
  // pagination state
  const [page, setPage] = useState(1);
  const [facilites, setFacilitesData] = useState();
  const [pageSize, setPageSize] = useState(10);
 const [isModalOpen, setIsModalOpen] = useState(false)
  const {useGetFacilities , useDeleteFacilities} = FacilitiesService();
  const { data:facilities, isLoading } = useGetFacilities( page, pageSize);
  const deleteFacilities = useDeleteFacilities();

const handleDelete = (id: number, callbacks?: any) => {
  if (!id) return;

  deleteFacilities.mutate(
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

const handleEditModal = (record:any) => {
    setIsModalOpen(true);
    setFacilitesData(record)
}



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
  },
  {
    title: "Created_at",
    dataIndex: "created_at",
    key: "created_at",
    render: (text:any) => {
                const date = new Date(text);
                return date.toLocaleString("en-PK", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                });
            },
  },
  {
    title: "Updated_at",
    dataIndex: "updated_at",
    key: "updated_at",
    render: (text:any) => {
                const date = new Date(text);
                return date.toLocaleString("en-PK", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                });
            },
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
              onClick={() => handleEditModal(record)} 
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
            dataSource={facilities?.data || []}
            pagination={{
    current: facilities?.data?.page || page,
    pageSize: pageSize,
    total: facilities?.data?.total || 0,
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
     

    <EditFacilitiesModal  open={isModalOpen} onCancel={() => setIsModalOpen(false)} data={facilites} />
    </div>
  );
}

export default FacilitiesTable;

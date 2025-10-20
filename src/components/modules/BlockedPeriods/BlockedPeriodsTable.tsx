import {  Dropdown, Menu, message, Modal, Spin, Table } from "antd";
import {
    DeleteOutlined,
  EditOutlined,
  LoadingOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import BlockedPeriodsService from "@/services/blockPeriods-Service/blockPeriodsService";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import CreateBlockedPeriod from "./CreateBlockedPeriod";
import UpdateBlockedPeriod from "./UpdateBlockedPeriod";

dayjs.extend(utc)
dayjs.extend(timezone)



function BlockPeriodsTable() {
  const [open, setOpen] = useState(false);
  const [editingBlockedPeriod, setEditingBlockedPeriod] = useState<boolean>(false);
  const [editingBlockedPeriodData, setEditingBlockedPeriodData] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { useGetBlockedPeriods,useDeleteBlockedPeriods} = BlockedPeriodsService();
  const { data:blockperiod, isLoading } = useGetBlockedPeriods( page, pageSize);
  //console.log("blockperiods", blockperiod);
  const deleteblockperiods = useDeleteBlockedPeriods();

  const handleDelete = (id: number, callbacks?: any) => {
  if (!id) return;

  deleteblockperiods.mutate(
    { id },
    {
      onSuccess: (res) => {
        if (res?.success) {
          message.success(res.message || "Deleted successfully");
          callbacks?.onSuccess?.();
        } else {
          message.error(res?.message || "Failed to delete blockperiods");
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
  // {
  //   title: "YachtId",
  //   dataIndex: "yacht_id",
  //   key: "yacht_id",
  //   width: 70,
  // },
 
  {
    title: "StartTime",
    dataIndex: "start_time",
    key: "start_time",
       render: (text: string) =>
      text
        ? dayjs.utc(text).format("YYYY-MM-DD HH:mm: A")
        : "-",

  },
  {
    title: "End Time",
    dataIndex: "end_time",
    key: "end_time",
        render: (text: string) =>
      text
        ? dayjs.utc(text).format("YYYY-MM-DD HH:mm A")
        : "-",
  },
   {
    title: "Reason",
    dataIndex: "reason",
    key: "reason",
    render: (text: string) =>
        text ? (
          <span>{text.length > 20 ? `${text.slice(0, 20)}...` : text}</span>
        ) : (
          "-"
        ),
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
      title: "Updated At",
      dataIndex: "updated_at",
      key: "updated_at",
      render: (text: any) =>
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
                setEditingBlockedPeriodData(record); 
                setEditingBlockedPeriod(true);
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
                  content: `Are you sure you want to delete this BlockedPeriod?`,
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
                Create BlockedPeriods</button>
        
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
            dataSource={blockperiod?.data || []}
            pagination={{
              current: blockperiod?.data?.page || page,
              pageSize: pageSize,
              total: blockperiod?.data?.total || 0,
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
       <CreateBlockedPeriod isOpen={open} onClose={() => setOpen(false)} />
      <UpdateBlockedPeriod
        open={editingBlockedPeriod}
        userData={editingBlockedPeriodData}
        onClose={() => setEditingBlockedPeriod(false)}
      />
    </div>
  );
}

export default BlockPeriodsTable;

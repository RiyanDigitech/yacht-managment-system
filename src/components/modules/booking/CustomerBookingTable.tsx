import { Dropdown, Menu, message, Modal, Spin, Table, Tag } from "antd";
import {
    DeleteOutlined,
    LoadingOutlined,
    MoreOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BookingServices from "@/services/booking-service/BookingServices";
import { parseISO, format } from "date-fns";




function CustomerBookingTable() {
    const [open, setOpen] = useState(false);
    // pagination state
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const { useGetBooking, useDeleteBooking } = BookingServices();
    const { data: booking, isLoading } = useGetBooking(page, pageSize);
    const deleteExpense = useDeleteBooking();

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

    const handleClose = () => {
        setOpen(false)
    }


    const naviagte = useNavigate()
    //   import { Dropdown, Menu, Modal } from "antd";
    // import { EditOutlined, DeleteOutlined, MoreOutlined } from "@ant-design/icons";

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
            width: 70,
        },
       {
  title: "Start Time",
  dataIndex: "start_time",
  key: "start_time",
  render: (text: any) => {
    if (!text) return "-";
    const date = parseISO(text); // UTC → JS Date object
    return format(date, "MMM d, yyyy, h:mm a"); // e.g. "Oct 31, 2025, 12:00 AM"
  },
},
{
  title: "End Time",
  dataIndex: "end_time",
  key: "end_time",
  render: (text: any) => {
    if (!text) return "-";
    const date = parseISO(text); // UTC → JS Date object
    return format(date, "MMM d, yyyy, h:mm a"); // e.g. "Nov 1, 2025, 2:00 AM"
  },
},
        //  {
        //   title: "Image",
        //   key: "image_paths",
        //   render: (_: any, record: any) => {
        //     const url =
        //       record.image_paths && record.image_paths.length > 0
        //         ? record.image_paths[0]
        //         : null;

        //     return (
        //       <div className="flex justify-center">
        //         {url ? (
        //           <img
        //             src={url}
        //             alt={record.name}
        //             className="w-16 h-16 object-cover rounded-md border cursor-pointer"
        //             onClick={() => {
        //               Modal.info({
        //                 title: record.name,
        //                 centered: true,
        //                 width: "auto",
        //                 content: (
        //                   <img
        //                     src={url}
        //                     alt={record.name}
        //                     className="max-w-full max-h-[80vh] object-contain cursor-zoom-in"
        //                     onClick={(e) => {
        //                       e.stopPropagation();
        //                       const modal = window.open(url, "_blank");
        //                       if (modal) modal.focus();
        //                     }}
        //                   />
        //                 ),
        //                 okButtonProps: {
        //                   className: "bg-green-600 text-white hover:!bg-green-700",
        //                 },
        //               });
        //             }}
        //           />
        //         ) : (
        //           <span className="text-gray-400 text-sm">No Image</span>
        //         )}
        //       </div>
        //     );
        //   },
        // },

     
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (text: any) => {
                let color = "blue";

                if (text?.toLowerCase() === "paid") {
                    color = "green";
                } else if (text?.toLowerCase() === "cancelled") {
                    color = "red";
                }
                else if (text?.toLowerCase() === "pending") {
                    color = "yellow";
                }

                return <Tag color={color}>{text?.toUpperCase()}</Tag>;
            },
        },
        {
            title: "Total Price",
            dataIndex: "total_price",
            key: "total_price",
        },
      
        {
            title: "Actions",
            key: "actions",
            render: (_: any, record: any) => (
                <Dropdown
                    overlay={
                        <Menu>
                            {/* <Menu.Item
                                key="Invoice"
                                icon={<FaFileInvoice />}
                                // danger
                                onClick={() => {
                                    naviagte(`/invoices/${record.id}`)

                                    // Modal.confirm({
                                    //     title: "Confirm Deletion",
                                    //     content: `Are you sure you want to delete "${record.name}"?`,
                                    //     okText: "Yes",
                                    //     cancelText: "No",
                                    //     okButtonProps: {
                                    //         className: "bg-green-600 text-white hover:!bg-green-700",
                                    //     },
                                    //     onOk: () =>
                                    //         new Promise((resolve, reject) => {
                                    //             handleDelete(record.id, {
                                    //                 onSuccess: () => resolve(null),
                                    //                 onError: (err: any) => reject(err),
                                    //             });
                                    //         }),
                                    // });
                                }}
                            >
                                View Invoice
                            </Menu.Item> */}
                            {/* <Menu.Item
                                key="edit"
                                icon={<EditOutlined />}
                                onClick={() => {
                                    setEditingExpense(record);
                                    setOpen(true);
                                }}
                            >
                                Edit
                            </Menu.Item> */}
{/* 
                            <Menu.Item
                                key="View"
                                icon={<EyeFilled />}
                                // danger
                                onClick={() => {
                                    naviagte(`/view-booking/${record.id}`)

                                    // Modal.confirm({
                                    //     title: "Confirm Deletion",
                                    //     content: `Are you sure you want to delete "${record.name}"?`,
                                    //     okText: "Yes",
                                    //     cancelText: "No",
                                    //     okButtonProps: {
                                    //         className: "bg-green-600 text-white hover:!bg-green-700",
                                    //     },
                                    //     onOk: () =>
                                    //         new Promise((resolve, reject) => {
                                    //             handleDelete(record.id, {
                                    //                 onSuccess: () => resolve(null),
                                    //                 onError: (err: any) => reject(err),
                                    //             });
                                    //         }),
                                    // });
                                }}
                            >
                                View More
                            </Menu.Item> */}
                            {/* <Menu.Item
                                key="Cancel Status"
                                icon={<MdCancel />}
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
                                Cancel
                            </Menu.Item> */}
                            <Menu.Item
                                key="delete"
                                icon={<DeleteOutlined />}
                                danger
                                onClick={() => {
                                    Modal.confirm({
                                        title: "Confirm Deletion",
                                        content: `Are you sure you want to delete "${record.id}"?`,
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
        <div className="p-4 rounded-[10px]">

            {/* <Booking /> */}
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
                        dataSource={booking?.data || []}
                        pagination={{
                            current: booking?.data?.page || page,
                            pageSize: pageSize,
                            total: booking?.data?.total || 0,
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
            {/* <EditStatusModal open={open} onCancel={handleClose} id={editingExpense} /> */}
        </div>
    );
}

export default CustomerBookingTable;

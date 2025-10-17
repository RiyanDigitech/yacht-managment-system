import React from "react";
import {
  Card,
  Tag,
  Descriptions,
  Image,
  Table,
  Divider,
  Spin,
} from "antd";
import dayjs from "dayjs";
import BookingServices from "@/services/booking-service/BookingServices";
import { useParams } from "react-router-dom";

const DetailPageBooking = () => {
  const { id } = useParams();
  const { useGetBookingDetail } = BookingServices();
  const { data: booking, isLoading } = useGetBookingDetail(id);

  // ✅ API structure → { success, message, data: {...} }
  const data = booking;

  if (isLoading || !data)
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" tip="Loading booking details..." />
      </div>
    );

  const { yacht, user, sales_person, addons } = data;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* ========== BOOKING DETAILS ========== */}
      <Card
        title="Booking Details"
        bordered={false}
        className="shadow-lg rounded-2xl"
      >
        <Descriptions bordered column={2}>
          <Descriptions.Item label="Booking ID">{data.id}</Descriptions.Item>
          <Descriptions.Item label="User ID">{data.user_id}</Descriptions.Item>
          <Descriptions.Item label="Yacht ID">{data.yacht_id}</Descriptions.Item>
          <Descriptions.Item label="Sales Person ID">
            {data.sales_person_id || "N/A"}
          </Descriptions.Item>

          <Descriptions.Item label="Start Time">
            {dayjs(data.start_time).format("YYYY-MM-DD hh:mm A")}
          </Descriptions.Item>
          <Descriptions.Item label="End Time">
            {dayjs(data.end_time).format("YYYY-MM-DD hh:mm A")}
          </Descriptions.Item>

          <Descriptions.Item label="Sales Type">
            <Tag
              color={
                data.sales_type === "online"
                  ? "green"
                  : data.sales_type === "offline"
                  ? "red"
                  : "blue"
              }
            >
              {data.sales_type.toUpperCase()}
            </Tag>
          </Descriptions.Item>

          <Descriptions.Item label="Status">
            <Tag color={data.status === "pending" ? "orange" : "blue"}>
              {data.status.toUpperCase()}
            </Tag>
          </Descriptions.Item>

          <Descriptions.Item label="Total Price">
            {data.total_price} {data.currency}
          </Descriptions.Item>
          <Descriptions.Item label="Final Price">
            {data.final_price} {data.currency}
          </Descriptions.Item>

          <Descriptions.Item label="Discount %">
            {data.discount_percentage}%
          </Descriptions.Item>
          <Descriptions.Item label="Discount Overridden">
            {data.is_discount_overridden ? "Yes" : "No"}
          </Descriptions.Item>

          <Descriptions.Item label="Created At">
            {dayjs(data.created_at).format("YYYY-MM-DD hh:mm A")}
          </Descriptions.Item>
          <Descriptions.Item label="Updated At">
            {dayjs(data.updated_at).format("YYYY-MM-DD hh:mm A")}
          </Descriptions.Item>
        </Descriptions>
      </Card>

      {/* ========== USER DETAILS ========== */}
      <Divider />
      <Card title="User Details" bordered={false} className="shadow-md rounded-2xl">
        <Descriptions bordered column={2}>
          <Descriptions.Item label="User ID">{user?.id}</Descriptions.Item>
          <Descriptions.Item label="Name">{user?.name}</Descriptions.Item>
          <Descriptions.Item label="Email">{user?.email}</Descriptions.Item>
          <Descriptions.Item label="Phone">{user?.phone}</Descriptions.Item>
          <Descriptions.Item label="Mobile Verified">
            {user?.mobile_verified_at || "Not Verified"}
          </Descriptions.Item>
          <Descriptions.Item label="Incentive Level ID">
            {user?.incentive_level_id || "N/A"}
          </Descriptions.Item>
          <Descriptions.Item label="CEO Special Approval">
            {user?.ceo_special_approval ? "Yes" : "No"}
          </Descriptions.Item>
          <Descriptions.Item label="Created At">
            {dayjs(user?.created_at).format("YYYY-MM-DD hh:mm A")}
          </Descriptions.Item>
          <Descriptions.Item label="Updated At">
            {dayjs(user?.updated_at).format("YYYY-MM-DD hh:mm A")}
          </Descriptions.Item>
        </Descriptions>
      </Card>

      {/* ========== YACHT DETAILS ========== */}
      <Divider />
      <Card title="Yacht Details" bordered={false} className="shadow-md rounded-2xl">
        <Descriptions bordered column={2}>
          <Descriptions.Item label="Yacht ID">{yacht?.id}</Descriptions.Item>
          <Descriptions.Item label="Name">{yacht?.name}</Descriptions.Item>
          <Descriptions.Item label="Capacity">{yacht?.capacity}</Descriptions.Item>
          <Descriptions.Item label="Rooms">{yacht?.rooms}</Descriptions.Item>
          <Descriptions.Item label="Washrooms">{yacht?.washrooms}</Descriptions.Item>
          <Descriptions.Item label="Additional Fields">
            {yacht?.additional_fields || "N/A"}
          </Descriptions.Item>
          <Descriptions.Item label="Is Active">
            {yacht?.is_active ? "Yes" : "No"}
          </Descriptions.Item>
          <Descriptions.Item label="Per Hour Rate">
            {yacht?.per_hour_rate} {yacht?.currency}
          </Descriptions.Item>
          <Descriptions.Item label="Created At">
            {dayjs(yacht?.created_at).format("YYYY-MM-DD hh:mm A")}
          </Descriptions.Item>
          <Descriptions.Item label="Updated At">
            {dayjs(yacht?.updated_at).format("YYYY-MM-DD hh:mm A")}
          </Descriptions.Item>
        </Descriptions>

        <Divider />

        <h2 className="text-lg font-semibold mt-6 mb-3">Yacht Images</h2>
        <div className="flex flex-wrap gap-4">
          {yacht?.image_paths?.map((img, index) => (
            <Image
              key={index}
              src={img}
              alt="Yacht"
              width={160}
              height={120}
              style={{ borderRadius: "10px", objectFit: "cover" }}
            />
          ))}
        </div>
      </Card>

      {/* ========== ADDONS DETAILS ========== */}
      <Divider />
      <Card title="Addons" bordered={false} className="shadow-md rounded-2xl">
        <Table
          dataSource={addons}
          pagination={false}
          bordered
          rowKey="id"
          columns={[
            {
              title: "ID",
              dataIndex: "id",
              key: "id",
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
              render: (text) => text || "N/A",
            },
            {
              title: "Price",
              dataIndex: "price",
              key: "price",
              render: (price) => `$${price}`,
            },
            {
              title: "Active",
              dataIndex: "is_active",
              key: "is_active",
              render: (val) => (val ? "Yes" : "No"),
            },
            {
              title: "Quantity",
              dataIndex: ["pivot", "quantity"],
              key: "quantity",
            },
            {
              title: "Price at Booking",
              dataIndex: ["pivot", "price_at_time_of_booking"],
              key: "price_at_time_of_booking",
              render: (val) => `$${val}`,
            },
            {
              title: "Total",
              key: "total",
              render: (addon) =>
                `$${(addon.price * addon.pivot.quantity).toFixed(2)}`,
            },
            {
              title: "Created At",
              dataIndex: "created_at",
              key: "created_at",
              render: (val) => dayjs(val).format("YYYY-MM-DD hh:mm A"),
            },
            {
              title: "Updated At",
              dataIndex: "updated_at",
              key: "updated_at",
              render: (val) => dayjs(val).format("YYYY-MM-DD hh:mm A"),
            },
          ]}
        />
      </Card>

      {/* ========== SALES PERSON DETAILS ========== */}
      <Divider />
      <Card title="Sales Person" bordered={false} className="shadow-md rounded-2xl">
        {sales_person ? (
          <Descriptions bordered column={2}>
            <Descriptions.Item label="ID">{sales_person.id}</Descriptions.Item>
            <Descriptions.Item label="Name">{sales_person.name}</Descriptions.Item>
            <Descriptions.Item label="Email">{sales_person.email}</Descriptions.Item>
          </Descriptions>
        ) : (
          <p className="text-gray-500">No Sales Person Assigned</p>
        )}
      </Card>
    </div>
  );
};

export default DetailPageBooking;

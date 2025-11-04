import { useState } from "react";
import {
  Select,
  DatePicker,
  message,
  Button,
  Tag,
  Form,
  Modal,
} from "antd";
import dayjs from "dayjs";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
const { Option } = Select;
import { getAllyacth, createCustomerBooking,getAllAddons} from "@/services/BookingService/BookingService";

const BookingModal = ({ openModal, onClose }:any) => {
  const [formData, setFormData] = useState({
    yacht_id: "",
    start_time: "",
    end_time: "",
    addons: [],
  });

  const queryClient = useQueryClient();

  const { data: getyacth } = useQuery({
    queryKey: ["yacth"],
    queryFn: getAllyacth,
    staleTime: 5000,
    placeholderData: keepPreviousData,
  });

  const { data: getaddonOptions } = useQuery({
    queryKey: ["addon"],
    queryFn: getAllAddons,
    staleTime: 5000,
    placeholderData: keepPreviousData,
  });

  const createCustomerBookingMutation = useMutation({
    mutationFn: createCustomerBooking,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["book"] });
      message.success(data.message || "Booking created successfully!");
      onClose(); // close modal after success
    },
    onError: (error:any) => {
      message.error(error?.response?.data?.message || "Failed to create booking");
    },
  });

  const handleSubmit = () => {
    if (!formData.yacht_id || !formData.start_time || !formData.end_time) {
      message.error("Please fill all required fields");
      return;
    }

    const payload = {
      yacht_id: Number(formData.yacht_id),
      start_time: dayjs(formData.start_time).format("YYYY-MM-DD HH:mm:ss"),
      end_time: dayjs(formData.end_time).format("YYYY-MM-DD HH:mm:ss"),
      addons: (formData.addons || []).map((id) => ({
        id,
        quantity: 1,
      })),
    };

    createCustomerBookingMutation.mutate(payload);
  };

  return (
    <Modal
      title={
        <div className="text-center text-2xl font-semibold text-[#bfa888]">
          Book Your Yacht
        </div>
      }
      centered
      open={openModal}
      onCancel={onClose}
      footer={null}
      width={700}
      className="vip-booking-modal"
    >
      <div className="p-4">
        <Form layout="vertical" onFinish={handleSubmit} autoComplete="off">
          {/* Yacht Field */}
          <Form.Item label="Yacht" required>
            <Select
              optionFilterProp="children"
              allowClear
              placeholder="Select Yacht"
              size="large"
              value={formData.yacht_id || undefined}
              onChange={(value) => setFormData({ ...formData, yacht_id: value })}
            >
              {getyacth?.data?.map((y:any) => (
                <Option key={y.id} value={y.id} label={y.name}>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-medium">{y.name}</span>
                    {y.facilities?.slice(0, 3)?.map((f:any, index:any) => (
                      <Tag
                        key={index}
                        color="blue"
                        style={{
                          fontSize: "10px",
                          padding: "0 6px",
                          borderRadius: "6px",
                          lineHeight: "16px",
                        }}
                      >
                        {f}
                      </Tag>
                    ))}
                    {y.facilities?.length > 3 && (
                      <Tag color="default" style={{ fontSize: "10px" }}>
                        +{y.facilities.length - 3}
                      </Tag>
                    )}
                  </div>
                </Option>
              ))}
            </Select>
          </Form.Item>

          {/* Start & End Time */}
          <div className="grid grid-cols-2 gap-4">
            <Form.Item label="Start Time" required>
              <DatePicker
                showTime
                className="w-full"
                size="large"
                onChange={(val) =>
                  setFormData({
                    ...formData,
                    start_time: val ? val.toISOString() : "",
                  })
                }
                value={formData.start_time ? dayjs(formData.start_time) : null}
              />
            </Form.Item>

            <Form.Item label="End Time" required>
              <DatePicker
                showTime
                className="w-full"
                size="large"
                onChange={(val) =>
                  setFormData({
                    ...formData,
                    end_time: val ? val.toISOString() : "",
                  })
                }
                value={formData.end_time ? dayjs(formData.end_time) : null}
              />
            </Form.Item>
          </div>

          {/* Addons */}
          <Form.Item label="Addons">
            <Select
              mode="multiple"
              allowClear
              placeholder="Select Addons"
              size="large"
              value={formData.addons}
              onChange={(values) => setFormData({ ...formData, addons: values })}
            >
              {getaddonOptions?.data?.map((addon:any) => (
                <Option key={addon.id} value={addon.id}>
                  {addon.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          {/* Submit Button */}
          <Button
            htmlType="submit"
            type="primary"
            loading={createCustomerBookingMutation.isPending}
            className="!w-full !bg-[#c6b298] !text-white !py-3 !text-base !rounded-lg border-none hover:!bg-[#b79f85] transition-all"
          >
            Confirm Booking
          </Button>
        </Form>
      </div>
    </Modal>
  );
};

export default BookingModal;

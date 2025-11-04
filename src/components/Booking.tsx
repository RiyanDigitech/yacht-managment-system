import { useState } from "react";
import { Select, DatePicker, message, Button, Tag, Form } from "antd";
import dayjs from "dayjs";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { getAllyacth,  createCustomerBooking,
  getAllAddons, } from "@/services/BookingService/BookingService";
  import boatImage from '/public/image-9.png'

const { Option } = Select;

const Booking = () => {
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
      message.success(data.message || "Create Booking Successfully");
    },
    onError: (error:any) => {
      message.error(error?.response?.data?.message || "Failed to Create Booking");
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

    console.log("Payload:", payload);

    createCustomerBookingMutation.mutate(payload, {
      onSuccess: () => {
        message.success("Booking submitted successfully!");
        setFormData({
          yacht_id: "",
          start_time: "",
          end_time: "",
          addons: [],
        });
      },
      onError: (error:any) => {
        console.error(error);
        message.error(error?.response?.data?.message || "Booking failed!");
      },
    });
  };

  return (
    <section className="w-full bg-[#F3F2ED] flex flex-col lg:flex-row items-center lg:items-stretch relative overflow-hidden py-10">
      {/* Left Form Section */}
      <div className="w-full lg:w-[50%] flex items-center justify-center lg:justify-start pl-[8%] pr-[8%] py-10 relative">
        {/* Background Text */}
        <h1 className="absolute text-[90px] font-semibold text-[#ECE8DF] opacity-90 top-5 left-[19%] select-none pointer-events-none fonts-Cormorant">
          CRUISES
        </h1>

        {/* Form */}
        <div className="max-w-md w-full relative z-10">
          <p className="text-[12px] text-[#BFA888] font-medium tracking-[2px] uppercase fonts-Inconsolata">
            START THE JOURNEY
          </p>
          <h2 className="text-[47px] font-semibold mb-6 tracking-wide fonts-Cormorant">
            BOOK NOW
          </h2>

          <Form layout="vertical" onFinish={handleSubmit} autoComplete="off">
            {/* Yacht Field */}
            <Form.Item
              label="YACHT"
              className="text-xs tracking-wide text-gray-500"
              labelCol={{ className: "fonts-Inconsolata" }}
            >
              <Select
                optionFilterProp="children"
                maxTagCount="responsive"
                allowClear
                placeholder="Select Yacht"
                size="large"
                className="w-full"
                value={formData.yacht_id || undefined}
                onChange={(value) =>
                  setFormData({ ...formData, yacht_id: value })
                }
              >
                {getyacth?.data?.map((y:any) => (
                  <Option key={y.id} value={y.id} label={y.name}>
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        alignItems: "center",
                        gap: "6px",
                      }}
                    >
                      <span style={{ fontWeight: 500 }}>{y.name}</span>
                      <div
                        style={{
                          display: "flex",
                          gap: "4px",
                          flexWrap: "wrap",
                          alignItems: "center",
                        }}
                      >
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
                    </div>
                  </Option>
                ))}
              </Select>
            </Form.Item>

            {/* Start & End Time */}
            <div className="grid grid-cols-2 gap-4">
              <Form.Item label="CHECK-IN" required labelCol={{ className: "fonts-Inconsolata" }}>
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
                  value={
                    formData.start_time ? dayjs(formData.start_time) : null
                  }
                />
              </Form.Item>

              <Form.Item label="CHECK-OUT" required labelCol={{ className: "fonts-Inconsolata" }}>
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

            {/* Addons Field */}
            <Form.Item label="ADDONS" labelCol={{ className: "fonts-Inconsolata" }}>
              <Select
                mode="multiple"
                allowClear
                placeholder="Select Addons"
                size="large"
                className="w-full"
                value={formData.addons}
                onChange={(values) =>
                  setFormData({ ...formData, addons: values })
                }
                optionFilterProp="children"
                maxTagCount="responsive"
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
              style={{
                width: "100%",
                backgroundColor: "#BFA888",
                color: "white",
                paddingTop: "1rem",
                paddingBottom: "1rem",
                fontSize: "18px",
                marginTop: "0.5rem",
                borderRadius: 0,
                border: "none",
                letterSpacing: "0.1em",
                fontFamily: "'Inconsolata', monospace",
              }}
              // className="!w-full !bg-[#c6b298] `!text-white` `!py-3` `!text-sm` `!mt-2` border border-none !rounded-none !py-4 `!tracking-widest` fonts-!Inconsolata"
            >
              Book Now
            </Button>
          </Form>
        </div>
      </div>

      {/* Right Image Section */}
      <div className="w-full lg:w-[50%] flex justify-end items-center p-0 m-0">
        <img
          src={boatImage}
          alt="Yacht"
          className="w-full h-auto object-contain"
        />
      </div>
    </section>
  );
};

export default Booking;

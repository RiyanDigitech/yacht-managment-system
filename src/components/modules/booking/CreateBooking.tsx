import { useEffect, useState } from "react";
import { Modal, Form, Select, InputNumber, DatePicker, Button, message } from "antd";
import dayjs from "dayjs";
import YachtService from "@/services/yatch-service/YatchService";
import BookingService from "@/services/booking-service/BookingServices";

const { RangePicker } = DatePicker;

interface CreateBookingModalProps {
  open: boolean;
  onClose: () => void;
}

const CreateBookingModal: React.FC<CreateBookingModalProps> = ({ open, onClose }) => {
  const [form] = Form.useForm();
  // const [addons, setAddons] = useState<any[]>([]);
  // const [customers, setCustomers] = useState<any[]>([]);
  const [yachts, setYachts] = useState<any[]>([]);

  const { useCreateBooking } = BookingService();
  const createBooking = useCreateBooking();

  // 🔹 Fetch Data from APIs
  const { useGetYatch } = YachtService();
  // const { useGetAllCustomers } = CustomerService();
  // const { useGetAllAddons } = AddonService();

  const { data: yachtData } = useGetYatch();
  // const { data: customerData } = useGetAllCustomers();
  // const { data: addonData } = useGetAllAddons();

  useEffect(() => {
    if (yachtData) setYachts(yachtData?.data || yachtData);
  //   if (customerData) setCustomers(customerData?.data || customerData);
  //   if (addonData) setAddons(addonData?.data || addonData);
  // }, [yachtData, customerData, addonData]);
  }, [yachtData]);

  // 🔹 Handle Submit
  const handleSubmit = async (values: any) => {
    try {
      const payload = {
        yacht_id: values.yacht_id,
        customer_id: values.customer_id,
        start_time: dayjs(values.dateRange[0]).format("YYYY-MM-DD HH:mm:ss"),
        end_time: dayjs(values.dateRange[1]).format("YYYY-MM-DD HH:mm:ss"),
        sales_type: values.sales_type,
        addons: values.addons.map((addon: any) => ({
          id: addon.addon_id,
          quantity: addon.quantity,
        })),
      };

      // await createBooking.mutateAsync(payload);
      console.log("Create Booking Data" , payload)
      message.success("Booking created successfully!");
      form.resetFields();
      onClose();
    } catch (error) {
      console.error(error);
      message.error("Failed to create booking!");
    }
  };

  return (
    <Modal
      title="Create New Booking"
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        className="mt-4"
      >
        {/* Yacht Dropdown */}
        <Form.Item
          name="yacht_id"
          label="Select Yacht"
          rules={[{ required: true, message: "Please select a yacht" }]}
        >
          <Select placeholder="Select Yacht">
            {yachts?.map((item: any) => (
              <Select.Option key={item.id} value={item.id}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        {/* Customer Dropdown */}
        <Form.Item
          name="customer_id"
          label="Select Customer"
          rules={[{ required: true, message: "Please select a customer" }]}
        >
          <Select placeholder="Select Customer">
            {yachts?.map((item: any) => (
              <Select.Option key={item.id} value={item.id}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        {/* Date Range */}
        <Form.Item
          name="dateRange"
          label="Booking Duration"
          rules={[{ required: true, message: "Please select date & time" }]}
        >
          <RangePicker
            showTime
            format="YYYY-MM-DD HH:mm"
            className="w-full"
          />
        </Form.Item>

        {/* Sales Type */}
        <Form.Item
          name="sales_type"
          label="Sales Type"
          rules={[{ required: true, message: "Please select sales type" }]}
        >
          <Select placeholder="Select Sales Type">
            <Select.Option value="internal">Internal</Select.Option>
            <Select.Option value="external">External</Select.Option>
          </Select>
        </Form.Item>

        {/* Addons Dropdown with Quantity */}
        <Form.List name="addons" initialValue={[{ addon_id: null, quantity: 1 }]}>
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <div key={key} className="flex gap-2 items-center">
                  <Form.Item
                    {...restField}
                    name={[name, "addon_id"]}
                    label={name === 0 ? "Addons" : ""}
                    className="flex-1"
                    rules={[{ required: true, message: "Select an addon" }]}
                  >
                    <Select placeholder="Select Addon">
                      {yachts?.map((addon: any) => (
                        <Select.Option key={addon.id} value={addon.id}>
                          {addon.name}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>

                  <Form.Item
                    {...restField}
                    name={[name, "quantity"]}
                    label={name === 0 ? "Qty" : ""}
                    className="w-28"
                    rules={[{ required: true, message: "Enter quantity" }]}
                  >
                    <InputNumber min={1} placeholder="Qty" className="w-full" />
                  </Form.Item>

                  <Button
                    type="link"
                    danger
                    onClick={() => remove(name)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <Button type="dashed" className="hover:!bg-gray-200 !text-black" onClick={() => add()} block>
                + Add Another Addon
              </Button>
            </>
          )}
        </Form.List>

        {/* Submit Button */}
        <Form.Item className="mb-0 flex justify-end">
          <Button
            htmlType="submit"
            type="primary"
            loading={createBooking.isPending}
            className="bg-[#00a1b3] hover:!bg-black text-white mt-3"
          >
            Create Booking
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateBookingModal;

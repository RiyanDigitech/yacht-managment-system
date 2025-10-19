import BookingServices from "@/services/booking-service/BookingServices";
import { Modal, Select, Form, Button } from "antd";

const EditStatusModal = ({ open, onCancel, onOk, id }: any) => {
  const [form] = Form.useForm();

  const { useUpdateBooking } = BookingServices();
  const UpdateBooking = useUpdateBooking();

  console.log(id)

  const handleEditModal = (values: any) => {
    // console.log("Updated Status:", values);
    UpdateBooking.mutate({ id: Number(id.id), status: values });
    onOk(values);
    form.resetFields();
  };

  return (
    <Modal
      title="Update Booking Status"
      open={open}
      onCancel={onCancel}
      centered
      footer={null} // custom footer handled by form buttons
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleEditModal}
        // initialValues={{ status: currentStatus }}
      >
        <Form.Item
          name="status"
          label="Status"
          rules={[{ required: true, message: "Please select a status!" }]}
        >
          <Select >
            <Select.Option value="paid">Paid</Select.Option>
            <Select.Option value="cancelled">Cancelled</Select.Option>
            <Select.Option value="pending">Pending</Select.Option>
          </Select>
        </Form.Item>

        <div className="flex justify-end gap-2">
          <Button
            className="hover:!bg-gray-200 !text-black"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            className="bg-[#00a1b3] text-white rounded p-2 hover:!bg-black"
            loading={UpdateBooking.isPending}
          >
            Update
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default EditStatusModal;

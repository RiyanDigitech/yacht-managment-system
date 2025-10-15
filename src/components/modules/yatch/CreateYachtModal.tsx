import { useState } from "react";
import { Modal, Form, Input, InputNumber, Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import YatchService from "@/services/yatch-service/YatchService";


interface CreateYachtModalProps {
  open: boolean;
  onClose: () => void;
}

const CreateYachtModal: React.FC<CreateYachtModalProps> = ({ open, onClose }) => {
  const [form] = Form.useForm();
  const { useCreateYatch } = YatchService();
  const createYatch = useCreateYatch();

  const handleSubmit = async (values: any) => {
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("capacity", values.capacity);
      formData.append("rooms", values.rooms);
      formData.append("washrooms", values.washrooms);

      if (values.images && values.images.length > 0) {
        values.images.forEach((file: any) => {
          formData.append("images[]", file.originFileObj);
        });
      }

      await createYatch.mutateAsync({ data: formData });
      message.success("Yatch created successfully!");
      form.resetFields();
      onClose();
    } catch (error) {
      console.error(error);
      message.error("Failed to create yatch!");
    }
  };

  return (
    <Modal
      title="Create New Yatch"
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
        <Form.Item
          label="Yatch Name"
          name="name"
          rules={[{ required: true, message: "Please enter yatch name" }]}
        >
          <Input placeholder="Enter yatch name" />
        </Form.Item>

        <Form.Item
          label="Capacity"
          name="capacity"
          rules={[{ required: true, message: "Please enter capacity" }]}
        >
          <InputNumber placeholder="Enter capacity" className="w-full" />
        </Form.Item>

        <Form.Item
          label="Rooms"
          name="rooms"
          rules={[{ required: true, message: "Please enter number of rooms" }]}
        >
          <InputNumber placeholder="Enter rooms count" className="w-full" />
        </Form.Item>

        <Form.Item
          label="Washrooms"
          name="washrooms"
          rules={[{ required: true, message: "Please enter number of washrooms" }]}
        >
          <InputNumber placeholder="Enter washrooms count" className="w-full" />
        </Form.Item>

        <Form.Item
          label="Images"
          name="images"
          valuePropName="fileList"
          getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
          rules={[{ required: true, message: "Please upload at least one image" }]}
        >
          <Upload
            listType="picture"
            beforeUpload={() => false}
            multiple
            accept="image/*"
          >
            <Button icon={<UploadOutlined />}>Upload Images</Button>
          </Upload>
        </Form.Item>

        <Form.Item className="mb-0 flex justify-end">
          <Button
            htmlType="submit"
            type="primary"
            loading={createYatch.isPending}
            className="bg-green-600 hover:!bg-green-700"
          >
            Create
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateYachtModal;

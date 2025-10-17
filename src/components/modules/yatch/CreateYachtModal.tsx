import { useState } from "react";
import { Modal, Form, Input, InputNumber, Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadFile } from "antd/es/upload/interface";
import YatchService from "@/services/yatch-service/YatchService";

interface CreateYachtModalProps {
  open: boolean;
  onClose: () => void;
}

const CreateYachtModal: React.FC<CreateYachtModalProps> = ({ open, onClose }) => {
  const [form] = Form.useForm();
  const { useCreateYatch } = YatchService();
  const createYatch = useCreateYatch();
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleSubmit = async (values: any) => {
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("capacity", values.capacity);
      formData.append("rooms", values.rooms);
      formData.append("washrooms", values.washrooms);
      formData.append("per_hour_rate", values.per_hour_rate);
      formData.append("currency", values.currency);

      if (fileList && fileList.length > 0) {
        fileList.forEach((file: any) => {
          formData.append("images[]", file.originFileObj);
        });
      }

      await createYatch.mutateAsync({ data: formData });
      message.success("Yacht created successfully!");
      setFileList([]);
      form.resetFields();
      onClose();
    } catch (error) {
      console.error(error);
      message.error("Failed to create yacht!");
    }
  };

  const handleFileChange = ({ fileList }: { fileList: UploadFile[] }) => {
    setFileList(fileList);
  };

  return (
    <Modal
      title="Create New Yacht"
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
          label="Yacht Name"
          name="name"
          rules={[{ required: true, message: "Please enter yacht name" }]}
        >
          <Input placeholder="Enter yacht name" />
        </Form.Item>
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Form.Item
          label="Capacity"
          name="capacity"
          rules={[{ required: true, message: "Please enter capacity in number" }]}
        >
          <InputNumber placeholder="Enter capacity" className="w-full" />
        </Form.Item>

        <Form.Item
          label="Rooms"
          name="rooms"
          rules={[{ required: true, message: "Please enter number of rooms in number" }]}
        >
          <InputNumber placeholder="Enter rooms count" className="w-full" />
        </Form.Item>

        <Form.Item
          label="Washrooms"
          name="washrooms"
          rules={[{ required: true, message: "Please enter number of washrooms in number" }]}
        >
          <InputNumber placeholder="Enter washrooms count" className="w-full" />
        </Form.Item>
        <Form.Item
          label="Per Hour Rate"
          name="per_hour_rate"
          rules={[{ required: true, message: "Please enter number of per_hour_rate in number" }]}
        >
          <InputNumber placeholder="Enter per_hour_rate" className="w-full" />
        </Form.Item>
        <Form.Item
          label="Currency"
          name="currency"
          rules={[{ required: true, message: "Please enter currency" }]}
        >
          <Input placeholder="Enter currency" />
        </Form.Item>
</div>
        <Form.Item
          label="Images"
          name="images"
          rules={[{ required: true, message: "Please upload at least one image" }]}
        >
          <Upload
            listType="picture-card"
            beforeUpload={() => false}
            multiple
            accept="image/*"
            fileList={fileList}
            onChange={handleFileChange}
          >
            {fileList.length >= 10 ? null : (
              <div>
                <UploadOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            )}
          </Upload>
        </Form.Item>

        <Form.Item className="mb-0 flex justify-end">
          <Button
            htmlType="submit"
            type="primary"
            loading={createYatch.isPending}
            className="bg-[#00a1b3] hover:!bg-sky-600"
          >
            Create
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateYachtModal;

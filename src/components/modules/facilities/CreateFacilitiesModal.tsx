import { Modal, Form, Input, Button, message } from "antd";
import FacilitiesService from "@/services/facilities-service/facilities-service";

interface CreateFacilitiesModalProps {
  open: boolean;
  onClose: () => void;
}

const CreateFacilitiesModal: React.FC<CreateFacilitiesModalProps> = ({ open, onClose }) => {
  const [form] = Form.useForm();
  const { useCreateFacilities } = FacilitiesService();
  const CreateFacilities = useCreateFacilities();


  const handleSubmit = async (values: any) => {
    try {
      const formData = new FormData();
      formData.append("name", values.name);         
      formData.append("description", values.description);

      await CreateFacilities.mutateAsync({ data: formData });
      message.success("Facility created successfully!");
      form.resetFields();
      onClose();
    } catch (error: any) {
      //console.log(error.response?.data || error.message || error);
      //message.error("Failed to create New Facility!");
      const msg = error?.response?.data?.message || "Failed to Create Facilities";
          message.error(msg);
      
    }
  };

  return (
    <Modal
      title="Create New Facility"
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      destroyOnClose
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit} className="mt-4">
        
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Write Facility Name here" }]}
        >
          <Input placeholder="Enter Facility Name" className="!border-[#D1D5DB] 
      hover:!border-[#D1D5DB] 
      focus:!border-[#D1D5DB]"
        onChange={(e) => {
      const value = e.target.value;
      const formatted = value.replace(/\b\w/g, (char) => char.toUpperCase());
      form.setFieldsValue({ name: formatted });
    }}
      />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Write Description here" }]}
        >
          <Input placeholder="Enter Description" className="!border-[#D1D5DB] 
      hover:!border-[#D1D5DB] 
      focus:!border-[#D1D5DB]"
       onChange={(e) => {
      let value = e.target.value;
      value = value.toLowerCase(); // sab lowercase
      value = value.replace(/(^\w{1})|(\.\s*\w{1})/g, (match) =>
        match.toUpperCase()
      ); // sentence case
      form.setFieldsValue({ description: value }); // form mein wapas set
    }}
      />
        </Form.Item>

          <Form.Item className="mb-0 flex justify-end">
          <Button
            htmlType="submit"
            type="primary"
            loading={CreateFacilities.isPending}
            className="bg-[#00a1b3] hover:!bg-sky-600"
          >
            Create
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateFacilitiesModal;

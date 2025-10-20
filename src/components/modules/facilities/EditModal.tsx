import FacilitiesService from "@/services/facilities-service/facilities-service";
import { Modal, Form, Button, Input,message,   } from "antd";

import { useEffect } from "react";

const EditFacilitiesModal = ({ open, onCancel, data }: any) => {
  const [form] = Form.useForm();
  const { useUpdateFacilities } = FacilitiesService();
  const updateFacilities = useUpdateFacilities(); 

  
  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        name: data.name,
        description: data.description,
      });
    }
  }, [data, form]);

  const handleEditModal = (values: any) => {
    updateFacilities.mutate(
      { id: Number(data.id), data: values },
      {
        onSuccess: () => {
          form.resetFields();
          message.success("Facility created successfully!");
          onCancel();
        },
        onError: (error: any) => {
          console.error(error);
          message.error("Failed to update Facility!");
        }
      }
    );
  };

// const handleSubmit = async (values: any) => {
//     try {
//       const formData = new FormData();
//       formData.append("name", values.name);
//       formData.append("description", values.description);
      
//       await updateFacilities.mutateAsync({ id: Number(id), data: formData });
//       message.success("Yacht updated successfully!");
//      // reset change tracking
//     } catch (error) {
//       console.error(error);
//       message.error("Failed to update yacht!");
//     }
//   };

  return (
    <Modal
      title="Description"
      open={open}
      onCancel={onCancel}
      centered
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleEditModal}
        className="mt-4"
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please enter updated Name" }]}
        >
          <Input placeholder="Enter Name" />
          </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Please enter description" }]}
        >
          <Input placeholder="Enter Description" />
        </Form.Item>


        <Form.Item className="mb-0 flex justify-end">
          <Button
            htmlType="submit"
            type="primary"
            loading={updateFacilities.isPending}
            className="bg-[#00a1b3] hover:!bg-sky-600"
          >
            Update
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default EditFacilitiesModal;

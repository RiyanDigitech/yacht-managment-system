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
          onCancel();
        },
        onError: (error: any) => {
          //console.error(error);
          //message.error("Failed to update Facility!");
          const msg = error?.response?.data?.message || "Failed to update Facility";
                    message.error(msg);
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
          <Input placeholder="Enter Name" className="!border-[#D1D5DB] 
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
          rules={[{ required: true, message: "Please enter description" }]}
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

import { useState, useEffect } from "react";
import { Button, Modal, Input, message } from "antd";
import CustomerService from "@/services/customer-service/CustomerService";

interface UpdateCustomerModalProps {
  open: boolean;
  onClose: () => void;
  userData: any;
}

const EditCustomer = ({ open, onClose, userData }: UpdateCustomerModalProps) => {
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const { useUpdateCustomer } = CustomerService();
  const { mutate: updateCustomer, isPending } = useUpdateCustomer();

  useEffect(() => {
    if (userData) {
      setName(userData.name || "");
      setEmail(userData.email || "");
      setPhone(userData.phone || "");
      
    }
  }, [userData, open]);

  const isDirty = phone !== (userData?.phone || "") || name !== (userData?.name || "") || email !== (userData?.email || "");

  const handleSave = () => {
    const data = {name,email,phone };

    updateCustomer(
      {
        id: userData.id,
        data,
      },
      {
        onSuccess: () => {
          message.success("Customer Phone Updated Successfully");
          onClose();
        },
        onError: (error: any) => {
          const msg = error?.response?.data?.message || "Failed to update phone";
          message.error(msg);
        },
      }
    );
  };

  return (
    <Modal
      title="Edit Customer Phone"
      open={open}
      onCancel={onClose}
      footer={[
        <Button
          key="save"
          className="bg-[#00a1b3] text-white hover:!bg-[#00a1b3] transition disabled:opacity-50"
          onClick={handleSave}
          loading={isPending}
          disabled={!isDirty}
        >
          Update
        </Button>,
      ]}
      centered
    >
      <div className="space-y-4 mt-4">
         <div>
          <label className="block text-gray-600 mb-1">Name</label>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}

            className="flex-1 !border-[#D1D5DB] hover:!border-[#D1D5DB]"
          />
        </div>
         <div>
          <label className="block text-gray-600 mb-1">Email</label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            
            className="flex-1 !border-[#D1D5DB] hover:!border-[#D1D5DB]"
          />
        </div>
        <div>
          <label className="block text-gray-600 mb-1">Phone</label>
          <Input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter Phone Number"
            className="flex-1 !border-[#D1D5DB] hover:!border-[#D1D5DB]"
          />
        </div>
      </div>
    </Modal>
  );
};

export default EditCustomer;

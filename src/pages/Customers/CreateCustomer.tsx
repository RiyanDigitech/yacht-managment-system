import { useForm } from "react-hook-form";
import { Button, message, Modal } from "antd";
import { useState } from "react";
import { AddonData, CreateAddonResponse } from "@/lib/types/addon";
import CustomerService from "@/services/customer-service/CustomerService";

interface AddonsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateCustomer = ({ isOpen, onClose }: AddonsModalProps) => {
  const { handleSubmit } = useForm<AddonData>();

  const onSubmit = (data: AddonData) => {
    console.log("Form Data:", data);
    alert("Form submitted successfully!");
  };

  const { useCreateCustomer } = CustomerService();
  const mutation = useCreateCustomer();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSave = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);

    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    mutation.mutate(
      { data: formData },
      {
        onSuccess: (res: CreateAddonResponse) => {
          message.success(res?.message || "Customer Created Successfully");
          onClose();
          setName("");
          setEmail("");
          setPassword("");
        },
        onError: (err: any) => {
          const msg = err?.response?.data?.message || "Failed to create customer";
          message.error(msg);
        },
      }
    );
  };

  return (
    <Modal
      title="Create Customer"
      open={isOpen}
      onCancel={onClose}
      footer={[
        <Button
          key="save"
          className="bg-[#00a1b3] text-backgroundPrimary hover:!bg-[#00a1b3] text-white"
          onClick={handleSave}
        >
          {mutation.isPending ? "Creating..." : "Create"}
        </Button>,
      ]}
      centered
    >
      <form onSubmit={handleSubmit(onSubmit)} className="w-full lg:max-w-4xl">
        <div className="mt-6 space-y-4 font-poppins">
          {/* Name Field */}
          <div className="space-y-2">
            <label className="text-[16px] font-semibold">Name</label>
            <div className="flex items-center border rounded-md px-3 py-2">
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  const formatted = e.target.value.replace(/\b\w/g, (char) =>
                    char.toUpperCase()
                  );
                  setName(formatted);
                }}
                placeholder="Enter Name"
                className="flex-1 outline-none text-sm"
              />
            </div>
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <label className="text-[16px] font-semibold">Email</label>
            <div className="flex items-center border rounded-md px-3 py-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value.toLowerCase())}
                placeholder="Enter Email"
                className="flex-1 outline-none text-sm"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label className="text-[16px] font-semibold">Password</label>
            <div className="flex items-center border rounded-md px-3 py-2">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
                className="flex-1 outline-none text-sm"
              />
            </div>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default CreateCustomer;

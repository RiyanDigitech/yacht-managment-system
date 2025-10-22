import { useForm } from "react-hook-form";
import { Button, message, Modal } from "antd";
import { useState } from "react";
import UserService from "@/services/user-service/UserService";
import { CreateUserResponse } from "@/lib/types/users";


interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateUserModal = ({ isOpen, onClose }: UserModalProps) => {
  const { handleSubmit } = useForm<UserData>();

  const onSubmit = (data: UserData) => {
    console.log("Form Data:", data);
    alert("Form submitted successfully!");
  };

 
  const { useCreateUser } = UserService();

  const mutation = useCreateUser();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const [role, setRole] = useState("");



  const handleSave = () => {
    const formData = new FormData();

    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("password", password);
    formData.append("password_confirmation", password_confirmation);
    formData.append("role", role);
    

    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    // console.log("user values", {
    //   name,
    //   email,
    //   phone
    // });

    mutation.mutate(
      { data: formData },
      {
        onSuccess: (res:CreateUserResponse) => {
          message.success(res?.message || "User Created Successfully");
          onClose();
          // Reset fields
          setName("");
          setEmail("");
          setPhone("");
          setPassword("");
          setPasswordConfirmation("");
          setRole("");
        
         
        
        },
        onError: (err: any) => {
          const msg = err?.response?.data?.message || "Failed to create User";
          message.error(msg);
          

        },
      }
    );
  };

  return (
    <Modal
      title="Create User"
      open={isOpen}
      onCancel={onClose}
      footer={[
        // <Button
        //   key="cancel"
        //   className="bg-red-500 text-backgroundPrimary hover:!bg-red-500 text-white"
        //   onClick={onClose}
        // >
        //   Cancel
        // </Button>,
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
      <form onSubmit={handleSubmit(onSubmit)} className=" w-full lg:max-w-4xl">
        <div className=" mt-6">
          <div className="space-y-2 font-poppins">
            <label className="text-[16px] font-semibold ">Name</label>
            <div className="flex items-center border rounded-md px-3 py-2">
              <input
                type="text"
                value={name}
                //onChange={(e) => setName(e.target.value)}

                onChange={(e) => {
                  const value = e.target.value;
                  // Capitalize first letter of each word
                  const formatted = value.replace(/\b\w/g, (char) =>
                    char.toUpperCase()
                  );
                  setName(formatted);
                }}
                placeholder="Enter Name"
                className="flex-1 outline-none text-sm"
              />
            </div>
          </div>

          <div className="mt-2 space-y-2 font-poppins">
            <label className="block text-[16px] font-semibold mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email"
              className="w-full border rounded-lg p-2 text-sm text-gray-700 bg-white shadow-sm outline-none resize-none"
            />
          </div>

          <div className="mt-2 space-y-2 font-poppins">
            <label className="block text-[16px] font-semibold mb-1">
              Phone
            </label>
            <input
              type="number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter Phone"
              className="w-full border rounded-lg p-2 text-sm text-gray-700 bg-white shadow-sm outline-none resize-none"
            />
          </div>

          <div className="mt-2 space-y-2 font-poppins">
            <label className="block text-[16px] font-semibold mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
              className="w-full border rounded-lg p-2 text-sm text-gray-700 bg-white shadow-sm outline-none resize-none"
            />
          </div>

          <div className="mt-2 space-y-2 font-poppins">
            <label className="block text-[16px] font-semibold mb-1">
              PasswordConfirmation
            </label>
            <input
              type="password"
              value={password_confirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              placeholder="Enter Password Confirmation"
              className="w-full border rounded-lg p-2 text-sm text-gray-700 bg-white shadow-sm outline-none resize-none"
            />
          </div>

          <div className="mt-2 space-y-2 font-poppins">
            <label className="block text-[16px] font-semibold mb-1">
              Roles
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full border rounded-lg p-2 text-sm text-gray-700 bg-white shadow-sm outline-none resize-none"
            >
              <option value="">Select Role</option>
            
              <option value="Sales Person">Sales Person</option>
              
              
              
              
            </select>

         
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default CreateUserModal;

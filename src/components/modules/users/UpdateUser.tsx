import { useState, useEffect } from "react";
import { Button, Modal, Input, message } from "antd";
import UserService from "@/services/user-service/UserService";

interface UpdateUserModalProps {
  open: boolean;
  onClose: () => void;
  userData: any;
}

const UpdateUserModal = ({
  open,
  onClose,
  userData,
}: UpdateUserModalProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
//   const [password, setPassword] = useState("");
//   const [password_confirmation, setPasswordConfirmation] = useState("");
  const [role, setRole] = useState("");

  const { useUpdateUser } = UserService();
  const { mutate: updateUser, isPending } = useUpdateUser();

  useEffect(() => {
    if (userData) {
      setName(userData.name || "");
      setEmail(userData.email || "");
      setPhone(userData.phone || "");

      setRole(userData.role || "");
    }
  }, [userData, open]);

  const isDirty =
    name !== (userData?.name || "") ||
    email !== (userData?.email || "") ||
    phone !== (userData?.phone || "") ||

    role !== (userData?.role || "")


  const handleSave = () => {
    const data = {
      name,
      email,
      phone,

      role

    };

    updateUser(
      {
        id: userData.id,
        data,
      },
      {
        onSuccess: () => {
          message.success("User Updated Successfully");
          onClose();
        },
        onError: (error: any) => {
          //console.error("Update Error:", error);

          const apiMessage = error?.response?.data?.message;

          if (apiMessage) {
            message.error(apiMessage);
          } else {
            message.error("Failed to update user");
          }
        },

      
      }
    );
  };

  return (
    <Modal
      title="Update User"
      open={open}
      onCancel={onClose}
      footer={[
        // <Button
        //   key="cancel"
        //   className="bg-red-500 text-backgroundPrimary hover:!bg-red-700"
        //   onClick={onClose}
        // >
        //   Cancel
        // </Button>,
        <Button
          key="save"
          className="bg-[#00a1b3] text-white text-backgroundPrimary hover:!bg-[#00a1b3] transition disabled:opacity-50"
          onClick={handleSave}
          loading={isPending}
          disabled={!isDirty}
        >
          Update
        </Button>,
      ]}
      centered
    >
      <div className="space-y-4">
        <div className="">
          <label className="block text-[16px] font-semibold mb-1">Name</label>
          <Input
            type="text"
            value={name}
            //onChange={(e) => setName(e.target.value)}
            onChange={(e) => {
              const value = e.target.value;
              const formatted = value.replace(/\b\w/g, (char) =>
                char.toUpperCase()
              );
              setName(formatted);
            }}
            className="w-full border rounded-lg p-2 text-sm text-gray-700 bg-white shadow-sm outline-none resize-none !border-[#D1D5DB] hover:!border-[#D1D5DB]"
          />
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
              className="w-full border rounded-lg p-2 text-sm text-gray-700 bg-white shadow-sm outline-none resize-none !border-[#D1D5DB] hover:!border-[#D1D5DB]"
            />
          </div>

          <div className="mt-2 space-y-2 font-poppins">
            <label className="block text-[16px] font-semibold mb-1">
              Phone
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter Phone"
              className="w-full border rounded-lg p-2 text-sm text-gray-700 bg-white shadow-sm outline-none resize-none !border-[#D1D5DB] hover:!border-[#D1D5DB]"
            />
          </div>

          {/* <div className="mt-2 space-y-2 font-poppins">
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
          </div> */}

          <div className="mt-2 space-y-2 font-poppins">
            <label className="block text-[16px] font-semibold mb-1">
              Roles
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full border rounded-lg p-2 text-sm text-gray-700 bg-white shadow-sm outline-none resize-none !border-[#D1D5DB] hover:!border-[#D1D5DB]"
            >
              {/* <option value="">Select Role</option> */}
            
              <option value="Sales Person">Sales Person</option>
             
            </select>

         
          </div>
      </div>
    </Modal>
  );
};

export default UpdateUserModal;

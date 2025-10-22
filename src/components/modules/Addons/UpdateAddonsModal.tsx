import { useState, useEffect } from "react";
import { Button, Modal, Input, message } from "antd";
import AddonsService from "@/services/addons-service/AddonsService";

interface UpdateAddonsModalProps {
  open: boolean;
  onClose: () => void;
  userData: any;
}

const UpdateAddonsModal = ({
  open,
  onClose,
  userData,
}: UpdateAddonsModalProps) => {

 


  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

   const { useUpdateAddons } = AddonsService();
  const { mutate: updateAddons, isPending } = useUpdateAddons();

  useEffect(() => {
    if (userData) {
      
      setName(userData.name || "");
      setDescription(userData.description || "");
      setPrice(userData.price || "");
     
    }

  }, [userData, open]);

  const isDirty =
  name !== (userData?.name || "") ||
  description !== (userData?.description || "")  ||
  price !== (userData?.price || 0) 



  const handleSave = () => {

    const data = {
      name,
      description,
      price
    };

    updateAddons(
      {

        id: userData.id,
        data,
      },
      {
        onSuccess: () => {
          message.success("Addons Updated Successfully");
          onClose();
        },
        onError: (error: any) => {
          // console.error("Update Error:", error);
          // message.error("Failed to update Addons");
          const msg = error?.response?.data?.message || "Failed to update Addons";
                    message.error(msg);
          
        },
      }
    );
  };

  return (
    <Modal
      title="Update Addons"
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
          <label className="block text-gray-600 mb-1">Name</label>
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
            className="flex-1 !border-[#D1D5DB] hover:!border-[#D1D5DB]"
          />
        </div>
        <div className="">
          <label className="block text-gray-600 mb-1">Description</label>
          <Input
            type="text"
            value={description}
               onChange={(e) => {
                let value = e.target.value;
                value = value.toLowerCase();
                value = value.replace(/(^\w{1})|(\.\s*\w{1})/g, (match) =>
                  match.toUpperCase()
                );
                setDescription(value);
              }}
            //onChange={(e) => setDescription(e.target.value)}
            className="flex-1 !border-[#D1D5DB] hover:!border-[#D1D5DB]"
          />
        </div>
        <div className="">
          <label className="block text-gray-600 mb-1">Price</label>
          <Input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="flex-1 !border-[#D1D5DB] hover:!border-[#D1D5DB]"
          />
        </div>

      </div>
    </Modal>
  );
};

export default UpdateAddonsModal;

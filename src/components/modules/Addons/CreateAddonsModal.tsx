import { useForm } from "react-hook-form";
import { Button, message, Modal } from "antd";
import { useState } from "react";
import AddonsService from "@/services/addons-service/AddonsService";


interface AddonsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateAddonsModal = ({ isOpen, onClose }: AddonsModalProps) => {
  const { handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    console.log("Form Data:", data);
    alert("Form submitted successfully!");
  };

 
  const { useCreateAddons } = AddonsService();

  const mutation = useCreateAddons();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");



  const handleSave = () => {
    const formData = new FormData();

    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    

    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    // console.log("addons values", {
    //   name,
    //   description,
    //   price,
     
    // });

    mutation.mutate(
      { data: formData },
      {
        onSuccess: (res:any) => {
          message.success(res?.message || "Addons Created Successfully");
          onClose();
          // Reset fields
          setName("");
          setDescription("");
          setPrice("");
         
        
        },
        onError: (err: any) => {
          const msg = err?.response?.data?.message || "Failed to create Addons";
          message.error(msg);
          

        },
      }
    );
  };

  return (
    <Modal
      title="Add Addons"
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
          <div className="space-y-2 font-poppins">
            <label className="text-[16px] font-semibold ">Description</label>
            <div className="flex items-center border rounded-md px-3 py-2">
              <input
                type="text"
                value={description}
                //onChange={(e) => setDescription(e.target.value)}
                onChange={(e) => {
                let value = e.target.value;
                value = value.toLowerCase();
                value = value.replace(/(^\w{1})|(\.\s*\w{1})/g, (match) =>
                  match.toUpperCase()
                );
                setDescription(value);
              }}
                placeholder="Enter Description"
                className="flex-1 outline-none text-sm"
              />
            </div>
          </div>

             <div className="mt-2 space-y-2 font-poppins">
          <label className="block text-[16px] font-semibold mb-1">Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter Price"
            className="w-full border rounded-lg p-2 text-sm text-gray-700 bg-white shadow-sm outline-none resize-none"
          />
        </div>

          
        </div>


      </form>
    </Modal>
  );
};

export default CreateAddonsModal;

import { useForm } from "react-hook-form";
import { Button, message, Modal } from "antd";
import { useState } from "react";
import { CreateIncentiveResponse, IncentiveData } from "@/lib/types/incentive";
import IncentiveService from "@/services/incentive-level-service/IncentiveLevelService";


interface IncentiveModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateIncentiveModal = ({ isOpen, onClose }: IncentiveModalProps) => {
  const { handleSubmit } = useForm<IncentiveData>();

  const onSubmit = (data: IncentiveData) => {
    console.log("Form Data:", data);
    alert("Form submitted successfully!");
  };

 
  const { useCreateIncentive } = IncentiveService();

  const mutation = useCreateIncentive();

  const [name, setName] = useState("");
  const [discount_percentage, setDiscountPercentage] = useState("");



  const handleSave = () => {
    const formData = new FormData();

    formData.append("name", name);
    formData.append("discount_percentage", discount_percentage);
    

    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    // console.log("incentive values", {
    //   name,
    //   discount_percentage,
    // });

    mutation.mutate(
      { data: formData },
      {
        onSuccess: (res:CreateIncentiveResponse) => {
          message.success(res?.message || "Incentive Created Successfully");
          onClose();
          // Reset fields
          setName("");
          setDiscountPercentage("");
        
         
        
        },
        onError: (err: any) => {
          const msg = err?.response?.data?.message || "Failed to create Incentive";
          message.error(msg);
          

        },
      }
    );
  };

  return (
    <Modal
      title="Create Incentive Level"
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
          <label className="block text-[16px] font-semibold mb-1">Discount Percentage</label>
          <input
            type="number"
            value={discount_percentage}
            onChange={(e) => setDiscountPercentage(e.target.value)}
            placeholder="Enter DiscountPercentage"
            className="w-full border rounded-lg p-2 text-sm text-gray-700 bg-white shadow-sm outline-none resize-none"
          />
        </div>

          
        </div>


      </form>
    </Modal>
  );
};

export default CreateIncentiveModal;

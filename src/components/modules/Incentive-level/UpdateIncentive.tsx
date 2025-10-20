import { useState, useEffect } from "react";
import { Button, Modal, Input, message } from "antd";
import IncentiveService from "@/services/incentive-level-service/IncentiveLevelService";

interface UpdateIncentiveModalProps {
  open: boolean;
  onClose: () => void;
  userData: any;
}

const UpdateIncentiveModal = ({
  open,
  onClose,
  userData,
}: UpdateIncentiveModalProps) => {
  const [name, setName] = useState("");
  const [discount_percentage, setDiscountPercentage] = useState("");

  const { useUpdateIncentive } = IncentiveService();
  const { mutate: updateIncentive, isPending } = useUpdateIncentive();

  useEffect(() => {
    if (userData) {
      setName(userData.name || "");
      setDiscountPercentage(userData.discount_percentage || "");
    }
  }, [userData, open]);

  const isDirty =
    name !== (userData?.name || "") ||
    discount_percentage !== (userData?.discount_percentage || "");

  const handleSave = () => {
    const data = {
      name,
      discount_percentage,
    };

    updateIncentive(
      {
        id: userData.id,
        data,
      },
      {
        onSuccess: () => {
          message.success("IncentiveLevel Updated Successfully");
          onClose();
        },
        onError: (error: any) => {
          //console.error("Update Error:", error);

          const apiMessage = error?.response?.data?.message;

          if (apiMessage) {
            message.error(apiMessage);
          } else {
            message.error("Failed to update IncentiveLevel");
          }
        },

      
      }
    );
  };

  return (
    <Modal
      title="Update Incentive"
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
          <label className="block text-gray-600 mb-1">Price</label>
          <Input
            type="number"
            value={discount_percentage}
            onChange={(e) => setDiscountPercentage(e.target.value)}
            className="flex-1 !border-[#D1D5DB] hover:!border-[#D1D5DB]"
          />
        </div>
      </div>
    </Modal>
  );
};

export default UpdateIncentiveModal;

import { useForm } from "react-hook-form";
import { Button, message, Modal, Select } from "antd";
import { useState } from "react";
import IncentiveService from "@/services/incentive-level-service/IncentiveLevelService";
import UserService from "@/services/user-service/UserService";

interface AssignIncentiveProps {
  isOpen: boolean;
  onClose: () => void;
   selectedUserId: number | null ;
}

const AssignIncentiveModal = ({ isOpen, onClose }: AssignIncentiveProps) => {
  const { handleSubmit } = useForm();

  const { useGetUsers } = UserService();
  const { data: users, isLoading } = useGetUsers();

  const { useAssignIncentive } = IncentiveService();
  const mutation = useAssignIncentive();

  const [selectedUser, setSelectedUser] = useState<any | null>(null);

  const handleSave = () => {
    if (!selectedUser) {
      message.error("Please select a user");
      return;
    }

    const userId = selectedUser.id;
    const incentiveLevelId = selectedUser.incentive_level_id;

    mutation.mutate(
      {
        id: userId, 
        data: {
          incentive_level_id: incentiveLevelId,
        },
      },
      {
        onSuccess: (res: any) => {
          message.success(res?.message || "Incentive Assigned Successfully");
          onClose();
          setSelectedUser(null);
        },
        onError: (err: any) => {
          const msg = err?.response?.data?.message || "Failed to assign incentive";
          message.error(msg);
        },
      }
    );
  };

  return (
    <Modal
      title="Assign Incentive Level"
      open={isOpen}
      onCancel={onClose}
      footer={[
        <Button
          key="save"
          className="bg-[#00a1b3] text-white"
          onClick={handleSave}
        >
          {mutation.isPending ? "Assigning..." : "Assign"}
        </Button>,
      ]}
      centered
    >
      <form onSubmit={handleSubmit(() => {})} className="w-full">
        <div className="mt-6">
          <label className="block text-sm font-semibold mb-1">
            Select User
          </label>
          <Select
            placeholder="Select User"
            className="w-full"
            loading={isLoading}
            value={selectedUser?.id}
            onChange={(userId) => {
              const foundUser = users?.data?.find((u: any) => u.id === userId);
              setSelectedUser(foundUser || null);
            }}
            options={users?.data?.map((user: any) => ({
              value: user.id,
              label: user.name,
            }))}
          />
        </div>
      </form>
    </Modal>
  );
};

export default AssignIncentiveModal;


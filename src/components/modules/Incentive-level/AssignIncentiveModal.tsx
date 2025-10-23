import { useForm } from "react-hook-form";
import { Button, message, Modal, Select } from "antd";
import { useState } from "react";
import IncentiveService from "@/services/incentive-level-service/IncentiveLevelService";
import UserService from "@/services/user-service/UserService";

interface AssignIncentiveProps {
  isOpen: boolean;
  onClose: () => void;
  selectedUserId: number | null;
  selectedIncentiveLevelId: number | null;
}

const AssignIncentiveModal = ({ isOpen, onClose, selectedIncentiveLevelId }: AssignIncentiveProps) => {
  const { handleSubmit } = useForm();

  const { useGetUsers } = UserService();
  const { data: users, isLoading: isUsersLoading } = useGetUsers();

  const { useGetIncentive } = IncentiveService();
  const { data: incentives, isLoading: isIncentivesLoading } = useGetIncentive(1, 100); // Fetch all incentives

  const { useAssignIncentive } = IncentiveService();
  const mutation = useAssignIncentive();

  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [selectedIncentive, setSelectedIncentive] = useState<number | null>(selectedIncentiveLevelId); // Initialize with passed ID

  const handleSave = () => {
    if (!selectedUser) {
      message.error("Please select a user");
      return;
    }
    if (!selectedIncentive) {
      message.error("Please select an incentive level");
      return;
    }

    mutation.mutate(
      {
        id: selectedUser.id,
        data: {
          incentive_level_id: selectedIncentive,
        },
      },
      {
        onSuccess: (res: any) => {
          message.success(res?.message || "Incentive Assigned Successfully");
          onClose();
          setSelectedUser(null);
          setSelectedIncentive(null);
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
          className="bg-[#00a1b3] hover:!bg-[#00a1b3] text-white"
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
            className="w-full [&_.ant-select-selector]:!text-graysecondary [&_.ant-select-selector]:!border-[#D1D5DB] 
             [&_.ant-select-selector:hover]:!border-[#D1D5DB] 
             [&_.ant-select-selector:focus]:!border-[#D1D5DB]"
            loading={isUsersLoading}
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
        <div className="mt-6">
          <label className="block text-sm font-semibold mb-1">
            Select Incentive Level
          </label>
          <Select
            placeholder="Select Incentive Level"
            className="w-full [&_.ant-select-selector]:!text-graysecondary [&_.ant-select-selector]:!border-[#D1D5DB] 
             [&_.ant-select-selector:hover]:!border-[#D1D5DB] 
             [&_.ant-select-selector:focus]:!border-[#D1D5DB]"
            loading={isIncentivesLoading}
            value={selectedIncentive}
            onChange={(incentiveId) => setSelectedIncentive(incentiveId)}
            options={incentives?.data?.map((incentive: any) => ({
              value: incentive.id,
              label: incentive.name,
            }))}
          />
        </div>
      </form>
    </Modal>
  );
};

export default AssignIncentiveModal;
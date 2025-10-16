import { useForm } from "react-hook-form";
import { Button, message, Modal, Select } from "antd";
import { useState } from "react";
import BlockedPeriodsService from "@/services/blockPeriods-Service/blockPeriodsService";
import YatchService from "@/services/yatch-service/YatchService";

interface BlockedPeriodProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateBlockedPeriod = ({ isOpen, onClose }: BlockedPeriodProps) => {


  const { handleSubmit } = useForm();

  const onSubmit = () => {
    //console.log("Form Data:", data);
    alert("Form submitted successfully!");
  };

  const { useGetYatch} = YatchService();
  const { data:yatch, isLoading } = useGetYatch();

  //console.log("yatch-id",yatch)
  
  const formatDateTime = (value: string) => {
  return value.replace("T", " ") + ":00";
};


 
  const { useCreateBlockedPeriod } = BlockedPeriodsService();

  const mutation = useCreateBlockedPeriod();

  const [start_time, setStartTime] = useState("");
  const [end_time, setEndTime] = useState("");
  const [reason, setReason] = useState("");
  const [yacht_id, setYachtId] = useState<number | undefined>();


  const handleSave = () => {
    const formData = new FormData();
    formData.append("start_time", formatDateTime(start_time));
    formData.append("end_time", formatDateTime(end_time));

    formData.append("reason", reason);
    formData.append("yacht_id", String(yacht_id));
    

    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    console.log("createBlockedPeriod values", {
      end_time,
      start_time,
      reason,
      yacht_id
     
    });

    mutation.mutate(
      { data: formData },
      {
        onSuccess: (res:any) => {
          message.success(res?.message || "Blocked Period Created Successfully");
          onClose();
          // Reset fields
          setStartTime("");
          setEndTime("");
          setReason("");
          setYachtId(undefined);
         
        
        },
        onError: (err: any) => {
          const msg = err?.response?.data?.message || "Failed to create Blocked Period";
          message.error(msg);
          

        },
      }
    );
  };

  return (
    <Modal
      title="Create Blocked Period"
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
              <label className="block text-sm font-semibold mb-1">
               Yacht
            </label>
            <Select
              placeholder="Select Yatch"
              className="w-full [&_.ant-select-selector]:!text-graysecondary [&_.ant-select-selector]:!border-[#D1D5DB] 
             [&_.ant-select-selector:hover]:!border-[#D1D5DB] 
             [&_.ant-select-selector:focus]:!border-[#D1D5DB]"
              loading={isLoading}
              value={yacht_id}
              onChange={(value) => setYachtId(value)}
              options={yatch?.data?.map((ya: any) => ({
                value: ya.id,
                label: `${ya.name}`,
              }))}
            />
            </div>

            
          <div className="space-y-2 font-poppins">
            <label className="block text-sm font-semibold mb-1 mt-2">
              Start Time
            </label>
            <input
              type="datetime-local"
              value={start_time}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
            />
            </div>
          
          <div className="space-y-2 font-poppins">
            <label className="block text-sm font-semibold mb-1 mt-2">End Time</label>
            <input
              type="datetime-local"
              value={end_time}
              onChange={(e) => setEndTime(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
            />
          </div>

            <div className="mt-2 space-y-2 font-poppins">
          <label className="block text-sm font-semibold mb-1">Reason</label>
          <input
            type="text"
            value={reason}
            onChange={(e) => {
                  const value = e.target.value;
                  // Capitalize first letter of each word
                  const formatted = value.replace(/\b\w/g, (char) =>
                    char.toUpperCase()
                  );
                  setReason(formatted);
                }}
            //onChange={(e) => setReason(e.target.value)}
            placeholder="Enter Reason"
            className="w-full border rounded-lg p-2 text-sm text-gray-700 bg-white shadow-sm outline-none resize-none"
          />
        </div>
        </div>

     


      </form>
    </Modal>
  );
};

export default CreateBlockedPeriod;

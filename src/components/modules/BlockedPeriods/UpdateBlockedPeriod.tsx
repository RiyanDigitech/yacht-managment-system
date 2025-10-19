
import { useState, useEffect } from "react";
import { Button, Modal, message, Select } from "antd";
import BlockedPeriodsService from "@/services/blockPeriods-Service/blockPeriodsService";
import YatchService from "@/services/yatch-service/YatchService";
import dayjs from "dayjs";

interface UpdateBlockedPeriodModalProps {
  open: boolean;
  onClose: () => void;
  userData: any;
}

const UpdateBlockedPeriod = ({
  open,
  onClose,
  userData,
}: UpdateBlockedPeriodModalProps) => {

 


  const [start_time, setStartTime] = useState("");
  const [end_time, setEndTime] = useState("");
  const [reason, setReason ] = useState("");
  const [yacht_id, setYachtId] = useState("");

//   const formatDateTime = (value: string) => {
//   return value.replace("T", " ") + ":00";
// };
  const formatDateTime = (value: string) => {
  return dayjs(value).utc().format("YYYY-MM-DD HH:mm:ss");
};


   const { useUpdateBlockedPeriods } = BlockedPeriodsService();
  const { mutate: updateBlockedPeriod, isPending } = useUpdateBlockedPeriods();

  
  const { useGetYatch} = YatchService();
  const { data:yatch } = useGetYatch();

  useEffect(() => {
    if (userData) {
        const toDatetimeLocal = (datetime: string) => {
          if (!datetime) return "";
          //return dayjs.utc(datetime).local().format("YYYY-MM-DDTHH:mm");
          return datetime.replace(" ", "T").slice(0, 16);
        };

      setStartTime(toDatetimeLocal(userData.start_time || ""));
      setEndTime(toDatetimeLocal(userData.end_time || ""));
      setReason(userData.reason || "");
      setYachtId(userData.yacht_id)
     
    }

  }, [userData, open]);

  const isDirty =
  start_time !== (userData?.start_time || "") ||
  end_time !== (userData?.end_time || "")  ||
  reason !== (userData?.reason || "")  ||
  yacht_id !== (userData?.yacht_id || 0) 



  const handleSave = () => {

    const data = {
  start_time: formatDateTime(start_time),
    end_time: formatDateTime(end_time),
      reason,
      yacht_id: Number(yacht_id),
    };

    updateBlockedPeriod(
      {

        id: userData.id,
        data,
      },
      {
        onSuccess: () => {
          message.success("BlockedPeriod Updated Successfully");
          onClose();
        },
        onError: (error: any) => {
          console.error("Update Error:", error);
          message.error("Failed to update BlockedPeriod");
        },
      }
    );
  };

  return (
    <Modal
      title="Update BlockedPeriod"
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
                      //loading={isLoading}
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
     
    </Modal>
  );
};

export default UpdateBlockedPeriod;



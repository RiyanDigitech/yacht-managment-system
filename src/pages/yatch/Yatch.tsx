import CreateYachtModal from "@/components/modules/yatch/CreateYachtModal";
import YatchTable from "@/components/modules/yatch/YatchTable"
import { Button } from "antd"
import { useState } from "react";


const Yatch = () => {
      const [open, setOpen] = useState(false);
  return (
    <div className="p-4">
     {/* Top Controls */}
      <div className="flex  flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
        {/* Left Controls */}
         {/* Date Filter */}
  <div className="flex items-center gap-3 mb-4">
        

        <Button
          type="primary"
          className="bg-[#00a1b3] hover:!bg-sky-600"
        >
          Filter
        </Button>
      </div> 

         <button className="bg-[#00a1b3] text-white py-2 px-3 rounded-lg" onClick={() => setOpen(true)} >Create Yacht</button>
      </div>
      <YatchTable />
      {/* Modal Component */}
      <CreateYachtModal open={open} onClose={() => setOpen(false)} />
    </div>
  )
}

export default Yatch

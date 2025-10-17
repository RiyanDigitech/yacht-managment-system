import InvoiceTable from "@/components/modules/invoice/InvoiceTable";
import CreateYachtModal from "@/components/modules/yatch/CreateYachtModal";
import YatchTable from "@/components/modules/yatch/YatchTable"
import { Button } from "antd"
import { useState } from "react";


const Invoice = () => {
      const [open, setOpen] = useState(false);
  return (
    <>
     {/* Top Controls */}
      <div className="flex p-4 flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
        {/* Left Controls */}
         {/* Date Filter */}
  <div className="flex items-center gap-3 mb-4">
        

        <Button
          type="primary"
          className="bg-green-600 hover:!bg-green-700"
        >
          Filter
        </Button>
      </div> 

         <button className="bg-green-600 text-white py-2 px-3 rounded-lg" onClick={() => setOpen(true)} >Create Yatch</button>
      </div>
      <InvoiceTable />
      {/* Modal Component */}
      <CreateYachtModal open={open} onClose={() => setOpen(false)} />
    </>
  )
}

export default Invoice

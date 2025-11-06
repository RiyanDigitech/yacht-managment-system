
import { useState } from "react";
import { Button } from "antd"; // assuming you’re using Ant Design
 // adjust path
import CreateFacilitiesModal from "@/components/modules/facilities/CreateFacilitiesModal";
import FacilitiesTable from "@/components/modules/facilities/FacilitiesTable";
// adjust path

const Facilities = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-4">
      {/* Top Controls */}
      <div className="flex flex-row md:flex-row md:items-center justify-between gap-4 mb-4">
        {/* Left Controls */}
        <div className="flex items-center gap-3 mb-4">
          <Button
            type="primary"
            className="bg-[#00a1b3] hover:!bg-[#00a1b3]"
          >
            Filter
          </Button>
        </div>
 <div className="flex items-center gap-3 mb-4">
        <Button
          className="bg-[#00a1b3] text-white hover:!bg-[#00a1b3] p-4"
          onClick={() => setOpen(true)}
        >
          Create Facilities
        </Button>
      </div>
</div>
      <FacilitiesTable />

      {/* Modal Component */}
      <CreateFacilitiesModal open={open} onClose={() => setOpen(false)} />
    </div>
  );
};

export default Facilities;



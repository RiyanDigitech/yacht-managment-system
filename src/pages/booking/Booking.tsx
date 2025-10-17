import BookingTable from "@/components/modules/booking/BookingTable";
import CreateBookingModal from "@/components/modules/booking/CreateBooking";

import { useState } from "react";


const Booking = () => {
      const [open, setOpen] = useState(false);
  return (
    <>
     {/* Top Controls */}
      <div className="flex p-4 flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
        {/* Left Controls */}
         {/* Date Filter */}
  <div className="flex items-center gap-3 mb-4">
        

        {/* <Button
          type="primary"
          className="bg-green-600 hover:!bg-green-700"
        >
          Filter
        </Button> */}
      </div> 

         <button className="bg-green-600 text-white py-2 px-3 rounded-lg" onClick={() => setOpen(true)} >Create Booking</button>
      </div>
      <BookingTable />
      {/* Modal Component */}
      <CreateBookingModal open={open} onClose={() => setOpen(false)} />
    </>
  )
}

export default Booking

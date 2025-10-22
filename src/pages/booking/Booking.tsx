import BookingTable from "@/components/modules/booking/BookingTable";
import CreateBookingModal from "@/components/modules/booking/CreateBooking";

import { useState } from "react";


const Booking = () => {
      const [open, setisOpen] = useState(false);
  return (
    <>
     {/* Top Controls */}
      <div className="flex p-2 flex-col md:flex-row md:items-center justify-between gap-4 ">
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

         <button className="bg-[#00a1b3] text-white py-2 px-3 rounded-lg" onClick={() => setisOpen(true)} >Create Booking</button>
      </div>
      <BookingTable />
      {/* Modal Component */}
      <CreateBookingModal open={open} onClose={() => setisOpen(false)} />
    </>
  )
}

export default Booking

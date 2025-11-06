import BookingModal from "@/components/BookingModal";
import CustomerBookingTable from "@/components/modules/booking/CustomerBookingTable";

import { useState } from "react";


const CustomerBooking = () => {
      const [isOpen, setIsOpen] = useState(false);
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

          <button 
              onClick={() => setIsOpen(true)}
              className="bg-[#00a1b3] text-white py-2 px-3 rounded-lg fonts-Inconsolata">

                Create Booking
              </button>
      </div>
      <CustomerBookingTable />
      {/* Modal Component */}
       <BookingModal openModal={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}

export default CustomerBooking

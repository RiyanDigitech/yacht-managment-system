import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Modal, Button, Spin, message } from "antd";
import "./Celender.css";
import CreateBookingModal from "../booking/CreateBooking";
import CreateBlockedPeriod from "../BlockedPeriods/CreateBlockedPeriod";
import BookingServices from "@/services/booking-service/BookingServices";
import BlockedPeriodsService from "@/services/blockPeriods-Service/blockPeriodsService";
import EditStatusModal from "../booking/EditModal";
import UpdateBlockedPeriod from "../BlockedPeriods/UpdateBlockedPeriod";
import { useNavigate } from "react-router-dom";

function Celender() {
  const [events, setEvents] = useState<any[]>([]);
  const [isMainModalOpen, setIsMainModalOpen] = useState(false);
  const [isBookingModalOpen, setisOpen] = useState(false);
  const [editingBlockedPeriod, setEditingBlockedPeriod] = useState<boolean>(false);
  const [isMaintenanceModalOpen, setOpen] = useState(false);
  const [Editopen, setOpenEdit] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenMain, setIsModalOpenMain] = useState(false);
  const [selectedDate, setSelectedDate] = useState<any>(null);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);


  const naviagte = useNavigate()

  // GET BOOKINGS
  const { useGetBooking, useDeleteBooking } = BookingServices();
  const { data: booking, isLoading: bookingLoading } = useGetBooking();
  const deleteExpense = useDeleteBooking();

  const handleDelete = (id: number, callbacks?: any) => {
    if (!id) return;

    deleteExpense.mutate(
      { id },
      {
        onSuccess: (res) => {
          if (res?.success) {
            message.success(res.message || "Deleted successfully");
            setOpenEdit(false)
            setIsModalOpen(false)
            callbacks?.onSuccess?.();
          } else {
            message.error(res?.message || "Failed to delete expense");
            callbacks?.onError?.();
          }
        },
        onError: (err: any) => {
          message.error(err?.response?.data?.message || "Delete request failed");
          callbacks?.onError?.();
        },
      }
    );
  };


  // GET MAINTENANCE (Blocked Periods)
  const { useGetBlockedPeriods , useDeleteBlockedPeriods} = BlockedPeriodsService();
  const { data: blockperiod, isLoading: blockLoading } = useGetBlockedPeriods();
  const deleteblockperiods = useDeleteBlockedPeriods();

  const handleDeleteMaintanece = (id: number, callbacks?: any) => {
    if (!id) return;
  
    deleteblockperiods.mutate(
      { id },
      {
        onSuccess: (res) => {
          if (res?.success) {
            message.success(res.message || "Deleted successfully");
            setIsModalOpenMain(false)
            callbacks?.onSuccess?.();
          } else {
            message.error(res?.message || "Failed to delete blockperiods");
            callbacks?.onError?.();
          }
        },
        onError: (err: any) => {
          message.error(err?.response?.data?.message || "Delete request failed");
          callbacks?.onError?.();
        },
      }
    );
    };


  // Handle date select (open main modal)
  const handleDateSelect = (selectInfo: any) => {
    setSelectedDate(selectInfo);
    setIsMainModalOpen(true);
  };

  // Combine both API data into FullCalendar events
  useEffect(() => {
    if (!booking || !blockperiod) return;

    const bookingEvents =
      booking?.data?.map((b: any) => ({
        id: b.id,
        title: `Booking - ${b.customer_name || "Guest"}`,
        start: b.start_time,
        end: b.end_time,
        color: "#00a1b3", // Blue for Bookings
      })) || [];

    const maintenanceEvents =
      blockperiod?.data?.map((m: any) => ({
        id: m.id,
        title: `Maintenance - ${m.reason || "Blocked"}`,
        start: m.start_time,
        end: m.end_time,
        color: "#f59e0b", // Orange for Maintenance
      })) || [];

    setEvents([...bookingEvents, ...maintenanceEvents]);
  }, [booking, blockperiod]);

  if (bookingLoading || blockLoading) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <Spin size="large" tip="Loading Calendar Data..." />
      </div>
    );
  }


  const handleEventClick = (clickInfo: any) => {
 
    setSelectedDate(clickInfo.event);
    setSelectedId(clickInfo.event.id);
    // setIsModalOpen(true);
    setSelectedEvent(clickInfo.event);
    console.log(clickInfo.event._def)

    if (clickInfo.event._def.title.startsWith("Booking -")) {
      setIsModalOpen(true);
    } else if (clickInfo.event._def.title.startsWith("Maintenance - ")) {
      setIsModalOpenMain(true);
    }
  };
console.log(events)
  const hanleEditModal = () => {
    setIsModalOpen(false);
    setOpenEdit(true);
  }

  const handleClose = () => {
    setOpenEdit(false)
  }

  return (
    <div className="p-6  rounded-2xl shadow-md">
      {/* <h1 className="text-2xl font-bold mb-4 text-center text-[#00a1b3]">
        📅 Booking & Maintenance Calendar
      </h1> */}

      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        initialView="dayGridMonth"
        selectable
        selectMirror
        select={handleDateSelect}
        events={events}
        editable={false}
        nowIndicator
        height="90vh"
        eventDisplay="block"
        eventTextColor="#fff"
        eventTimeFormat={{
          hour: "2-digit",
          minute: "2-digit",
          meridiem: "short",
        }}
        eventClick={handleEventClick}
      />

      {/* Main Choice Modal */}
      <Modal
        title="Add Booking / Maintenance"
        open={isMainModalOpen}
        onCancel={() => setIsMainModalOpen(false)}
        footer={null}
        centered
      >
        <div className="flex flex-col gap-4 py-4">
          <Button
            type="primary"
            className="!bg-[#00a1b3] !text-white !py-2 !text-lg !rounded-xl hover:!opacity-90 transition-all"
            onClick={() => {
              setIsMainModalOpen(false);
              setisOpen(true);
            }}
          >
            ➕ Add Booking
          </Button>

          <Button
            type="primary"
            className="!bg-[#f59e0b] !text-white !py-2 !text-lg !rounded-xl hover:!opacity-90 transition-all"
            onClick={() => {
              setIsMainModalOpen(false);
              setOpen(true);
            }}
          >
            🛠️ Add Maintenance
          </Button>
        </div>
      </Modal>

      <Modal
        title={selectedDate?.title}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={[
          <Button key="edit"
            onClick={hanleEditModal}
            className="!bg-[#00a1b3] !text-white !py-2 !px-3 !rounded-lg">
            Edit
          </Button>,
          <Button key="delete" danger onClick={() => handleDelete(selectedId)}>
            Delete
          </Button>,
        ]}
      >
        <div className="bg-gray-50 p-4 rounded-xl shadow-inner border border-gray-200">
          <div className="flex flex-col gap-3">

            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-700">Start:</span>
              <span className="text-gray-600 bg-white px-3 py-1 rounded-md border border-gray-300">
                {selectedDate?.start?.toLocaleString()}
              </span>
            </div>

            {selectedDate?.end && (
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-700">End:</span>
                <span className="text-gray-600 bg-white px-3 py-1 rounded-md border border-gray-300">
                  {selectedDate?.end?.toLocaleString()}
                </span>
              </div>
            )}
          </div>
        </div>
      </Modal>
      {/* ✅ Maintenance Modal */}
      <Modal
        title="Maintenance Details"
        open={isModalOpenMain}
        onCancel={() => setIsModalOpenMain(false)}
        footer={[
          <Button key="edit" className="!bg-[#00a1b3] !text-white !py-2 !px-3 !rounded-lg"
          onClick={()=>(naviagte('/blockedperiods'))}>
            Edit Maintenance
          </Button>,
          <Button key="delete" danger onClick={() => handleDeleteMaintanece(selectedId)}>
            Delete Maintenance
          </Button>,
        ]}
      >
        <div className="space-y-3">
          <p>
            <b>Title:</b> {selectedEvent?.title}
          </p>
          <p>
            <b>Start:</b> {selectedEvent?.start?.toLocaleString()}
          </p>
        </div>
      </Modal>

      {/* Booking Modal */}
      <CreateBookingModal
        open={isBookingModalOpen}
        onClose={() => setisOpen(false)}
      />

      {/* Maintenance Modal */}
      <CreateBlockedPeriod
        isOpen={isMaintenanceModalOpen}
        onClose={() => setOpen(false)}
      />

      <EditStatusModal open={Editopen} onCancel={handleClose} id={selectedId}/>
      <UpdateBlockedPeriod
              open={editingBlockedPeriod}
              userData={selectedId}
              onClose={() => setEditingBlockedPeriod(false)}
            />
    </div>
  );
}

export default Celender;

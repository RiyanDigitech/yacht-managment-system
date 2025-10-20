import { buildUrlWithParams } from "@/lib/helpers";
import axios from "@/lib/config/axios-instance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";


const BookingServices = () => {
     const useGetBooking = (
   page? :number, pageSize?:number ) => {
  async function fetchBooking() {
    const url = buildUrlWithParams("/bookings", {
      page,
      pageSize,
    });
    const res = await axios.get(url);
    return res.data; 
  }

  return useQuery({
    queryFn: fetchBooking,
    queryKey: ["booking", {  page, pageSize  }],
    retry: 0,
    refetchOnWindowFocus: false,
  });
};

const useGetBookingDetail = (id: string | number) => {
    return useQuery({
      queryKey: ["yatch", id],
      queryFn: async () => {
        const { data } = await axios.get(`/bookings/${id}`);
        return data?.data;
      },
      enabled: !!id,
    });
  };
 
  // Create 
const useCreateBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ( data: FormData) => {
      return axios
        .post(`/bookings`, data)
        .then((res) => res.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["booking"] });
    },
  });
};
// update 
const useUpdateBooking = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: async ({ id, status }: { id: string | number; status: any }) => {
        return axios
          .put(`/bookings/${id}`, status)
          .then((res) => res.data);
      },

      onSuccess: (_data) => {
        queryClient.invalidateQueries({ queryKey: ["booking"] });
        message.success(_data.message)      
      },
      onError:(error:any) => {
        message.error(error.response.data.message)
      }
    });
  };
//   delete 
  const useDeleteBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id
    }: {
      id: number | string;
    }) => {
      const res = await axios.delete(`/bookings/${id}`);
      return res.data;
    },
    onSuccess: (_data) => {
      queryClient.invalidateQueries({ queryKey: ["booking"] });
    },
  });
};
  return {
    useGetBooking,
    useDeleteBooking,
    useCreateBooking,
    useUpdateBooking,
    useGetBookingDetail,
  }
}

export default BookingServices

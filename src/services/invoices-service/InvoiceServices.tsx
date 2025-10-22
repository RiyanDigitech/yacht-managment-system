import { buildUrlWithParams } from "@/lib/helpers";
import axios from "@/lib/config/axios-instance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";


const InvoicesService = () => {
     const useGetInvoice = (id:number, page? :number, pageSize?:number ) => {
  async function fetchInvoice() {
    const url = buildUrlWithParams(`/bookings/${id}/invoices`, {
      page,
      pageSize,
    });
    const res = await axios.get(url);
    return res.data; 
  }

  return useQuery({
    queryFn:fetchInvoice,
    queryKey: ["Invoice", id , {  page, pageSize  }],
    retry: 0,
    refetchOnWindowFocus: false,
  });
};
     const useGetInvoiceDetail = (id: string | number) => {
    return useQuery({
      queryKey: ["Invoice", id],
      queryFn: async () => {
        const { data } = await axios.get(`/yachts/${id}`);
        return data?.data;
      },
      enabled: !!id,
    });
  };
 
  // Create Invoice
const useCreateInvoice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ data }: { data: FormData }) => {
      return axios
        .post(`/yachts`, data)
        .then((res) => res.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Invoice"] });
    },
  });
};
// update Invoice
const useUpdateInvoice = () => {
  const queryClient = useQueryClient();
    return useMutation({
      mutationFn: async ({ id, data }: { id: number; data: FormData }) => {
        const res = await axios.post(`/yachts/${id}?_method=PUT`, data);
        return res.data;
      },
      onSuccess: () => {
        // queryClient.invalidateQueries({ queryKey: ["yatchDetail"] });
        queryClient.invalidateQueries({ queryKey: ["Invoice"] });
      },
    });
  };
//   delete Invoice
  const useDeleteInvoice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id
    }: {
      id: number | string;
    }) => {
      const res = await axios.delete(`/yachts/${id}`);
      return res.data;
    },
    onSuccess: (_data) => {
      queryClient.invalidateQueries({ queryKey: ["Invoice"] });
    },
  });
};

//delete Invoice image
const useDeleteInvoiceImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, image_path }: { id: number; image_path: string }) => {
      return axios.delete(`/yachts/${id}/images`, {
        data: { image_path }, 
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Invoice"] });
    },
  });
};


  return {
    useGetInvoice,
    useDeleteInvoice,
    useCreateInvoice,
    useUpdateInvoice,
    useGetInvoiceDetail,
    useDeleteInvoiceImage
  }
}

export default InvoicesService

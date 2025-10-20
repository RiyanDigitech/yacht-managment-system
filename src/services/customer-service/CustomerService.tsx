import { buildUrlWithParams } from "@/lib/helpers";
import axios from "@/lib/config/axios-instance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";


const CustomerService = () => {
     const useGetCustomer = (
   page? :number, pageSize?:number ) => {
  async function fetchCustomer() {
    const url = buildUrlWithParams("/manage-customers", {
      page,
      pageSize,
    });
    const res = await axios.get(url);
    return res.data; 
  }

  return useQuery({
    queryFn: fetchCustomer,
    queryKey: ["customer", {  page, pageSize  }],
    retry: 0,
    refetchOnWindowFocus: false,
  });
};
     const useGetCustomerDetail = (id: string | number) => {
    return useQuery({
      queryKey: ["customer", id],
      queryFn: async () => {
        const { data } = await axios.get(`/yachts/${id}`);
        return data?.data;
      },
      enabled: !!id,
    });
  };
 
  // Create Customer
const useCreateCustomer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ data }: { data: FormData }) => {
      return axios
        .post(`/yachts`, data)
        .then((res) => res.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customer"] });
    },
  });
};
// update Yatch
const useUpdateCustomer = () => {
  const queryClient = useQueryClient();
    return useMutation({
      mutationFn: async ({ id, data }: { id: number; data: FormData }) => {
        const res = await axios.post(`/yachts/${id}?_method=PUT`, data);
        return res.data;
      },
      onSuccess: () => {
        // queryClient.invalidateQueries({ queryKey: ["yatchDetail"] });
        queryClient.invalidateQueries({ queryKey: ["customer"] });
      },
    });
  };
//   delete Customer
  const useDeleteCustomer = () => {
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
      queryClient.invalidateQueries({ queryKey: ["customer"] });
    },
  });
};

//delete Customer image
const useDeleteCustomerImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, image_path }: { id: number; image_path: string }) => {
      return axios.delete(`/yachts/${id}/images`, {
        data: { image_path }, 
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customer"] });
    },
  });
};


  return {
    useGetCustomer,
    useDeleteCustomer,
    useCreateCustomer,
    useUpdateCustomer,
    useGetCustomerDetail,
    useDeleteCustomerImage
  }
}

export default CustomerService

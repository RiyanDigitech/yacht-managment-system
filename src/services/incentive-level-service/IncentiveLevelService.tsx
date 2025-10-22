import { buildUrlWithParams } from "@/lib/helpers";
import axios from "@/lib/config/axios-instance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const IncentiveService = () => {

  const useGetIncentive = (page?: number, pageSize?: number) => {
    async function fetchIncentive() {
      const url = buildUrlWithParams("/incentive-levels", {
        page,
        pageSize,
      });
      const res = await axios.get(url);
      return res.data;
    }

    return useQuery({
      queryFn: fetchIncentive,
      queryKey: ["incentive", { page, pageSize }],
      retry: 0,
      refetchOnWindowFocus: false,
    });
  };

   const useCreateIncentive = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ data }: { data: FormData }) => {
      return axios
        .post(`/incentive-levels`, data)
        .then((res) => res.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["incentive"] });
    },
  });
  };

   const useDeleteIncentive = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id
    }: {
      id: number | string;
    }) => {
      const res = await axios.delete(`/incentive-levels/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["incentive"] });
    },
  });
  };

  const useUpdateIncentive = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string | number;
      data:  {
        name: string;
        discount_percentage: number;
    
      };
    }) => {
      return axios
        .put(`/incentive-levels/${id}`, data)
        .then((res) => res.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["incentive"] });
      
    },
  });
  };

  const useAssignIncentive = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string | number;
      data:  {
        
        incentive_level_id: number;
    
      };
    }) => {
      return axios
        .put(`/salespersons/${id}/incentive`, data)
        .then((res) => res.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["incentive"] });
      
    },
  });
  };

  return {
    useGetIncentive,
    useCreateIncentive,
    useDeleteIncentive,
    useUpdateIncentive,useAssignIncentive
  };
};

export default IncentiveService;

import { buildUrlWithParams } from "@/lib/helpers";
import axios from "@/lib/config/axios-instance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const BlockedPeriodsService = () => {

  const useGetBlockedPeriods = (
   page? :number, pageSize?:number ) => {
  async function fetchBlockedPeriods() {
    const url = buildUrlWithParams("/blocked-periods", {
      page,
      pageSize,
    });
    const res = await axios.get(url);
    return res.data; 
  }

  return useQuery({
    queryFn: fetchBlockedPeriods,
    queryKey: ["blocked-periods", {  page, pageSize  }],
    retry: 0,
    refetchOnWindowFocus: false,
  });
  };

   const useCreateBlockedPeriod= () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: async ({ data }: { data: FormData }) => {
        return axios
          .post(`/blocked-periods`, data)
          .then((res) => res.data);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["blocked-periods"] });
      },
    });
  };

  const useDeleteBlockedPeriods = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: async ({
        id
      }: {
        id: number | string;
      }) => {
        const res = await axios.delete(`/blocked-periods/${id}`);
        return res.data;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["blocked-periods"] });
      },
    });
  };

  const useUpdateBlockedPeriods = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string | number;
      data:  {
        yard_id:number;
        start_time: string;
        end_time: string;
        reason: number;
    
      };
    }) => {
      return axios
        .put(`/blocked-periods/${id}`, data)
        .then((res) => res.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blocked-periods"] });
      
    },
  });
  };



  return {
    useGetBlockedPeriods,
    useDeleteBlockedPeriods,
    useCreateBlockedPeriod,
    useUpdateBlockedPeriods

 
  }
}

export default BlockedPeriodsService;
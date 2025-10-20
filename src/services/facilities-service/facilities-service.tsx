import { buildUrlWithParams } from "@/lib/helpers";
import axios from "@/lib/config/axios-instance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const FacilitiesService = () => {
  //  Get All Facilities
  const useGetFacilities = (page?: number, pageSize?: number) => {
    async function fetchFacilities() {
      const url = buildUrlWithParams("/facilities", { page, pageSize });
      const res = await axios.get(url);
      return res.data;
    }

    return useQuery({
      queryFn: fetchFacilities,
      queryKey: ["facilities", { page, pageSize }],
      retry: 0,
      refetchOnWindowFocus: false,
    });
  };

  //  Get Each Facility Detail
  const useGetFacilitiesDetail = (id: string | number) => {
    return useQuery({
      queryKey: ["facilities", id],
      queryFn: async () => {
        const data  = await axios.get(`/facilities/${id}`);
        return data?.data;
      },
      enabled: !!id,
    });
  };

  //  Create Facility
  const useCreateFacilities = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: async ({ data }: { data: FormData }) => {
        console.log("🚀 Sending Data: ", data);
        const res = await axios.post(`/facilities`, data);
        return res.data;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["facilities"] });
      },
    });
  };

  // Update Facility
  const useUpdateFacilities = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: async ({ id, data }: { id: number; data: FormData }) => {
        const res = await axios.post(`/facilities/${id}?_method=PUT`, data);
        return res.data;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey:["facilities"]});
      },
    });
  };




  // delete Faacilities
  const useDeleteFacilities = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id
    }: {
      id: number | string;
    }) => {
      const res = await axios.delete(`/facilities/${id}`);
      return res.data;
    },
    onSuccess: (_data) => {
      queryClient.invalidateQueries({ queryKey: ["facilities"] });
    },
  });
};





  return {
    useGetFacilities,
    useDeleteFacilities,
    useCreateFacilities,
    useUpdateFacilities,
     useGetFacilitiesDetail,
  }
}

export default FacilitiesService;

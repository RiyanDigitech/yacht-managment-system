import { buildUrlWithParams } from "@/lib/helpers";
import axios from "@/lib/config/axios-instance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";


const YatchService = () => {
     const useGetYatch = (
   page? :number, pageSize?:number ) => {
  async function fetchYatch() {
    const url = buildUrlWithParams("/yachts", {
      page,
      pageSize,
    });
    const res = await axios.get(url);
    return res.data; 
  }

  return useQuery({
    queryFn: fetchYatch,
    queryKey: ["yatch", {  page, pageSize  }],
    retry: 0,
    refetchOnWindowFocus: false,
  });
};
     const useGetYachtDetail = (id: string | number) => {
    return useQuery({
      queryKey: ["yatch", id],
      queryFn: async () => {
        const { data } = await axios.get(`/yachts/${id}`);
        return data?.data;
      },
      enabled: !!id,
    });
  };
 
  // Create Yatch
const useCreateYatch = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ data }: { data: FormData }) => {
      return axios
        .post(`/yachts`, data)
        .then((res) => res.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["yatch"] });
    },
  });
};
// update Yatch
const useUpdateYatch = () => {
  const queryClient = useQueryClient();
    return useMutation({
      mutationFn: async ({ id, data }: { id: number; data: FormData }) => {
        const res = await axios.post(`/yachts/${id}?_method=PUT`, data);
        return res.data;
      },
      onSuccess: () => {
        // queryClient.invalidateQueries({ queryKey: ["yatchDetail"] });
        queryClient.invalidateQueries({ queryKey: ["yatch"] });
      },
    });
  };
//   delete Yatch
  const useDeleteYatch = () => {
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
      queryClient.invalidateQueries({ queryKey: ["yatch"] });
    },
  });
};

//delete yacht image
const useDeleteYatchImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, image_path }: { id: number; image_path: string }) => {
      return axios.delete(`/yachts/${id}/images`, {
        data: { image_path }, 
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["yatch"] });
    },
  });
};


  return {
    useGetYatch,
    useDeleteYatch,
    useCreateYatch,
    useUpdateYatch,
    useGetYachtDetail,
    useDeleteYatchImage
  }
}

export default YatchService

import { buildUrlWithParams } from "@/lib/helpers";
import axios from "@/lib/config/axios-instance";
import { useMutation, useQuery, useQueryClient} from "@tanstack/react-query";


const AddonsService = () => {

  const useGetAddons = (
   page? :number, pageSize?:number ) => {
  async function fetchAddons() {
    const url = buildUrlWithParams("/addons", {
      page,
      pageSize,
    });
    const res = await axios.get(url);
    return res.data; 
  }

  return useQuery({
    queryFn: fetchAddons,
    queryKey: ["addons", {  page, pageSize  }],
    retry: 0,
    refetchOnWindowFocus: false,
  });
  };

  const useCreateAddons = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ data }: { data: FormData }) => {
      return axios
        .post(`/addons`, data)
        .then((res) => res.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["addons"] });
    },
  });
};

  const useDeleteAddons = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id
    }: {
      id: number | string;
    }) => {
      const res = await axios.delete(`/addons/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["addons"] });
    },
  });
  };

  const useUpdateAddons = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string | number;
      data:  {
        name: string;
        description: string;
        price: number;
    
      };
    }) => {
      return axios
        .put(`/addons/${id}`, data)
        .then((res) => res.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["addons"] });
      
    },
  });
  };



return {
    useGetAddons,
    useDeleteAddons,
    useCreateAddons,
    useUpdateAddons
 
  }
}

export default AddonsService
 
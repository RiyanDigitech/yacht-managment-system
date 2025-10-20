import { buildUrlWithParams } from "@/lib/helpers";
import axios from "@/lib/config/axios-instance";
import {  useMutation, useQuery, useQueryClient } from "@tanstack/react-query";


const UserService = () => {

  const useGetUsers = (
   page? :number, pageSize?:number ) => {
  async function fetchUsers() {
    const url = buildUrlWithParams("/users", {
      page,
      pageSize,
    });
    const res = await axios.get(url);
    return res.data; 
  }

  return useQuery({
    queryFn: fetchUsers,
    queryKey: ["users", {  page, pageSize  }],
    retry: 0,
    refetchOnWindowFocus: false,
  });
  };

   const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ data }: { data: FormData }) => {
      return axios
        .post(`/users`, data)
        .then((res) => res.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
  };

  
   const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id
    }: {
      id: number | string;
    }) => {
      const res = await axios.delete(`/users/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
  };

   const useUpdateUser = () => {
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
        .put(`/users/${id}`, data)
        .then((res) => res.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      
    },
  });
  };


  

return {
    useGetUsers,
    useCreateUser,
    useDeleteUser,
    useUpdateUser
  
 
  }
}

export default UserService
 
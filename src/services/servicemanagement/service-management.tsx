import axios from "@/lib/config/axios-instance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { errorType } from "@/lib/types";
import { notification } from "antd";

import { useNavigate } from "react-router-dom";
import { buildUrlWithParams } from "@/lib/helpers";
import { FranchiseResponse } from "@/lib/types/franchise";
import { ServiceResponse, ServiceUpdateListType } from "@/lib/types/service";

const ServiceManagementService = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const useFetchAllServices = (
    limit?: number,
    page?: number,
    query?: string,
    changes?: boolean
  ) => {
    async function fetchService(): Promise<ServiceResponse> {
      const url = buildUrlWithParams("/service", {
        limit,
        page,
        query,
      });
      return axios.get(url).then((res) => res.data);
    }
    return useQuery({
      queryFn: fetchService,
      queryKey: ["service", limit, page, query, changes],
      retry: 0,
      refetchOnWindowFocus: false,
    });
  };
  const useHandleDeleteService = (id?: number) => {
    async function handleDeleteService(): Promise<FranchiseResponse> {
      return axios.delete(`/service/${id}`).then((res) => res.data);
    }
    const onSuccess = () => {
      // console.log("repos")
      notification.success({
        message: "Service Deleted",
        description: "You have successfully Deleted the Service",
        placement: "topRight",
      });
      queryClient.refetchQueries({ queryKey: ["service"], exact: false });
    };
    const onError = (error: errorType) => {
      notification.error({
        message: "Failed",
        description:
          error?.response?.data?.message || "Franchise Failed to Delete",
        placement: "topRight",
      });
    };
    return useMutation({
      mutationFn: handleDeleteService,
      onSuccess,
      onError,
      retry: 0,
    });
  };
  const useFetchTargetedservices = (id?: number) => {
    async function fetchTeam(): Promise<ServiceUpdateListType> {
      const url = buildUrlWithParams(`/service/${id}`, {});
      return axios.get(url).then((res) => res.data);
    }

    return useQuery({
      queryFn: fetchTeam,
      queryKey: ["service", id],
      retry: 0,
      refetchOnWindowFocus: false,
    });
  };
  const useHandleCreateService = (
    reset: () => void,
    setSelectedFile: React.Dispatch<React.SetStateAction<File | null>>,
    setContent: React.Dispatch<React.SetStateAction<string | "">>
  ) => {
    function handleCreateServiceRequest(data: FormData): Promise<errorType> {
      return axios.post(`/service`, data);
    }

    const onSuccess = (response: errorType) => {
      console.log("user created server response ", response);
      notification.success({
        message: "service Created Successful",
        description: "You have successfully created the services!",
        placement: "topRight",
      });
      queryClient.invalidateQueries({ queryKey: ["service"] });
      reset();
      setSelectedFile(null);
      setContent("");
      navigate("/service-list");
    };
    const onError = (error: errorType) => {
      notification.error({
        message: "Failed",
        description:
          error?.response?.data.message || "Failed To Created Service",
        placement: "topRight",
      });
    };
    return useMutation({
      mutationFn: handleCreateServiceRequest,
      onSuccess,
      onError,
      retry: 0,
    });
  };
  const useHandleUpdateServiceService = (reset: () => void, id?: number) => {
    function handleUpdateUserRequest(data: FormData): Promise<errorType> {
      return axios.put(`/service/${id}`, data);
    }

    const onSuccess = (response: errorType) => {
      console.log(
        "update Service response form server you can check it",
        response
      );
      notification.success({
        message: "Service Profile Updated Successfully",
        description: "You have successfully updated the Service Profile!",
        placement: "topRight",
      });
      reset();

      queryClient.invalidateQueries({ queryKey: ["service", id] });
      navigate("/service-list");
    };
    const onError = (error: errorType) => {
      notification.error({
        message: "Failed",
        description:
          error?.response?.data.message || "Failed To Update service",
        placement: "topRight",
      });
    };
    return useMutation({
      mutationFn: handleUpdateUserRequest,
      onSuccess,
      onError,
      retry: 0,
    });
  };
  return {
    useHandleCreateService,
    useHandleDeleteService,
    useFetchAllServices,
    useFetchTargetedservices,
    useHandleUpdateServiceService,
  };
};
export default ServiceManagementService;

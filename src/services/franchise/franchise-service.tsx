import axios from "@/lib/config/axios-instance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { buildUrlWithParams } from "@/lib/helpers";
import { errorType } from "@/lib/types";
import { notification } from "antd";
import {
  FranchiseCreateResponse,
  franchiseInputs,
  FranchiseResponse,
  TargetdFranchise,
  UpdateFranchise,
} from "@/lib/types/franchise";
import { useNavigate } from "react-router-dom";

const FranchiseService = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const useFetchAllFranchises = (
    limit?: number,
    page?: number,
    query?: string
  ) => {
    async function fetchTeam(): Promise<FranchiseResponse> {
      const url = buildUrlWithParams("/franchise", {
        limit,
        page,
        query,
      });
      return axios.get(url).then((res) => res.data);
    }

    return useQuery({
      queryFn: fetchTeam,
      queryKey: ["franchise", limit, page, query],
      retry: 0,
      refetchOnWindowFocus: false,
    });
  };
  const useHandleDeleteFranchise = (id?: number) => {
    async function handleDeleteFranchise(): Promise<FranchiseResponse> {
      return axios.delete(`/franchise/${id}`).then((res) => res.data);
    }

    const onSuccess = (response: FranchiseResponse) => {
      console.log("response form server franchise ", response);

      notification.success({
        message: "Franchise Deleted",
        description: "You have successfully Deleted the franchise!",
        placement: "topRight",
      });

      queryClient.invalidateQueries({ queryKey: ["franchise"] });
    };
    const onError = (error: errorType) => {
      notification.error({
        message: "Failed",
        description:
          error?.response?.data.message || "Franchise failed to delete",
        placement: "topRight",
      });
    };
    return useMutation({
      mutationFn: handleDeleteFranchise,
      onSuccess,
      onError,
      retry: 0,
    });
  };
  const useHandleCreateFranchise = (reset: () => void) => {
    function handleCreateFranchiseRequest(
      data: franchiseInputs
    ): Promise<FranchiseCreateResponse> {
      console.log(data);
      return axios.post(`/franchise`, data);
    }
    const onSuccess = (response: FranchiseCreateResponse) => {
      console.log("success", response);
      notification.success({
        message: "Success! Password Sent On Your Email Account",
        description: "Password Sent On your Email Account",
        placement: "topRight",
      });
      reset();
      navigate("/franchise-list");
    };
    const onError = (error: errorType) => {
      console.warn("error is", error);
      notification.error({
        message: "Failed to Add Franchise",
        description: error?.response?.data?.message,
        placement: "topRight",
      });
    };
    return useMutation({
      mutationFn: handleCreateFranchiseRequest,
      onSuccess,
      onError,
      retry: 0,
    });
  };
  const useFetchTargetedFranchises = (id?: number) => {
    async function fetchTeam(): Promise<TargetdFranchise> {
      const url = buildUrlWithParams(`/franchise/${id}`, {});
      return axios.get(url).then((res) => res.data);
    }

    return useQuery({
      queryFn: fetchTeam,
      queryKey: ["franchise", id],
      retry: 0,
      refetchOnWindowFocus: false,
    });
  };
  const useHandleUpdateFranchiseService = (reset: () => void, id?: number) => {
    function handleUpdateUserRequest(
      data: UpdateFranchise
    ): Promise<TargetdFranchise> {
      return axios.put(`/franchise/${id}`, data);
    }

    const onSuccess = (response: TargetdFranchise) => {
      console.log(
        "update Franchise response form server you can check it",
        response
      );
      notification.success({
        message: "Franchise Profile Updated Successfully",
        description: "You have successfully updated the Franchise Profile!",
        placement: "topRight",
      });
      reset();

      queryClient.invalidateQueries({ queryKey: ["franchise"] });
    };
    const onError = (error: errorType) => {
      notification.error({
        message: "Failed",
        description:
          error?.response?.data.message || "Failed To Update franchise",
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
    useFetchAllFranchises,
    useHandleDeleteFranchise,
    useHandleCreateFranchise,
    useFetchTargetedFranchises,
    useHandleUpdateFranchiseService,
  };
};
export default FranchiseService;

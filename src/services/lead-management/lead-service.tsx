import axios from "@/lib/config/axios-instance";
import { useMutation, useQuery } from "@tanstack/react-query";

import { buildUrlWithParams } from "@/lib/helpers";

import {
  LeadApiResponse,
  QuotationCreate,
  TargetedLeadApiResponse,
} from "@/lib/types/lead";
import { FranchiseCreateResponse } from "@/lib/types/franchise";
import { notification } from "antd";
import { useNavigate } from "react-router-dom";
import { errorType } from "@/lib/types";
const LeadService = () => {
  const navigate = useNavigate();
  const useFetchAllLead = (limit?: number, page?: number, query?: string) => {
    async function fetchTeam(): Promise<LeadApiResponse> {
      const url = buildUrlWithParams("/lead", {
        limit,
        page,
        query,
      });
      return axios.get(url).then((res) => res.data);
    }

    return useQuery({
      queryFn: fetchTeam,
      queryKey: ["lead", limit, page, query],
      retry: 0,
      refetchOnWindowFocus: false,
    });
  };
  const useHandleCreateLeadQuotation = (reset: () => void) => {
    function handleCreateQuotationRequest(
      data: QuotationCreate
    ): Promise<FranchiseCreateResponse> {
      console.log(data);
      return axios.post(`/lead/quotation`, data);
    }
    const onSuccess = (response: FranchiseCreateResponse) => {
      console.log("success", response);
      notification.success({
        message: "Quotation Added",
        description: "You have successfully added the Lead-Quotation",
        placement: "topRight",
      });
      reset();
      navigate("/lead-list");
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
      mutationFn: handleCreateQuotationRequest,
      onSuccess,
      onError,
      retry: 0,
    });
  };
  const useFetchTargetedLead = (id?: number) => {
    async function fetchTeam(): Promise<TargetedLeadApiResponse> {
      const url = buildUrlWithParams(`/lead/${id}`, {});
      return axios.get(url).then((res) => res.data);
    }

    return useQuery({
      queryFn: fetchTeam,
      queryKey: ["lead", id],
      retry: 0,
      refetchOnWindowFocus: false,
    });
  };
  const useFetchTargetedFranchiseLead = (
    limit?: number,
    page?: number,
    email?: string,
    query?: string
  ) => {
    console.log("email", email);
    async function fetchTeam(): Promise<LeadApiResponse> {
      const url = buildUrlWithParams("/lead", {
        limit,
        page,
        email,
        query,
      });
      return axios.get(url).then((res) => res.data);
    }

    return useQuery({
      queryFn: fetchTeam,
      queryKey: ["lead", limit, page, email, query],
      retry: 0,
      refetchOnWindowFocus: false,
    });
  };
  const useHandleCreateFranchiseLeadQuotation = (reset: () => void) => {
    function handleCreateQuotationRequest(
      data: QuotationCreate
    ): Promise<FranchiseCreateResponse> {
      console.log(data);
      return axios.post(`/lead/quotation`, data);
    }
    const onSuccess = (response: FranchiseCreateResponse) => {
      console.log("success", response);
      notification.success({
        message: "Quotation Added",
        description: "You have successfully added the Lead-Quotation",
        placement: "topRight",
      });
      reset();
      navigate("/lead");
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
      mutationFn: handleCreateQuotationRequest,
      onSuccess,
      onError,
      retry: 0,
    });
  }; // In LeadService.ts

  const useFetchAllFranchiseLeadCounts = (userId?: number) => {
    const fetchTeam = async (): Promise<LeadApiResponse> => {
      const url = `/lead/status-counts?userId=${userId}`;
      const response = await axios.get(url);
      return response.data;
    };

    return useQuery({
      queryKey: ["lead", userId],
      queryFn: fetchTeam,
      enabled: !!userId, // ✅ Don't conditionally call hook
      retry: 0,
      refetchOnWindowFocus: false,
    });
  };

  const useFetchAllLeadCounts = () => {
    async function fetchTeam(): Promise<LeadApiResponse> {
      const url = buildUrlWithParams("/lead/status-counts", {});
      return axios.get(url).then((res) => res.data);
    }

    return useQuery({
      queryFn: fetchTeam,
      queryKey: ["lead"],
      retry: 0,
      refetchOnWindowFocus: false,
    });
  };
  return {
    useFetchAllLead,
    useFetchTargetedFranchiseLead,
    useHandleCreateLeadQuotation,
    useFetchTargetedLead,
    useHandleCreateFranchiseLeadQuotation,
    useFetchAllLeadCounts,
    useFetchAllFranchiseLeadCounts,
  };
};
export default LeadService;

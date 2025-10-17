import { buildUrlWithParams } from "@/lib/helpers";
import axios from "@/lib/config/axios-instance";
import { useQuery } from "@tanstack/react-query";


const DashboardService = () => {
     const useGetDashboard = ( ) => {
  async function fetchDashboard() {
    const url = buildUrlWithParams("/dashboard/stats", {});
    const res = await axios.get(url);
    return res.data; 
  }

  return useQuery({
    queryFn: fetchDashboard,
    queryKey: ["dashboard"],
    retry: 0,
    refetchOnWindowFocus: false,
  });
};


  return {
    useGetDashboard,
  }
}

export default DashboardService

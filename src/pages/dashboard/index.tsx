import LeadService from "@/services/lead-management/lead-service";
import LeadChart from "@/components/modules/dashboard/dashboard-chart";

const DashboardPage = () => {
  const { useFetchAllLeadCounts } = LeadService();
  const { data: leadCounts } = useFetchAllLeadCounts();
  console.log("leadCounts", leadCounts?.data);
  return (
    <div className="p-1">
      <div className="min-h-screen flex justify-center items-center">
        {/* <LeadChart /> */}
      </div>
    </div>
  );
};

export default DashboardPage;

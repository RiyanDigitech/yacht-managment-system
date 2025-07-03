import LeadChart from "@/components/modules/dashboard/dashboard-chart";
import AdvancedFormulaEditor from "../complaint-details/checking-formula";
const FranchiseDashboardPage = () => {
  return (
    <div className="p-1">
      <div className="min-h-screen bg-gradient-to-br from-[#e2e8f0] to-[#e2e8f0] flex justify-center items-center">
        <LeadChart />
      </div>
      {/* <AdvancedFormulaEditor /> */}
    </div>
  );
};

export default FranchiseDashboardPage;

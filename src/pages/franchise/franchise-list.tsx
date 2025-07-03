import FranchiseListTableColumns from "@/components/modules/franchise/franchise-list-table";
import { Franchiselist } from "@/lib/types/franchise";
import { Input, Pagination, Spin, Table } from "antd";
import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import "../../index.css";
import { useNavigate } from "react-router-dom";
import FranchiseService from "@/services/franchise/franchise-service";

const FranchiseList = () => {
  const [limit, setFranchiseLimit] = useState<number>(5);
  const [page, setFranchiseCurrentPage] = useState<number>(1);
  const [query, setFranchiseQuery] = useState<string | undefined>(undefined);
  const navigate = useNavigate();
  const { useFetchAllFranchises } = FranchiseService();
  const { data: franchiseData, isLoading: isfranchiseDataLoading } =
    useFetchAllFranchises(limit, page, query);

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[]) => {
      console.log("selectedRowKeys: ", selectedRowKeys);
      setSelectedRowKeys(selectedRowKeys);
    },
  };
  console.log(franchiseData, "franchiseData");
  const handleButtonClick = () => {
    navigate("/create-franchise");
  };
  const handlePageChange = (page: number, pageSize?: number) => {
    setFranchiseCurrentPage(page);
    if (pageSize) setFranchiseLimit(pageSize);
  };
  const totalResults = franchiseData?.total || 0;
  const showTotal = (total: number) =>
    `Page ${Math.min(page, totalResults)} of ${total} Results`;
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFranchiseQuery(e.target.value);
  };
  console.log(selectedRowKeys);
  const { columns, modal } = FranchiseListTableColumns();

  return (
    <div className="p-5">
      <div className="flex justify-between items-center flex-wrap md:flex-nowrap">
        {" "}
        <div className="border-b-[1px] max-sm:w-full">
          <Input
            // size="large"
            placeholder="Search franchise..."
            prefix={<img src="/preffixsearch.png" />}
            onChange={handleSearchChange}
            className="border-none bg-[#f8fafc] pl-2"
          />
        </div>
        <div className="flex items-center rounded-lg flex-col md:flex-row">
          <div
            onClick={handleButtonClick} // Add navigation here
            className="border-[#E2E8F0] border-[1px] flex items-center mt-2 md:mt-0 bg-white p-2  rounded-lg cursor-pointer"
          >
            <div className="max-sm:hidden">
              <FiPlus className="text-[#64748B]" />
            </div>
            <div>
              <div className="pl-2 text-[#475569] font-DMSans">
                Create Franchise
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Table<Franchiselist>
          columns={columns}
          dataSource={franchiseData?.data?.map((team) => ({
            ...team,
            key: team.id,
          }))}
          loading={{
            spinning: isfranchiseDataLoading,
            indicator: (
              <div className="flex items-center justify-center">
                <Spin
                  className="custom-table-spinner"
                  size="large"
                  style={{ color: "#008444" }}
                />
              </div>
            ),
          }}
          pagination={false}
          rowSelection={{
            type: "checkbox",
            ...rowSelection,
          }}
          className="overflow-auto border-[1px] rounded-lg mt-7  bg-white franchise-table"
        />
        {modal}
      </div>
      <div className=" flex justify-between items-center mt-4  flex-col md:flex-row">
        <div className="text-sm text-gray-600 mb-5 md:mb-0">
          {showTotal(totalResults)}
          {/* <button className="ml-2  cursor-pointer">All</button> */}
        </div>
        <Pagination
          current={page}
          pageSize={limit}
          total={totalResults}
          onChange={handlePageChange}
          showSizeChanger={false} // Enable page size changer
          size="small"
        />
      </div>
    </div>
  );
};

export default FranchiseList;

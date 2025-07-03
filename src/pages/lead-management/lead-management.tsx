import { Input, Pagination, Spin, Table } from "antd";
import { useCallback, useMemo, useState } from "react";
import "../../index.css";
import LeadListTableColumns from "@/components/modules/lead/lead-list-table";
import LeadService from "@/services/lead-management/lead-service";
import { Lead } from "@/lib/types/lead";
import { debounce } from "lodash";
const LeadList = () => {
  const [limit, setFranchiseLimit] = useState<number>(7);
  const [page, setFranchiseCurrentPage] = useState<number>(1);
  const [query, setFranchiseQuery] = useState<string | undefined>(undefined);
  const { useFetchAllLead } = LeadService();

  const { data: leaddata, isLoading: isleaddataLoading } = useFetchAllLead(
    limit,
    page,
    query
  );

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(selectedRowKeys);
    },
  };
  const handlePageChange = useCallback((page: number, pageSize?: number) => {
    setFranchiseCurrentPage(page);
    if (pageSize) setFranchiseLimit(pageSize);
  }, []);
  const totalResults = leaddata?.total || 0;
  const showTotal = useCallback(
    (total: number) => {
      return `Page ${Math.min(page, totalResults)} of ${total} Results`;
    },
    [page, totalResults]
  );
  const handleSearchChange = useMemo(
    () =>
      debounce(
        (e: React.ChangeEvent<HTMLInputElement>) =>
          setFranchiseQuery(e.target.value),
        300
      ),
    []
  );

  const filteredData = useMemo(() => {
    return (
      leaddata?.data?.filter((user) => user?.leadStatus !== "Payment Failed") ||
      []
    );
  }, [leaddata]);
  return (
    <div className="p-5">
      <div className="flex justify-between items-center flex-wrap md:flex-nowrap">
        {" "}
        <div className="border-b-[1px]">
          <Input
            placeholder="Search leads..."
            prefix={<img src="/preffixsearch.png" />}
            onChange={handleSearchChange}
            className="border-none bg-[#f8fafc] pl-2"
          />
        </div>
      </div>
      <Table<Lead>
        columns={LeadListTableColumns()}
        dataSource={filteredData}
        // dataSource={leaddata?.data?.filter(
        //   (user) => user?.leadStatus !== "Payment Failed"
        // )}
        loading={{
          spinning: isleaddataLoading,
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
      />{" "}
      <div className=" flex justify-between items-center mt-4  flex-col md:flex-row">
        <div className="text-sm text-gray-600 mb-5 md:mb-0">
          {showTotal(totalResults)}
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

export default LeadList;

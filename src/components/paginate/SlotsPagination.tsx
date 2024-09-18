import { TMeta } from "@/types";
import { Pagination, PaginationProps } from "antd";

type SlotsPagination = {
  setSearchQuery: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  metaData: TMeta;
};

const SlotsPagination = ({ setSearchQuery, metaData }: SlotsPagination) => {
  const showTotal: PaginationProps["showTotal"] = (total) => (
    <p className="text-lg">
      Total <span className="mx-1 font-medium">{total}</span> items
    </p>
  );
  const totalData = metaData?.totalData;
  const handlePaginateChange = (page: number, dataPerPage: number) => {
    console.log(page, dataPerPage);
    setSearchQuery((prevQuery) => {
      const newSearchQuery: Record<string, string> = {};
      for (const item in prevQuery) {
        if (item === "page") newSearchQuery["page"] = page.toString();
        else if (item === "limit")
          newSearchQuery["limit"] = dataPerPage.toString();
        else newSearchQuery[item] = prevQuery[item];
      }
      return newSearchQuery;
    });
  };

  return (
    <div>
      <Pagination
        size="default"
        total={totalData}
        onChange={handlePaginateChange}
        showTotal={showTotal}
        pageSizeOptions={["5", "10", "20", "40", "50", "100"]}
        defaultPageSize={10}
        showSizeChanger
        showQuickJumper
      />
    </div>
  );
};

export default SlotsPagination;

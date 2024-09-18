import { TMeta } from "@/types";
import { Pagination, PaginationProps } from "antd";

type TMeetingRoomPaginationProps = {
  setSearchQuery: React.Dispatch<
    React.SetStateAction<Record<string, unknown>[]>
  >;
  metaData: TMeta;
};

const MeetingRoomPagination = ({
  setSearchQuery,
  metaData,
}: TMeetingRoomPaginationProps) => {
  const showTotal: PaginationProps["showTotal"] = (total) => (
    <p className="text-lg">
      Total <span className="mx-1 font-medium">{total}</span> items
    </p>
  );
  const totalData = metaData?.totalData;
  const handlePaginateChange = (page: number, dataPerPage: number) => {
    setSearchQuery((prevQuery) => {
      const newArr = prevQuery.map((item) => {
        if (item?.page) {
          return { page };
        }
        if (item?.limit) {
          return { limit: dataPerPage };
        }
        return item;
      });
      return newArr;
    });
  };

  return (
    <div>
      <Pagination
        size="default"
        total={totalData}
        onChange={handlePaginateChange}
        showTotal={showTotal}
        pageSizeOptions={["5", "10", "20", "40"]}
        defaultPageSize={10}
        showSizeChanger
        showQuickJumper
      />
    </div>
  );
};

export default MeetingRoomPagination;

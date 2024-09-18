import FilledButton from "@/components/button/FilledButton";
import { Select, Slider } from "antd";
import Search from "antd/es/input/Search";
import { useEffect, useState } from "react";

type TFilterRoomsProps = {
  setSearchQuery: React.Dispatch<
    React.SetStateAction<Record<string, unknown>[]>
  >;
};

const FilterRooms = ({ setSearchQuery }: TFilterRoomsProps) => {
  const [search, setSearch] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [capacityRange, setCapacityRange] = useState([0, 1000]);
  const [sortPrice, setSortPrice] = useState("default");
  const onSearch = (value: string) => {
    setSearch(value);
    setSearchQuery((searchQuery) => {
      const othersQuery = searchQuery.filter((query) => !query.searchTerm);
      if (!value) return [...othersQuery];
      return [...othersQuery, { searchTerm: value }];
    });
  };
  const handlePriceChange = (value: number[]) => {
    setPriceRange(value);
    const text = `pricePerSlot:gte=${value[0]},lte=${value[1]}`;
    setSearchQuery((searchQuery) => {
      const newQuery: Record<string, unknown>[] = [],
        rangeQuery: Record<string, unknown>[] = [];
      searchQuery.forEach((query) => {
        if (query?.range && (query.range as string).includes("pricePerSlot")) {
          newQuery.push({ range: text });
          rangeQuery.push({ range: text });
        } else {
          newQuery.push(query);
        }
      });
      if (rangeQuery.length) return newQuery;
      return [...searchQuery, { range: text }];
    });
  };
  const handleCapacityChange = (value: number[]) => {
    setCapacityRange(value);
    const text = `capacity:gte=${value[0]},lte=${value[1]}`;
    setSearchQuery((searchQuery) => {
      const newQuery: Record<string, unknown>[] = [],
        rangeQuery: Record<string, unknown>[] = [];
      searchQuery.forEach((query) => {
        if (query?.range && (query.range as string).includes("capacity")) {
          newQuery.push({ range: text });
          rangeQuery.push({ range: text });
        } else {
          newQuery.push(query);
        }
      });
      if (rangeQuery.length) return newQuery;
      return [...searchQuery, { range: text }];
    });
  };
  const handlePriceSortChange = (value: string) => {
    console.log(value);
    setSearchQuery((searchQuery) => {
      const othersQuery = searchQuery.filter((query) => !query.sort);
      if (!value) return [...othersQuery];
      return [...othersQuery, { sort: value }];
    });
  };
  const resetValues = () => {
    setPriceRange([0, 1000]);
    setCapacityRange([0, 1000]);
    setSortPrice("default");
    setSearch("");
    setSearchQuery((prevQuery) => {
      const newQuery = [];
      for (const item of prevQuery) {
        if (item?.page || item?.limit) {
          newQuery.push(item);
        }
      }
      return newQuery;
    });
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setSearchQuery((searchQuery) => {
        const othersQuery = searchQuery.filter((query) => !query.searchTerm);
        if (!search) return [...othersQuery];
        return [...othersQuery, { searchTerm: search }];
      });
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [search, setSearchQuery]);

  return (
    <div>
      <div className="md:max-w-52 md:min-w-52 mt-0 md:mt-12 space-y-8">
        <div className=" w-[100%] md:w-[85%]">
          <Search
            placeholder="input search text"
            onSearch={onSearch}
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
        </div>
        <div className="space-y-6 w-[100%] md:w-[85%]">
          <div>
            <p className="-mb-1 font-medium">Filter By Price Range</p>
            <Slider
              min={0}
              max={1000}
              range
              step={1}
              defaultValue={priceRange}
              value={priceRange}
              onChange={(value) => setPriceRange(value)}
              onChangeComplete={handlePriceChange}
            />
            <p className="text-xs -mt-1 text-gray-500">
              Selected Range: {priceRange[0]} to {priceRange[1]}
            </p>
          </div>
          <div>
            <p className="-mb-1 font-medium">Filter By Capacity Range</p>
            <Slider
              min={0}
              max={1000}
              range
              step={10}
              value={capacityRange}
              onChange={(value) => setCapacityRange(value)}
              onChangeComplete={handleCapacityChange}
            />
            <p className="text-xs -mt-1 text-gray-500">
              Selected Range: {capacityRange[0]} to {capacityRange[1]}
            </p>
          </div>
        </div>
        <div className=" w-[100%] md:w-[85%]">
          <Select
            showSearch
            optionFilterProp="label"
            className="w-full"
            value={sortPrice}
            onChange={(value) => {
              setSortPrice(value);
              handlePriceSortChange(value);
            }}
            options={[
              {
                label: <span className="text-gray-500">Sort by price</span>,
                value: "default",
                disabled: true,
              },
              { label: <span>Low to high</span>, value: "pricePerSlot" },
              { label: <span>High to low</span>, value: "-pricePerSlot" },
            ]}
          />
        </div>
        <div onClick={resetValues}>
          <FilledButton buttonText="Reset" className="w-[100%] md:w-[85%]" />
        </div>
      </div>
    </div>
  );
};

export default FilterRooms;

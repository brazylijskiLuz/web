import React, { useEffect, useState } from "react";
import Input from "@/features/common/Input";
import { Select } from "@/features/common/Select";
import { useT } from "@/utils/hooks/useTranslation";

interface ISearchInputsProps {
  onChangeInputs: (val: {
    query: string;
    radius: string;
    city: string;
  }) => void;
}

const SearchInputs = ({ onChangeInputs }: ISearchInputsProps) => {
  const { t } = useT();

  const [query, setQuery] = useState("");
  const [radius, setRadius] = useState("5");
  const [city, setCity] = useState("");

  useEffect(() => {
    onChangeInputs({
      query: query,
      radius: radius,
      city: city,
    });
  }, [query, radius, city]);
  return (
    <div
      className={
        "flex h-16 w-full items-center justify-between border-b-2 border-light bg-white px-4 text-sm xs:px-14 xs:text-base"
      }
    >
      <Input showSearchIcon onChange={(e) => setQuery(e.target.value)} />
      <div className={"flex gap-4"}>
        <Input onChange={(e) => setCity(e.target.value)} />
        <Select
          className={"w-20"}
          options={[`5 ${t("km")}`, `10 ${t("km")}`]}
          defaultValue={`5 ${t("km")}`}
          onSelect={(val) => setRadius(val.trim().split(t("km"))[0])}
        />
      </div>
    </div>
  );
};

export default SearchInputs;

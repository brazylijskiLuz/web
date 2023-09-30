import React, { useEffect, useRef, useState } from "react";
import Input from "@/features/common/Input";
import { Select } from "@/features/common/Select";
import { useT } from "@/utils/hooks/useTranslation";
import AccessibilitySvg from "@/assets/svgs/Accessibiliy.svg";
import AccessibilityModal from "@/features/common/AccessibilityModal";
import { useOutsideClick } from "@/utils/hooks/useOutsideClick";

interface ISearchInputsProps {
  onChangeInputs: (val: {
    query: string;
    radius: string;
    city: string;
  }) => void;
}

const SearchInputs = ({ onChangeInputs }: ISearchInputsProps) => {
  const { t } = useT();

  const container = useRef(null);

  const [showModal, setShowModal] = useState(false);

  const [query, setQuery] = useState("");
  const [radius, setRadius] = useState("5");
  const [city, setCity] = useState("");

  useOutsideClick(container, () => {
    setShowModal(false);
  });

  useEffect(() => {
    onChangeInputs({
      query: query,
      radius: radius,
      city: city,
    });
  }, [query, radius, city]);

  return (
    <div
      ref={container}
      className={
        "fixed top-24 z-50 flex h-24 w-full flex-col justify-between gap-2 border-b-2 border-light bg-white px-2 py-2 text-sm xs:h-16 xs:flex-row xs:items-center xs:gap-4 xs:px-4 xs:text-base sm:px-14"
      }
    >
      <Input
        showSearchIcon
        onChange={(e) => setQuery(e.target.value)}
        className={"xs:w-60 md:w-80"}
        placeholder={`${t("home:search")}...`}
      />
      <div className={"flex w-full gap-4 xs:w-auto"}>
        <Input
          containerStyles={"w-full md:w-auto"}
          onChange={(e) => setCity(e.target.value)}
          placeholder={t("home:enterCity")}
        />
        <Select
          className={"!max-w-[5rem]"}
          options={[`5 ${t("km")}`, `10 ${t("km")}`]}
          defaultValue={`5 ${t("km")}`}
          onSelect={(val) => setRadius(val.trim().split(t("km"))[0])}
        />
      </div>
      {showModal && <AccessibilityModal />}
    </div>
  );
};

export default SearchInputs;

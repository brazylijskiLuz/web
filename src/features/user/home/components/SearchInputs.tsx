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
        "border-1 flex h-16 w-full items-center justify-between border-light bg-white px-4 text-sm xs:px-14 xs:text-base"
      }
    >
      <Input showSearchIcon onChange={(e) => setQuery(e.target.value)} />
      <div className="flex">
        <div className={"flex gap-4"}>
          <Input onChange={(e) => setCity(e.target.value)} />
          <Select
            className={"w-20"}
            options={[`5 ${t("km")}`, `10 ${t("km")}`]}
            defaultValue={`5 ${t("km")}`}
            onSelect={(val) => setRadius(val.trim().split(t("km"))[0])}
          />
        </div>
        <div className="ml-8 flex h-full  items-center border-l  border-l-primary pl-4">
          <button onClick={() => setShowModal((state) => !state)}>
            <AccessibilitySvg className="h-10 w-10 " />
          </button>
        </div>
      </div>
      {showModal && <AccessibilityModal />}
    </div>
  );
};

export default SearchInputs;

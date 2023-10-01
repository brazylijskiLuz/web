import { useT } from "@/utils/hooks/useTranslation";
import React from "react";
import { School } from "@/models/school.model";

interface ISchoolDataProps {
  isLoading: boolean;
  data?: School;
}

export default function SchoolData({ isLoading, data }: ISchoolDataProps) {
  const { t } = useT();

  const universityData = {
    ranking: "19",
    mode: "stacjonarny",
    payment: "300",
    minPoints: "930",
  } as any;

  return (
    <div className="w-full">
      <h2 className="mb-5 text-2xl font-bold">{t("preview:data")}</h2>
      {isLoading ? (
        <div className={"h-40 w-full animate-pulse rounded-md bg-light"} />
      ) : (
        Object.keys(universityData).map((key, i) => (
          <div
            key={key}
            className={`flex items-center px-3 py-2 ${
              i % 2 === 0 ? "bg-light" : "bg-white"
            }`}
          >
            <p className={"w-1/2 text-sm"}>{t(`preview:${key}`)}</p>
            <p className={"w-1/2 text-sm"}>{universityData[key]}</p>
          </div>
        ))
      )}
      <div></div>
    </div>
  );
}

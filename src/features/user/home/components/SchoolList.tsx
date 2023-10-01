import React, { useEffect, useState } from "react";
import SchoolItem from "@/features/user/home/components/SchoolItem";
import { School } from "@/models/school.model";
import { useT } from "@/utils/hooks/useTranslation";

interface ISchoolListProps {
  schools?: School[] | null;
  isLoading: boolean;
}

const SchoolList = ({ schools, isLoading }: ISchoolListProps) => {
  const { t } = useT();
  return (
    <ul>
      {schools?.map((schoolData) => (
        <SchoolItem key={schoolData.id} schoolData={schoolData} />
      ))}
      {isLoading
        ? Array.from({ length: 10 }, (_, index) => (
            <div
              key={index}
              className={"my-10 flex h-36 animate-pulse rounded-xl bg-white"}
            ></div>
          ))
        : schools?.length === 0 && <p>{t("home:emptySchools")}</p>}
    </ul>
  );
};

export default SchoolList;

import React from "react";
import SchoolItem from "@/features/user/home/components/SchoolItem";
import { School } from "@/models/school.model";

interface ISchoolListProps {
  schools?: School[] | null;
}

const SchoolList = ({ schools }: ISchoolListProps) => {
  return (
    <ul>
      {schools?.map((schoolData) => (
        <SchoolItem key={schoolData.id} schoolData={schoolData} />
      ))}
    </ul>
  );
};

export default SchoolList;

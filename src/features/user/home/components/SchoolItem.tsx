import React, { useState } from "react";
import { School } from "@/models/school.model";
import Image from "next/image";
import pinSvg from "@/assets/svgs/pin.svg";
import { useT } from "@/utils/hooks/useTranslation";
import Stars from "@/features/common/Stars";
import { Badge } from "@/features/common/Badge";

interface ISchoolItemProps {
  schoolData: School;
}

const SchoolItem = ({ schoolData }: ISchoolItemProps) => {
  const { t } = useT();

  return (
    <li className={"my-10 flex flex-col rounded-xl bg-white md:flex-row"}>
      <div className={"flex h-full w-full flex-col p-5 xl:w-[70%]"}>
        <div className={"flex w-full flex-col"}>
          <div className={"flex justify-between gap-2"}>
            <p className={"text-sm"}>{schoolData.institutionName}</p>
            <div className={"flex items-center"}>
              <Stars rating={schoolData.rateCount} />
            </div>
          </div>
          <div className={"flex items-center gap-2"}>
            <Image src={pinSvg} alt={"pin"} />
            <p className={"text-sm"}>
              {schoolData.address.city}, {t("ul")} {schoolData.address.city},{" "}
              {schoolData.address.postCode}
            </p>
          </div>
        </div>
        <div className={"mt-2 flex flex-col"}>
          <p className={"text-xs text-darkGray"}>{t("home:assessSubject")}</p>
          <div className={"flex flex-wrap"}>
            {schoolData.assessSubjects &&
              schoolData.assessSubjects.map((subject) => (
                <Badge key={subject.id} intent={"secondary"}>
                  {subject.name}
                </Badge>
              ))}
          </div>
        </div>
        <div className={"mt-2 flex flex-col"}>
          <p className={"text-xs text-darkGray"}>{t("home:degreeCourse")}</p>
          <div className={"flex flex-wrap"}>
            {schoolData.degreeCourse &&
              schoolData.degreeCourse.map((course) => (
                <Badge key={course.id} intent={"primary"}>
                  {course.name}
                </Badge>
              ))}
          </div>
        </div>
      </div>
      <div
        className={
          "relative h-auto w-full md:hidden xl:inline xl:h-auto xl:w-[30%]"
        }
        // className={"flex h-full w-[30%]"}
      >
        {/*asd*/}
        <Image
          className={"lg:rounded-r-xl "}
          src={"/images/school.png"}
          alt={"school"}
          fill
          objectFit={"cover"}
        />
      </div>
    </li>
  );
};

export default SchoolItem;

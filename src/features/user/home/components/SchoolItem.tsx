import React, { useState } from "react";
import { School } from "@/models/school.model";
import Image from "next/image";
import pinSvg from "@/assets/svgs/pin.svg";
import { useT } from "@/utils/hooks/useTranslation";
import Stars from "@/features/common/Stars";
import { Badge } from "@/features/common/Badge";
import { useRouter } from "next/router";

interface ISchoolItemProps {
  schoolData: School;
}

const SchoolItem = ({ schoolData }: ISchoolItemProps) => {
  const { t } = useT();

  const { push } = useRouter();

  return (
    <li
      className={
        "my-10 flex min-h-[8rem] cursor-pointer flex-col rounded-xl bg-white md:flex-row"
      }
      onClick={() => push(`/${schoolData.id}`)}
    >
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
        {/*<div className={"mt-2 flex flex-col"}>*/}
        {/*  <p className={"text-xs text-darkGray"}>{t("home:assessSubject")}</p>*/}
        {/*  {schoolData.assessSubjects &&*/}
        {/*    schoolData.assessSubjects.map((subject) => (*/}
        {/*      <div key={subject.id} className={"flex flex-wrap"}>*/}
        {/*        <Badge intent={"primary"}>{subject.name}</Badge>*/}
        {/*      </div>*/}
        {/*    ))}*/}
        {/*</div>*/}
        {schoolData.degreeCourse.length > 0 && (
          <div className={"mt-2 flex flex-col"}>
            <p className={"text-xs text-darkGray"}>{t("home:degreeCourses")}</p>
            <div className={"flex flex-wrap"}>
              {schoolData.degreeCourse.map((course, index) => (
                <React.Fragment key={course.id}>
                  {index < 3 && (
                    <Badge intent={"secondary"}>{course.name}</Badge>
                  )}
                  {index === 3 && (
                    <Badge key={course.id} intent={"secondary"}>
                      ...
                    </Badge>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        )}
      </div>
      <div
        className={
          "relative mb-4 h-auto w-full px-12 sm:px-0 md:hidden xl:inline xl:h-auto xl:w-[30%]"
        }
      >
        {schoolData.imageUrl ? (
          <img
            className={"h-auto object-cover sm:h-full lg:rounded-r-xl"}
            src={schoolData.imageUrl}
            alt={t("home:schoolPhoto")}
            // fill
            // objectFit={"cover"}
          />
        ) : (
          <div className={"mt-4 flex justify-center"}>
            <p>{t("home:noneOfImage")}</p>
          </div>
        )}
      </div>
    </li>
  );
};

export default SchoolItem;

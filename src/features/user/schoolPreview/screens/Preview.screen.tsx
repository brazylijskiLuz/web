import { useT } from "@/utils/hooks/useTranslation";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import SchoolData from "@/features/user/schoolPreview/components/SchoolData";
import DegreeCourses from "@/features/user/schoolPreview/components/DegreeCourses";
import Image from "next/image";
import { useGetSchoolInfo } from "@/api/queries/school.query";
import useDebounce from "@/utils/hooks/useDebouce";
import dynamic from "next/dynamic";
import { Button } from "@/features/common/Button";

const Map = dynamic(() => import("@/features/user/home/components/Map"), {
  ssr: false,
});

const school = {
  id: "1231412356-1231",
  institutionName: "Zespół szkół elektrycznych nr 1 w Krakowie",
  creationDateOrEntryDate: "string",
  address: {
    province: "string",
    city: "Kraków",
    postCode: "30-123",
    street: "Ratatata",
    buildingNumber: "21",
  },
  mapLocalization: { x: "string", y: "string" },
  REGON: "string",
  NIP: "string",
  KRS: "string",
  website: "string",
  institutionType: "string",
  rate: "string",
  rateCount: 4.0,
  degreeCourse: [
    {
      id: "1245-32523426-74584513432r235-23",
      name: "Programista",
      description: "string",
      rate: 10,
      rateCount: 4,
      universityId: "123523512",
    },
    {
      id: "1245-32526-74586344513432r235-23",
      name: "Informatyka",
      description: "string",
      rate: 10,
      rateCount: 4,
      universityId: "123523512",
    },
  ],
  contact: {
    RSPO: "string",
    email: "string",
    fax: "string",
    phone: "string",
  },
  assessSubjects: [
    {
      id: "124436-756t34",
      name: "Biologia",
    },
  ],
};

export default function PreviewScreen() {
  const { query, push, back } = useRouter();

  const { t } = useT();

  const { data, error, isLoading } = useGetSchoolInfo(query.id as string);
  console.log(data);

  useEffect(() => {
    if (!error) return;
    //TODO: toast error
    push("/");
  }, [error]);

  const isCurrentLoading = useDebounce(isLoading, 1000);

  return (
    <div className="flex">
      <div className="mt-4 w-full rounded-md bg-white px-14 md:w-[65%]">
        <Button className="my-8" onClick={() => back()}>
          {t("goBack")}
        </Button>
        <h1 className="py-4 text-2xl font-bold text-black">
          {data?.data.institutionName}
        </h1>
        <hr className="border border-light" />
        <div className="my-8 flex flex-col gap-8 md:flex-row">
          <SchoolData isLoading={isCurrentLoading} data={school} />
          <DegreeCourses isLoading={isCurrentLoading} data={school} />
        </div>
        <hr className="border border-light" />
        <div className="my-8 gap-8">
          <h2 className="mb-5 text-2xl font-bold text-black">
            {t("preview:description")}
          </h2>
          {isCurrentLoading ? (
            <>
              <div
                className={"mb-2 h-4 w-full animate-pulse rounded-md bg-light"}
              />
              <div
                className={"mb-2 h-4 w-full animate-pulse rounded-md bg-light"}
              />
              <div className={"h-4 w-1/3 animate-pulse rounded-md bg-light"} />
            </>
          ) : (
            <p>{data?.data.description}</p>
          )}
        </div>
        <hr className="border border-light" />
        <div className="my-8 gap-8">
          <h2 className="mb-5 text-2xl font-bold text-black">
            {t("preview:chosenPhotos")}
          </h2>
          {isCurrentLoading ? (
            <div className={"flex gap-5"}>
              <div
                className={
                  "h-28 w-28 animate-pulse rounded-md bg-light md:h-52 md:w-52"
                }
              />
              <div
                className={
                  "hidden h-28 w-28 animate-pulse rounded-md bg-light xs:inline-block md:h-52 md:w-52"
                }
              />
              <div
                className={
                  "hidden h-28 w-28 animate-pulse rounded-md bg-light sm:inline-block md:h-52 md:w-52"
                }
              />
              <div
                className={
                  "hidden h-28 w-28 animate-pulse rounded-md bg-light sm:inline-block md:hidden md:h-52 md:w-52 lg:inline-block"
                }
              />
            </div>
          ) : (
            <div className={"flex gap-5"}>
              <div
                className={
                  "relative h-28 w-28 rounded-md bg-light md:h-52 md:w-52"
                }
              >
                <Image
                  src={"/images/school.png"}
                  className="rounded-md"
                  alt={"school"}
                  fill
                  objectFit={"cover"}
                />
              </div>
              <div
                className={
                  "relative hidden h-28 w-28 rounded-md bg-light xs:inline-block md:h-52 md:w-52"
                }
              >
                <Image
                  src={"/images/school.png"}
                  alt={"school"}
                  className="rounded-md"
                  fill
                  objectFit={"cover"}
                />
              </div>
              <div
                className={
                  "relative hidden h-28 w-28 rounded-md bg-light sm:inline-block md:h-52 md:w-52"
                }
              >
                <Image
                  src={"/images/school.png"}
                  alt={"school"}
                  className="rounded-md"
                  fill
                  objectFit={"cover"}
                />
              </div>
              <div
                className={
                  "relative hidden h-28 w-28 rounded-md bg-light sm:inline-block md:hidden md:h-52 md:w-52 lg:inline-block"
                }
              >
                <Image
                  src={"/images/school.png"}
                  className="rounded-md"
                  alt={"school"}
                  fill
                  objectFit={"cover"}
                />
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="fixed right-[2%] mt-4 hidden h-[82vh] w-[30%] overflow-hidden rounded-md md:flex">
        <Map
          singleSchool={data?.data.id}
          x={data?.data.mapLocalization.x}
          y={data?.data.mapLocalization.y}
        />
      </div>
    </div>
  );
}

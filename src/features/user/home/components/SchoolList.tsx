import React from "react";
import SchoolItem from "@/features/user/home/components/SchoolItem";
import { School } from "@/models/school.model";

const data: School[] = [
  {
    id: "1231412356-1231",
    institutionName: "Zespół szkół elektrycznych nr 1 w Krakowie",
    creationDateOrEntryDate: "string",
    address: {
      province: "string",
      city: "Kraków",
      postCode: "30-123",
      street: "Ratatata",
      buildingNumber: "string",
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
  },
  {
    id: "123141-134233425-2357231",
    institutionName: "ZSEL1",
    creationDateOrEntryDate: "string",
    address: {
      province: "string",
      city: "Kraków",
      postCode: "30-123",
      street: "Ratatata",
      buildingNumber: "string",
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
        id: "1245-32526-745845-23",
        name: "informatyka stosowana",
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
        id: "124436-756t3asfdsd234-52364",
        name: "Matematyka",
      },
      {
        id: "124436-756t3aasdsd234-52364",
        name: "Polski",
      },
      {
        id: "124436-756t3asd234-52364",
        name: "Fizyka",
      },
    ],
  },
];
const SchoolList = () => {
  return (
    <ul>
      {data.map((schoolData) => (
        <SchoolItem key={schoolData.id} schoolData={schoolData} />
      ))}
    </ul>
  );
};

export default SchoolList;

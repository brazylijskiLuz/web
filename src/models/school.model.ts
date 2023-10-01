export interface School {
  id: string;
  institutionName: string;
  creationDateOrEntryDate: string;
  address: {
    province: string;
    city: string;
    postCode: string;
    street: string;
    buildingNumber: string;
  };
  mapLocalization: { x: string; y: string };
  REGON: string;
  NIP: string;
  KRS: string;
  website: string;
  institutionType: string;
  rate: string;
  rateCount: number;
  degreeCourse: {
    id: string;
    name: string;
    description: string;
    rate: number;
    rateCount: number;
    universityId: string;
  }[];
  assessSubjects:
    | null
    | {
        id: string;
        name: string;
      }[];
  contact: {
    RSPO: string;
    email: string;
    fax: string;
    phone: string;
  };
}

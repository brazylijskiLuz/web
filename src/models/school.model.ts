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
  imageUrl: string;
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

export interface IGetSchoolsReq {
  query?: string;
  page: string;
  types?: [0 | 1 | 2 | 3];
  minPrice?: string;
  maxPrice?: string;
  mode: 0 | 1 | 2;
  city?: string;
}

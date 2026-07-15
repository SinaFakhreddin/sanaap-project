export enum InsuranceTypeEnum {
  Real = "real",
  Legal = "legal",
}

export type RepresentativesRq = {
  address: string;
  agency_type: string;
  agent_code: string;
  city_code: string;
  county: string;
  first_name: string;
  last_name: string;
  name?: string;
  insurance_branch: string;
  province: string;
  phone_number: string;
  phone: string;
};

export type RepresentativesRqRs = {
  access: string;
  refresh: string;
};

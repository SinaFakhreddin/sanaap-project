import type { AgencyForm } from "../schemas/representiveFormSchema.tsx";
import {
  InsuranceTypeEnum,
  type RepresentativesRq,
} from "../http/types/RepresentativesServiceType.ts";

export const convertedFormValue = (value: AgencyForm): RepresentativesRq => {
  const convertedValue: RepresentativesRq = {
    address: value.address,
    agency_type: value.insuranceType,
    agent_code: value.agencyCode,
    city_code: value.cityNumberCode,
    county: value.city,
    insurance_branch: value.branch,
    phone_number: value.phoneNumber,
    phone: "0900999999",
    province: value.province,
    ...(value.insuranceType === InsuranceTypeEnum.Legal
      ? { name: value.Name }
      : null),
    first_name: "Sina",
    last_name: "Fakhreddin",
  };

  return convertedValue;
};

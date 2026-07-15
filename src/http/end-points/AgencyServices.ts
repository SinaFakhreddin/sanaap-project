import { httpService } from "../httpService.ts";
import type { ApiResponse } from "../../types/genericTypes.ts";
import type { InsuranceDataRs } from "../types/AgencyServiceType.ts";

export const RepresentativesServicePath = "/api/v2/app";

async function checkAgencyCode(agent_code?: number) {
  return httpService.post<unknown>(
    `${RepresentativesServicePath}/DEY/agent/verification/signup/check_agency_code/`,
    { agent_code },
  );
}

async function getInsuranceBranch(name: string, signal?: AbortSignal) {
  return httpService.get<ApiResponse<InsuranceDataRs[]>>(
    `${RepresentativesServicePath}/selection_item/insurance_branch/wop_list/`,
    {
      params: { name, insurance: "DEY" },
      signal,
    },
  );
}

export const AgencyService = { checkAgencyCode, getInsuranceBranch };

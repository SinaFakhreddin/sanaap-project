import { httpService } from "../httpService.ts";
import type {
  RepresentativesRq,
  RepresentativesRqRs,
} from "../types/RepresentativesServiceType.ts";
import type { ApiResponse } from "../../types/genericTypes.ts";

export const RepresentativesServicePath = "/api/v2/app/DEY/agent";

async function createRepresentatives(params: RepresentativesRq) {
  return httpService.post<ApiResponse<RepresentativesRqRs>>(
    `${RepresentativesServicePath}/verification/signup/`,
    params,
  );
}

export const RepresentativesService = { createRepresentatives };

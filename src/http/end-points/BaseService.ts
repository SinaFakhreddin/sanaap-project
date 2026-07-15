import { httpService } from "../httpService.ts";
import type {
  CountiesBasRs,
  ProvinceBaseRs,
} from "../types/BaseServiceType.ts";

export const BaseServicePath = "/base";

async function getProvince() {
  return httpService.get<ProvinceBaseRs>(`${BaseServicePath}/provinces_wop/`);
}

async function getCounties(province?: number, signal?: AbortSignal) {
  return httpService.get<CountiesBasRs>(`${BaseServicePath}/counties_wop/`, {
    params: {
      province,
    },
    signal,
  });
}

export const BaseService = { getProvince, getCounties };

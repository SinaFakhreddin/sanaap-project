import { useMutation, useQuery } from "@tanstack/react-query";
import { BaseService } from "../../http/end-points/BaseService.ts";
import { AgencyService } from "../../http/end-points/AgencyServices.ts";
import { RepresentativesService } from "../../http/end-points/RepresentativesServices.ts";
import { notifications } from "@mantine/notifications";
import type { ApiErrorResponse } from "../../types/genericTypes.ts";
import { Flex, Text } from "@mantine/core";

type ParamsType = {
  provinceCode?: number;
  branchName?: string;
  agent_code?: number;
};

export function useRepresentiveApiCall(params?: ParamsType) {
  const {
    data: provinceData,
    isFetching: provinceFetching,
    isPending: provincePending,
    isLoading: provinceIsLoading,
  } = useQuery({
    queryKey: ["get-province"],
    queryFn: () => BaseService.getProvince(),
  });

  const provinceLoading =
    provinceFetching || provincePending || provinceIsLoading;

  const {
    data: countiesData,
    isFetching: countiesFetching,
    isLoading: countiesIsLoading,
  } = useQuery({
    queryKey: ["get-counties", params?.provinceCode],
    queryFn: ({ signal }) =>
      BaseService.getCounties(params?.provinceCode, signal),
    enabled: !!params?.provinceCode,
  });

  const {
    data: insuranceBranchData,
    isFetching: insuranceBranchDataFetching,
    isPending: insuranceBranchDataPending,
  } = useQuery({
    queryKey: ["get-branches", params?.branchName],
    queryFn: ({ signal }) => {
      return AgencyService.getInsuranceBranch(params?.branchName || "", signal);
    },
    enabled: !!params?.branchName,
  });

  const {
    data: checkAgentCodeApi,
    isFetching: checkFetching,
    isLoading: checkLoading,
    isError: agentCodeError,
    isSuccess: agentCodeSuccess,
    error,
  } = useQuery({
    queryKey: ["check-agent-code", params?.agent_code],
    queryFn: () => AgencyService.checkAgencyCode(params?.agent_code),
    enabled: !!params?.agent_code,
  });

  const { mutateAsync: createNewRepresentive, isPending: createPending } =
    useMutation({
      mutationKey: ["create-new"],
      mutationFn: RepresentativesService.createRepresentatives,
      onSuccess: (res) => {
        notifications.show({
          title: "عملیات موفق آمیز",
          message: (
            <>
              <Flex>
                <Text size={"xs"}>رکورد جدید ثبت شد.</Text>
                <Text
                  size={"xs"}
                  fw={"bold"}
                >{`access : ${res.data.response?.access}`}</Text>
              </Flex>
            </>
          ),
          withBorder: true,
          color: "green",
        });
      },
      onError: (error: ApiErrorResponse) => {
        notifications.show({
          title: "عملیات ناموفق",
          message: `${error.error_details.fa_details}`,
          withBorder: true,
          color: "red",
        });
      },
    });

  const chekAgencyCodeLoading = checkLoading || checkFetching;

  const searchLoading =
    insuranceBranchDataFetching || insuranceBranchDataPending;

  const countiesLoading = countiesIsLoading || countiesFetching;
  return {
    countiesData,
    countiesLoading,
    provinceData,
    provinceLoading,
    insuranceBranchData,
    searchLoading,
    checkAgentCodeApi,
    chekAgencyCodeLoading,
    agentCodeError,
    agentCodeSuccess,
    error,
    createNewRepresentive,
    createPending,
  };
}

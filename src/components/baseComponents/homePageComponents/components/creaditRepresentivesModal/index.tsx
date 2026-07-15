import {
  Button,
  Card,
  Modal,
  useMantineTheme,
  useCombobox,
} from "@mantine/core";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../hooks/useStore.ts";
import { setModalOpen } from "../../../../../store/storeSlices/CreaditRepresentivesModalSlice.ts";
import classes from "./formComponents/formContent/index.module.css";
import { useRepresentiveApiCall } from "../../../../../pages/Home/index.hooks.tsx";
import { FormProvider, useForm } from "react-hook-form";
import {
  type AgencyForm,
  agencySchema,
} from "../../../../../schemas/representiveFormSchema.tsx";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { InsuranceTypeEnum } from "../../../../../http/types/RepresentativesServiceType.ts";
import { useDebounce } from "../../../../../hooks/generalHooks.ts";
import type { AppAxiosError } from "../../../../../types/genericTypes.ts";
import { convertedFormValue } from "../../../../../libs";
import FormContent from "./formComponents/formContent";

export function CreaditRepresentivesModal() {
  const theme = useMantineTheme();
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });
  const [search, setSearch] = useState<string>("");
  const isModalOpened = useAppSelector(
    (state) => state.creaditRepresentivesModal,
  );
  const dispatch = useAppDispatch();
  const formMethods = useForm<AgencyForm>({
    resolver: zodResolver(agencySchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      agencyCode: "",
      province: "",
      city: "",
      address: "",
      branch: "",
      cityNumberCode: "",
      phoneNumber: "",
      insuranceType: InsuranceTypeEnum.Legal,
      Name: "",
    },
  });
  const province = formMethods.watch("province");
  const agencyCode = formMethods.watch("agencyCode");
  const debouncedValue = useDebounce(search, 700);
  const debouncedAgentCodeValue = useDebounce(agencyCode, 700);

  const {
    provinceData,
    provinceLoading,
    countiesData,
    countiesLoading,
    insuranceBranchData,
    searchLoading,
    chekAgencyCodeLoading,
    error,
    agentCodeError,
    createNewRepresentive,
    createPending,
    agentCodeSuccess,
  } = useRepresentiveApiCall({
    provinceCode: province ? +province : 0,
    branchName: debouncedValue,
    agent_code: +debouncedAgentCodeValue,
  });

  const submitHandler = (data: AgencyForm) => {
    createNewRepresentive(convertedFormValue(data)).then(() => {
      formMethods.reset();
      setSearch("");
      dispatch(setModalOpen(false));
    });
  };

  return (
    <Modal
      styles={{
        header: {
          background: theme.colors.red[7],
        },
      }}
      classNames={classes}
      title={"نمایندگی جدید"}
      opened={isModalOpened.isOpen}
      onClose={() => {
        formMethods.reset();
        setSearch("");
        dispatch(setModalOpen(false));
      }}
      centered
    >
      <FormProvider {...formMethods}>
        <form onSubmit={formMethods.handleSubmit(submitHandler)}>
          <Card p={16}>
            <FormContent
              agentCodeError={agentCodeError}
              agentCodeSuccess={agentCodeSuccess}
              branchSearch={search}
              chekAgencyCodeLoading={chekAgencyCodeLoading}
              countiesData={countiesData?.data || []}
              countiesLoading={countiesLoading}
              egencyCodeError={
                (error as AppAxiosError)?.response?.data.error_details
                  .fa_details
              }
              insuranceBranchData={insuranceBranchData?.data?.response || []}
              searchLoading={searchLoading}
              provinceData={provinceData?.data || []}
              provinceLoading={provinceLoading}
              setBranchSearch={setSearch}
            />
            <Card.Section
              classNames={{
                section: classes.cardBoxBtn,
              }}
            >
              <Button loading={createPending} fullWidth type={"submit"}>
                ثبت
              </Button>
            </Card.Section>
          </Card>
        </form>
      </FormProvider>
    </Modal>
  );
}

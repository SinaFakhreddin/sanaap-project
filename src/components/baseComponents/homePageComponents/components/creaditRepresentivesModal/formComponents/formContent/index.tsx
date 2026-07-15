import {
  Flex,
  Group,
  NumberInput,
  Radio,
  Select,
  Textarea,
  TextInput,
} from "@mantine/core";
import { Controller, useFormContext } from "react-hook-form";
import AutoCompleteComponent from "../../../../../../sharedComponents/AutoCompleteComponent";
import type { InsuranceDataRs } from "../../../../../../../http/types/AgencyServiceType.ts";
import { InsuranceTypeEnum } from "../../../../../../../http/types/RepresentativesServiceType.ts";
import type { AgencyForm } from "../../../../../../../schemas/representiveFormSchema.tsx";
import classes from "./index.module.css";
import {
  IconCircleCheckFilled,
  IconSearch,
  type ReactNode,
} from "@tabler/icons-react";
import type {
  CountiesBasRs,
  ProvinceBaseRs,
} from "../../../../../../../http/types/BaseServiceType.ts";

type Props = {
  agentCodeSuccess: boolean;
  chekAgencyCodeLoading: boolean;
  agentCodeError: boolean;
  egencyCodeError?: string;
  provinceLoading: boolean;
  provinceData: ProvinceBaseRs;
  countiesData: CountiesBasRs;
  countiesLoading: boolean;
  branchSearch: string;
  setBranchSearch: (value: string) => void;
  insuranceBranchData: InsuranceDataRs[];
  searchLoading: boolean;
};

export default function FormContent(props: Props) {
  const {
    control,
    watch,
    formState: { errors },
  } = useFormContext<AgencyForm>();
  const province = watch("province");
  const insuranceType = watch("insuranceType");

  const renderInsuranceTypeComponent: Record<InsuranceTypeEnum, ReactNode> = {
    [InsuranceTypeEnum.Legal]: (
      <Controller
        name="Name"
        key={"Name"}
        control={control}
        render={({ field, fieldState }) => (
          <TextInput
            {...field}
            error={fieldState.error?.message}
            label={"نام"}
          />
        )}
      />
    ),
    [InsuranceTypeEnum.Real]: null,
  };

  return (
    <Flex gap={"sm"} direction={"column"}>
      <Controller
        name="agencyCode"
        control={control}
        render={({ field }) => (
          <NumberInput
            label={"کد نمایندگی"}
            hideControls
            classNames={{
              label: props.agentCodeSuccess ? classes.successInput : "",
              input: props.agentCodeSuccess ? classes.successBorder : "",
            }}
            allowNegative={false}
            allowDecimal={false}
            value={field.value}
            loading={props.chekAgencyCodeLoading}
            loadingPosition={"right"}
            rightSection={
              !props.chekAgencyCodeLoading &&
              props.agentCodeSuccess && (
                <IconCircleCheckFilled size={"sm"} color={"green"} />
              )
            }
            withErrorStyles={props.agentCodeError}
            onChange={(value) => {
              const str = String(value ?? "");
              if (str.length <= 6) {
                field.onChange(str);
              }
            }}
            error={errors.agencyCode?.message || props.egencyCodeError}
          />
        )}
      />
      <Controller
        name="province"
        control={control}
        render={({ field }) => (
          <Select
            label="استان"
            data={props.provinceData?.map((item) => ({
              label: item.name,
              value: item.id.toString(),
            }))}
            loading={props.provinceLoading}
            loadingPosition={"right"}
            value={field.value}
            onChange={(value) => field.onChange(value ?? "")}
            onBlur={field.onBlur}
            error={errors.province?.message}
          />
        )}
      />
      <Controller
        name="city"
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            label="شهر"
            data={
              props.countiesData?.map((dt) => ({
                label: dt.name,
                value: dt.id.toString(),
              })) || []
            }
            loading={props.countiesLoading}
            loadingPosition={"right"}
            onChange={(value) => field.onChange(value ?? "")}
            error={errors.city?.message}
            disabled={!province}
          />
        )}
      />
      <Controller
        name="address"
        control={control}
        render={({ field }) => (
          <Textarea
            {...field}
            error={errors.address?.message}
            rows={6}
            label={"آدرس"}
          />
        )}
      />
      <Controller
        name="branch"
        control={control}
        render={({ field }) => (
          <AutoCompleteComponent<InsuranceDataRs>
            placeholder={"جستجو..."}
            search={props.branchSearch}
            onSetSearch={props.setBranchSearch}
            onChange={field.onChange}
            label={"شعبه"}
            data={props.insuranceBranchData || []}
            error={errors.branch?.message}
            leftIcon={<IconSearch size={18} />}
            loading={props.searchLoading}
          />
        )}
      />
      <Flex gap={"sm"} w={"100%"}>
        <Controller
          name="phoneNumber"
          control={control}
          render={({ field }) => (
            <TextInput
              error={errors.phoneNumber?.message}
              {...field}
              label={"تلفن ثابت"}
              w={"70%"}
              // maxLength={11}
              inputMode="numeric"
            />
          )}
        />
        <Controller
          name="cityNumberCode"
          control={control}
          render={({ field }) => (
            <TextInput
              label={"کدشهر"}
              {...field}
              error={errors.cityNumberCode?.message}
              w={"30%"}
              maxLength={4}
              inputMode="numeric"
            />
          )}
        />
      </Flex>
      <Controller
        name="insuranceType"
        control={control}
        render={({ field }) => (
          <Radio.Group
            error={errors.insuranceType?.message}
            {...field}
            label="نوع نمایندگی"
          >
            <Group mt={"sm"}>
              <Radio value={InsuranceTypeEnum.Real} label="حقیقی" />
              <Radio value={InsuranceTypeEnum.Legal} label="حقوقی" />
            </Group>
          </Radio.Group>
        )}
      />
      {renderInsuranceTypeComponent[insuranceType]}
    </Flex>
  );
}

import {
  Combobox,
  Loader,
  ScrollArea,
  TextInput,
  useCombobox,
} from "@mantine/core";
import type { ReactNode } from "@tabler/icons-react";

type Props<T extends { id: string | number; name: string }> = {
  data: T[];
  onChange: (value: string) => void;
  onSetSearch: (value: string) => void;
  label: string;
  leftIcon: ReactNode;
  search: string;
  error?: string;
  loading?: boolean;
};
export default function AutoCompleteComponent<
  T extends { id: string | number; name: string },
>(props: Props<T>) {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  return (
    <Combobox
      store={combobox}
      onOptionSubmit={(value) => {
        const branch = props?.data?.find(
          (item) => item.id.toString() === value,
        );
        if (!branch) return;
        props.onChange(branch.id.toString());
        props.onSetSearch(branch.name);
        // field.onChange(branch.id.toString());
        // setSearch(branch.name);
        combobox.closeDropdown();
      }}
    >
      <Combobox.Target>
        <TextInput
          label={props.label}
          leftSection={props.leftIcon}
          value={props.search}
          onChange={(e) => {
            props.onSetSearch(e.currentTarget.value);
            combobox.openDropdown();
          }}
          onFocus={() => combobox.openDropdown()}
          onBlur={() => combobox.closeDropdown()}
          error={props.error}
        />
      </Combobox.Target>
      <Combobox.Dropdown>
        <Combobox.Options>
          <ScrollArea h={150}>
            {props.data.length ? (
              props.data?.map((item) => (
                <Combobox.Option key={item.id} value={item.id.toString()}>
                  {item.name}
                </Combobox.Option>
              ))
            ) : (
              <Combobox.Empty>
                {props.loading && props.search ? (
                  <Loader size={"sm"} />
                ) : (
                  `موردی یافت نشد`
                )}
              </Combobox.Empty>
            )}
          </ScrollArea>
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}

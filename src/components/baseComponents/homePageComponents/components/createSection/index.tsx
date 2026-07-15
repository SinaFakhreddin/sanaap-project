import { Button, Flex } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { setModalOpen } from "../../../../../store/storeSlices/CreaditRepresentivesModalSlice.ts";
import { useAppDispatch } from "../../../../../hooks/useStore.ts";

export default function CreateSectionComponent() {
  const dispatch = useAppDispatch();

  return (
    <Flex w={"100%"} justify={"end"}>
      <Button
        leftSection={<IconPlus />}
        onClick={() => dispatch(setModalOpen(true))}
      >
        ساخت رکورد جدید
      </Button>
    </Flex>
  );
}

import { Flex } from "@mantine/core";
import CreateSectionComponent from "./components/createSection";
import { CreaditRepresentivesModal } from "./components/creaditRepresentivesModal";

export default function HomePageComponents() {
  return (
    <Flex direction={"column"} p={"sm"} gap={"sm"}>
      <CreateSectionComponent />
      <CreaditRepresentivesModal />
    </Flex>
  );
}

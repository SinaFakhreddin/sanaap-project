import { Flex } from "@mantine/core";
import CreateSectionComponent from "./components/createSection";
import { lazy } from "react";
const CreaditRepresentivesModal = lazy(
  () => import("./components/creaditRepresentivesModal"),
);

export default function HomePageComponents() {
  return (
    <Flex direction={"column"} p={"sm"} gap={"sm"}>
      <CreateSectionComponent />
      <CreaditRepresentivesModal />
    </Flex>
  );
}

import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { type PropsWithChildren } from "react";
import useMantineBaseTheme from "../../hooks/useMantineBaseTheme.ts";

export default function MantineBaseProviderAdapter(props: PropsWithChildren) {
  const { mantineBaseTheme } = useMantineBaseTheme();

  return (
    <MantineProvider withCssVariables theme={mantineBaseTheme}>
      <Notifications position="top-right" zIndex={Number.MAX_SAFE_INTEGER} />
      {props.children}
    </MantineProvider>
  );
}

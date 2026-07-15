import {
  Button,
  type MantineThemeOverride,
  NavLink,
  Text,
  Title,
} from "@mantine/core";

export default function useMantineBaseTheme() {
  const mantineBaseTheme: MantineThemeOverride = {
    breakpoints: {
      xs: "30em",
      sm: "48em",
      md: "64em",
      lg: "74em",
      xl: "90em",
    },
    colors: {
      primary: [
        "#DDF6EA",
        "#BAE8D0",
        "#A0D6C0",
        "#76C49B",
        "#5DBB83",
        "#3DA970",
        "#1E824C",
        "#177346",
        "#1A6643",
        "#0D4F31",
      ],
      blue: [
        "#F0F5FF",
        "#DCE7FE",
        "#BED3FE",
        "#91B5FD",
        "#6194FA",
        "#3D7BF7",
        "#2F6FED",
        "#1D5BD6",
        "#1E4EAE",
        "#1E428A",
      ],
      dankeeBlue: [
        "#454b71",
        "#3f4468",
        "#393e5e",
        "#333855",
        "#2e324b",
        "#222538",
        "#1c1f2e",
        "#161825",
        "#11121b",
        "#0b0c12",
      ],
      gray: [
        "#F7F8FC",
        "#F2F3FA",
        "#E1E2F0",
        "#CACBE0",
        "#9395B8",
        "#656685",
        "#424466",
        "#222538",
        "#1D1E30",
        "#11121F",
      ],
      green: [
        "#EBFCF7",
        "#D2FAED",
        "#A5F2D8",
        "#6FE8C0",
        "#37D49F",
        "#0FA372",
        "#08875D",
        "#05734E",
        "#066143",
        "#064D35",
      ],
      orange: [
        "#FFF4E6",
        "#FFE8CC",
        "#FFD8A8",
        "#FFC078",
        "#FFA94D",
        "#FF922B",
        "#FD7E14",
        "#F76707",
        "#E8590C",
        "#D9480F",
      ],
      red: [
        "#FEF1F2",
        "#FEE1E3",
        "#FEC8CD",
        "#FCA6AD",
        "#F8727D",
        "#EF4352",
        "#E02D3C",
        "#BA2532",
        "#981B25",
        "#86131D",
      ],
      violet: [
        "#F8F5FF",
        "#EFE7FE",
        "#E4D7FE",
        "#CCB4FD",
        "#AF89FA",
        "#9E70FA",
        "#8B54F7",
        "#6D35DE",
        "#5221B5",
        "#451D95",
      ],
      yellow: [
        "#FFF9DB",
        "#FFF3BF",
        "#FFEC99",
        "#FFE066",
        "#FFD43B",
        "#FCC419",
        "#FAB005",
        "#F59F00",
        "#F08C00",
        "#E67700",
      ],
    },
    white: "#FAFAFA",
    black: "#11121F",
    primaryColor: "primary",
    components: {
      LoadingOverlay: {
        defaultProps: {
          zIndex: 200,
        },
      },
      Button: Button.extend({
        defaultProps: {
          color: "primary.8",
          bdrs: "sm",
        },
      }),
      Link: NavLink.extend({
        defaultProps: {
          color: "primary.8",
          bdrs: "sm",
        },
      }),
      Text: Text.extend({
        defaultProps: {
          c: "primary.6",
        },
      }),
      TextInput: {
        defaultProps: {
          c: "primary.6",
        },
      },
      Title: Title.extend({
        defaultProps: {
          c: "primary.8",
        },
      }),
    },
  };

  return { mantineBaseTheme };
}

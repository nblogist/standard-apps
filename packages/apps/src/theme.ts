const calcRem = (size: number) => `${size / 16}rem`;

const fontSizes = {
  xs: calcRem(12),
  small: calcRem(14),
  base: calcRem(16),
  lg: calcRem(18),
  xl: calcRem(20),
  xxl: calcRem(22),
  xxxl: calcRem(24),
  xxxxl: calcRem(30),
  titleSize: calcRem(50)
};

const generals = {
  xxxxs: calcRem(4),
  xxxs: calcRem(8),
  xxs: calcRem(10),
  xs: calcRem(12),
  small: calcRem(14),
  base: calcRem(16),
  lg: calcRem(18),
  xl: calcRem(20),
  xxl: calcRem(22),
  xxxl: calcRem(24),
  xxxxl: calcRem(30)
};

const paddings = {
  small: calcRem(8),
  base: calcRem(10),
  lg: calcRem(12),
  xl: calcRem(14),
  xxl: calcRem(16),
  xxxl: calcRem(18),
  xxxxl: calcRem(20),
  super: calcRem(24)
};

const margins = {
  xs: calcRem(2),
  small: calcRem(8),
  base: calcRem(10),
  lg: calcRem(12),
  xl: calcRem(14),
  xxl: calcRem(16),
  xxxl: calcRem(18),
  super: calcRem(24),
  ssuper: calcRem(30)
};

const interval = {
  base: calcRem(50),
  lg: calcRem(100),
  xl: calcRem(150),
  xxl: calcRem(200)
};

const verticalInterval = {
  base: `${calcRem(10)} 0 ${calcRem(10)} 0`
};

const deviceSizes = {
  mobileS: "320px",
  mobileM: "576px",
  mobileL: "450px",
  tablet: "768px",
  desktop: "992px"
};

const colors = {
  black: "#000000",
  white: "#FFFFFF",
  grey: "var(--grey50)"
};

const root = {
  bg: "#F9F9F9",
  border: "var(--grey40)",
  color: "#9a12b3",
  color1: "#f1e7fe",
  color2: "#d5b8ff",
  text: "#9a12b3",
  text1: "var(--grey50)",
  text2: "#f1e7fe"
};

const sidebar = {
  bg: "#ffffff",
  balance: {
    border: "#9a12b3",
    amt: "#9a12b3",
    amtBg: " #f1e7fe",
    addr: "#9a12b3"
  },
  item: {
    text: "#9a12b3",
    icon: "#9a12b3",
    borderSize: "0.4rem"
  },
  selected: {
    text: "#000",
    icon: "#000",
    bg: "#f1e7fe",
    border: "#9a12b3"
  },
  hover: {
    text: "#000",
    icon: "#000",
    bg: "#f1e7fe"
  }
};

const table = {
  bg: "#ffffff",
  tab: {
    border: "#9a12b3"
  }
};

const farm = {
  bg: "#ffffff",
  border: "var(--grey80)",
  th: "#fff"
};

const device = {
  mobileS: `only screen and (max-width: ${deviceSizes.mobileS})`,
  mobileM: `only screen and (max-width: ${deviceSizes.mobileM})`,
  mobileL: `only screen and (max-width: ${deviceSizes.mobileL})`,
  tablet: `only screen and (max-width: ${deviceSizes.tablet})`,
  desktop: `only screen and (max-width: ${deviceSizes.desktop})`
};

const theme = {
  fontSizes,
  colors,
  deviceSizes,
  device,
  paddings,
  margins,
  interval,
  verticalInterval,
  sidebar,
  farm,
  root,
  table,
  generals
};

export default theme;

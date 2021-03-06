const calcRem = (size: number) => `${size / 16}rem`;

const theme1 = {
  colors: {
    light: "#f5f6fa",
    light2: "#e6e9f4",
    light3: "#d7dbec",
    light4: "#7e84a3",
    dark: "#131523",
    highlight: "#57b8ff",
    highlight2: "#0058ff",
    success: "#21d59b",
    warning: "#ffc700",
    warning2: "#f99600",
    error: "#f0142f",
    text: "#131523",
    text2: "#171725",
    textlight: "#5A607F",
    textlight2: "#7E84A3",
    textlink: "#0062FF",
    background: "#e7efff",
    placeholder: "rgba(87,184,255, 0.08)",
    placeholder1: "rgba(87,184,255, 0.15)",
    placeholder2: "rgba(87,184,255, 0.08)"
  },
  texts: {
    header: `color: #131523; font-size: 28px; font-weight: 500;`,
    header2: `color: #171725; font-size: 24px; font-weight: 500;`,
    header3: `color: #131523; font-size: 16px;`,
    light: `color: #5A607F; font-size:16px; font-weight: 300;`,
    bold: `color: #131523; font-size: 14px; font-weight: 600;`,
    regular: `color: #131523; font-size: 14px;`,
    light2: `color: #7E84A3; font-size: 12px;`,
    link: `color: #0062FF; font-size: 12px;`
  },
  shadows: {
    boxShadow: "box-shadow: var(--grey50) 0px 0px 21px;"
  }
};

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
  text2: "#f1e7fe",
  text3: "var(--grey60)"
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

const darkTheme = {
  text: "#fff",
  textsd: "#fff",
  textlight: "#bab8c0",
  textlink: "#31a6f4",
  textwallet: "#fff",
  background: "#111123",
  backgroundsd: "#201833",
  backgroundlight: "#281f40",
  backgroundlight2: "rgba(97,67,198,0.13)",
  backgroundwallet: "rgba(97, 67, 188, 0.13)",
  highlight: "#6143bc",
  green: "#6FCF97",
  red: "#EB5757",
  glassmorphismCard: `background: linear-gradient(136.45deg, rgba(31, 24, 51, 0.6) 23.59%, rgba(31, 24, 51, 0) 179.98%);
  border: 1px solid #3E3358;
  box-sizing: border-box;
  backdrop-filter: blur(20px);  
  border-radius: 20px;`,
  theme1,
  paddings,
  margins,
  generals,
  fontSizes,
  sidebar,
  farm,
  table,
  root,
  colors
};

const lightTheme = {
  text: "#111123",
  textsd: "#fff",
  textlink: "#31a6f4",
  textlight: "#65657f",
  textwallet: "#6143bc",
  background: "#f4f4fb",
  backgroundsd: "#fff",
  backgroundlight: "#f0eff7",
  backgroundlight2: "rgba(97,67,198,0.13)",
  backgroundwallet: "rgba(97, 67, 188, 0.13)",
  highlight: "#6143bc",
  green: "#6FCF97",
  red: "#EB5757",
  glassmorphismCard: `background: linear-gradient(136.45deg, rgba(255, 255, 255, 0.7) 23.59%, rgba(255, 255, 255, 0) 179.98%);
  border: 1px solid #FFFFFF;
  box-sizing: border-box;
  backdrop-filter: blur(20px);
  border-radius: 20px;`,
  theme1,
  paddings,
  margins,
  generals,
  fontSizes,
  sidebar,
  farm,
  table,
  root,
  colors
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
  generals,
  theme1,
  darkTheme,
  lightTheme
};

export default theme;

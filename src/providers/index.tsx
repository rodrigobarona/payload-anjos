import { ReactNode } from "react";

// import { HeaderThemeProvider } from "./HeaderTheme";
// import { ThemeProvider } from "./Theme";
import { CurrencyProvider } from "./Currency";

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    // <ThemeProvider>
    //   <HeaderThemeProvider>
    <CurrencyProvider>{children}</CurrencyProvider>
  );
};

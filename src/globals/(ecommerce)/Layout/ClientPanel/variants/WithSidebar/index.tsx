import { type ReactNode } from "react";

import { AsideMenu } from "./components/AsideMenu";

export const WithSidebar = ({ children }: { children: ReactNode }) => {
  return (
    <div className="pt-16">
      <h1 className="container text-2xl font-bold">Moje konto</h1>
      <div className="container mx-auto lg:flex lg:gap-x-16 lg:px-8">
        <AsideMenu />

        <main className="px-4 py-16 sm:px-6 lg:flex-auto lg:px-0">
          <div className="mx-auto max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none">{children}</div>
        </main>
      </div>
    </div>
  );
};

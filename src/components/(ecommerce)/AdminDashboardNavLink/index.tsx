"use client";
import { useTranslation } from "@payloadcms/ui";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  type CustomTranslationsObject,
  type CustomTranslationsKeys,
} from "@/admin/translations/custom-translations";

export const AdminDashboardNavLink = () => {
  const { t } = useTranslation<CustomTranslationsObject, CustomTranslationsKeys>();

  const pathname = usePathname();
  console.log(pathname);

  return (
    <Link href="/admin" className={`nav__link mb-2.5 ${pathname === "/admin" ? "active" : ""}`}>
      {pathname === "/admin" && <div className="nav__link-indicator"></div>}
      {t("adminDashboard:linkTitle")}
    </Link>
  );
};

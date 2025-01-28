import { Button } from "@/components/ui/button";
import { Customer } from "@/payload-types";
import { formatDateTime } from "@/utilities/formatDateTime";
import { useTranslations } from "next-intl";
import { ChangePassword } from "./components/ChangePassword";

export const Settings = ({ user }: { user: Customer }) => {
  const t = useTranslations("Account.settings");
  return (
    <div>
      <h2 className="mb-8 text-xl font-bold">{t("title")}</h2>

      <dl className="mt-6 divide-y divide-gray-100 border-gray-200 text-sm/6">
        <div className="items-center py-6 sm:flex">
          <dt className="h-fit items-center font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
            {t("name")}
          </dt>
          <dd className="mt-1 flex items-center justify-between gap-x-6 sm:mt-0 sm:flex-auto">
            <div className="text-gray-900">
              {user.firstName} {user.lastName}
            </div>
            <Button
              variant="link"
              type="button"
              className="items-center py-2 font-semibold text-indigo-600 hover:text-indigo-500"
            >
              {t("update")}
            </Button>
          </dd>
        </div>
        <div className="items-center py-6 sm:flex">
          <dt className="h-fit items-center font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
            {t("email")}
          </dt>
          <dd className="mt-1 flex items-center justify-between gap-x-6 sm:mt-0 sm:flex-auto">
            <div className="text-gray-900">{user.email}</div>
            <Button
              variant="link"
              type="button"
              className="items-center py-2 font-semibold text-indigo-600 hover:text-indigo-500"
            >
              {t("update")}
            </Button>
          </dd>
        </div>
        <div className="items-center py-6 sm:flex">
          <dt className="h-fit items-center font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
            {t("password")}
          </dt>
          <dd className="mt-1 flex items-center justify-between gap-x-6 sm:mt-0 sm:flex-auto">
            <div className="text-gray-900">••••••••••••</div>
            <ChangePassword user={user} />
          </dd>
        </div>
        <div className="items-center py-6 sm:flex">
          <dt className="h-fit items-center font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
            {t("birthDate")}
          </dt>
          <dd className="mt-1 flex items-center justify-between gap-x-6 sm:mt-0 sm:flex-auto">
            <div className="text-gray-900">{user.birthDate && formatDateTime(user.birthDate, "EU")}</div>
            <Button
              variant="link"
              type="button"
              className="items-center py-2 font-semibold text-indigo-600 hover:text-indigo-500"
            >
              {t("update")}
            </Button>
          </dd>
        </div>
      </dl>
    </div>
  );
};

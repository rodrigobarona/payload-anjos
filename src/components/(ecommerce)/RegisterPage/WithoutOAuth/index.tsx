import Image from "next/image";
import { RegisterForm } from "./components/RegisterForm";
import { useTranslations } from "next-intl";

export const RegisterPageWithoutOAuth = () => {
  const t = useTranslations("RegisterForm");
  return (
    <main className="flex h-full flex-1 flex-col items-center justify-center bg-gray-50">
      <div className="container flex w-full flex-col items-center justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <Image
            alt="Pimento"
            width={125}
            height={88}
            src="/pimento.svg"
            className="-my-5 mx-auto h-20 w-auto invert"
          />
          <h2 className="mt-6 text-center text-2xl/9 font-bold tracking-tight text-gray-900">{t("title")}</h2>
        </div>

        <div className="mt-10 w-full sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <RegisterForm />
          </div>

          {/* <p className="mt-10 text-center text-sm/6 text-gray-500">
            {t("no-account")}{" "}
            <Link href="/register" className="font-semibold text-indigo-600 hover:text-indigo-500">
              {t("register-now")}
            </Link>
          </p> */}
        </div>
      </div>
    </main>
  );
};

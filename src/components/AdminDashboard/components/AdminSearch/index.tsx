"use client";
import { getTranslation } from "@payloadcms/translations";
import { useConfig, useTranslation } from "@payloadcms/ui";
import { EntityType, formatAdminURL, type NavGroupType } from "@payloadcms/ui/shared";
import Link from "next/link";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";

export const AdminSearch = ({ groups }: { groups: NavGroupType[] }) => {
  const {
    config: {
      routes: { admin: adminRoute },
    },
  } = useConfig();

  const { i18n } = useTranslation();

  return (
    <Command className="bg-payload-backgroundColor border-payload-elevation-200 text-payload-foreground group twp relative overflow-visible rounded-lg border border-b-0 shadow-md md:min-w-[450px]">
      <CommandInput className="border-payload-elevation-200" placeholder="Search for collections..." />
      <CommandList className="border-payload-elevation-200 border-l-payload-elevation-200 w-full-border twp absolute -left-[1px] top-full hidden h-[50dvh] max-h-[350px] min-h-[200px] -translate-y-[1px] border-b border-l group-focus-within:block">
        <CommandEmpty>No results found.</CommandEmpty>
        {groups.map((group, index) => (
          <>
            <CommandGroup
              key={`${group.label}-${index}`}
              heading={group.label}
              className="text-payload-foreground"
            >
              {group.entities.map(({ label, slug, type }) => {
                let href = "/";
                let id: string = slug;

                if (type === EntityType.collection) {
                  href = formatAdminURL({ adminRoute, path: `/collections/${slug}` });
                  id = `nav-${slug}`;
                }

                if (type === EntityType.global) {
                  href = formatAdminURL({ adminRoute, path: `/globals/${slug}` });
                  id = `nav-global-${slug}`;
                }
                return (
                  <CommandItem
                    asChild
                    key={`${slug}-${index}-${id}`}
                    id={id}
                    className="data-[selected='true']:bg-payload-elevation-200 data-[selected=true]:text-payload-foreground cursor-pointer"
                  >
                    <Link href={href}>{getTranslation(label, i18n)}</Link>
                  </CommandItem>
                );
              })}
            </CommandGroup>
            {index === groups.length - 1 ? null : <CommandSeparator className="bg-payload-elevation-200" />}
          </>
        ))}
      </CommandList>
    </Command>
  );
};

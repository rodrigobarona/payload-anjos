import { type EntityToGroup, EntityType, groupNavItems } from "@payloadcms/ui/shared";
import { getAccessResults, type PayloadRequest } from "payload";

import { AdminSearch } from "./components/AdminSearch";

export const AdminDashboard = async (req: PayloadRequest) => {
  const payload = req.payload;
  const { collections, globals } = payload.config;
  const { i18n } = req;

  const permissions = await getAccessResults({ req: { ...req } });

  const groups = groupNavItems(
    [
      ...collections
        .filter((collection) => !collection.admin.hidden)
        .map(
          (collection) =>
            ({
              type: EntityType.collection,
              entity: collection,
            }) satisfies EntityToGroup,
        ),
      ...globals
        .filter((global) => !global.admin.hidden)
        .map(
          (global) =>
            ({
              type: EntityType.global,
              entity: global,
            }) satisfies EntityToGroup,
        ),
    ],
    permissions,
    i18n,
  );

  console.log(groups);

  return (
    <main className="gutter--left gutter--right dashboard__wrap">
      <h1>Welcome to admin panel</h1>
      <AdminSearch groups={groups} />
    </main>
  );
};

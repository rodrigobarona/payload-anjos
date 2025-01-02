import type { Page } from "@/payload-types";

import { HighImpactHero } from "@/components/payload/Heros/HighImpact";
import { LowImpactHero } from "@/components/payload/Heros/LowImpact";
import { MediumImpactHero } from "@/components/payload/Heros/MediumImpact";

const heroes = {
  highImpact: HighImpactHero,
  lowImpact: LowImpactHero,
  mediumImpact: MediumImpactHero,
};

export const RenderHero: React.FC<Page["hero"]> = (props) => {
  const { type } = props || {};

  if (!type || type === "none") return null;

  const HeroToRender = heroes[type];

  if (!HeroToRender) return null;

  return <HeroToRender {...props} />;
};

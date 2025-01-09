import type { Page } from "@/payload-types";

import { HighImpactHero } from "@/components/heros/HighImpact";
import { LowImpactHero } from "@/components/heros/LowImpact";
import { MediumImpactHero } from "@/components/heros/MediumImpact";

const heroes = {
  highImpact: HighImpactHero,
  lowImpact: LowImpactHero,
  mediumImpact: MediumImpactHero,
};

export const RenderHero = (props: Page["hero"]) => {
  const { type } = props || {};

  console.log(props.richText?.root);

  if (!type || type === "none") return null;

  const HeroToRender = heroes[type];

  if (!HeroToRender) return null;

  return <HeroToRender {...props} />;
};

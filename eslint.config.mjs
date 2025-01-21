import { dirname } from "path";
import { fileURLToPath } from "url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

const eslintConfig = [
  ...compat.extends(
    "next/core-web-vitals",
    "next/typescript",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended-type-checked",
    "plugin:@typescript-eslint/stylistic-type-checked",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "prettier",
  ),
  {
    languageOptions: {
      parserOptions: {
        project: "tsconfig.json",
      },
    },
    rules: {
      "@typescript-eslint/ban-ts-comment": "warn",
      "@typescript-eslint/no-empty-object-type": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          vars: "all",
          args: "after-used",
          ignoreRestSiblings: false,
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^(_|ignore)",
        },
      ],
      "react/jsx-no-literals": "error",

      // sort imports
      "import/order": [
        "error",
        {
          "newlines-between": "always",
          alphabetize: {
            order: "asc",
            orderImportKind: "asc",
          },
          groups: ["builtin", "external", "index", "internal", "sibling", "parent", "object", "type"],
        },
      ],

      // no let exports
      "import/no-mutable-exports": "error",

      "import/no-cycle": "error",
      "import/no-default-export": "error",

      // allow {} even though it's unsafe but comes handy
      "@typescript-eslint/ban-types": [
        "error",
        {
          types: {
            "{}": false,
          },
        },
      ],

      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          prefer: "type-imports",
          fixStyle: "inline-type-imports",
          disallowTypeAnnotations: false,
        },
      ],

      "import/no-duplicates": ["error", { "prefer-inline": true }],

      // false negatives
      "import/namespace": ["off"],

      // we allow empty interfaces
      "no-empty-pattern": "off",
      "@typescript-eslint/no-empty-interface": "off",

      // we allow empty functions
      "@typescript-eslint/no-empty-function": "off",

      // we sometimes use async functions that don't await anything
      "@typescript-eslint/require-await": "off",

      // make sure to `await` inside try…catch
      "@typescript-eslint/return-await": ["error", "in-try-catch"],

      // allow unused vars prefixed with `_`
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],

      // numbers and booleans are fine in template strings
      "@typescript-eslint/restrict-template-expressions": [
        "error",
        { allowNumber: true, allowBoolean: true },
      ],

      "@typescript-eslint/no-misused-promises": ["error", { checksVoidReturn: false }],

      "no-restricted-imports": [
        "error",
        {
          name: "next/link",
          message: "Please import from `@/i18n/routing` instead for localized routing, or next/navigation.",
        },
        // {
        //   name: "next/navigation",
        //   importNames: ["redirect", "permanentRedirect", "useRouter", "usePathname"],
        //   message: "Please import from `@/i18n/routing` instead.",
        // },
      ],
    },
    overrides: [
      // we don't want default exports on components etc. only on pages/routes
      {
        files: ["src/app/**/{page,layout,loading,route}.ts?(x)", "tailwind.config.ts"],
        rules: {
          "import/no-default-export": "off",
        },
      },
    ],
    ignorePatterns: ["*.js", "*.jsx"],
  },
];

export default eslintConfig;

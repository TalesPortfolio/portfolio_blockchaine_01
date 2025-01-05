import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "@next/next/no-page-custom-font": "off", // Desativa aviso sobre fontes personalizadas
      "@next/next/no-img-element": "off",     // Desativa aviso sobre uso de <img>
    },
  },
];

export default eslintConfig;

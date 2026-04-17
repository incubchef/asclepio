import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";

export default tseslint.config(
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    plugins: { js },
    extends: [js.configs.recommended],
    languageOptions: { globals: globals.browser },
  },
  ...tseslint.configs.recommended,
  {
    plugins: { react: pluginReact },
    languageOptions: {
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    settings: { react: { version: "detect" } },
    rules: {
      ...pluginReact.configs.recommended.rules,
      "react/react-in-jsx-scope": "off",  // no necesario con React 17+
      "react/prop-types": "off",          // quita si quieres mantenerlo
    },
  }
);
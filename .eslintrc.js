module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: ["react", "react-hooks", "prettier"],
  extends: ["plugin:react/recommended", "plugin:prettier/recommended"],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "react/jsx-no-target-blank": ["error", { allowReferrer: true }],
    "no-shadow": "error",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      extends: ["plugin:@typescript-eslint/recommended"],
      rules: {
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "no-shadow": "off",
        "@typescript-eslint/no-shadow": ["error"],
      },
    },
  ],
}

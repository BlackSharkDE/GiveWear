import js from "@eslint/js";

export default [
  {
    ignores: ["node_modules/**"],
  },
  js.configs.recommended,
  {
    files: ["src/assets/js/**/*.js"],
    languageOptions: {
        ecmaVersion: "latest",
        sourceType: "script",
        globals: {
            window: "readonly",
            document: "readonly",
            console: "readonly",
            alert: "readonly",
            localStorage: "readonly",
            bootstrap: "readonly",
        },
    },
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "error",
    },
  },
];

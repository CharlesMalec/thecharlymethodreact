module.exports = {
  env: { es6: true, node: true },
  parserOptions: { ecmaVersion: 2023, sourceType: "script" },
  extends: ["eslint:recommended", "google"],
  rules: {
    "no-restricted-globals": ["error", "name", "length"],
    "prefer-arrow-callback": "error",
    "quotes": ["error", "double", { allowTemplateLiterals: true }],
    // previously relaxed to unblock deploy:
    "max-len": "off",
    "object-curly-spacing": "off",
    "indent": "off",
    // ➜ add these two:
    "require-jsdoc": "off",
    "comma-dangle": "off",
  },
  overrides: [{ files: ["**/*.spec.*"], env: { mocha: true }, rules: {} }],
  globals: {},
};

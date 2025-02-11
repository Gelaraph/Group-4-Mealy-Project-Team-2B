module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "react-app/jest",
    "airbnb",
    "prettier",
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: "./jsconfig.json",
  },
  plugins: ["react", "prettier"],
  rules: {
    'no-else-return': 'off',
    'no-unneeded-ternary': 'off',
    'no-underscore-dangle': 'off',
    'dot-notation': 'off',
    "react/react-in-jsx-scope": "off",
    "no-unused-vars": "warn",
    "react/jsx-filename-extension": ["error", { extensions: [".jsx", ".js"] }],
    "react/function-component-definition": [
      "error",
      {
        namedComponents: "arrow-function",
        unnamedComponents: "arrow-function",
      },
    ],
    "react/require-default-props": [
      "error",
      {
        ignoreFunctionalComponents: true,
      },
    ],
  },
};

const config = {
  rules: {
    'prettier/prettier': 0,
    'check-file/no-index': 0,
    'newline-before-return': 0,
    'react/forbid-component-props': ['warn', { forbid: ['style'] }],
    'react/no-children-prop': 0,
    '@typescript-eslint/no-unsafe-member-access': 0,
  },
  // settings: {
  //   'import/resolver': {
  //     typescript: true,
  //   },
  // },
  parser: '@typescript-eslint/parser',

  extends: ['@smartive/eslint-config/react', 'plugin:import/typescript', 'next/core-web-vitals'],
};

module.exports = config;

module.exports = {
  'parser': 'babel-eslint',
  'env': {
    'browser': true,
    'es2021': true,
  },
  'extends': [
    'plugin:react/recommended',
    'google',
  ],
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true,
    },
    'ecmaVersion': 2021,
    'sourceType': 'module',
  },
  'plugins': [
    'react',
  ],
  'rules': {
    'max-len': ['error', {'code': 80, 'tabWidth': 2}],
    'no-invalid-this': 'off',
    'react/prop-types': 'off',
    'linebreak-style': 'off',
    // 'react/jsx-props-no-multi-spaces': 2,
  },
  'settings': {
    'react': {
      'version': 'detect',
    },
  },
};

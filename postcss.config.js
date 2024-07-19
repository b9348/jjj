export default {
  plugins: {
    'postcss-pxtorem': {
      rootValue: 16,
      propList: ['*'],
      unitPrecision: 5,
      selectorBlackList: [],
      replace: true,
      mediaQuery: false,
      minPixelValue: 0,
    },
  },
};

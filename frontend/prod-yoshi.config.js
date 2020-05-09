module.exports = {
  projectType: 'app',
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
  hmr: false,
  servers: {
    cdn: {
      url: 'http://sasyska.lt:3200/',
    },
  },
};

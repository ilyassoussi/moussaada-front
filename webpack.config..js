const path = require('path');

module.exports = {
  // Autres configurations Webpack...
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/') // Alias pour le dossier 'src'
    },
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'], // Extensions à résoudre
  },
  // Autres configurations Webpack...
};

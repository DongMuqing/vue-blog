const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
});
// module.exports = {
//   devServer: {
//     proxy: {
//       '/api/v1': {
//         target: 'http://localhost:8080',
//         changeOrigin: true
//       },
//       '/api/v2': {
//         target: 'http://localhost:8081',
//         changeOrigin: true
//       }
//     }
//   }
// };


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

module.exports = {
  configureWebpack:{
      //引入cdn中的vue和element-ui
      externals:{
          'vue': 'Vue',
          'element-ui': 'ELEMENT'
      }
  }
}

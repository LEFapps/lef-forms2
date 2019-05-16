Package.describe({
  name: 'lef:forms2',
  version: '1.4.0',
  summary: 'Easy, configuration based form composition',
  git: '',
  documentation: 'README.md'
})

Package.onUse(function (api) {
  api.versionsFrom('1.7.0.4')
  api.use(['ecmascript'])
  Npm.depends({
    'react-dom': '16.5.1',
    'react-reformed': '2.0.0',
    '@lefapps/forms': '1.4.5',
    '@lefapps/translations': '3.0.0'
  })
  api.mainModule('index.js', 'client')
})

Package.onTest(function (api) {
  api.use('ecmascript')
  api.use('tinytest')
  api.use('lef-forms2')
})

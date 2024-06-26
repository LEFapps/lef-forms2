Package.describe({
  name: 'lef:forms2',
  version: '1.6.2-untested',
  summary: 'Easy, configuration based form composition',
  git: '',
  documentation: 'README.md'
})

Package.onUse(function (api) {
  api.versionsFrom('1.7.0.4')
  api.use(['ecmascript'])
  api.mainModule('index.js', 'client')
})

Package.onTest(function (api) {
  api.use('ecmascript')
  api.use('tinytest')
  api.use('lef-forms2')
})

Npm.depends({
  '@lefapps/forms': '1.8.18'
})

Package.describe({
  name: 'lef:forms2',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'Easy, configuration based form composition',
  git: '',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.7.0.4');
  api.use('ecmascript');
  Npm.depends({
    react: '16.4.2',
    'react-dom': '16.4.2',
    'react-reformed': '1.1.2',
    'reactstrap': '6.4.0',
    'lodash' : '4.17.10'
  });
  api.mainModule("client.js","client");
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('lef-forms2');
});

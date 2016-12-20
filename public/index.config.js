(function() {
  'use strict';

  angular
  .module('myra')
  .config(config);

  /** @ngInject */
  function config(RestangularProvider, apiUrl) {
      RestangularProvider.setBaseUrl(apiUrl);
      RestangularProvider.setFullResponse(true);
      // RestangularProvider.setRestangularFields({
      //   id: "_id"
      // });
    }
  })();

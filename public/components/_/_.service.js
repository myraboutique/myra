(function() {
    'use strict';

    angular
        .module('myra')
        .service('_', _);

    _.$inject = ['$window'];

    /* @ngInject */
    function _($window) {
        return $window._;
    }
})();

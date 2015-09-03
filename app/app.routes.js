angular.module('roadhouse')

  .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

      $routeProvider

          .when('/', {
              templateUrl : 'components/rooms/room.html',
              controller : 'roomController',
              controllerAs: 'room'
          }).when('/roadhouse', {
              templateUrl : 'components/rooms/room.html',
              controller : 'roomController',
              controllerAs: 'room'
          }).when('/rooms', {
              templateUrl : 'components/rooms/room.html',
              controller : 'roomController',
              controllerAs: 'room'
          }).when('/manage-rooms', {
              templateUrl : 'components/rooms/manage_rooms.html',
              controller : 'manageRoomsController',
              controllerAs: 'manage'
          }).when('/manage-rooms/price', {
              templateUrl : 'components/rooms/price.html',
              controller : 'manageRoomsController',
              controllerAs: 'manage'
          }).when('/checkin', {
              templateUrl : 'components/rooms/checkin.html',
              controller : 'navigationCheckInController',
              controllerAs: 'navcheckin'
          }).when('/checkout', {
              templateUrl : 'components/rooms/checkout.html',
              controller : 'navigationCheckOutController',
              controllerAs: 'navcheckout'
          }).when('/addroom', {
              templateUrl : 'components/rooms/addroom.html',
              controller : 'addRoomController',
              controllerAs: 'addroom'
          }).when('/book/:id', {
              templateUrl : 'components/rooms/book.html',
              controller : 'bookController',
              controllerAs: 'book'
          }).when('/checkin/:id', {
              templateUrl : 'components/rooms/checkin.html',
              controller : 'checkInController',
              controllerAs: 'checkin'
          }).when('/checkout/:id', {
              templateUrl : 'components/rooms/checkout.html',
              controller : 'checkOutController',
              controllerAs: 'checkout'
          }).when('/finances', {
              templateUrl : 'components/finance/finance.html',
              controller : 'financeController',
              controllerAs: 'finance'
          });

      $locationProvider.html5Mode(true);
  }]);
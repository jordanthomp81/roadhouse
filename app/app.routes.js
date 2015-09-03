angular.module('roadhouse')

  .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

      $routeProvider

          .when('/', {
              templateUrl : '/roadhouse/app/components/rooms/room.html',
              controller : 'roomController',
              controllerAs: 'room'
          }).when('/roadhouse', {
              templateUrl : '/roadhouse/app/components/rooms/room.html',
              controller : 'roomController',
              controllerAs: 'room'
          }).when('/rooms', {
              templateUrl : '/roadhouse/app/components/rooms/room.html',
              controller : 'roomController',
              controllerAs: 'room'
          }).when('/manage-rooms', {
              templateUrl : '/roadhouse/app/components/rooms/manage_rooms.html',
              controller : 'manageRoomsController',
              controllerAs: 'manage'
          }).when('/manage-rooms/price', {
              templateUrl : '/roadhouse/app/components/rooms/price.html',
              controller : 'manageRoomsController',
              controllerAs: 'manage'
          }).when('/checkin', {
              templateUrl : '/roadhouse/app/components/rooms/checkin.html',
              controller : 'navigationCheckInController',
              controllerAs: 'navcheckin'
          }).when('/checkout', {
              templateUrl : '/roadhouse/app/components/rooms/checkout.html',
              controller : 'navigationCheckOutController',
              controllerAs: 'navcheckout'
          }).when('/addroom', {
              templateUrl : '/roadhouse/app/components/rooms/addroom.html',
              controller : 'addRoomController',
              controllerAs: 'addroom'
          }).when('/book/:id', {
              templateUrl : '/roadhouse/app/components/rooms/book.html',
              controller : 'bookController',
              controllerAs: 'book'
          }).when('/checkin/:id', {
              templateUrl : '/roadhouse/app/components/rooms/checkin.html',
              controller : 'checkInController',
              controllerAs: 'checkin'
          }).when('/checkout/:id', {
              templateUrl : '/roadhouse/app/components/rooms/checkout.html',
              controller : 'checkOutController',
              controllerAs: 'checkout'
          }).when('/finances', {
              templateUrl : '/roadhouse/app/components/finance/finance.html',
              controller : 'financeController',
              controllerAs: 'finance'
          });

      $locationProvider.html5Mode(true);
  }]);
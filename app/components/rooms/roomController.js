angular.module('roadhouse')

	.controller('roomController', [ '$rootScope', '$scope', '$http', '$routeParams', '$location', function($rootScope, $scope, $http, $routeParams, $location) {
		
		$scope.available = 0;
		$scope.dirty = 0;
		$scope.under_maintenance = 0;


		// Gets all the rooms from the database
		$http.get('https://roadhouse.firebaseio.com/rooms.json')
		.success(function(data) {
			// on success of the database call, we are going to set the room data to the scope so we can
			// access the information in our view
			$scope.rooms = data;

			for( var i=0; i < Object.keys($scope.rooms).length; i++) {
				switch( $scope.rooms[Object.keys($scope.rooms)[i]].room_status ) {
					case ('AVAILABLE'):
						$scope.available += 1;
						break;

					case ('DIRTY'):
						$scope.dirty += 1;
						break;

					case ('UNDER MAINTENANCE'):
						$scope.under_maintenance += 1;
						break;

					default:
						break;
				}
			}

		});

		// submit function called when the user finishes the add room form

		$(document).foundation();

	}])

	.controller('searchController', [ '$rootScope', '$scope', '$http', '$routeParams', '$location', function($rootScope, $scope, $http, $routeParams, $location) {
		
		// Gets all the rooms from the database
		$http.get('https://roadhouse.firebaseio.com/rooms.json')
		.success(function(data) {
			// on success of the database call, we are going to set the room data to the scope so we can
			// access the information in our view

			$scope.rooms = [data];
			debugger;

		});

		// submit function called when the user finishes the add room form

		$(document).foundation();

	}])

	.controller('manageRoomsController', [ '$rootScope', '$scope', '$location', '$http', function($rootScope, $scope, $location, $http) {

		$http.get('https://roadhouse.firebaseio.com/finances/room_prices.json')
		.success(function(data) {
			$scope.room_prices = data;
		});

		$scope.change_price_submit = function() {

			$http.get('https://roadhouse.firebaseio.com/rooms.json')
			.success(function(data) {
				rooms = data;
				for( var i=0; i < Object.keys(rooms).length; i++) {
					$scope.room_prices_type = $scope.room_prices_type.replace("-", "/").replace("Bed ", "B ");
					if ( rooms[Object.keys(rooms)[i]].room_type == $scope.room_prices_type ) {
						var changePriceFirebase = new Firebase('https://roadhouse.firebaseio.com/rooms/' + Object.keys(rooms)[i]);
						changePriceFirebase.update({
							room_price: $scope.room_prices_price
						});
					}
				}
			});

			$scope.room_prices_type = $scope.room_prices_type.replace("/", "-").replace("B ", "Bed ");
			var changeMainPriceFirebase = new Firebase("https://roadhouse.firebaseio.com/finances/room_prices/");
			changeMainPriceFirebase.child($scope.room_prices_type).set($scope.room_prices_price);
			$location.path('/rooms');
			
		}

		$(document).foundation();

	}])

	.controller('navigationCheckInController', [ '$rootScope', '$scope', '$location', '$http', function($rootScope, $scope, $location, $http) {

		var rooms;

		$scope.checkin_room_submit = function() {

			var guest_name = $scope.navcheckin.checkin_guest_name;
			var room_price;

			$http.get('https://roadhouse.firebaseio.com/rooms.json')
			.success(function(data) {
				rooms = data;

				$http.get('https://roadhouse.firebaseio.com/finances.json')
				.success(function(data) {
					total_revenue = parseInt(data.total_revenue) + parseInt(room_price);
					console.log(total_revenue);
					var financeFirebase = new Firebase('https://roadhouse.firebaseio.com/finances');
					financeFirebase.update({
						total_revenue: total_revenue
					});
				});

				for( var i=0; i < Object.keys(rooms).length; i++) {
					if ( rooms[Object.keys(rooms)[i]].room_guest_name == guest_name ) {
						room_price = rooms[Object.keys(rooms)[i]].room_price;
						var checkInFirebase = new Firebase('https://roadhouse.firebaseio.com/rooms/' + Object.keys(rooms)[i]);
						checkInFirebase.update({
							room_status: 'CHECKED IN'
						});
					}
				}
			});

			$location.path('/rooms');

		}

		$(document).foundation();

	}])

	.controller('navigationCheckOutController', [ '$rootScope', '$scope', '$location', '$http', function($rootScope, $scope, $location, $http) {

		var rooms;

		$scope.checkout_room_submit = function() {

			var guest_name = $scope.navcheckout.checkout_guest_name;

			$http.get('https://roadhouse.firebaseio.com/rooms.json')
			.success(function(data) {
				rooms = data;
				for( var i=0; i < Object.keys(rooms).length; i++) {
					if ( rooms[Object.keys(rooms)[i]].room_guest_name == guest_name ) {
						var checkInFirebase = new Firebase('https://roadhouse.firebaseio.com/rooms/' + Object.keys(rooms)[i]);
						checkInFirebase.update({
							room_status: 'AVAILABLE'
						});
					}
				}
			});

			$location.path('/rooms');

		}

		$(document).foundation();

	}])

	.controller('financeController', [ '$rootScope', '$scope', '$location', '$http', function($rootScope, $scope, $location, $http) {

		$http.get('https://roadhouse.firebaseio.com/finances.json')
		.success(function(data) {
			$scope.finance.income = data.total_revenue.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
			$scope.finance.expenses = data.expenses.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
		});

		$(document).foundation();

	}])

	.controller('bookController', [ '$rootScope', '$scope', '$location', '$http', function($rootScope, $scope, $location, $http) {

		$scope.urlId = location.href.replace('http://localhost/book/', '');

		$http.get('https://roadhouse.firebaseio.com/rooms/' + $scope.urlId + '.json')
		.success(function(data) {
			$scope.currentRoom = data;
		});

		$scope.book_room_submit = function() {

			var bookFirebase = new Firebase('https://roadhouse.firebaseio.com/rooms/' + $scope.urlId);

			bookFirebase.update({
				room_status: 'BOOKED',
			  	room_checkin_date: $scope.book.room_checkin_date,
			  	room_checkout_date: $scope.book.room_checkout_date,
			  	room_guest_name: $scope.book.room_guest_name
			});

			$location.path('/');

		}

		$(document).foundation();

	}])

	.controller('addRoomController', [ '$rootScope', '$scope', '$location', '$http', function($rootScope, $scope, $location, $http) {

		$scope.add_room_form_submit = function() {

			var myFirebaseRef = new Firebase("https://roadhouse.firebaseio.com/rooms");

			switch($scope.add.room_status) {
				case ('A' || 'a'):
					$scope.add.room_input_status = 'AVAILABLE';
					break;

				case ('D' || 'd'):
					$scope.add.room_input_status = 'DIRTY';
					break;

				case ('M' || 'm'):
					$scope.add.room_input_status = 'UNDER MAINTENANCE';
					break;

				default:
					$scope.add.room_input_status = 'AVAILABLE';
					break;
			}

			myFirebaseRef.push({
			  	room_number: $scope.add.room_number,
			  	room_status: $scope.add.room_input_status,
			  	room_type: $scope.add.room_type,
			  	room_price: $scope.add.room_price
			});

			$location.path('/rooms');

        }

		$(document).foundation();

	}])

	.controller('checkInController', [ '$rootScope', '$scope', '$location', '$http', function($rootScope, $scope, $location, $http) {

		$scope.urlId = location.href.replace('http://localhost/checkin/', '');

		$location.path('/rooms');

		$http.get('https://roadhouse.firebaseio.com/rooms/' + $scope.urlId + '.json')
		.success(function(data) {
			$scope.currentRoom = data;

			$http.get('https://roadhouse.firebaseio.com/finances.json')
			.success(function(data) {
				total_revenue = parseInt(data.total_revenue) + parseInt($scope.currentRoom.room_price);
				console.log(total_revenue);
				var financeFirebase = new Firebase('https://roadhouse.firebaseio.com/finances');
				financeFirebase.update({
					total_revenue: total_revenue
				});
			});
		});

		var bookFirebase = new Firebase('https://roadhouse.firebaseio.com/rooms/' + $scope.urlId);

		bookFirebase.update({
			room_status: 'CHECKED IN'
		});

		// trying to set the finanace when a room is checked in
		// $http.get('https://roadhouse.firebaseio.com/rooms/' + $scope.urlId + "/room_price.json")
		// .success(function(data) {
		// 	console.log(data);
		// 	$scope.roomPriceFirebase = data;
		// });

		// $http.get('https://roadhouse.firebaseio.com/finances/total_revenue.json')
		// .success(function(data) {
		// 	console.log(data);
		// 	$scope.totalRevenueFirebase = data;
		// }); 

		$(document).foundation();

	}])

	.controller('checkOutController', [ '$rootScope', '$scope', '$location', '$http', function($rootScope, $scope, $location, $http) {

		$scope.urlId = location.href.replace('http://localhost/checkout/', '');

		$http.get('https://roadhouse.firebaseio.com/rooms/' + $scope.urlId + '.json')
		.success(function(data) {
			$scope.currentRoom = data;
		});

		var bookFirebase = new Firebase('https://roadhouse.firebaseio.com/rooms/' + $scope.urlId);

		bookFirebase.update({
			room_status: 'AVAILABLE',
			room_guest_name: null,
			room_checkout_date: null,
			room_checkin_date: null
		});

		$(document).foundation();

		$location.path('/rooms');

	}])

	.controller('roomDeleteController', [ '$rootScope', '$scope', '$location', '$http', function($rootScope, $scope, $location, $http) {

		$scope.urlId = location.href.replace('http://localhost/checkout/', '');

		$http.get('https://roadhouse.firebaseio.com/rooms/' + $scope.urlId + '.json')
		.success(function(data) {
			$scope.currentRoom = data;
		});

		var bookFirebase = new Firebase('https://roadhouse.firebaseio.com/rooms/' + $scope.urlId);

		bookFirebase.remove();

		$(document).foundation();

		$location.path('/rooms');

	}]);
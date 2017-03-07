var app = angular.module("ganttUpdate", [ 'angular.atmosphere', 'gantt',
		'gantt.table', 'gantt.movable', 'cgNotify', 'signature', 'ui.grid',
		'ui.grid.edit', 'ui.grid.cellNav', 'ui.grid.moveColumns',
		'ui.grid.resizeColumns', 'ui.grid.exporter' ]);

app.controller('angularGanttCtrl', ChatController);

function ChatController($scope, $http, atmosphereService, notify) {
	
	/*******************************************************************Gally Sample Component****************************************************************/
	angular.element(document).ready(
			function() {
				var lc = LC.init(
						document.getElementsByClassName('my-drawing')[0], {
							imageURLPrefix : 'https://ololoepepe.me/files'
						});
				$scope.localStorageKey = 'drawing'
				if (localStorage.getItem($scope.localStorageKey)) {
					lc.loadSnapshot(JSON.parse(localStorage
							.getItem($scope.localStorageKey)));
				}
				lc.on('drawingChange', function() {
					alert("changed")
					localStorage.setItem($scope.localStorageKey, JSON.stringify(lc
							.getSnapshot()));
				});
				alert("Executed")
				
			});

	$scope.reply_click = function reply_click() {
		alert(localStorage.getItem($scope.localStorageKey));
	}
	
	/*******************************************************************UI-Grid Component****************************************************************/
	$scope.nonEditableFields = [ "firstName" ];
	$scope.data = [ {
		"firstName" : "Cox",
		"lastName" : "Carney",
		"company" : "Enormo",
		"employed" : true,
		"isReadOnly" : true
	}, {
		"firstName" : "Lorraine",
		"lastName" : "Wise",
		"company" : "Comveyer",
		"employed" : false,
		"isReadOnly" : false
	}, {
		"firstName" : "Nancy",
		"lastName" : "Waters",
		"company" : "Fuelton",
		"employed" : false,
		"isReadOnly" : false
	} ];

	$scope.gridOptions = {
		// data: 'data',
		enableCellEdit : true,
		enableGridMenu : true,
		enableSelectAll : true,
		exporterCsvFilename : 'myFile.xls',
		exporterPdfDefaultStyle : {
			fontSize : 9
		},
		exporterPdfTableStyle : {
			margin : [ 30, 30, 30, 30 ]
		},
		exporterPdfTableHeaderStyle : {
			fontSize : 10,
			bold : true,
			italics : true,
			color : 'red'
		},
		exporterPdfHeader : {
			text : "Grid Data",
			style : 'headerStyle'
		},
		exporterPdfFooter : function(currentPage, pageCount) {
			return {
				text : currentPage.toString() + ' of ' + pageCount.toString(),
				style : 'footerStyle'
			};
		},
		exporterPdfCustomFormatter : function(docDefinition) {
			docDefinition.styles.headerStyle = {
				fontSize : 22,
				bold : true
			};
			docDefinition.styles.footerStyle = {
				fontSize : 10,
				bold : true
			};
			return docDefinition;
		},
		exporterPdfOrientation : 'portrait',
		exporterPdfPageSize : 'LETTER',
		exporterPdfMaxGridWidth : 500,
		exporterCsvLinkElement : angular.element(document
				.querySelectorAll(".custom-csv-link-location")),
	/*columnDefs: [
	    { field: 'name' },
	    { field: 'gender', visible: true},
	    { field: 'company' }
	  ],*/

	/*columnDefs: [{
	  name: 'firstName',
	  cellEditableCondition: function($scope) {
		if($scope.nonEditableFields.contains(firstName) > -1) {
			return false ;
		}
	    return true;
	  }
	}, {
	  name: 'lastName',
	  cellEditableCondition: function($scope) {
	    return true;
	  }
	}, {
	  name: 'company',
	  cellEditableCondition: function($scope) {
	    return true;
	  }
	}, ]*/
	};
	//$scope.gridOptions.data = $scope.data ;
	$scope.gridOptions.onRegisterApi = function(gridApi) {
		$scope.gridApi = gridApi;
	};

	$scope.hideColumns = function() {
		$scope.gridOptions.columnDefs[0].visible = false;
		$scope.gridApi.grid.refresh();
	}

	$scope.showColumns = function() {
		$scope.gridOptions.columnDefs[0].visible = true;
		$scope.gridOptions.columnDefs[0].cellEditableCondition = function($scope) {
		    return false;
		 };
		$scope.gridApi.grid.refresh();
	}
	
	$scope.disableFirstName = function() {
		
		$scope.gridOptions.columnDefs[0].cellEditableCondition = function($scope) {
		    return false;
		 };
		$scope.gridApi.grid.refresh();
	}
	
	$http.get('http://ui-grid.info/data/100.json').success(function(data) {
		$scope.gridOptions.data = data;
	});
	
	/*******************************************************************Signature Component****************************************************************/

	$scope.boundingBox = {
		width : 700,
		height : 300
	};

	$scope.check = function() {
		alert(signature.dataUrl);
		var signature = $scope.accept();
		//alert(signature);
	};
	
	
	/*******************************************************************Window Close Event****************************************************************/

	var isOnIOS = navigator.userAgent.match(/iPad/i)
			|| navigator.userAgent.match(/iPhone/i);
	var eventName = isOnIOS ? "pagehide" : "beforeunload";
	//alert(eventName);
	window.addEventListener(eventName, function(event) {
		return "Unsaved Data on Gantt";
	});

	window.onbeforeunload = function(event) {
		event.returnValue = 'Unsaved Data on Gantt';
	}

	/*******************************************************************Gantt Component ****************************************************************/

	$scope.disableEdit = false;
	$scope.disableSave = false;
	$scope.edit = function() {
		$scope.disableEdit = true;
		$scope.disableSave = false;
	}

	$scope.save = function() {
		console.log("Save operation");
		$scope.disableEdit = false;
		$scope.disableSave = false;
	}

	$scope.data = [

			{
				name : 'Milestones',
				height : '3em',
				sortable : false,
				drawTask : false,
				classes : 'gantt-row-milestone',
				color : '#45607D',
				tasks : [

				{
					name : 'Kickoff',
					color : '#93C47D',
					from : '2013-10-07T09:00:00',
					to : '2013-10-07T10:00:00',
					data : 'Can contain any custom data or object'
				}, {
					name : 'Concept approval',
					color : '#93C47D',
					from : new Date(2013, 9, 18, 18, 0, 0),
					to : new Date(2013, 9, 18, 18, 0, 0),
					est : new Date(2013, 9, 16, 7, 0, 0),
					lct : new Date(2013, 9, 19, 0, 0, 0)
				}, {
					name : 'Development finished',
					color : '#93C47D',
					from : new Date(2013, 10, 15, 18, 0, 0),
					to : new Date(2013, 10, 15, 18, 0, 0)
				}, {
					name : 'Shop is running',
					color : '#93C47D',
					from : new Date(2013, 10, 22, 12, 0, 0),
					to : new Date(2013, 10, 22, 12, 0, 0)
				}, {
					name : 'Go-live',
					color : '#93C47D',
					from : new Date(2013, 10, 29, 16, 0, 0),
					to : new Date(2013, 10, 29, 16, 0, 0)
				} ],
				data : 'Can contain any custom data or object'
			},
			{
				name : 'Status meetings',
				tasks : [ {
					name : 'Demo #1',
					color : '#9FC5F8',
					from : new Date(2013, 9, 25, 15, 0, 0),
					to : new Date(2013, 9, 25, 18, 30, 0)
				}, {
					name : 'Demo #2',
					color : '#9FC5F8',
					from : new Date(2013, 10, 1, 15, 0, 0),
					to : new Date(2013, 10, 1, 18, 0, 0)
				}, {
					name : 'Demo #3',
					color : '#9FC5F8',
					from : new Date(2013, 10, 8, 15, 0, 0),
					to : new Date(2013, 10, 8, 18, 0, 0)
				}, {
					name : 'Demo #4',
					color : '#9FC5F8',
					from : new Date(2013, 10, 15, 15, 0, 0),
					to : new Date(2013, 10, 15, 18, 0, 0)
				}, {
					name : 'Demo #5',
					color : '#9FC5F8',
					from : new Date(2013, 10, 24, 9, 0, 0),
					to : new Date(2013, 10, 24, 10, 0, 0)
				} ]
			},
			{
				name : 'Kickoff',
				movable : {
					allowResizing : false
				},
				tasks : [ {
					name : 'Day 1',
					color : '#9FC5F8',
					from : new Date(2013, 9, 7, 9, 0, 0),
					to : new Date(2013, 9, 7, 17, 0, 0),
					progress : {
						percent : 100,
						color : '#3C8CF8'
					},
					movable : false
				}, {
					name : 'Day 2',
					color : '#9FC5F8',
					from : new Date(2013, 9, 8, 9, 0, 0),
					to : new Date(2013, 9, 8, 17, 0, 0),
					progress : {
						percent : 100,
						color : '#3C8CF8'
					}
				}, {
					name : 'Day 3',
					color : '#9FC5F8',
					from : new Date(2013, 9, 9, 8, 30, 0),
					to : new Date(2013, 9, 9, 12, 0, 0),
					progress : {
						percent : 100,
						color : '#3C8CF8'
					}
				} ]
			},
			{
				name : 'Create concept',
				tasks : [ {
					name : 'Create concept',
					priority : 20,
					content : '<i class="fa fa-cog" ng-click="scope.handleTaskIconClick(task.model)"></i> {{task.model.name}}',
					color : '#F1C232',
					from : new Date(2013, 9, 10, 8, 0, 0),
					to : new Date(2013, 9, 16, 18, 0, 0),
					est : new Date(2013, 9, 8, 8, 0, 0),
					lct : new Date(2013, 9, 18, 20, 0, 0),
					progress : 100,
					sections : {
						items : [ {
							name : 'Section #1',
							classes : [ 'section-1' ],
							from : new Date(2013, 9, 10, 8, 0, 0),
							to : new Date(2013, 9, 13, 8, 0, 0)
						}, {
							name : 'Section #2',
							classes : [ 'section-2' ],
							from : new Date(2013, 9, 13, 8, 0, 0),
							to : new Date(2013, 9, 15, 8, 0, 0)
						}, {
							name : 'Section #3',
							classes : [ 'section-3' ],
							from : new Date(2013, 9, 15, 8, 0, 0),
							to : new Date(2013, 9, 16, 18, 0, 0)
						} ]
					}
				} ]
			},
			{
				name : 'Finalize concept',
				tasks : [ {
					id : 'Finalize concept',
					name : 'Finalize concept',
					priority : 10,
					color : '#F1C232',
					from : new Date(2013, 9, 17, 8, 0, 0),
					to : new Date(2013, 9, 18, 18, 0, 0),
					progress : 100
				} ]
			},
			{
				name : 'Development',
				children : [ 'Sprint 1', 'Sprint 2', 'Sprint 3', 'Sprint 4' ],
				content : '<i class="fa fa-file-code-o" ng-click="scope.handleRowIconClick(row.model)"></i> {{row.model.name}}'
			}, {
				name : 'Sprint 1',
				tooltips : false,
				tasks : [ {
					id : 'Product list view',
					name : 'Product list view',
					color : '#F1C232',
					from : new Date(2013, 9, 21, 8, 0, 0),
					to : new Date(2013, 9, 25, 15, 0, 0),
					progress : 25,
					dependencies : [ {
						to : 'Order basket'
					}, {
						from : 'Finalize concept'
					} ]
				} ]
			}, {
				name : 'Sprint 2',
				tasks : [ {
					id : 'Order basket',
					name : 'Order basket',
					color : '#F1C232',
					from : new Date(2013, 9, 28, 8, 0, 0),
					to : new Date(2013, 10, 1, 15, 0, 0),
					dependencies : {
						to : 'Checkout'
					}
				} ]
			}, {
				name : 'Sprint 3',
				tasks : [ {
					id : 'Checkout',
					name : 'Checkout',
					color : '#F1C232',
					from : new Date(2013, 10, 4, 8, 0, 0),
					to : new Date(2013, 10, 8, 15, 0, 0),
					dependencies : {
						to : 'Login & Signup & Admin Views'
					}
				} ]
			}, {
				name : 'Sprint 4',
				tasks : [ {
					id : 'Login & Signup & Admin Views',
					name : 'Login & Signup & Admin Views',
					color : '#F1C232',
					from : new Date(2013, 10, 11, 8, 0, 0),
					to : new Date(2013, 10, 15, 15, 0, 0),
					dependencies : [ {
						to : 'HW'
					}, {
						to : 'SW / DNS/ Backups'
					} ]
				} ]
			}, {
				name : 'Hosting'
			}, {
				name : 'Setup',
				tasks : [ {
					id : 'HW',
					name : 'HW',
					color : '#F1C232',
					from : new Date(2013, 10, 18, 8, 0, 0),
					to : new Date(2013, 10, 18, 12, 0, 0)
				} ]
			}, {
				name : 'Config',
				tasks : [ {
					id : 'SW / DNS/ Backups',
					name : 'SW / DNS/ Backups',
					color : '#F1C232',
					from : new Date(2013, 10, 18, 12, 0, 0),
					to : new Date(2013, 10, 21, 18, 0, 0)
				} ]
			}, {
				name : 'Server',
				parent : 'Hosting',
				children : [ 'Setup', 'Config' ]
			}, {
				name : 'Deployment',
				parent : 'Hosting',
				tasks : [ {
					name : 'Depl. & Final testing',
					color : '#F1C232',
					from : new Date(2013, 10, 21, 8, 0, 0),
					to : new Date(2013, 10, 22, 12, 0, 0),
					'classes' : 'gantt-task-deployment'
				} ]
			}, {
				name : 'Workshop',
				tasks : [ {
					name : 'On-side education',
					color : '#F1C232',
					from : new Date(2013, 10, 24, 9, 0, 0),
					to : new Date(2013, 10, 25, 15, 0, 0)
				} ]
			}, {
				name : 'Content',
				tasks : [ {
					name : 'Supervise content creation',
					color : '#F1C232',
					from : new Date(2013, 10, 26, 9, 0, 0),
					to : new Date(2013, 10, 29, 16, 0, 0)
				} ]
			}, {
				name : 'Documentation',
				tasks : [ {
					name : 'Technical/User documentation',
					color : '#F1C232',
					from : new Date(2013, 10, 26, 8, 0, 0),
					to : new Date(2013, 10, 28, 18, 0, 0)
				} ]
			} ];

	$scope.registerApi = function(api) {

		api.core.on.ready($scope, function() {
			api.tasks.on.moveEnd($scope,
					addEventName('tasks.on.moveEnd',
							function(eventName, data) {

								socket.push(atmosphere.util
										.stringifyJSON($scope.data));
								socket.push(atmosphere.util
										.stringifyJSON(data.model));

							}));

			api.tasks.on.moveBegin($scope, addEventName('tasks.on.moveBegin',
					function(event, task) {

					}));
		});
	}

	function addEventName(eventName, func) {
		return function(data) {
			return func(eventName, data);
		};
	}
	
	/*******************************************************************Athmoshphere Component ****************************************************************/

	var socket;

	var request = {
		url : document.location.toString() + 'gantt',
		contentType : 'application/json',
		logLevel : 'debug',
		transport : 'websocket',
		trackMessageLength : true,
		reconnectInterval : 5000,
		enableXDR : true,
		timeout : 60000
	};

	request.onOpen = function(response) {

	};

	request.onClientTimeout = function(response) {

		setTimeout(function() {
			socket = atmosphereService.subscribe(request);
		}, request.reconnectInterval);
	};

	request.onReopen = function(response) {

	};

	request.onTransportFailure = function(errorMsg, request) {
		atmosphere.util.info(errorMsg);

	};

	request.onMessage = function(response) {
		var responseText = response.responseBody;
		try {
			var message = atmosphere.util.parseJSON(responseText);

			if (message.name != undefined) {
				notify({
					message : message.name + " got Re-sceduled",
					classes : "alert-info",
					templateUrl : "",
					position : "right",
					duration : 9000
				});
			} else {
				$scope.data = message;
			}

		} catch (e) {
			console.error("Error parsing JSON: ", responseText);
			throw e;
		}
	};

	request.onClose = function(response) {

	};

	request.onError = function(response) {

	};

	request.onReconnect = function(request, response) {

	};

	socket = atmosphereService.subscribe(request);
}

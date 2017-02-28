var app = angular.module("ganttUpdate", ['angular.atmosphere', 'gantt',
  'gantt.table', 'gantt.movable', 'cgNotify', 'signature'
]);

app.controller('angularGanttCtrl', ChatController);

app.factory("LS", function($window, $rootScope) {
	
  angular.element($window).on(
    'storage',
    function(event) {
      if (event.key === 'disableEdit' || event.key === 'disableSave' || event.key === 'value') {
        $rootScope.$apply();
      }
    });
  
  return {
    setData: function(key, val) {
      $window.localStorage && $window.localStorage.setItem(key, val);
      return this;
    },
    getData: function(key) {
      return $window.localStorage && $window.localStorage.getItem(key);
    }
  };
});

function ChatController($scope, atmosphereService, notify, LS) {
	
  $scope.boundingBox = {
    width: 700,
    height: 300
  };

  $scope.check = function() {
    alert(signature.dataUrl);
    var signature = $scope.accept();
    alert(signature);

  };
  window.onbeforeunload = function() {

    return "Unsaved Data on Gantt";
  };
  $scope.updateData = function() {
    $scope.disableEdit = JSON.parse(LS.getData("disableEdit"));
    $scope.disableSave = JSON.parse(LS.getData("disableSave"));
  };

  LS.setData("disableEdit", false);
  LS.setData("disableSave", false);

  $scope.disableEdit = JSON.parse(LS.getData("disableEdit"));
  $scope.disableSave = JSON.parse(LS.getData("disableSave"));
  $scope.edit = function() {
    LS.setData("disableEdit", true);
    LS.setData("disableSave", false);
  }

  $scope.save = function() {
    console.log("Save operation");
    LS.setData("disableEdit", false);
    LS.setData("disableSave", false);
  }


  $scope.data = [

    {
      name: 'Milestones',
      height: '3em',
      sortable: false,
      drawTask: false,
      classes: 'gantt-row-milestone',
      color: '#45607D',
      tasks: [

        {
          name: 'Kickoff',
          color: '#93C47D',
          from: '2013-10-07T09:00:00',
          to: '2013-10-07T10:00:00',
          data: 'Can contain any custom data or object'
        }, {
          name: 'Concept approval',
          color: '#93C47D',
          from: new Date(2013, 9, 18, 18, 0, 0),
          to: new Date(2013, 9, 18, 18, 0, 0),
          est: new Date(2013, 9, 16, 7, 0, 0),
          lct: new Date(2013, 9, 19, 0, 0, 0)
        }, {
          name: 'Development finished',
          color: '#93C47D',
          from: new Date(2013, 10, 15, 18, 0, 0),
          to: new Date(2013, 10, 15, 18, 0, 0)
        }, {
          name: 'Shop is running',
          color: '#93C47D',
          from: new Date(2013, 10, 22, 12, 0, 0),
          to: new Date(2013, 10, 22, 12, 0, 0)
        }, {
          name: 'Go-live',
          color: '#93C47D',
          from: new Date(2013, 10, 29, 16, 0, 0),
          to: new Date(2013, 10, 29, 16, 0, 0)
        }
      ],
      data: 'Can contain any custom data or object'
    }, {
      name: 'Status meetings',
      tasks: [{
        name: 'Demo #1',
        color: '#9FC5F8',
        from: new Date(2013, 9, 25, 15, 0, 0),
        to: new Date(2013, 9, 25, 18, 30, 0)
      }, {
        name: 'Demo #2',
        color: '#9FC5F8',
        from: new Date(2013, 10, 1, 15, 0, 0),
        to: new Date(2013, 10, 1, 18, 0, 0)
      }, {
        name: 'Demo #3',
        color: '#9FC5F8',
        from: new Date(2013, 10, 8, 15, 0, 0),
        to: new Date(2013, 10, 8, 18, 0, 0)
      }, {
        name: 'Demo #4',
        color: '#9FC5F8',
        from: new Date(2013, 10, 15, 15, 0, 0),
        to: new Date(2013, 10, 15, 18, 0, 0)
      }, {
        name: 'Demo #5',
        color: '#9FC5F8',
        from: new Date(2013, 10, 24, 9, 0, 0),
        to: new Date(2013, 10, 24, 10, 0, 0)
      }]
    }, {
      name: 'Kickoff',
      movable: {
        allowResizing: false
      },
      tasks: [{
        name: 'Day 1',
        color: '#9FC5F8',
        from: new Date(2013, 9, 7, 9, 0, 0),
        to: new Date(2013, 9, 7, 17, 0, 0),
        progress: {
          percent: 100,
          color: '#3C8CF8'
        },
        movable: false
      }, {
        name: 'Day 2',
        color: '#9FC5F8',
        from: new Date(2013, 9, 8, 9, 0, 0),
        to: new Date(2013, 9, 8, 17, 0, 0),
        progress: {
          percent: 100,
          color: '#3C8CF8'
        }
      }, {
        name: 'Day 3',
        color: '#9FC5F8',
        from: new Date(2013, 9, 9, 8, 30, 0),
        to: new Date(2013, 9, 9, 12, 0, 0),
        progress: {
          percent: 100,
          color: '#3C8CF8'
        }
      }]
    }, {
      name: 'Create concept',
      tasks: [{
        name: 'Create concept',
        priority: 20,
        content: '<i class="fa fa-cog" ng-click="scope.handleTaskIconClick(task.model)"></i> {{task.model.name}}',
        color: '#F1C232',
        from: new Date(2013, 9, 10, 8, 0, 0),
        to: new Date(2013, 9, 16, 18, 0, 0),
        est: new Date(2013, 9, 8, 8, 0, 0),
        lct: new Date(2013, 9, 18, 20, 0, 0),
        progress: 100,
        sections: {
          items: [{
            name: 'Section #1',
            classes: ['section-1'],
            from: new Date(2013, 9, 10, 8, 0, 0),
            to: new Date(2013, 9, 13, 8, 0, 0)
          }, {
            name: 'Section #2',
            classes: ['section-2'],
            from: new Date(2013, 9, 13, 8, 0, 0),
            to: new Date(2013, 9, 15, 8, 0, 0)
          }, {
            name: 'Section #3',
            classes: ['section-3'],
            from: new Date(2013, 9, 15, 8, 0, 0),
            to: new Date(2013, 9, 16, 18, 0, 0)
          }]
        }
      }]
    }, {
      name: 'Finalize concept',
      tasks: [{
        id: 'Finalize concept',
        name: 'Finalize concept',
        priority: 10,
        color: '#F1C232',
        from: new Date(2013, 9, 17, 8, 0, 0),
        to: new Date(2013, 9, 18, 18, 0, 0),
        progress: 100
      }]
    }, {
      name: 'Development',
      children: ['Sprint 1', 'Sprint 2', 'Sprint 3', 'Sprint 4'],
      content: '<i class="fa fa-file-code-o" ng-click="scope.handleRowIconClick(row.model)"></i> {{row.model.name}}'
    }, {
      name: 'Sprint 1',
      tooltips: false,
      tasks: [{
        id: 'Product list view',
        name: 'Product list view',
        color: '#F1C232',
        from: new Date(2013, 9, 21, 8, 0, 0),
        to: new Date(2013, 9, 25, 15, 0, 0),
        progress: 25,
        dependencies: [{
          to: 'Order basket'
        }, {
          from: 'Finalize concept'
        }]
      }]
    }, {
      name: 'Sprint 2',
      tasks: [{
        id: 'Order basket',
        name: 'Order basket',
        color: '#F1C232',
        from: new Date(2013, 9, 28, 8, 0, 0),
        to: new Date(2013, 10, 1, 15, 0, 0),
        dependencies: {
          to: 'Checkout'
        }
      }]
    }, {
      name: 'Sprint 3',
      tasks: [{
        id: 'Checkout',
        name: 'Checkout',
        color: '#F1C232',
        from: new Date(2013, 10, 4, 8, 0, 0),
        to: new Date(2013, 10, 8, 15, 0, 0),
        dependencies: {
          to: 'Login & Signup & Admin Views'
        }
      }]
    }, {
      name: 'Sprint 4',
      tasks: [{
        id: 'Login & Signup & Admin Views',
        name: 'Login & Signup & Admin Views',
        color: '#F1C232',
        from: new Date(2013, 10, 11, 8, 0, 0),
        to: new Date(2013, 10, 15, 15, 0, 0),
        dependencies: [{
          to: 'HW'
        }, {
          to: 'SW / DNS/ Backups'
        }]
      }]
    }, {
      name: 'Hosting'
    }, {
      name: 'Setup',
      tasks: [{
        id: 'HW',
        name: 'HW',
        color: '#F1C232',
        from: new Date(2013, 10, 18, 8, 0, 0),
        to: new Date(2013, 10, 18, 12, 0, 0)
      }]
    }, {
      name: 'Config',
      tasks: [{
        id: 'SW / DNS/ Backups',
        name: 'SW / DNS/ Backups',
        color: '#F1C232',
        from: new Date(2013, 10, 18, 12, 0, 0),
        to: new Date(2013, 10, 21, 18, 0, 0)
      }]
    }, {
      name: 'Server',
      parent: 'Hosting',
      children: ['Setup', 'Config']
    }, {
      name: 'Deployment',
      parent: 'Hosting',
      tasks: [{
        name: 'Depl. & Final testing',
        color: '#F1C232',
        from: new Date(2013, 10, 21, 8, 0, 0),
        to: new Date(2013, 10, 22, 12, 0, 0),
        'classes': 'gantt-task-deployment'
      }]
    }, {
      name: 'Workshop',
      tasks: [{
        name: 'On-side education',
        color: '#F1C232',
        from: new Date(2013, 10, 24, 9, 0, 0),
        to: new Date(2013, 10, 25, 15, 0, 0)
      }]
    }, {
      name: 'Content',
      tasks: [{
        name: 'Supervise content creation',
        color: '#F1C232',
        from: new Date(2013, 10, 26, 9, 0, 0),
        to: new Date(2013, 10, 29, 16, 0, 0)
      }]
    }, {
      name: 'Documentation',
      tasks: [{
        name: 'Technical/User documentation',
        color: '#F1C232',
        from: new Date(2013, 10, 26, 8, 0, 0),
        to: new Date(2013, 10, 28, 18, 0, 0)
      }]
    }
  ];

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

  var socket;

  var request = {
    url: document.location.toString() + 'gantt',
    contentType: 'application/json',
    logLevel: 'debug',
    transport: 'websocket',
    trackMessageLength: true,
    reconnectInterval: 5000,
    enableXDR: true,
    timeout: 60000
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
          message: message.name + " got Re-sceduled",
          classes: "alert-info",
          templateUrl: "",
          position: "right",
          duration: 9000
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

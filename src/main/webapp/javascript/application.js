angular.module('angular.atmosphere.chat', ['angular.atmosphere', 'gantt', 'gantt.table', 'gantt.movable']).controller('angularGanttCtrl', ChatController);


function ChatController($scope, atmosphereService){

  
  $scope.data = [{
      name: 'Finalize concept',
      tasks: [{
        name: 'Sprint1',
        from: new Date(2016, 0, 1).valueOf(),
        to: new Date(2016, 0, 3).valueOf(),
        color: '#6ba3ff'
      }]
    }];
  
  $scope.registerApi = function(api) {
	  
	  api.core.on.ready($scope, function () {
          api.tasks.on.moveEnd($scope, addEventName('tasks.on.moveEnd', function (eventName, data) {

              socket.push(atmosphere.util.stringifyJSON($scope.data));

          }));



          api.tasks.on.moveBegin($scope, addEventName('tasks.on.moveBegin', function (event, task) {
             
          }));
      });
    }
  
  function addEventName(eventName, func) {
      return function (data) {
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

  request.onOpen = function(response){
   
  };

  request.onClientTimeout = function(response){
 
    setTimeout(function(){
      socket = atmosphereService.subscribe(request);
    }, request.reconnectInterval);
  };

  request.onReopen = function(response){
   
  };

  //For demonstration of how you can customize the fallbackTransport using the onTransportFailure function
  request.onTransportFailure = function(errorMsg, request){
    atmosphere.util.info(errorMsg);
   
  };

  request.onMessage = function(response){
	 // alert("Message Got")
    var responseText = response.responseBody;
    try{
      var message = atmosphere.util.parseJSON(responseText);
      
     // $scope.data = [];
      $scope.data = message;

    }catch(e){
      console.error("Error parsing JSON: ", responseText);
      throw e;
    }
  };

  request.onClose = function(response){
   
   // socket.push(atmosphere.util.stringifyJSON({ author: $scope.model.name, message: 'disconnecting' }));
  };

  request.onError = function(response){
  
  };

  request.onReconnect = function(request, response){
   
  };

  socket = atmosphereService.subscribe(request);
}

// Search controller that we use whenever we have a search inputs
// and search results
dinnerPlannerApp.controller('SearchCtrl', function ($scope,Dinner) {

//$scope.dishes = Dinner.DishSearch.get({title_kw:query})
  // TODO in Lab 5: you will need to implement a method that searchers for dishes
  // including the case while the search is still running.
 $scope.search = function(query) {
   $scope.status = "Searching...";
   Dinner.DishSearch.get({title_kw:query},function(data){
     $scope.dishes=data.Results;
     $scope.status = "Showing " + data.Results.length + " results";
   },function(data){
     $scope.status = "There was an error";
   });
 }


  $scope.search = function(query) {
   $scope.status = "Searching...";
   Dinner.DishSearch.get({title_kw:query},function(data){
     $scope.dishes=data.Results;
     $scope.status = "Showing " + data.Results.length + " results";
   },function(data){
     $scope.status = "There was an error";
   });
 }

   $scope.selectSearch = function(query2, query) {
    Dinner.DishSearch.get({include_primarycat:query2},function(data){
     $scope.dishes=data.Results;
     $scope.status = "Showing " + " results";
     console.log(data.Results);
    $("#viewDishes").css("height", $("#selectDishView").height()-$("#selectDishBackground").height() - 10);
  
    },function(data){
     $scope.status = "There was an error";
   });
 }

  $scope.getNumberOfGuests = function() {
      console.log("HEHEHEHEH HEHEHEHEH HEHEHEH");
      return Dinner.getNumberOfGuests();
    }



});
// Here we create an Angular service that we will use for our 
// model. In your controllers (or other services) you can include the
// dependency on any service you need. Angular will insure that the
// service is created first time it is needed and then just reuse it
// the next time.
dinnerPlannerApp.factory('Dinner',function ($resource) {

  this.DishSearch = $resource('http://api.bigoven.com/recipes',{pg:1,rpp:25,api_key:'66J8l00npnHHZcCNLRhxkfW1OHxbojy4'});
  this.Dish = $resource('http://api.bigoven.com/recipe/:id',{api_key:'66J8l00npnHHZcCNLRhxkfW1OHxbojy4'});
  
  this.numberOfGuests = 1.00;
  this.menu = {"Appetizer": "", "Main dish": "", "Dessert": ""};
  this.pendingDish = "";
  this.pg = 1;
  this.rpp = 8;

  //För att kunna uppdatera viewn när nåt i modellen ändras behövs observer patterns.
  //Först addera observer-metoder till modellen:
  //this.addObserver = function(observer) {} - Array where to add new observers
  //var notifyObservers = function(obj) {} - that will call the update method on all the observers in the array
  //Metoderna nedan skall tillkalla notifyObserver-motoden när något ändras.
  //notifyObserver-metoden kan innehålla inget argument eller vilket objekt som helst!


  this.setNumberOfGuests = function(num) {
    this.numberOfGuests = num;
  }

  this.setPendingDish = function(dish){
    if(dish == ""){
      this.pendingDish = "";
      return;
    }
    console.log(dish);
    this.pendingDish = dish;
  }

  this.getPendingDish = function(){
    return this.pendingDish;
  }

  // should return 
  this.getNumberOfGuests = function() {
    return this.numberOfGuests;
  }

  //Returns the dish that is on the menu for selected type 
  this.getSelectedDish = function(type) {
    return this.menu[type];
  }

  //Returns all the dishes on the menu.
  this.getFullMenu = function() {
    return this.menu;
  }
  

  //Returns all ingredients for all the dishes on the menu. //OBS Lägg till .name om endast namnet på ingrediensen sökes
  this.getAllIngredients = function() {
    var ingredients = [];
    for(var dish in menu){
      for(ingredient in menu[dish].ingredients){
        ingredients.push(menu[dish].ingredients[ingredient]);
      }
    }
    return ingredients;
  }

  //Returns the total price of the menu (all the ingredients multiplied by number of guests).
  this.getTotalMenuPrice = function() {
    var totalPrice = 0;
    var prices = [];
    var amountOfIng = 0;
    if (this.pendingDish == ""){
      for(d in this.menu){
        amountOfIng = 0;
          for(a in this.menu[d].Ingredients) {
            amountOfIng += this.menu[d].Ingredients[a];
          }
            var dishPrice = amountOfIng * this.numberOfGuests;
            prices.push(dishPrice);
        }

      for (var i = 0; i < prices.length; i++) {
          totalPrice += prices[i] << 0;
      }
    }else{
      for(a in this.pendingDish.Ingredients) {
          amountOfIng += this.pendingDish.Ingredients[a].Quantity;
        }
        pendingPrice = amountOfIng * this.numberOfGuests;
        var status = false;

      for(d in this.menu){
        amountOfIng = 0;
          if(this.pendingDish.Category == this.menu[d].Category){
            status = true;
            for(a in this.pendingDish.Ingredients) {
              console.log("tja2");
              amountOfIng += this.pendingDish.Ingredients[a].Quantity;
            }
          }else{
            for(a in this.menu[d].Ingredients) {
              console.log("tja1");
              amountOfIng += this.menu[d].Ingredients[a].Quantity;
            }

          }
            var dishPrice = amountOfIng * this.numberOfGuests;
            prices.push(dishPrice);
            console.log(dishPrice);
        }

      for (var i = 0; i < prices.length; i++) {
          totalPrice += prices[i] << 0;
      }
      console.log("total price: innan " + totalPrice);
      if(status != true){
        console.log("tja");
          totalPrice += pendingPrice; 
        }
        console.log("total price: efter " + totalPrice);
    }
    return totalPrice;

  }
  
  this.getDishPrice = function(dish) {
      var price = 0.00;

      for(ingredient in dish.ingredients){
      price += dish.ingredients[ingredient].price;
    }
    return price;
  }

  //Adds the passed dish to the menu. If the dish of that type already exists on the menu
  //it is removed from the menu and the new one added.
  this.addDishToMenu = function(dish) {
    var addedDish = dish;
    if(addedDish){
      this.menu[addedDish.Category] = addedDish;  
    }
  }

  //Removes dish from menu
  this.removeDishFromMenu = function(id) {
    for(var dish in this.menu){
      if(this.menu[dish].RecipeID == id){
        this.menu[dish] = "";
      }
    }
  }

  this.resetPage = function(){
    this.pg = 1;
    this.rpp = 8;
  }

  //function that returns all dishes of specific type (i.e. "starter", "main dish" or "dessert")
  //you can use the filter argument to filter out the dish by name or ingredient (use for search)
  //if you don't pass any filter all the dishes will be returned

  this.nextPage = function(){
    this.pg = this.pg + 1;
  }

  return this;

});
'use strict';

/* Petición a la API para rellenar los campos de la shopping__cart */

var nameRecipe = document.querySelector('.name__recipe');
var ulArticles = document.querySelector('.articles');
var shippingPrice = document.querySelector('.shipping__price');
var currency = document.querySelector('.currency');
var listHTML = '';


function getItemsRecipe() {
	return fetch('https://raw.githubusercontent.com/Adalab/recipes-data/master/rissoto-setas.json')
		.then(function(response) {
			return response.json();
		})
		.then(function(json) {

			// Como mostrar el nombre de la receta en shopping cart
			var recipe = json.recipe;
			nameRecipe.innerHTML = recipe.name;

			// Como mostrar los Ingredientes de la receta en shopping cart
			var ingredients = recipe.ingredients;


			for (var i = 0; i < ingredients.length; i++) {
				listHTML +=
				'<li class="article">' +
						'<div class="article__block1">' +
							'<input type="checkbox" name="product" id="product' + (i+1) + '"  class="checkbox"/>' +
							'<input type="number" class="quantity" name="quantity" min="0" max="10" value="1"/>' +
							'<div class="group">' +
								'<span class="product">' + ingredients[i].product + '</span>' +
								'<span class="brand">' + (ingredients[i].brand ? ingredients[i].brand : '') + '</span>' +
								'<span class="items">' + parseFloat(ingredients[i].quantity) + '</span>' +
							'</div>' +
						'</div>' +
						'<div class="article__block2">' +
							'<span class="price">' + parseFloat(ingredients[i].price).toPrecision(3) + '</span> ' +
							'<span class="currency">' + recipe.currency + '</span>' +
						'</div>' +
				'</li>';
			}
			ulArticles.innerHTML = listHTML;

			// Como mostrar los gastos de envío
			var shippingCost = recipe["shipping-cost"];
			shippingPrice.innerHTML = parseFloat(shippingCost).toPrecision(3); currency.innerHTML = recipe.currency;

			// Cálculo de elementos de la lista
			document.getElementById('form').addEventListener('click', function () {
				var checkboxes = document.querySelectorAll('.article input[type="checkbox"]:checked');
					updateChecks(checkboxes);
				var subTotal = 0;

				for (var i = 0; i < checkboxes.length; i++) {
					var quantity = checkboxes[i].nextSibling.value;
					console.log('quantity: ',quantity);
					var productValue =  checkboxes[i].parentNode.nextSibling.firstChild.innerHTML;
					productValue = parseFloat(productValue);
					console.log(productValue)
					var cant = quantity * productValue;
					updateSubtotal(cant);
				}

				function updateSubtotal(cant){
					subTotal += cant;
					console.log('subTotal: ',subTotal);
				}




 			});
	});

}

getItemsRecipe();



function updateChecks(e){
	console.log(e);
}




// document.querySelector('.articles').addEventListener('click', function () {
// 	console.log("You finally clicked without jQuery");
//

/* Operaciones en shopping cart */
//
// function seleccionar_todo(){
//    for (var i=0;i<document.f1.elements.length;i++){
// 		 if(document.f1.elements[i].type == "checkbox")	{
// 			  document.f1.elements[i].checked=1;
// 		 }
// 	 }
// }
// function deseleccionar_todo(){
//    for (var i=0;i<document.f1.elements.length;i++){
// 		 if(document.f1.elements[i].type == "checkbox")	{
// 			  document.f1.elements[i].checked=0;
// 		 }
// 	 }
// }



// function getItemsSelected() {
// 	// var itemsSelected = document.querySelectorAll('input[type="checkbox"]');
// 	// console.log("Total items:", itemsSelected);
//
// // 	if (itemsSelected==true) {
// // 		alert('selected');
// // 	}
// // 	alert(' no selected');
// }

// function getItemsSelected(){
//    for (var i=0;i<document.f1.elements.length;i++){
// 		  if(document.f1.elements[i].type == "checkbox") {
// 				document.f1.elements[i].checked=1;
// 			}
// 	 }
//
//
// }
//
//
// getItemsSelected();

'use strict';

/* Petición a la API para rellenar los campos de la shopping__cart */

// fetch('https://raw.githubusercontent.com/Adalab/recipes-data/master/rissoto-setas.json')
//   .then(function(response) {
//     return response.json();
//   })
//   .then(function(json) {
//
// 		// Nombre de la receta
// 		var recipe = json.recipe;
// 		var nameRecipe = document.querySelector('.name__recipe');
// 		nameRecipe.innerHTML = recipe.name;
//
// 		// Ingredientes
// 		var ingredients = recipe.ingredients;
// 		var listHTML = '';
// 		for (var i = 0; i < ingredients.length; i++) {
// 			listHTML +=
// 			'<li class="article">' +
// 				'<label for="product' + (i+1) + '">' +
// 					'<div class="article__block1">' +
// 						'<input type="checkbox" name="product" id="product' + (i+1) + '"  class="checkbox"/>' +
// 						'<input type="number" class="quantity" name="quantity" min="0" max="10" value="1"/>' +
// 						'<div class="group">' +
// 							'<span class="product">' + ingredients[i].product + '</span>' +
// 							'<span class="brand">' + (ingredients[i].brand ? ingredients[i].brand : '') + '</span>' +
// 							'<span class="items">' + ingredients[i].quantity + '</span>' +
// 						'</div>' +
// 					'</div>' +
// 					'<div class="article__block2">' +
// 						'<span class="price">' + ingredients[i].price + ' ' + recipe.currency + '</span>' +
// 					'</div>' +
// 				'</label>' +
// 			'</li>';
// 		}
// 		var ulArticles = document.querySelector('.articles');
// 		ulArticles.innerHTML = listHTML;
//
// 		// Costes de envio
// 		var shippingCost = recipe["shipping-cost"];
// 		console.log(shippingCost);
// 		var shippingPrice = document.querySelector('.shipping__price');
// 		shippingPrice.innerHTML = shippingCost + ' ' + recipe.currency;
//   });



/* Otra forma de hacerlo con Promise.all */
function createPromise() {
	return fetch('https://raw.githubusercontent.com/Adalab/recipes-data/master/rissoto-setas.json')
		.then(function(response) {
			return response.json();
		});
	}

var promises = [createPromise()];
console.log(promises.toString());


Promise.all(promises)
	.then(function(json) {

		//Nombre de la receta
		var recipe = json[0].recipe;
		var nameRecipe = document.querySelector('.name__recipe');
		nameRecipe.innerHTML = recipe.name;

		// Ingredientes
		var ingredients = recipe.ingredients;
		var listHTML = '';
		for (var i = 0; i < ingredients.length; i++) {
			listHTML +=
			'<li class="article">' +
				'<label for="product' + (i+1) + '">' +
					'<div class="article__block1">' +
						'<input type="checkbox" name="product" id="product' + (i+1) + '"  class="checkbox"/>' +
						'<input type="number" class="quantity" name="quantity" min="0" max="10" value="1"/>' +
						'<div class="group">' +
							'<span class="product">' + ingredients[i].product + '</span>' +
							'<span class="brand">' + (ingredients[i].brand ? ingredients[i].brand : '') + '</span>' +
							'<span class="items">' + ingredients[i].quantity + '</span>' +
						'</div>' +
					'</div>' +
					'<div class="article__block2">' +
						'<span class="price">' + ingredients[i].price + ' ' + recipe.currency + '</span>' +
					'</div>' +
				'</label>' +
			'</li>';
		}
		var ulArticles = document.querySelector('.articles');
		ulArticles.innerHTML = listHTML;

		// Costes de envio
		var shippingCost = recipe["shipping-cost"];
		var shippingPrice = document.querySelector('.shipping__price');
		shippingPrice.innerHTML = shippingCost + ' ' + recipe.currency;
  });

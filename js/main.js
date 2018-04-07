'use strict';

var nameRecipe = document.querySelector('.name__recipe');
var ulArticles = document.querySelector('.articles');
var shippingPrice = document.querySelector('.shipping__price');
var currency = document.querySelector('.currency');
var subTotalPrice = document.querySelector('.subtotal__price');
var total = document.querySelector('.total__price');
var button = document.querySelector('.total__button');
var items = document.querySelector('.items__number');
var select = document.querySelector('.select__all');
var unselect = document.querySelector('.unselect__all');
var listHTML = '';
var shippingPriceValue = 0;

/* Menú para seleccionar/deseleccionar todos los items */

function selectAll(){
	 var checkedAll = document.querySelectorAll('.checkbox');
	 for (var i = 0; i < checkedAll.length; i++) {
	 	 checkedAll[i].checked=1;
	 }
	 getValuesSelected();
}

function unselectAll(){
	var uncheckedAll = document.querySelectorAll('.checkbox');
	for (var i = 0; i < uncheckedAll.length; i++) {
		uncheckedAll[i].checked=0;
	}
	 getValuesSelected();
}

select.addEventListener('click', selectAll);
unselect.addEventListener('click', unselectAll);

/* Petición a la API para rellenar los campos de la shopping cart */

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
			shippingPriceValue = parseFloat(shippingCost).toPrecision(3);
			shippingPrice.innerHTML = shippingPriceValue;
			currency.innerHTML = recipe.currency;

			// Para obtener los valores de los items de la shopping cart y poder operar con ellos //
			document.getElementById('form').addEventListener('click', getValuesSelected);
		}
	);
}
getItemsRecipe();

function getValuesSelected() {
	var checkboxes = document.querySelectorAll('.article input[type="checkbox"]:checked');
	var subTotal = 0;
	var totalItems = 0;

// Reiniciamos valores cuando el array está vacío (No hay items seleccionados)
	if (checkboxes.length < 1) {
	 	total.innerHTML = 0.00;
		button.innerHTML = 0.00;
		items.innerHTML = 0;
		subTotalPrice.innerHTML = 0.00;
	}

// Obtenemos los valores de cantidad y el número total de items
	for (var i = 0; i < checkboxes.length; i++) {
		var quantity = checkboxes[i].nextSibling.value;
		var productValue =  checkboxes[i].parentNode.nextSibling.firstChild.innerHTML;
		var cant = parseInt(quantity) * parseFloat(productValue);
		totalItems = parseInt(totalItems) + parseInt(quantity);
		items.innerHTML = totalItems;

		updateSubtotal(cant);
	}

	// Calculamos el subtotal y el total

	function updateSubtotal(cant){
		subTotal = parseFloat(subTotal) + cant ;
		subTotalPrice.innerHTML = subTotal.toFixed(2);
		var totalValue = parseFloat(subTotal) + parseFloat(shippingPriceValue);
		total.innerHTML = totalValue.toFixed(2);
		button.innerHTML = totalValue.toFixed(2);
	}
}

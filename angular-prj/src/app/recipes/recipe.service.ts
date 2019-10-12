import { Injectable } from '@angular/core';
import {Recipe} from './recipe.model'
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';


@Injectable()
export class RecipeService{
  recipeChanged = new Subject<Recipe[]>();
    
    // private recipes: Recipe[] = [
    //     new Recipe('Meatballs', 
    //     'Tasty meatballs with peppers', 
    //     'https://0201.nccdn.net/1_2/000/000/107/02b/Prepared-dish-meatballs-with-peppers_1.png',
    //     [
    //         new Ingredient('Meat',1),
    //         new Ingredient('Peppers',20),

    //     ]),
    //     new Recipe('Pizza', 
    //     'Tasty cheese and jalapeno','http://www.famouspizzaexpress.com/images/pizza35.jpg', 
    //     [
    //         new Ingredient('Dough',2),
    //         new Ingredient('Cheese',2),
    //         new Ingredient('Tomotoes',1),
    //         new Ingredient('Jalapenos',1),
    //     ])
    //   ];

      private recipes: Recipe[] = [];

      constructor(private slService: ShoppingListService){  }

      setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipeChanged.next(this.recipes.slice());
      }

      getRecipes(){
          return this.recipes.slice();
      }

      getRecipe(index: number) {
        return this.recipes[index];
      }

      addIngredientsToShoppingList(ingredients: Ingredient[]){
        this.slService.addIngredients(ingredients);
      }

      addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipeChanged.next(this.recipes.slice());
      }

      updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipeChanged.next(this.recipes.slice());
      }

      deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipeChanged.next(this.recipes.slice());
      }
}
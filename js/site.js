$( () => {

    // Nav

    document.addEventListener("click", () => {
        const checkbox = document.querySelector("#check");
        const burgerMenu = document.querySelector(".burger-menu");
      
        checkbox.addEventListener("change", () => {
            if (checkbox.checked) {
                burgerMenu.style.display = "flex"; 
                $('.top').css('background', 'white');
                $('.bottom').css('background', 'white');
                requestAnimationFrame(() => {
                    burgerMenu.classList.add("open"); 
                });
            } else {
                $('.top').removeAttr('style');
                $('.bottom').removeAttr('style');
                burgerMenu.classList.remove("open");
                burgerMenu.addEventListener("transitionend",() => {
                        if (!burgerMenu.classList.contains("open")) {
                            burgerMenu.style.display = "none"; 
                        }
                    },
                );
            }
        });
      });



    // API

    const API_ENDPOINT = `https://www.thecocktaildb.com/api/json/v1/1/random.php`;
    let saveCoctails = {};
    let coctails = [];
    const uniqueCocktails = new Set(); 

    const catchCoctails = async () => {

        try {



            while (uniqueCocktails.size < 4) {
                let response = await fetch(`${API_ENDPOINT}`);
                let coctailsData = await response.json();

                if (coctailsData.drinks && coctailsData.drinks.length > 0) {
                    const drink = coctailsData.drinks[0];
                     
                    const coctailIngredient = {
                        ingredient1: coctailsData.drinks[0].strIngredient1,
                        ingredient2: coctailsData.drinks[0].strIngredient2,
                        ingredient3: coctailsData.drinks[0].strIngredient3,
                        ingredient4: coctailsData.drinks[0].strIngredient4,
                        ingredient5: coctailsData.drinks[0].strIngredient5,
                        ingredient6: coctailsData.drinks[0].strIngredient6,
                        ingredient7: coctailsData.drinks[0].strIngredient7,
                        ingredient8: coctailsData.drinks[0].strIngredient8,
                        ingredient9: coctailsData.drinks[0].strIngredient9,
                        ingredient10: coctailsData.drinks[0].strIngredient10,
                        ingredient11: coctailsData.drinks[0].strIngredient11,
                        ingredient12: coctailsData.drinks[0].strIngredient12,
                        ingredient13: coctailsData.drinks[0].strIngredient13,
                        ingredient14: coctailsData.drinks[0].strIngredient14,
                        ingredient15: coctailsData.drinks[0].strIngredient15,
                      };

                      const ingredients = [];
                        for (let i = 1; i <= 15; i++) {
                            const ingredient = coctailIngredient[`ingredient${i}`];
                            if (ingredient) {
                                ingredients.push(ingredient);
                                
                            }
                        }


                    if (!uniqueCocktails.has(drink.idDrink)) {
                        uniqueCocktails.add(drink.idDrink);

                        coctails.push(
                            {
                                img: drink.strDrinkThumb,
                                name: drink.strDrink,
                                ingredient: ingredients

                            }
                        )

                        const cocktailHTML = `
                        <div class="cocktail-item">
                            <div class="coctail-img">
                                <img src="${drink.strDrinkThumb}" alt="${drink.strDrink}" width="100%">
                            </div>
                            <div class="coctail-name">${drink.strDrink}</div>
                            <div class="coctail-ingredients-title">Ingredients</div>
                            <div class="coctail-ingredients">
                                ${ingredients.map(ingredientsIn => `<h4>${ingredientsIn}</h4>`).join('')}
                            </div>
                            <button class="coctails__save-button">Save</button>
                        </div>
                         `;
                        
                         
                        $('.coctails-items').append(cocktailHTML);
                         
                        }
                        
                    }
                    
    
            }


            $('.coctails__save-button').each((index, element) => $(element).on("click", () => {
                saveCoctails = coctails[index];
                displaySaveCoctail()
            }))

          
        
    
            $('.main-coctails').show();
            $('.main__button-check').remove();

            
        } catch(error) {
            console.log(error);
            
        }
    }




    const displaySaveCoctail = () => {

        $('.display__cocktails-saved').fadeIn(300).delay(1000).fadeOut(300)
        
        localStorage.setItem("save-cocktails", JSON.stringify(saveCoctails));
        
    }


    const retrieveCocktail = () => {
        const savedCocktail = JSON.parse(localStorage.getItem("save-cocktails")); 

        if (savedCocktail) {
            saveCoctails = savedCocktail; 


            $('.save-cocktails').append(`
                <div class="save__cocktails-basket">
                <button class="clear-basket-button">Close</button>
                    <div class="cocktail-item">
                        <div class="coctail-img">
                            <img src="${savedCocktail.img}" alt="${savedCocktail.name}" width="100%">
                        </div>
                        <div class="coctail-name">${savedCocktail.name}</div>
                        <div class="coctail-ingredients-title">Ingredients</div>
                        <div class="coctail-ingredients">
                            ${savedCocktail.ingredient.map(ing => `<h4>${ing}</h4>`).join('')}
                        </div>
                    </div>
                </div>
            `);

            $('.clear-basket-button').on("click", () => {
                $('.save__cocktails-basket').remove();
            });
            
        }

    };





    $('.header-basket-button').on("click", retrieveCocktail)
    $('.burger-basket').on("click", () => {
        retrieveCocktail()
    })
    
    
    $('.main__button-check').on("click", catchCoctails);
    
})


  
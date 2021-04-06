
    /* Carrito */

        function shoppingCart() {

            // Boton "Agregar al carrito" y Productos
                const addToShoppingCart = document.querySelectorAll( '.add-to-cart-btn' ); // Botón "Agregar al carrito"
                

                addToShoppingCart.forEach( ( addToCartButtons ) => {
                    addToCartButtons.addEventListener( 'click', addToCartBtnClick )
                });

                function addToCartBtnClick( event ) {
                    let btn = event.target;
                    const plants = btn.closest( '.plant' );

                    // Productos
                        const plantImg = plants.querySelector( '.plant-img' ).src;                        
                        const plantTitle = plants.querySelector( '.plant-title' ).textContent;
                        const plantPrice = plants.querySelector( '.plant-price' ).textContent;
                        
                
                    modalCart( plantImg, plantTitle, plantPrice );

                    cartCounterUpdate();
                    
                };    
               
                
            // Modal cart
                const showCart = document.querySelector( '.show-cart' );
                    
                function modalCart( plantImg, plantTitle, plantPrice ) {

                    // Que no se duplique el mismo producto en el Carrito
                        let plantsTitleRepeat = showCart.getElementsByClassName( 'shoppingCartPlantTitle' );
                            
                        for( let i = 0; i < plantsTitleRepeat.length; i++ ) {
                            if( plantsTitleRepeat[i].innerHTML === plantTitle ) {
                                let plantsTitleQuantity = plantsTitleRepeat[i].parentElement.parentElement.querySelector( '.shoppingCartPlantQuantity' );
                                plantsTitleQuantity.value++;
                                cartTotalPrice();
                            
                                return;
                            }
                        };

                    const shoppingCartDiv = document.createElement( 'div' );
                    const cartModal =
                        ` 
                            <div class="row shoppingCartPlant mt-3 text-center">
                                <div class="col-3">
                                    <img src=${plantImg} class="imagenesModal"/>
                                    <h6 class="mt-2 shoppingCartPlantTitle">${plantTitle}</h6>
                                </div> 
                                <div class="col-3">
                                    <p class="plant-price shoppingCartPlantPrice">${plantPrice}</p>
                                </div>
                                <div class="col-3">
                                    <input class="text-center shoppingCartPlantQuantity inputCuenta" type="number" value="1">
                                </div>
                                <div class="col-3">
                                    <button class="btn btn-danger" id="remove-plant-btn" data-name="${plantTitle}">
                                        x
                                    </button>
                                </div>
                            </div>
                        `
                                            
                    shoppingCartDiv.innerHTML = cartModal;
                    showCart.append( shoppingCartDiv );

                    // Botón Remove plant
                        const removeButton = shoppingCartDiv.querySelector( '#remove-plant-btn' );

                        removeButton.addEventListener( 'click', removePlantFromCart );

                    // Input Quantity
                        const inputCartQuantity = shoppingCartDiv.querySelector( '.shoppingCartPlantQuantity' );
                        
                        inputCartQuantity.addEventListener( 'change', cartQuantityChange );
                    
                        
                    cartTotalPrice();
                };

            // Cart Counter
                function cartCounterUpdate() {
                    const cartPlantsLength = document.querySelectorAll( '.shoppingCartPlant' );
                    const cartCounter = document.querySelector( '#cart-counter' );
                    cartCounter.innerHTML = cartPlantsLength.length;
                    cartTotalPrice();
                };  


            // Precio total del carrito
                function cartTotalPrice() {
                    var totalCount = 0;
                    const totalPrice = document.querySelector( '.total-price' );
                    const shoppingCartPlants = document.querySelectorAll( '.shoppingCartPlant' );
                    
                    shoppingCartPlants.forEach( ( shoppingCartPlant ) => {

                        const plantCartPriceElement = shoppingCartPlant.querySelector( '.shoppingCartPlantPrice' );
                        const plantCartPrice = Number( plantCartPriceElement.textContent.replace( '$', '' ) );

                        const plantCartQuantityElement = shoppingCartPlant.querySelector( '.shoppingCartPlantQuantity' );
                        const plantCartQuantity = Number( plantCartQuantityElement.value );

                        totalCount += plantCartPrice * plantCartQuantity;
                    });

                    totalPrice.innerHTML = `$${totalCount.toFixed(2)}`;
                };

            // Eliminar plantas del carrito
                function removePlantFromCart(event) {
                    const removeBtnClicked = event.target;
                    removeBtnClicked.closest('.shoppingCartPlant').remove();
                    cartTotalPrice();
                    cartCounterUpdate();
                };
                
            // Cantidad del carrito (Input)
                function cartQuantityChange(event) {
                    const inputCartChange = event.target;
                    inputCartChange.value <= 0 ? (inputCartChange.value = 1) : null;
                    cartTotalPrice();
                    cartCounterUpdate();
                };

              

        };
        
        shoppingCart();
        
        // Corregir el cartCounter cuando es el mismo producto, porque no sigue sumando en el cartCounter (solo en el modal)
                
                
       
            
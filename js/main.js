// Счетчик количества товаров

window.addEventListener("click", function(evnent) {

    if (evnent.target.className == "card__button-two") {

        const cardButton = evnent.target.closest(".card__button")
        const counter = cardButton.querySelector('[class="card__button-counter"]')
        counter.innerText = ++counter.innerText

    } else if (evnent.target.className == "card__button-one") {

        const cardButton = evnent.target.closest(".card__button")
        const counter = cardButton.querySelector('[class="card__button-counter"]')

        if (counter.innerText > "1") {

            counter.innerText = --counter.innerText;
        }
    }

    if (evnent.target.className == "backet__button-two") {

        const cardButton = evnent.target.closest(".backet__card-button")
        const counter = cardButton.querySelector('[class="backet__button-counter"]')
        counter.innerText = ++counter.innerText

    } else if (evnent.target.className == "backet__button-one") {

        const cardButton = evnent.target.closest(".backet__card-button")
        const counter = cardButton.querySelector('[class="backet__button-counter"]')

        if (counter.innerText > "0") {

            counter.innerText = --counter.innerText;
        }

        if (evnent.target.closest(".backet") && parseInt(counter.innerText) == 0) {
            
            evnent.target.closest(".backet__card-privew").remove()

            toggleBacketStatus()
        }
    }

    if (evnent.target.closest(".card__button")) {
        backetPrice()
    }

    if (evnent.target.closest(".backet__card-button")) {
        backetPrice()
    }
})

// Корзина товаров

window.addEventListener("click", function(evnent) {

    const basket = document.querySelector(".backet")

    if (evnent.target.className == "card__backet") {
        
        const card = evnent.target.closest(".card")
        const cardInfo = {
            id: card.id,
            img: card.querySelector(".card__img").getAttribute("src"),
            title: card.querySelector(".card__title").innerText,
            price: card.querySelector(".card__price").innerText,
            counter: card.querySelector(".card__button-counter").innerText,
        }

        const idCart = basket.querySelector(`[id="${cardInfo.id}"]`)
        
        if (idCart) {
            const counterElement = idCart.querySelector('[class="backet__button-counter"]')
            counterElement.innerText = parseInt(counterElement.innerText) + parseInt(cardInfo.counter)
        } else {
            
            const cartPrivew = `<div class="backet__card-privew" id="${cardInfo.id}">
                                    <img src="${cardInfo.img}" alt="Чизбургер" class="backet__card-img">
                                    <h2 class="backet__card-title">${cardInfo.title}</h2>
                                    <p class="backet__card-price">${cardInfo.price}</p>
                                    <div class="backet__card-button">
                                        <button class="backet__button-one">-</button>
                                        <p class="backet__button-counter">${cardInfo.counter}</p>
                                        <button class="backet__button-two">+</button>
                                    </div>
                                </div>`
    
            basket.insertAdjacentHTML("beforeend", cartPrivew)
        }

        card.querySelector('[class="card__button-counter"]').innerText = "1"

        toggleBacketStatus()
        backetPrice()
    }
})

// Скрытие надписи "Корзина пуста"

function toggleBacketStatus() {
    const backet = document.querySelector(".backet")
    const basketVoid = document.querySelector(".backet__void")

    if (backet.children.length > 0) {
        basketVoid.classList.add("none")
    } else {
        basketVoid.classList.remove("none")
    }
}

// Подсчет стоимости товаров

function backetPrice() {

    const cartPrivew = document.querySelectorAll(".backet__card-privew")
    const allPriceView = document.querySelector(".backet__price-span")
    let allSummaPrice = 0

    cartPrivew.forEach( function(item) {

        const itemPrice = item.querySelector(".backet__card-price")
        const itemCounter = item.querySelector(".backet__button-counter")
        const summaPrice = parseInt(itemPrice.innerText) * parseInt(itemCounter.innerText)
        allSummaPrice += summaPrice
    })

    allPriceView.innerText = allSummaPrice
}

// JSON товары

const productJSON = document.querySelector(".cards")

productJson()

async function productJson() {

    const response = await fetch("./js/products.json") 
    const productsArray = await response.json()

    renderProducts(productsArray)
}

function renderProducts(productsArray) {

    productsArray.forEach(function(item) {
        const productHTML = `<div class="card" id="${item.id}">
                                <img src="${item.img}" alt="Чизбургер" class="card__img">
                                <h2 class="card__title">${item.title}</h2>
                                <p class="card__price">${item.price}р</p>
                                <div class="card__button">
                                    <button class="card__button-one">-</button>
                                    <p class="card__button-counter">1</p>
                                    <button class="card__button-two">+</button>
                                </div>
                                <button class="card__backet">ДОБАВИТЬ В КОРЗИНУ</button>
                            </div>`
        productJSON.insertAdjacentHTML("beforeend", productHTML)
    })
}

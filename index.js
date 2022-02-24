//DOM
const card = document.getElementById('card')
const searchBtn = document.getElementById('search')





fetch('recipes.json').then(response => {
    return response.json();
  }).then(data => {
    console.log(data);
    

     

    displayRecipes(data)




    searchBtn.addEventListener('keyup', (key) =>{
      const value = key.target.value.toLowerCase()
    
      if (value.length>= 3) {
        const filterRecipe = data.filter((data) =>{
          return (
            data.name.toLowerCase().includes(value) ||
            data.ingredients.some(i => i.ingredient.toLowerCase().includes(value))  ||
            data.ustensils.some(u => u.toLowerCase().includes(value))  ||
            data.appliance.toLowerCase().includes(value)
          )
        })
        card.innerHTML = ""
        displayRecipes(filterRecipe)

      } else {
        card.innerHTML = ""
        displayRecipes(data)
      }
    
      console.log(value);
    })



    let arrayIngr = []
    let arrayApp = []
    let arrayUst = []

    

    data.forEach(element =>{
      element.ingredients.forEach(element =>{
        arrayIngr.push(element.ingredient.toLowerCase())
      })
    })

    data.forEach(element =>{
      arrayApp.push(element.appliance)
    })

    data.forEach(element =>{
      element.ustensils.forEach(element =>{
        arrayUst.push(element)
      })
    })

    let x = [...new Set(arrayIngr)]
    let y = [...new Set(arrayApp)]
    let z = [...new Set(arrayUst)]
    console.log(x, y, z);


    

  }).catch(error => {
    console.error(error)
});



function displayRecipes(data) {
  data.forEach(element => {
    const divContainer = document.createElement('div')
    divContainer.setAttribute('class', 'box')
    const divImg = document.createElement('div')
    divImg.setAttribute('class', 'Img')        
    const divInfo = document.createElement('div')
    divInfo.setAttribute('class', 'Info')        

    const divInfoUp = document.createElement('div')
    divInfoUp.setAttribute('class', 'infoUp')
    const title = document.createElement('p')    
    title.innerHTML = element.name
    const time = document.createElement('p')
    time.innerHTML = '<i class="far fa-regular fa-clock"></i>&nbsp;' + element.time + '&nbsp;min'
    divInfoUp.appendChild(title)
    divInfoUp.appendChild(time)

    const divInfoDown = document.createElement('div')
    divInfoDown.setAttribute('class', 'infoDown')
    const divIngr = document.createElement('div')
    divIngr.setAttribute('class', 'ingr')
    const divRecipe = document.createElement('div')
    divRecipe.setAttribute('class', 'recipe')

    card.appendChild(divContainer)
    divContainer.appendChild(divImg)
    divContainer.appendChild(divInfo)
    divInfo.appendChild(divInfoUp)
    divInfo.appendChild(divInfoDown)
    divInfoDown.appendChild(divIngr)

    

    element.ingredients.forEach(element =>{
        const ingredient = document.createElement('p')
        if (element.unit) {
          ingredient.innerHTML = '<strong>' + element.ingredient + '</strong>'+ ': ' + element.quantity + ' ' + element.unit
        } else if (element.quantity) {
          ingredient.innerHTML = element.ingredient + ': ' + element.quantity
        } else {
          ingredient.innerHTML = element.ingredient
        }
        divIngr.appendChild(ingredient)
    })

    const recipe = document.createElement('p')
    recipe.innerHTML = element.description
    divInfoDown.appendChild(divRecipe)
    divRecipe.appendChild(recipe)
});
}



var arr = [1,2,3,4,1,2,3,1,2,3]

var uniqueArr = [...new Set(arr)]

console.log(uniqueArr)
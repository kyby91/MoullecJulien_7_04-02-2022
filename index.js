//DOM
const card = document.getElementById('card')
const searchBtn = document.getElementById('search')
const searchIngr = document.getElementById('ingr')
const box = document.getElementById('box-ingr')
const arrowUp = document.getElementsByClassName('arrowUp')
const arrowDown = document.getElementsByClassName('arrowDown')





fetch('recipes.json').then(response => {
    return response.json();
  }).then(data => {

    displayRecipes(data)

    searchBar(data)

    // let test = "tota"
    // console.log(test.substr(0,3) + '...')

    let arrayIngr = []
    let arrayApp = []
    let arrayUst = []


    data.forEach(element =>{
      element.ingredients.forEach(element =>{
        arrayIngr.push(element.ingredient.toLowerCase())
      })
      element.ustensils.forEach(element =>{
        arrayUst.push(element)
      })
      arrayApp.push(element.appliance)
    })

    let x = [...new Set(arrayIngr)]
    let y = [...new Set(arrayApp)]
    let z = [...new Set(arrayUst)]


    function displayIngr (tab , boxTagList, tagType) {
     
      tab.forEach(element =>{
        const li = document.createElement('li')
        li.innerHTML = element
        
        boxTagList.appendChild(li)

        li.addEventListener('click', e=>{
          console.log('ok');
          console.log(tagType);
          console.log(e.target.innerHTML);
          value = e.target.innerHTML
          const badge = document.getElementById('badge')
          let div = document.createElement('div')
          div.setAttribute('class', 'badge-' + tagType)
          let p = document.createElement('p')
          p.innerHTML = value
          let img = document.createElement('img')
          img.setAttribute('src', 'Quit.png')
          console.log(div);

          badge.appendChild(div)
          div.appendChild(p)
          div.appendChild(img)
        })

      })
    }

    function setTag(tab , tagType){
      let searchInput = document.getElementById(tagType)
      let boxTagList = document.getElementById('box-' + tagType)
      console.log(searchInput, boxTagList)

      searchInput.addEventListener('click', ()=> {
        displayIngr(tab, boxTagList, tagType)
        boxTagList.style.display = 'flex'
      })
    }


    //fnc createTagHTML(tagName = "Coco" , tagType = "ingredient")
    function createTagHTML() {
    }



    // searchInput.addEventListener('click', ()=>{


    
    // searchIngr.addEventListener('click', ()=>{
    //   box.style.display = 'flex'
    //   // arrowDown.style.display = 'none'
    //   // arrowUp.style.display = 'block'
    //   // box.querySelectorAll(".arrowDown").style.display = 'none'
    //   displayIngr(x)
    //   // displayTagHTML(y , 'ingredient')
    // //   displayTagHTML(z , 'applience')
    // })


    

    setTag(x, "ingr")
    setTag(y, "apli")
    setTag(z, "ust")

    searchIngr.addEventListener('keyup', (key) =>{
      const value = key.target.value.toLowerCase()
      if (value.length>= 3) {
        const filterRecipe = x.filter((x) =>{
          return (
            x.includes(value) 
          )
        })
        box.innerHTML = ""
        displayIngr(filterRecipe) 
      } else {
        box.innerHTML = ""
        displayIngr(x)
      }    
      console.log(value);
    })

    // box.forEach(element =>{
    //   element.addEventListener('click', e=>{
    //     console.log('ok');
    //   })
    // })

    // console.log(box);
   

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
          ingredient.innerHTML = '<strong>' + element.ingredient + '</strong>' + ': ' + element.quantity
        } else {
          ingredient.innerHTML = '<strong>' + element.ingredient + '</strong>'
        }
        divIngr.appendChild(ingredient)
    })

    const recipe = document.createElement('p')
    recipe.innerHTML = element.description
    divInfoDown.appendChild(divRecipe)
    divRecipe.appendChild(recipe)
});
}



function searchBar(data) {
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
}
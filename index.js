//DOM
const card = document.getElementById('card')
const searchBtn = document.getElementById('search')
const searchIngr = document.getElementById('ingr')
const box = document.getElementById('box-ingr')
const arrowUp = document.getElementsByClassName('arrowUp')
const arrowDown = document.getElementsByClassName('arrowDown')
const badge = document.getElementById('badge')





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
        arrayIngr.push(element.ingredient)
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
          // console.log(tagType);
          // console.log(e.target.innerHTML);
          creatTag(e.target.innerHTML, tagType)
          
          filterTags()

          // console.log(closeBadge);
        })

      })
    }

    function creatTag(nameTag, tagType){
      let divTag = document.createElement('div')
      divTag.setAttribute('class', 'badge-' + tagType)

      let p = document.createElement('p')
      p.innerHTML = nameTag

      let img = document.createElement('img')
      img.setAttribute('src', 'Quit.png')

      console.log(divTag);
      divTag.appendChild(p)
      divTag.appendChild(img)

      img.addEventListener('click', e => {
        console.log('ok',e.target.parentNode.remove())
        filterTags()
      })

      badge.appendChild(divTag)
    }

    function setTag(tab , tagType){
      let searchInput = document.getElementById(tagType)
      let boxTagList = document.getElementById('box-' + tagType)

      searchInput.addEventListener('click', ()=> {
        boxTagList.innerHTML = ""
        displayIngr(tab, boxTagList, tagType)
        boxTagList.style.display = 'flex'
        // document.body.addEventListener('click', closeBox, true);
      })

      // function closeBox(){
      //   boxTagList.style.display = 'none'
      // }

      //Lancer fonction de recharche
      searchInput.addEventListener('keyup', (key) =>{
        const value = key.target.value.toLowerCase()
        if (value.length>= 3) {
          const filterRecipe = tab.filter((tab) =>{
            return (
              tab.toLowerCase().includes(value) 
            )
          })
          boxTagList.innerHTML = ""
          console.log(filterRecipe);
          displayIngr(filterRecipe, boxTagList, tagType)
        } else {
          boxTagList.innerHTML = ""
          console.log(tab);
          displayIngr(tab, boxTagList, tagType)
        }    
        console.log(value);
      })
  
    }



    

    setTag(x, "ingr")
    setTag(y, "apli")
    setTag(z, "ust")

   
    function filterTags() {
      let tags = badge.querySelectorAll('div')
      card.innerHTML = ""
      
      // console.log(value);

      for (let i = 0; i < tags.length; i++) {
        const element = tags[i].innerText.toLowerCase();
        const filterRecipe = data.filter((data) =>{
          return (
            data.name.toLowerCase().includes(element) ||
            data.ingredients.some(i => i.ingredient.toLowerCase().includes(element))  ||
            data.ustensils.some(u => u.toLowerCase().includes(element))  ||
            data.appliance.toLowerCase().includes(element)
          )
        })
        displayRecipes(filterRecipe)
      }

      // if (tags.length>0) {
      //   tags.forEach(element =>{

      //   //FITRER
      //   const value = element.innerText.toLowerCase()
      //   const filterRecipe = data.filter((data) =>{
      //     return (
      //       data.name.toLowerCase().includes(value) ||
      //       data.ingredients.some(i => i.ingredient.toLowerCase().includes(value))  ||
      //       data.ustensils.some(u => u.toLowerCase().includes(value))  ||
      //       data.appliance.toLowerCase().includes(value)
      //     )
      //   })
      //   displayRecipes(filterRecipe)
      // })
      // } else {
      //   card.innerHTML = ""
      //   displayRecipes(data)
      // }
      
    }

    // let closeBadge = badge.querySelectorAll('img')
    // console.log(closeBadge);
  
   

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
    if (element.name.length >= 25) {
      title.innerHTML = element.name.substr(0,25) + '...'
    } else {
      title.innerHTML = element.name
    }
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
          if (element.unit == 'grammes') {
            ingredient.innerHTML = '<strong>' + element.ingredient + '</strong>'+ ': ' + element.quantity + ' g'
          } else {
            ingredient.innerHTML = '<strong>' + element.ingredient + '</strong>'+ ': ' + element.quantity + ' ' + element.unit
          }
          
        } else if (element.quantity) {
          ingredient.innerHTML = '<strong>' + element.ingredient + '</strong>' + ': ' + element.quantity
        } else {
          ingredient.innerHTML = '<strong>' + element.ingredient + '</strong>'
        }
        divIngr.appendChild(ingredient)
    })

    const recipe = document.createElement('p')
    recipe.innerHTML = element.description.substr(0,160) + '...'
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


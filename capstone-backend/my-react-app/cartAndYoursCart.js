let data = []
let arrays = []
const priceLess = document.querySelector('#price-less')
const priceMore = document.querySelector('#price-more')
const selectElement = document.getElementById('cars');
fetch('https://fakestoreapi.com/products/')
            .then(res=>res.json())
            .then(json=>{
                data = json
                console.log(data)
                renderProducts(data)
                })
// initialising variables


const searchInput = document.querySelector('#search-input')
const productInfo = document.querySelector('.productInfo')

import  {algoliasearch} from "algoliasearch";
import { Cursor } from "mongoose";
// import { SplitVendorChunkCache } from "vite"
// import { search } from "../../backend/routes/user"
const client = algoliasearch('URB1CCI4Z4','c447e0e8ddee009fa3d9d0fed63aee3e');
const indexName = 'budee'
const record = {objectID: "object-1", name: "test record"};
// function 


async function handleEvent(){
    let searchData = searchInput.value

    if((searchData.trim().length > 0 )){
    const { taskID } = await client.saveObject({
    indexName,
    body: record,
    });


    await client.waitForTask({
    indexName,
    taskID,
    });


    const { results } = await client.search({
    requests: [
        {
        indexName,
        query: searchData,
        },
    ],
    });
    renderProducts(results[0].hits)
    console.log(results[0].hits)


    }else{
        // removeRemainingProduct();
    }
    }

function removeRemainingProduct(){
    document.querySelectorAll('.product').forEach(prodd=>{
        prodd.remove()
    })
    // renderProducts(data)
}
searchInput.addEventListener('keyup',handleEvent)



// this is render products
function renderProducts(product){
    document.querySelectorAll(".product").forEach(prod=>{
        prod.remove()
    })
    product.forEach(items=>{
         renderSingleProduct(items)
        // console.log(items)
    })
}


// this is rendersingleproducts
function renderSingleProduct(item){

    let mainDiv = document.createElement('div')
    mainDiv.className = "product"
    let img = document.createElement('img')
    img.className = "img-render"
    let hTag = document.createElement('h4')
    let pTag = document.createElement('p')
    pTag.className = 'price'
    let button = document.createElement('button')
    button.className = 'add-to-cart'
    img.src = item.image
    hTag.innerText = item.title
    pTag.innerText = '$'+item.price
    button.innerHTML = "Add to cart"

    mainDiv.append(img, hTag, pTag, button)

    productInfo.append(mainDiv)  
    addToTheCart(button)  
    }
    
    async function addToTheCart(button){
        
        button.addEventListener('click',(e)=>{
            
            addItemsToTable(e.target)
        })   
    }
    let array = []
    async function addItemsToTable(element){

        console.log(element.previousSibling.innerText)
        console.log(element.previousSibling.previousSibling.innerText)
        console.log(element.previousSibling.previousSibling.previousSibling.src)
        let cartsToLocalStorage = {
            title: element.previousSibling.innerText,
            price: element.previousSibling.previousSibling.innerText,
            img: element.previousSibling.previousSibling.previousSibling.src
        }
        array.push(cartsToLocalStorage)
        localStorage.setItem('cart',JSON.stringify(array))
    }

    
    window.onload=function(){
        let onLoadCart = JSON.parse(localStorage.getItem('cart'))
        if(JSON.parse(localStorage.getItem('cart'))){
            console.log(JSON.parse(localStorage.getItem('cart')))
            onLoadCart.forEach(cart=>{
                array.push(cart)
            })
            console.log(array)
            
        }
    }
    
    selectElement.addEventListener('change', function() {
        removeRemainingProduct()
        const selectedValue = selectElement.value;
        if(selectedValue === "Price"){
            let dataFrom =  data
        dataFrom.forEach(datas=>{
            arrays.push(datas.price)
        })

        let sortedArray = arrays.sort((a,b)=> a-b)

        sortedArray.forEach(sorted=>{

            data.forEach(data1=>{
                if(data1.price === sorted){
                    
                    renderSingleProduct(data1)
                    console.log(data1)
                }
            })
           
        })
        }else if(selectedValue === 'empty'){
            renderProducts(data)
            console.log('no option is selected')
        }else if(selectedValue === 'AtoZ'){
            removeRemainingProduct()
            let titleArray = []
            console.log("alphabetical is selected")
            data.forEach(title=>{
                
                titleArray.push(title.title)
            })
            let sortedTitleArray = titleArray.sort()
            sortedTitleArray.forEach(sorted =>{
                data.forEach(titles=>{
                    if(titles.title === sorted){
                        renderSingleProduct(titles)
                        console.log(titles)
                    }
                })
            })
        }else if(selectedValue === 'ZtoA'){
            removeRemainingProduct()
            let titleArray1 = []
            console.log("alphabetical is selected")
            data.forEach(title=>{
                
                titleArray1.push(title.title)
            })
            let sortedTitleArray = titleArray1.sort((a, b) => b.localeCompare(a));
            sortedTitleArray.forEach(sorted =>{
                data.forEach(titles=>{
                    if(titles.title === sorted){
                        renderSingleProduct(titles)
                        console.log(titles)
                    }
                })
            })
        }else if(selectedValue === 'rating'){
            removeRemainingProduct()
            let titleArray2 =[]
            data.forEach(rating=>{
                console.log(rating.rating.rate)
                titleArray2.push(rating.rating.rate)
            })
            let sortedTitleArray2 = titleArray2.sort((a,b)=>a-b)
            console.log(sortedTitleArray2)
            sortedTitleArray2.forEach(sortedRating=>{
                data.forEach(rating1=>{
                    if(rating1.rating.rate === sortedRating){
                        console.log(rating1)
                        renderSingleProduct(rating1)
                    }
                })
            })
        }

    });

    //  function filterPrice(data){
        
    // }
    


    


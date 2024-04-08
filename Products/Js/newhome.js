// Modal Functionality
let modalTitle = document.getElementById('modalTitle')
let modalAddButton = document.getElementById('modalAddButton')
let modalContainer = document.getElementById('addmodalContainer')
let tableBody = document.getElementById('tableBody')
let flag = false
let indexValue = null

function showModal(title,button){
    modalContainer.style.display = 'block'
    modalTitle.innerHTML = title
    modalAddButton.innerHTML = button
}

function closeModal(){
    modalContainer.style.display = 'none'
}

// Add Products funtionality
let emptyDataArray = []

let savedProducts = JSON.parse(localStorage.getItem('AddedProducts')) || [];
// console.log(savedProducts)
displayProducts();


// getting Inputs Value
let addProductID = document.getElementById('addProductID')
let addProductTitle = document.getElementById('addProductTitle')
let addBuyingPrice = document.getElementById('buyingPrice')
let addProductType = document.getElementById('productType')
let addProductName = document.getElementById('addProductName')
let addProductVendor = document.getElementById('addProductVendor')
let addSalePrice = document.getElementById('salePrice')

function productsAdded() {

    showModal('Add Product','Add');

    if(flag) {
        if(addProductID.value && addProductName.value && addProductTitle.value && addProductVendor.value && addBuyingPrice.value && addSalePrice.value && addProductType.value) {
            let copyArrayData = [...emptyDataArray]
            copyArrayData[indexValue].productID = addProductID.value;
            copyArrayData[indexValue].productName = addProductName.value;
            copy[indexValue].productTitle = addProductTitle.value;
            copyArrayData[indexValue].productVendor = addProductVendor.value;
            copyArrayData[indexValue].buyingPrice = buyingPrice.value;
            copyArrayData[indexValue].salePrice = salePrice.value;
            copyArrayData[indexValue].productType = productType.value;
          localStorage.setItem("addedProducts" , JSON.stringify(copyArrayData));
          flag = false
          indexValue = null
          } else {
            alert('Cannot update Empty input field')
          }
    } else {
        let allProductsValue = {
            productID:addProductID.value,
            productName:addProductName.value,
            productTitle:addProductTitle.value,
            productBuyingPrice:addBuyingPrice.value,
            productSalePrice:addSalePrice.value,
            productVendor:addProductVendor.value,
            productType:addProductType.value,
        }

        if(addProductID.value && addProductName.value && addProductTitle.value && addProductVendor.value && addBuyingPrice.value && addSalePrice.value && addProductType.value) {
            emptyDataArray.push(allProductsValue)
    localStorage.setItem('AddedProducts',JSON.stringify(emptyDataArray))
        } else {
            alert('cannot add empty data')
        }

    }
    

    

    closeModal();
    displayProducts();
    // resetInputs();
}

console.log(savedProducts)

// Display Saved LocalStorage Products 
function displayProducts() {
    tableBody.innerHTML = ''
    emptyDataArray.forEach((products,index)=> {
        tableBody.innerHTML += 
    `
    <tr class='tableRows'>
    <td class='tableData' >${products.productID}</td>
    <td class='tableData' >${products.productName}</td>
    <td class='tableData' >${products.productTitle}</td>
    <td class='tableData' >${products.productVendor}</td>
    <td class='tableData' >${products.productBuyingPrice}</td>
    <td class='tableData' >${products.productSalePrice}</td>
    <td class='tableData' >${products.productType}</td>
    <td>
    <button class='edit' onclick='updateProducts(${index})' >Edit</button>
    <button class='delete' onclick='deleteProducts(${index})' >Delete</button>
    </td>`;
    })

    
}

// function resetInputs() {
//   addProductID.value = ''
//   addProductName.value = ''
//   addProductTitle.value = ''
//   addProductVendor.value = ''
//   addBuyingPrice.value = ''
//   addSalePrice.value = ''
//   addProductType.value = ''   
// }

function deleteProducts(index) {
    emptyDataArray.splice(index,1)
    localStorage.setItem('AddedProducts',JSON.stringify(emptyDataArray))
    displayProducts();
}

function updateProducts(index) {
    showModal('Update Product','Update');

    let allProductsCopy = emptyDataArray[index];

    addProductID.value = products.productID
    addProductName.value = products.productName
    addProductTitle.value = products.productTitle
    addProductVendor.value = products.productVendor
    addBuyingPrice.value = products.buyingPrice
    addSalePrice.value = products.salePrice
    addProductType.value = products.productType

    flag = true;
    indexValue = index
}

displayProducts();

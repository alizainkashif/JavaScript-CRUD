// Modal Functionality
let modalTitle = document.getElementById('modalTitle')
let modalAddButton = document.getElementById('modalAddButton')
let modalContainer = document.getElementById('addmodalContainer')
let tableBody = document.getElementById('tableBody')
let flag = false
let indexValue = null

function showModal(){
    modalContainer.style.display = 'block'
}

function closeModal(){
    modalContainer.style.display = 'none'
    addProductID.value = ''
  addProductName.value = ''
  addProductTitle.value = ''
  addProductVendor.value = ''
  addBuyingPrice.value = ''
  addSalePrice.value = ''
  addProductType.value = ''
}

// Add Products funtionality
let emptyDataArray = []

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

    if(flag) {
        if(addProductID.value && addProductName.value && addProductTitle.value && addProductVendor.value && addBuyingPrice.value && addSalePrice.value && addProductType.value) {
            let copyArrayData = [...emptyDataArray]
            copyArrayData[indexValue].productID = addProductID.value;
            copyArrayData[indexValue].productName = addProductName.value;
            copyArrayData[indexValue].productTitle = addProductTitle.value;
            copyArrayData[indexValue].productVendor = addProductVendor.value;
            copyArrayData[indexValue].buyingPrice = addBuyingPrice.value;
            copyArrayData[indexValue].salePrice = addSalePrice.value;
            copyArrayData[indexValue].productType = addProductType.value;
          localStorage.setItem("addedProducts" , JSON.stringify(copyArrayData));
          flag = false
          indexValue = null
          } else {
            alert('Cannot update Empty input field')
          }
    } else {
    showModal();
        modalTitle.innerHTML = 'Add Product'
    modalAddButton.innerHTML = 'Add'
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
    showModal();
    modalTitle.innerHTML = 'Update Product'
    modalAddButton.innerHTML = 'Update'

    let allProductsCopy = emptyDataArray[index];

    addProductID.value = allProductsCopy.productID
    addProductName.value = allProductsCopy.productName
    addProductTitle.value = allProductsCopy.productTitle
    addProductVendor.value = allProductsCopy.productVendor
    addBuyingPrice.value = allProductsCopy.productBuyingPrice
    addSalePrice.value = allProductsCopy.productSalePrice
    addProductType.value = allProductsCopy.productType

    flag = true;
    indexValue = index
}

function retrieveData() {
    const savedData = localStorage.getItem('AddedProducts');
    if (savedData) {
        emptyDataArray = JSON.parse(savedData);
    }
}

retrieveData();

displayProducts();


// Modal Functionality

let modalContainer = document.getElementById("addmodalContainer");
let updateProductsButton = document.getElementById("updateProductsButton");
let tableBody = document.getElementById("tableBody");

// Add Products Functionality
let showModalButton = document.querySelector('#addModalButton')
let closeModalButton = document.getElementById('mcloseButton')
let addProductID = document.getElementById('addProductID')
let addProductName = document.getElementById('addProductName')
let addProductTitle = document.getElementById('addProductTitle')
let addProductVendor = document.getElementById('addProductVendor')
let modalTitle = document.getElementById('modalTitle')

closeModalButton.addEventListener('click',function () {
  modalContainer.style.display = 'none'
  addProductID.value = ''
  addProductName.value = ''
  addProductTitle.value = ''
  addProductVendor.value = ''
})
  showModalButton.addEventListener('click',function() {
    modalContainer.style.display = 'block'
    updateProductsButton.style.display = 'none'

})

let addProductsButton = document.getElementById('addProductsButton');
let dataArray = []
addProductsButton.addEventListener('click',function() {
    let addedProducts = {
      productID:addProductID.value,
      productName:addProductName.value,
      productTitle:addProductTitle.value,
      productVendor:addProductVendor.value,
    }


    dataArray.push(addedProducts);
    localStorage.setItem('addedProducts',JSON.stringify(dataArray));
    console.log(dataArray)

  modalContainer.style.display = 'none'

    showProducts();

    addProductID.value = ''
  addProductName.value = ''
  addProductTitle.value = ''
  addProductVendor.value = ''

})

function showProducts() {
  tableBody.innerHTML = ''
  dataArray.forEach((element,index)=> {
    tableBody.innerHTML += 
    `<tr>
      <td>${element.productID}</td>
      <td>${element.productName}</td>
      <td>${element.productTitle}</td>
      <td>${element.productVendor}</td>
      <td>
      <button class='edit' onclick='editProducts(${index})'>Edit</button>
      <button class='delete' onclick='deleteProducts(${index})' >Delete</button>
      </td>
    </tr>`
  })
}


function deleteProducts(index) {
  dataArray.splice(index,1)
  localStorage.setItem('addedProducts',JSON.stringify(dataArray))
  showProducts();
}

function editProducts(index) {

  modalContainer.style.display = 'block'
  updateProductsButton.style.display = 'inline'
  addProductsButton.style.display = 'none'
  modalTitle.innerHTML = 'Edit Product'
  let products = dataArray[index]

  addProductID.value = products.productID
  addProductName.value = products.productName
  addProductTitle.value = products.productTitle
  addProductVendor.value = products.productVendor

}

function retrieveData() {
  const savedData = localStorage.getItem('addedProducts');
  if (savedData) {
      dataArray = JSON.parse(savedData);
  }
}

retrieveData();

showProducts();



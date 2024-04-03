
// Modal Functionality

let modalContainer = document.getElementById("addmodalContainer");
let tableBody = document.getElementById("tableBody");
let dataArray = []
let flag = false
let nindex = null

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
    // updateProductsButton.style.display = 'none'

})

let addProductsButton = document.getElementById('addProductsButton');
addProductsButton.addEventListener('click',function() {
  // modalTitle.innerHTML = 'Add Product'
  // addProductsButton.innerHTML = 'Add'

    if(flag) {
          if(addProductID.value && addProductName.value && addProductTitle.value && addProductVendor.value) {
            let copy = [...dataArray]
            copy[nindex].productID = addProductID.value;
            copy[nindex].productName = addProductName.value;
            copy[nindex].productTitle = addProductTitle.value;
            copy[nindex].productVendor = addProductVendor.value;
          localStorage.setItem("addedProducts" , JSON.stringify(copy));
          flag = false
          nindex = null
          } else {
            alert('Cannot add Empty Data')
          }

    }else {
      let productDetails = {
        productID:addProductID.value,
        productName:addProductName.value,
        productTitle:addProductTitle.value,
        productVendor:addProductVendor.value,
      }
      
      if(addProductID.value && addProductName.value && addProductTitle.value && addProductVendor.value) {
        dataArray.push(productDetails)
    localStorage.setItem('addedProducts',JSON.stringify(dataArray));
      } else {
        alert('Cannot add Empty Data')
      }
    }

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

function editProducts(i) {

  modalContainer.style.display = 'block'
  modalTitle.innerHTML = 'Edit Product'
  addProductsButton.innerHTML = 'Update'
  let products = dataArray[i]

  addProductID.value = products.productID
  addProductName.value = products.productName
  addProductTitle.value = products.productTitle
  addProductVendor.value = products.productVendor
  flag = true
  nindex = i

}

function retrieveData() {
  const savedData = localStorage.getItem('addedProducts');
  if (savedData) {
      dataArray = JSON.parse(savedData);
  }
}

let logoutButton = document.getElementById('logoutButton')
logoutButton.addEventListener('click',function() {
  window.location.replace('login.html')
})

retrieveData();

showProducts();



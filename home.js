// import userData from './login.js';


// Modal Functionality

let modalContainer = document.getElementById("addmodalContainer");
let tableBody = document.getElementById("tableBody");
let dataArray = []
let flag = false
let nindex = null
// let btnvalue = true

// Add Products Functionality
let showModalButton = document.querySelector('#addModalButton')
let closeModalButton = document.getElementById('mcloseButton')
let addProductID = document.getElementById('addProductID');
// console.log(addProductID)
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
//   showModalButton.addEventListener('click',function() {
//     modalContainer.style.display = 'block'
//     modalTitle.textContent = 'Add Product'
//   addProductsButton.textContent = 'Add'

// })

let addProductsButton = document.getElementById('addProductsButton');

addProductsButton.addEventListener('click',function() {
    
  // if(btnvalue) {
  //   modalTitle.textContent = 'Add Product'
  // addProductsButton.textContent = 'Add'
  // btnvalue = false
  // }

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
      <button class='edit editButton'  onclick='editProducts(${index})'>Edit</button>
      <button class='delete' onclick='deleteProducts(${index})' >Delete</button>
      </td>
    </tr>`;

  })
}

// const editButton = document.querySelector('.editButton');
//     // console.log(editButton)
//     addProductsButton.textContent = 'Update'
//     modalTitle.textContent = 'Update Product'


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

retrieveData();

showProducts();





// sidebrrr

const sidebarUsername = document.querySelector("#sidebarUsername");
const sidebarUserEmail = document.querySelector("#sidebarUserEmail");
// console.log(sidebarUsername.innerHTML)
// console.log(sidebarUserEmail.innerHTML)


// session
  let loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
  // console.log(loggedInUser)
  if (loggedInUser) {
      // Display user's name and email on the home page
      sidebarUsername.innerHTML = `${loggedInUser.name}`;
      sidebarUserEmail.innerHTML = `${loggedInUser.email}`;
      console.log(sidebarUsername.innerHTML)
      console.log(sidebarUserEmail.innerHTML)
  } else {
      window.location.replace('login.html');
  }


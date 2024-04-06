// Modal Functionality

let modalContainer = document.getElementById("addmodalContainer");
let tableBody = document.getElementById("tableBody");
let dataArray = []
let flag = false
let nindex = null
// let btnvalue = true

// Add Products Functionality
let showModalButton = document.querySelector('#showModalButton')
let closeModalButton = document.getElementById('mcloseButton')
let addProductID = document.getElementById('addProductID');
let addProductName = document.getElementById('addProductName')
let addProductTitle = document.getElementById('addProductTitle')
let addProductVendor = document.getElementById('addProductVendor')
let buyingPrice = document.getElementById('buyingPrice')
let salePrice = document.getElementById('salePrice')
let productType = document.getElementById('productType')
let modalTitle = document.getElementById('modalTitle')

closeModalButton.addEventListener('click',function () {
  modalContainer.style.display = 'none'
  addProductID.value = ''
  addProductName.value = ''
  addProductTitle.value = ''
  addProductVendor.value = ''
  buyingPrice.value = ''
  salePrice.value = ''
  productType.value = ''
})
  showModalButton.addEventListener('click',function() {
    modalContainer.style.display = 'block'
    modalTitle.textContent = 'Add Product'
  addProductsButton.textContent = 'Add'

})

let addProductsButton = document.getElementById('addProductsButton');

addProductsButton.addEventListener('click',function() {

    if(flag) {
          if(addProductID.value && addProductName.value && addProductTitle.value && addProductVendor.value) {
            let copy = [...dataArray]
            copy[nindex].productID = addProductID.value;
            copy[nindex].productName = addProductName.value;
            copy[nindex].productTitle = addProductTitle.value;
            copy[nindex].productVendor = addProductVendor.value;
            copy[nindex].buyingPrice = buyingPrice.value;
            copy[nindex].salePrice = salePrice.value;
            copy[nindex].productType = productType.value;
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
        buyingPrice:buyingPrice.value,
        salePrice:salePrice.value,
        productType:productType.value,
      }
      
      if(addProductID.value && addProductName.value && addProductTitle.value && addProductVendor.value && buyingPrice && salePrice && productType) {
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
  buyingPrice.value = ''
  salePrice.value = ''
  productType.vlue = ''

})

function showProducts() {
  tableBody.innerHTML = ''
  dataArray.forEach((element,i)=> {
    tableBody.innerHTML += 
    `<tr class='tableRows'>
      <td class='tableData'>${element.productID}</td>
      <td class='tableData'>${element.productName}</td>
      <td class='tableData'>${element.productTitle}</td>
      <td class='tableData'>${element.productVendor}</td>
      <td class='tableData'>${element.buyingPrice}</td>
      <td class='tableData'>${element.salePrice}</td>
      <td class='tableData'>${element.productType}</td>
      <td>
    <button class='edit' onClick='editProducts(${i})'>Edit</button>
    <button class='delete' onClick='deleteProducts(${i})'>Delete</button>
    </td>

    </tr>`;

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
  buyingPrice.value = products.buyingPrice
  salePrice.value = products.salePrice
  productType.value = products.productType
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


// LoggedInUser
  let loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
  if (loggedInUser) {
      // Display user's name and email on the home page
      sidebarUsername.innerHTML = `${loggedInUser.name}`;
      sidebarUserEmail.innerHTML = `${loggedInUser.email}`;
  } else {
      window.location.replace('login.html');
  }


  
  // Search Functionality
  
  const searchInput = document.getElementById('searchInput')
  // console.log(searchInput.value)

  searchInput.addEventListener('input', function() {
    var searchText = searchInput.value.toLowerCase();
    console.log(searchText)
    var rows = document.querySelectorAll('.tableRows');
    
    rows.forEach(function(row) {
        var cells = row.querySelectorAll('.tableData');
        var found = false;
        
        cells.forEach(function(cell) {
            if (cell.textContent.toLowerCase().includes(searchText)) {
                found = true;
            }
        });
        
        if (found) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
        searchInput.addEventListener('input',function () {
          if(searchInput.value === '') {
            row.style.display = ''
          }
        })
    });
});

const addColumnButton = document.getElementById('addColumnButton');
addColumnButton.addEventListener('click', addNewColumn);

function addNewColumn() {
  const table = document.getElementById('productTable');
  const rowCount = table.rows.length;

  // Add a new header cell
  const headerRow = table.rows[0];
  const newHeaderCell = document.createElement('th');
  newHeaderCell.textContent = 'New Column';
  headerRow.appendChild(newHeaderCell);

  // Add a new cell in each row (excluding the header row)
  for (let i = 1; i < rowCount; i++) {
    const newRowCell = table.rows[i].insertCell(-1); 
    newRowCell.textContent = 'New Data'; // Set the cell content (you can customize this)
  }
}



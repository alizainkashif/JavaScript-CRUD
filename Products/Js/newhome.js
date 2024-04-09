// Modal Functionality
let modalTitle = document.getElementById('modalTitle')
let modalContainer = document.getElementById('addmodalContainer')
let tableBody = document.getElementById('tableBody')
let showAddModalButton = document.getElementById('showAddModalButton')
let modalcloseButton = document.getElementById('modalcloseButton')
let productsAddButton = document.getElementById('productsAddButton')
let flag = false
let indexValue = null

showAddModalButton.addEventListener('click',showAddModal)
function showAddModal(){
    modalContainer.style.display = 'block'
    modalTitle.innerHTML = 'Add Product'
    productsAddButton.innerHTML = 'Add'
}

// modal Close Button
modalcloseButton.addEventListener('click',closeModal)
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

// Products Add button in Modal
productsAddButton.addEventListener('click',productsAdded)
function productsAdded() {

    if(flag) {
        if(addProductID.value && addProductName.value && addProductTitle.value && addProductVendor.value && addBuyingPrice.value && addSalePrice.value && addProductType.value) {
            let copyArrayData = [...emptyDataArray]
            copyArrayData[indexValue].productID = addProductID.value;
            copyArrayData[indexValue].productName = addProductName.value;
            copyArrayData[indexValue].productTitle = addProductTitle.value;
            copyArrayData[indexValue].productVendor = addProductVendor.value;
            copyArrayData[indexValue].productBuyingPrice = addBuyingPrice.value;
            copyArrayData[indexValue].productSalePrice = addSalePrice.value;
            copyArrayData[indexValue].productType = addProductType.value;
          localStorage.setItem("AddedProducts" , JSON.stringify(copyArrayData));
          flag = false
          indexValue = null
          } else {
            alert('Cannot update Empty input field')
          }
    } else {
    showAddModal();
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

function deleteProducts(index) {
    emptyDataArray.splice(index,1)
    localStorage.setItem('AddedProducts',JSON.stringify(emptyDataArray))
    displayProducts();
}

function updateProducts(index) {
    showAddModal();
    modalTitle.innerHTML = 'Update Product'
    productsAddButton.innerHTML = 'Update'

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


// Search Functionality
const searchInput = document.getElementById('searchInput')
  searchInput.addEventListener('input', function() {
    var searchText = searchInput.value.toLowerCase();
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

// Add New Column
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
    newRowCell.textContent = 'Sample Data';
  }
}

// Logout

const logout = document.querySelector('.logout')
logout.addEventListener('click',function () {
  window.location.replace('../users/login.html')
})

// LoggedInUser
let loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
if (loggedInUser) {
    sidebarUsername.innerHTML = `${loggedInUser.name}`;
    sidebarUserEmail.innerHTML = `${loggedInUser.email}`;
} else {
window.location.replace('../users/login.html')
}
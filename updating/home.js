class ProductManager {
    constructor() {
      this.modalContainer = document.getElementById("addmodalContainer");
      this.tableBody = document.getElementById("tableBody");
      this.dataArray = [];
      this.flag = false;
      this.nindex = null;
      this.addProductID = document.getElementById('addProductID');
      this.addProductName = document.getElementById('addProductName');
      this.addProductTitle = document.getElementById('addProductTitle');
      this.addProductVendor = document.getElementById('addProductVendor');
      this.showModalButton = document.querySelector('#addModalButton');
      this.closeModalButton = document.getElementById('mcloseButton');
      this.addProductsButton = document.getElementById('addProductsButton');
      this.modalTitle = document.getElementById('modalTitle');
      this.logoutButton = document.getElementById('logoutButton');
  
      this.closeModalButton.addEventListener('click', this.closeModal.bind(this));
      this.showModalButton.addEventListener('click', this.openModal.bind(this));
      this.addProductsButton.addEventListener('click', this.addOrUpdateProduct.bind(this));
      this.logoutButton.addEventListener('click', this.logout.bind(this));
      
      this.retrieveData();
      this.showProducts();
    // this.showProducts();
    }
  
    openModal() {
      this.modalContainer.style.display = 'block';
    }
  
    closeModal() {
      this.modalContainer.style.display = 'none';
      this.resetForm();
    }
  
    resetForm() {
      this.addProductID.value = '';
      this.addProductName.value = '';
      this.addProductTitle.value = '';
      this.addProductVendor.value = '';
      this.flag = false;
      this.nindex = null;
    }
  
    addOrUpdateProduct() {
      if (this.flag) {
        this.updateProduct();
      } else {
        this.addProduct();
      }
      this.closeModal();
    }
  
    addProduct() {
      const productDetails = {
        productID: this.addProductID.value,
        productName: this.addProductName.value,
        productTitle: this.addProductTitle.value,
        productVendor: this.addProductVendor.value,
      };
  
      if (this.validateProduct(productDetails)) {
        this.dataArray.push(productDetails);
        localStorage.setItem('addedProducts', JSON.stringify(this.dataArray));
        this.showProducts();
      } else {
        alert('Cannot add empty data');
      }
    }
  
    updateProduct() {
      if (this.validateForm()) {
        const dataArrayCopy = [...this.dataArray];
        dataArrayCopy[this.nindex] = {
          productID: this.addProductID.value,
          productName: this.addProductName.value,
          productTitle: this.addProductTitle.value,
          productVendor: this.addProductVendor.value,
        };
        localStorage.setItem("addedProducts", JSON.stringify(dataArrayCopy));
        this.flag = false;
        this.nindex = null;
        this.showProducts();
      } else {
        alert('Cannot update with empty data');
      }
    }
  
    validateProduct(product) {
      return Object.values(product).every(value => value.trim() !== '');
    }
  
    showProducts() {
      this.tableBody.innerHTML = '';
      this.dataArray.forEach((product, index) => {
        this.tableBody.innerHTML += 
        `<tr>
          <td>${product.productID}</td>
          <td>${product.productName}</td>
          <td>${product.productTitle}</td>
          <td>${product.productVendor}</td>
          <td>
            <button class='edit' onclick='productManager.editProduct(${index})'>Edit</button>
            <button class='delete' onclick='productManager.deleteProduct(${index})'>Delete</button>
          </td>
        </tr>`;
      });
    }
    
    
    editProduct(index) {
      this.openModal();
      this.modalTitle.innerHTML = 'Edit Product';
      this.addProductsButton.innerHTML = 'Update';
      const product = this.dataArray[index];
      this.addProductID.value = product.productID;
      this.addProductName.value = product.productName;
      this.addProductTitle.value = product.productTitle;
      this.addProductVendor.value = product.productVendor;
      this.flag = true;
      this.nindex = index;
    }
  
    deleteProduct(index) {
      this.dataArray.splice(index, 1);
      localStorage.setItem('addedProducts', JSON.stringify(this.dataArray));
      this.showProducts();
    }
  
    retrieveData() {
      const savedData = localStorage.getItem('addedProducts');
      if (savedData) {
        this.dataArray = JSON.parse(savedData);
      }
    }
  
    logout() {
      window.location.replace('login.html');
    }
  }
  
  const productManager = new ProductManager();
  
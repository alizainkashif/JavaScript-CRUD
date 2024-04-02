let loginEmail = document.getElementById('loginEmail')
let loginPassword = document.getElementById('loginPassword')
let loginButton = document.getElementById('loginButton')

loginButton.addEventListener('click',function(event) {
    event.preventDefault();
    let data = JSON.parse(localStorage.getItem('registerUser'))
    // console.log(data)
    for(let i = 0;i < data.length;i++) {
        if(data[i].email === loginEmail.value && data[i].password === loginPassword.value) {
                window.location.replace('home.html');
                return;
        }
    }
        alert('Login Information Not Found');
})

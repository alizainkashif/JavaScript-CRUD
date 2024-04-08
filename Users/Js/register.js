    // Register
    let registerName = document.getElementById('registerName');
    let registerEmail = document.getElementById('registerEmail');
    let registerPassword = document.getElementById('registerPassword');
    let registerButton = document.getElementById('registerButton');

    registerButton.addEventListener('click', function(e) {
        e.preventDefault();
        let registerUserInfo = {
            name: registerName.value,
            email: registerEmail.value,
            password: registerPassword.value,
        };

        try {
            let existingData = localStorage.getItem('registerUser');

            if (existingData) {
                let dataArray = JSON.parse(existingData);
                dataArray.push(registerUserInfo);
                localStorage.setItem('registerUser', JSON.stringify(dataArray));
            } else {
                let newArray = [registerUserInfo];
                localStorage.setItem('registerUser', JSON.stringify(newArray));
            }

            // console.log(' data saved successfully')

            window.location.replace('./login.html');
            // console.log('Redirecting to login page...');

        } catch (error) {
            alert('Error: Unable to save user data. Please try again.');
            console.error(error);
        }


        registerName.value = ''
        registerEmail.value = ''
        registerPassword.value = ''

    });
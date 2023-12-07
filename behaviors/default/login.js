class LoginPawn {

    setup() {
        if (!localStorage.getItem('accessToken')) {
            let button = document.getElementById('loginBtn');
            button.onclick = () => this.login();
        }
        else if (localStorage.getItem('accessToken')) {
            closePopup();
            this.getEmail();
        }

    }

    displayErrorMessage(message) {
        const errorMessageElement = document.getElementById('error-message');
        errorMessageElement.innerText = message;
    }



    login() {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        const options = {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                'X-DE-SCOPE': '1689522389452804.DE_1689522389452807'
            },
            body: JSON.stringify({
                username: username,
                password: password,
                grant_type: 'password'
            })
        };

        fetch('https://api.beamable.com/basic/auth/token', options)
            .then(response => response.json())
            .then(response => {
                console.log(response);
                localStorage.setItem("accessToken", response.access_token)
                if (response.status == 401) {
                    this.displayErrorMessage('Invalid username or password');
                }
                else if (response.access_token) {
                    closePopup();
                    this.getEmail();
                }
                else if (response.status == 404) {
                    this.displayErrorMessage('Email Not Registered , Click on Register')
                }
            })
            .catch(err => {
                console.error(err.message);
            }
            );
    }
    getEmail() {
        let token = localStorage.getItem('accessToken')
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                'X-DE-SCOPE': '1689522389452804.DE_1689522389452807',
                authorization: `Bearer ${token}`
            }
        };

        fetch('https://api.beamable.com/basic/accounts/me', options)
            .then(response => response.json())
            .then(response => {
                console.log(response)
                let email = response.email
                const displayUsernameElement = document.getElementById('displayUsername');
                displayUsernameElement.innerHTML = `Welcome, ${email}!`;
            })
            .catch(err => console.error(err));
    }

}



function closePopup() {
    // Hide the overlay and the popup
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('popup').style.display = 'none';
}
export default {
    modules: [
        {
            name: "Login",
            pawnBehaviors: [LoginPawn]
        }
    ]
}
class LoginPawn {

    setup() {
        if (!localStorage.getItem('accessToken')) {
            let button = document.getElementById('loginBtn');
            button.onclick = () => this.login();
        }
        else {
            closePopup();
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
                    const displayUsernameElement = document.getElementById('displayUsername');
                    displayUsernameElement.innerHTML = `Welcome, ${username}!`;
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
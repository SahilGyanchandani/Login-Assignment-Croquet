// class registerPawn {



function loginGuest() {
    const options = {
        method: 'POST',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            'X-DE-SCOPE': '1689522389452804.DE_1689522389452807'
        },
        body: JSON.stringify({ grant_type: 'guest' })
    };

    fetch('https://api.beamable.com/basic/auth/token', options)
        .then(response => response.json())
        .then(response => {
            console.log(response)
            if (response.access_token) {
                debugger;
                register(response.access_token);
            }
        })
        .catch(err => console.error(err));
}

function register(token) {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const options = {
        method: 'POST',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            'X-DE-SCOPE': '1689522389452804.DE_1689522389452807',
            authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ email: username, password: password })
    };

    fetch('https://api.beamable.com/basic/accounts/register', options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
}



// }
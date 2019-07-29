const entryForm = document.querySelector('form')

entryForm.addEventListener('submit',(e) =>{
    e.preventDefault();
    const email = document.getElementById('email').value;
    console.log('Email', email);
    const password = document.getElementById('password').value;
    console.log('Password', password);
    axios.post('/LogIn', {
        e: email,
        p: password,
    }).then(function (response) {
        console.log("Response",response.data)
        if(response.data){
            alert('Invalid Email or Password')
        }else{
            location.href = '/home'
        }
    }).catch(function (error) {
        console.log("Error")
        console.log(error.data);
    });
})

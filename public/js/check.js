//const validator = require('validator')
const entryForm = document.querySelector('form')
const inpNumber = document.querySelector('#contact')

entryForm.addEventListener('submit',(e) =>{
    e.preventDefault();
    const firstName = document.getElementById('firstname').value;
    console.log("First name:",firstName);
    const contact = document.getElementById('contact').value;
    console.log('Number', contact);
    const email = document.getElementById('Email').value;
    console.log('Email', email);
    axios.post('/signIn', {
        firstName,
        contact,
        email
    }).then(function (response) {
        console.log(response);
    }).catch(function (error) {
        console.log(error);
    });
})
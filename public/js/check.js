//const validator = require('validator')
const entryForm = document.querySelector('form')
const inpNumber = document.querySelector('#contact')

console.log("Hello")
entryForm.addEventListener('submit',(e) =>{
    e.preventDefault()
    const firstname = document.getElementById('firstname').value
    console.log("First name:",firstname)
    const contact = document.getElementById('contact').value
    console.log('Number', contact)
    const email = document.getElementById('Email').value
    console.log('Email', email)
    // if(validator.isMobilePhone(contact)){
    //     console.log("True")
    // }
})
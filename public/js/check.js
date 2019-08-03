const entryForm = document.querySelector('form')
const inpNumber = document.querySelector('#contact')

console.log("HEY")

entryForm.addEventListener('submit',(e) =>{
    e.preventDefault();
    const firstName = document.getElementById('name').value;
    console.log("First name:",firstName);
    const contact = document.getElementById('contact').value;
    console.log('Number', contact);
    const email = document.getElementById('email').value;
    console.log('Email', email);
    const password = document.getElementById('password').value;
    console.log('Password', password);
    const favTeam = document.getElementById('option').value;
    console.log('FavTeam', favTeam);
    console.log("HEY")
    axios.post('/signIn', {
        name: firstName,
        con: contact,
        e: email,
        p: password,
        ft: favTeam
    }).then(function (response) {
        console.log("DDA",response.config);
    }).catch(function (error) {
        console.log(error.data);
    });
})

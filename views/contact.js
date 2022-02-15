// const name = "ishaq"
// const age = 27
// const ages = 26.5

// console.log(`nama saya ${name} umur saya ${age-ages}`);

// function showData(){
//     const myname="ishaq"
//     alert(`nama sudah di terima`)
//     console.log(myname);
// }

// dom
function submitForm() {
    let name = document.getElementById('input-name').value;
    console.log(name);
    document.getElementById('input-name').value="";
    let email = document.getElementById('input-email').value;
    console.log(email);
    document.getElementById('input-email').value="";
    let phone = document.getElementById('input-phone').value;
    console.log(phone);
    document.getElementById('input-phone').value="";
    let subject = document.getElementById('input-subject').value;
    console.log(subject);
    document.getElementById('input-subject').value="";
    let message = document.getElementById('input-message').value;
    console.log(message);
    document.getElementById('input-message').value="";

    // validasi
    if (name == "") {
        alert(`name input field must be not empty`)
    }
    if (email == "") {
        alert(`email input field must be not empty`)
    }
    if (phone == "") {
        alert(`phone input field must be not empty`)
    }
    if (subject == "") {
        alert(`subject input field must be not empty`)
    }
    if (message == "") {
        alert(`message input field must be not empty`)
    }

    // dom create element
    let emailReceiver="romairama@gmail.com"

    let a =document.createElement("a")
    a.href = `mailto:${emailReceiver}?subject=${subject}&body=Hallo my name is ${name}, ${message}, this is my number ${phone}`

    a.click()

    
}
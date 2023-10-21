let contacts = [];


// Vad som händer när man klickar "skapa"
const skapaBtn = document.getElementById('skapa-Btn');
skapaBtn.addEventListener('click', () => {
    const nameInput = document.getElementById('name-input');
    const phoneInput = document.getElementById('phone-input');

    const names = nameInput.value;
    const phone = phoneInput.value;

    const contact = {
        names,
        phone
    };

    if (names && phone) {
        contacts.push(contact);
        listOfContacts();
        nameInput.value = '';
        phoneInput.value = '';
    } else {
        openAlert();
    }
});


// Varningsmeddelande som dyker upp om man inte fyllt i namn och/eller telefonnummer
function openAlert(msg) {
    if(msg) {
        const alertMsg = document.getElementById('alert-msg');
        alertMsg.classList.remove('visually-hidden');
        const varMsg = document.getElementById('var-msg')
        varMsg.innerText = msg;
    }
    else {
        const alertMsg = document.getElementById('alert-msg');
        alertMsg.classList.remove('visually-hidden');
    }
}


// Skapandet av List Item element
function listOfContacts() {
    const contactList = document.getElementById('kontakt-lista');
    contactList.innerHTML = '';

    contacts.sort((a, b) => a.names.localeCompare(b.names));

    contacts.forEach((contact, index) => {
        const li = document.createElement('li');

        const nameBox = document.createElement('input');
        nameBox.value = contact.names;
        nameBox.className = "form-control names-CSS";
        const nameBoxIdIdWithIndex = 'name-box-' + index;
        nameBox.setAttribute('id', nameBoxIdIdWithIndex);
        nameBox.style.backgroundColor = '#404040';
        nameBox.disabled = true;

        const phoneBox = document.createElement('input');
        phoneBox.value = contact.phone;
        phoneBox.className = "form-control phone-CSS";
        const phoneBoxIdIdWithIndex = 'phone-box-' + index;
        phoneBox.setAttribute('id', phoneBoxIdIdWithIndex);
        phoneBox.style.backgroundColor = '#404040';
        phoneBox.disabled = true;

        const editButton = document.createElement('button');
        editButton.innerText = 'Ändra';
        editButton.className = "btn btn-secondary button-CSS";
        const editBtnIdWithIndex = 'edit-btn-' + index;
        editButton.setAttribute('id', editBtnIdWithIndex);
        editButton.classList.add('edit-btn')
        editButton.addEventListener('click', () => edit(contact, index));

        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Radera';
        deleteButton.className = "btn btn-outline-danger";
        deleteButton.setAttribute('id', 'delete-btn');
        deleteButton.addEventListener('click', () => deleteContact(index));

        li.append(nameBox, phoneBox, editButton, deleteButton);

        contactList.append(li);
    })
};


// Stängning av varningsmeddelandet
function dismiss() {
    const alertMsg = document.getElementById('alert-msg');
    alertMsg.classList.add('visually-hidden');
}


// Vad som händer när man klickar "ändra"
function edit(contact, index) {
    const editBtnIdWithIndex = 'edit-btn-' + index;
    const phoneBoxIdIdWithIndex = 'phone-box-' + index;
    const nameBoxIdIdWithIndex = 'name-box-' + index;

    const editButton = document.getElementById(editBtnIdWithIndex);
    const nameBox = document.getElementById(nameBoxIdIdWithIndex);
    const phoneBox = document.getElementById(phoneBoxIdIdWithIndex);

    if (editButton.innerText == 'Ändra') {
        nameBox.removeAttribute('disabled');
        nameBox.style.backgroundColor = '#505050';
        phoneBox.removeAttribute('disabled');
        phoneBox.style.backgroundColor = '#505050';
        editButton.innerText = 'Spara';

    } else if (editButton.innerText == 'Spara') {
        // Nästlad if för att få varningsmeddelande om något av fältern är tomma
        if(!nameBox.value || !phoneBox.value){
            openAlert('Det är inte möjligt att spara en tom kontakt');
            return;
        } else {
            nameBox.setAttribute('disabled', 'true');
            phoneBox.setAttribute('disabled', 'true');
            nameBox.style.backgroundColor = '#404040';
            phoneBox.style.backgroundColor = '#404040';
            editButton.innerText = "Ändra";
        };

        contacts[index].names = nameBox.value;
        contacts[index].phone = phoneBox.value;
    };

    console.log(contacts);

};


// Vad som händer när man klickar "Radera"
function deleteContact(index) {
    contacts.splice(index, 1);
    listOfContacts();
};


// Vad som händer när man klickar "Radera lista"
    // Jag la in en Confirm, hoppas det var okej :)
function clearList() {
    let choice = confirm('Är du säker på att du vill radera alla kontakter?');
    if (choice == true) {
        contacts = [];
        listOfContacts();
    };
};


// Nu i efterhand kom jag på att man kanske skulle använt e.target men det är 
// fortfarande något min hjärna jobbar på att förstå!
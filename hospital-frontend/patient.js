const patientForm = `
<label>Name:</label><br>
<input type="text" id="name"><br>
<input type="hidden" id="patientId">
<label>Sex At Birth:</label><br>
<input type="text" id="sex"><br>
<label>Gender:</label><br>
<input type="text" id="gender"><br>
<label>Age:</label><br>
<input type="integer" id="age"><br>
<label>Date Of Birth:</label><br>
<input type="text" id="date_of_birth"><br><br>
`

class Patient {
    constructor(data) {
        this.id = data.id
        this.name = data.name
        this.sex = data.sex
        this.gender = data.gender
        this.age = data.age
        this.date_of_birth = data.date_of_birth
    }

    static newPatientForm() {
        let newPatientForm = document.querySelector('div#record-form')
        newPatientForm.innerHTML = `<form onsubmit="createPatient(); return false;">` + patientForm + `<input type="submit" value="Add New Patient"></form><br>`
    }

    patientHtml() {
        return `<div class="card-patient" data-patient-id="${this.id}">
                <button class="edit-patient">Edit Patient</button>
                <button class="delete-patient">Delete Patient</button><br>
                Name: ${this.name}<br>
                Sex: ${this.sex}<br>
                Gender: ${this.gender}<br>
                Age: ${this.age}<br>
                Date of Birth: ${this.date_of_birth}<br><br>
                <button class="add-visit" id="${this.id}">Add Visit</button><br><br>
                </div><br>
                `
    }

    static editPatientForm() {
        let editPatientFormHtml = document.querySelector('div#record-form')
        editPatientFormHtml.innerHTML = `<form onsubmit="updatePatient(); return false;">` + patientForm + `<input type="submit" value="Update Patient"></form><br>`
    }
}

function getPatients() {
    fetch("http://localhost:3000/patients")
    .then(response => response.json())
    .then(data => {
        renderPatients(data)
        addPatientListeners()
        addVisitsListeners()
    })
}

function renderPatients(data) {
    let patientRecord = document.querySelector('div#patient-record')
    data.forEach((patient) => {

        let newPatient = new Patient(patient)
        patientRecord.innerHTML += newPatient.patientHtml()
        
        const selectPatientHtml = document.querySelector(`.card-patient[data-patient-id="${newPatient.id}"]`)
        patient.visits.forEach(visit => {
            const visitHtml =
            `<div class="card-visit" data-visit-id="${visit.id}">
            Title: ${visit.title}<br>
            Date of Visit: ${visit.date_of_visit}<br>
            Doctor: ${visit.doctor}<br>
            Description: ${visit.description}<br>
            <button class="edit-visit-button">Edit Visit</button>
            <button class="delete-visit-button">Delete Visit</button>
            </div><br>`

            selectPatientHtml.innerHTML += visitHtml
        })
    })
}

//Creating New Patient through the forms
function createPatient() {
    const patient = {
        name: document.getElementById('name').value,
        sex: document.getElementById('sex').value,
        gender: document.getElementById('gender').value,
        age: document.getElementById('age').value,
        date_of_birth: document.getElementById('date_of_birth').value
    }
    fetch("http://localhost:3000/patients", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(patient)
    })
    .then(resp => resp.json())
    .then(patient => {
        clearPatientHtml()
        getPatients()
        Patient.newPatientForm()
    })
}

function clearPatientHtml() {
    let patientData = document.querySelector('div#patient-record')
    patientData.innerHTML = ""
}



function addPatientListeners() {
    document.querySelectorAll('button.edit-patient').forEach(element => {
        element.addEventListener('click', editPatient)
    })
    document.querySelectorAll('button.delete-patient').forEach(element => {
        element.addEventListener('click', deletePatient)
    })
    document.querySelectorAll('button.add-visit').forEach(element => {
        element.addEventListener('click', renderNewVisitForm)
    })
}

function updatePatient() {
    let patientId = this.event.target.patientId.value
    const patient = {
        name: document.getElementById('name').value,
        sex: document.getElementById('sex').value,
        gender: document.getElementById('gender').value,
        age: document.getElementById('age').value,
        date_of_birth: document.getElementById('date_of_birth').value
    }
    fetch(`http://localhost:3000/patients/${patientId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(patient)
    })
    .then(resp => resp.json())
    .then(patient => {
        clearPatientHtml()
        getPatients()
        Patient.newPatientForm()
    })
}

function editPatient() {
    let patientId = this.parentElement.getAttribute('data-patient-id')
    fetch(`http://localhost:3000/patients/${patientId}`)
    .then(resp => resp.json())
    .then(data => {
        Patient.editPatientForm()
        let patientForm = document.querySelector('div#record-form')
        patientForm.querySelector('#name').value = data.name
        patientForm.querySelector('#patientId').value = data.id
        patientForm.querySelector('#sex').value = data.sex
        patientForm.querySelector('#gender').value = data.gender
        patientForm.querySelector('#age').value = data.age
        patientForm.querySelector('#date_of_birth').value = data.date_of_birth
    })
}

function deletePatient() {
    let patientId = this.parentElement.getAttribute('data-patient-id')
    fetch(`http://localhost:3000/patients/${patientId}`, {
        method: "DELETE"
    })
    .then(resp => resp.json())
    .then(json => {
        clearPatientHtml()
        getPatients()
        Patient.newPatientForm()
    })
}

function sortPatient() {
    let button = document.querySelector('button.sort_patient')
    button.addEventListener('click', sortPatientsAlpha)
}

function sortPatientsAlpha() {
    console.log("Testing")
    fetch('http://localhost:3000/patients')
    .then(resp => resp.json())
    .then(json => {
        json.sort(function(a, b) {

            var nameA = a.name.toUpperCase(); // ignore upper and lowercase
            var nameB = b.name.toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }
          
            // names must be equal
            return 0;

          });
          
          clearPatientHtml()
          let patientRecord = document.querySelector('div#patient-record')
          
          json.forEach((patient) => {

            let newPatient = new Patient(patient)
            patientRecord.innerHTML += newPatient.patientHtml()
          }) 
    })

}

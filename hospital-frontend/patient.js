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
<input type="text" id="date_of_birth"><br>
<input type="submit" value="Add New Patient">
</form><br><br>`

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
        newPatientForm.innerHTML = `<form onsubmit="createPatient(); return false;">` + patientForm
    }
    patientHtml() {
        return `<div class="card-patient" data-patient-id="${this.id}">
                Name: ${this.name}<br>
                Sex: ${this.sex}<br>
                Gender: ${this.gender}<br>
                Age: ${this.age}<br>
                Date of Birth: ${this.date_of_birth}<br><br>
                </div><br><br>`
    }
}

function getPatients() {
    fetch("http://localhost:3000/patients")
    .then(response => response.json())
    .then(data => {
        renderPatients(data)
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
            </div><br>`

            selectPatientHtml.innerHTML += visitHtml
        })
    })
}

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
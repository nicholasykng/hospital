const patientForm = `
<label>Name:</label><br>
<input type="text" id="name><br>
<input type="hidden" id="dogId"><br>
<label>Sex At Birth:</label><br>
<input type="text" id="sex"><br>
<label>Gender:</label><br>
<input type="text" id="gender"><br>
<label>Age:</label><br>
<input type="integer" id="age"><br>
<label>Date Of Birth:</label><br>
<input type="text" id="date_of_birth"><br>
<input type="submit" value="Add New Patient">
</form>`

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
        const patientHTML = `<div class="card" data-id=${patient.id}> <p>${patient.name}</p><br>
        <p>${patient.sex}</p><br>
        <p>${patient.gender}</p><br>
        <p>${patient.age}</p><br>
        <p>${patient.date_of_birth}</p></div>`;
        patientRecord.append(patientHTML)
    })
}
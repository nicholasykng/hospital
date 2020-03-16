class Visit {
    constructor(data) {
        this.id = data.id
        this.title = data.title
        this.date_of_visit = data.date_of_visit
        this.doctor = data.doctor
        this.description = data.description
        this.patient_id = data.patient_id
    }
}

function renderNewVisitForm() {
    let patientId = this.getAttribute('id')
    let visitHtml = this.parentElement
    let visitForm = document.createElement('form')
    visitForm.setAttribute("onsubmit", "addVisit(); return false;")
    visitForm.innerHTML = renderVisitFormField(patientId)
    visitHtml.appendChild(visitForm)
}

function renderVisitFormField(patientId) {
    return `<label>Title:</label><br>
            <input type="text" id="title"><br>
            <input type="hidden" id="visit-patientId" value="${patientId}">
            <label>Date of Visit:</label><br>
            <input type="text" id="date_of_visit"><br>
            <label>Doctor:</label><br>
            <input type="text" id="doctor"><br>
            <label>Description:</label><br>
            <input type="textarea" id="description"><br>
            <input type="submit" value="Submit">`
}

function addVisit() {
    const visit = {
        title: document.getElementById('title').value,
        date_of_visit: document.getElementById('date_of_visit').value,
        doctor: document.getElementById('doctor').value,
        description: document.getElementById('description').value,
        patient_id: document.getElementById('visit-patientId').value
    }
    fetch('http://localhost:3000/visits', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(visit)
    })
    .then(resp => resp.json())
    .then(visit => {
        clearPatientHtml()
        getPatients()
        Patient.newPatientForm()
    })
}

function addVisitsListeners() {
    document.querySelectorAll('.delete-visit-button').forEach(element => {
        element.addEventListener('click', deleteVisit)
    })
    document.querySelectorAll('.edit-visit-button').forEach(element => {
        element.addEventListener('click', editVisit)
    })
}


function deleteVisit() {
    let visitId = this.parentElement.getAttribute('data-visit-id')
    fetch(`http://localhost:3000/visits/${visitId}`, {
        method: "DELETE"
    })
    .then(resp => resp.json())
    .then(json => {
        clearPatientHtml()
        getPatients()
        Patient.newPatientForm()
    })
}

function editVisit() {
    let visitId = this.parentElement.getAttribute('data-visit-id')
    fetch(`http://localhost:3000/visits/${visitId}`)
    .then(resp => resp.json())
    .then(data => {
        completeVisitForm(data)
    })
}
function completeVisitForm(data) {
    let visit = new Visit(data)
    let visitForm = renderVisitForm(visit.patient_id)
    visitForm.querySelector('#title').value = visit.title
    visitForm.querySelector('#date_of_visit').value = visit.date_of_visit
    visitForm.querySelector('#doctor').value = visit.doctor
    visitForm.querySelector('#description').value = visit.description
    visitForm.querySelector('#visit-patientId').value = visit.patient_id
    document.querySelector(`.card-visit[data-visit-id="${visit.id}"]`).appendChild(visitForm)
}

function renderVisitForm(patientId) {
    let visitForm = document.createElement('form')
    visitForm.setAttribute("onsubmit", "updateVisit(); return false;")
    visitForm.innerHTML = renderVisitFormField(patientId)
    return visitForm
}

function updateVisit() {
    let visitId = this.event.target.parentElement.getAttribute('data-visit-id')
    let visitForm = document.querySelector(`.card-visit[data-visit-id="${visitId}"]`)
    let visit = {
        title: visitForm.querySelector('#title').value,
        date_of_visit: visitForm.querySelector('#date_of_visit').value,
        doctor: visitForm.querySelector('#doctor').value,
        description: visitForm.querySelector('#description').value,
        patient_id: visitForm.querySelector('#visit-patientId').value
    }
    fetch(`http://localhost:3000/visits/${visitId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json", 
            "Accept": "application/json"
        },
        body: JSON.stringify(visit)
    })
    .then(resp => resp.json())
    .then(data => {
        clearPatientHtml()
        getPatients()
        Patient.newPatientForm()
    })
}
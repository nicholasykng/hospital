class Visit {
    constructor(data) {
        this.id = data.id
        this.title = data.title
        this.date_of_visit = data.date_of_visit
        this.doctor = data.doctor
        this.description = data.description
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
            <input type="submit" value="Add Visit">`
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


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
    let visitForm = renderNewVisitForm(visit.patient_id)
    visitForm.querySelector('#title').value = visit.title
    visitForm.querySelector('#date_of_visit').value = visit.date_of_visit
    visitForm.querySelector('#doctor').value = visit.doctor
    visitForm.querySelector('#description').value = visit.description
    visitForm.querySelector('#visit-patientId').value = visit.patient_id
    document.querySelector(`.card-visit[data-visit-id="${visit.id}"]`).appendChild(visitForm)
}

function renderNewVisitForm(patientId) {
    let visitForm = document.createElement('form')
    visitForm.setAttribute("onsubmit", "updateVisit(); return false;")
    visitForm.innerHTML = renderVisitFormField(patientId)
    return visitForm
}

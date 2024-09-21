import { getAgenda, setAgenda } from "../repo/agendaList";

const agendaDescription = document.getElementById("agenda-description") as HTMLTextAreaElement;
const startTime = document.getElementById("start-time") as HTMLInputElement;
const endTime = document.getElementById("end-time") as HTMLInputElement;

const save = document.getElementById("save-agenda") as HTMLButtonElement;
const descriptionDiv = document.getElementById("criteria") as HTMLDivElement; 
const eventId = sessionStorage.getItem('editEventId');

const err = document.getElementById("error") as HTMLDivElement;

displayAgenda();

save.addEventListener("click", function () {
    const description: string = agendaDescription.value;
    const start: string = startTime.value;
    const end: string = endTime.value;

    if (description && start && end) {
        setAgenda(eventId!, `${description} (Start-Time: ${start}, End-Time: ${end})`);
        err.textContent = "Agenda has been updated!"
        agendaDescription.value = '';
        startTime.value = '';
        endTime.value = '';
        displayAgenda();
    } else {
        err.textContent = "Please fill out all fields."
    }
});

function displayAgenda() {
    const agenda = getAgenda(eventId!);
    err.textContent = "";
    if (agenda) {
        descriptionDiv.innerHTML = `<p>${agenda}</p>`;
    } else {
        descriptionDiv.innerHTML = '<p>No agenda found.</p>';
    }
}

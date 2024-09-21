import { Guest } from "../interfaces/guest";
import { getGuests, guest, setGuests } from "../repo/guestList";


const guestName = document.getElementById("guest-name") as HTMLInputElement;
const guestEmail = document.getElementById("guest-email") as HTMLInputElement;
const guestStatus = document.getElementById("guest-status") as HTMLSelectElement;
const eventId = sessionStorage.getItem('editEventId')!;
const save = document.getElementById("save") as HTMLButtonElement;
const err = document.getElementById("error") as HTMLDivElement;
const back = document.getElementById("back") as HTMLButtonElement;


if (back) {
    back.addEventListener("click", function() {
        window.location.href = "./guest-dashboard.html";
    });
}

const guestId = sessionStorage.getItem('guestId');
if(guestId){
    const guest1 = guest(guestId, eventId);
    guestName.value = guest1!.guestName;
    guestEmail.value = guest1!.guestEmail;
    guestStatus.value = guest1!.guestStatus;
}

save.addEventListener("click", function(){
    if(guestName.value === "" || guestEmail.value === "" || guestStatus.value === ""){
        err.textContent= "Fill the required details";
        return;
    } 

    const guest = getGuests(eventId);
    const updates = guest.filter(g => g.guestId != guestId);
    const update : Guest = {
        guestId : guestId!,
        guestName : guestName.value,
        guestEmail : guestEmail.value,
        guestStatus : guestStatus.value
    }

    updates.push(update);
    setGuests(eventId, updates);
    window.location.href = "./guest-dashboard.html"
})

import { getGuests, hasGuest, setGuests } from "../repo/guestList";
import { Guest } from "../interfaces/guest";
import { guest } from "../repo/guestList";

const guestName = document.getElementById("guest-name") as HTMLInputElement;
const guestEmail = document.getElementById("guest-email") as HTMLInputElement;
const guestStatus = document.getElementById("guest-status") as HTMLSelectElement;
const eventId = sessionStorage.getItem('editEventId')!;
const save1 = document.getElementById("save") as HTMLButtonElement;
const err = document.getElementById("error") as HTMLDivElement;
const back = document.getElementById("back") as HTMLButtonElement;

if (back) {
    back.addEventListener("click", function() {
        window.location.href = "./guest-dashboard.html";
    });
}

if (save1) {
    save1.addEventListener("click", function() {
        const guestId = Date.now().toString();
        const guestname = guestName.value.trim();
        const mail = guestEmail.value.trim();
        const status = guestStatus.value;

        if (guestname === "" || mail === "" || !mail.includes("@") || status === "") {
            err.textContent = "Enter All Fields to Add a Guest!..";
            return;
        }

        const newGuest: Guest = {
            guestId,
            guestName: guestname,
            guestEmail: mail,
            guestStatus: status
        };

        const existingGuest = getGuests(eventId);
        console.log(existingGuest);

        if (!hasGuest(mail, eventId)) {
            existingGuest.push(newGuest);
            setGuests(eventId, existingGuest);
            err.textContent = "Guest has been Added";
            resetInputFields();
            window.location.href = "./guest-dashboard.html";
        } else {
            err.textContent = "Guest Already found";
            resetInputFields();
        }
    });
}

function resetInputFields() {
    guestName.value = "";
    guestEmail.value = "";
    guestStatus.value = "";
}

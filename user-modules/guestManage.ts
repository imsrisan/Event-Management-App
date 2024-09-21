import { Guest } from "../interfaces/guest";
import { getGuests, setGuests, hasGuest, guest } from "../repo/guestList";
const guestName = document.getElementById("guest-name") as HTMLInputElement;
const guestEmail = document.getElementById("guest-email") as HTMLInputElement;
const guestStatus = document.getElementById("guest-status") as HTMLSelectElement;

const eventId = sessionStorage.getItem('editEventId')!;
const guestList = document.getElementById("guest-list") as HTMLTableElement;

const addguest = document.getElementById("add-guest") as HTMLButtonElement;

addguest.addEventListener("click", function(){
    window.location.href="../dist/add-guest.html";
})

const back = document.getElementById("back") as HTMLButtonElement;
back.addEventListener("click", function(){
    window.location.href = "./my-events.html";
})

const guests : Guest[] = getGuests(eventId);
displayGuest(guests);
const save = document.getElementById("save") as HTMLButtonElement;
function displayGuest(guest : Guest[]) : void{

    guestList.innerHTML = "";
    guest.forEach(g => {
        const tr = document.createElement("tr");
        tr.classList.add("tr");

        tr.setAttribute("guestId", g.guestId);

        const td1  = document.createElement("td");
        td1.textContent = g.guestName;
        const td2  = document.createElement("td");
        td2.textContent = g.guestEmail;
        const td3  = document.createElement("td");
        td3.innerHTML = `<p><button> Send Invite </button></p>`;
        const td4  = document.createElement("td");
        if(g.guestStatus === "Accepted"){
            td4.classList.add("accepted");
        } else if(g.guestStatus === "Pending"){
            td4.classList.add("pending");
        } else {
            td4.classList.add("cancelled");
        }
        td4.innerHTML = `<p>${g.guestStatus}</p>`;
        const td5  = document.createElement("td");
        td5.innerHTML = '<p><Button class="edit">Edit</Button></p>';
        const td6  = document.createElement("td");
        td6.innerHTML = '<p><Button class="delete">Delete</Button></p>';


        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        tr.appendChild(td6);

        guestList.appendChild(tr);

    })
}

guestList.addEventListener("click", function(event){
    const target = event.target as HTMLElement | null;
    const tr = target?.closest("tr");
    const guests = getGuests(eventId);
    const guestId = tr?.getAttribute("guestId");
    if(target && target.matches(".edit")){
        console.log("Im invoked");
        sessionStorage.setItem('guestId', guestId!);
        window.location.href="./update-guest.html";
        displayGuest(getGuests(eventId))
    
    } else if(target && target.matches(".delete")){
        const updated = guests.filter(g => g.guestId !== guestId);
        if(confirm("Are you sure you need delete guest?")){
            setGuests(eventId, updated);
            displayGuest(updated);
        }
    }
})


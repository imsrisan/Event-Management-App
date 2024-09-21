import { AppEvent } from '../interfaces/event';
import { hasEvent, loadEventListFromLocalStorage, userEventList } from '../repo/saveUserEvent';
import { getCategory } from '../repo/category';

const username = sessionStorage.getItem('username');

const eventName = document.getElementById("event-name") as HTMLInputElement;
const eventDate = document.getElementById("event-date") as HTMLInputElement;
const eventLocation = document.getElementById("location") as HTMLInputElement;
const eventCategory = document.getElementById("category") as HTMLSelectElement;
const err = document.getElementById("error") as HTMLDivElement;
const categories = getCategory();
categories.forEach(c =>{
    const option = document.createElement("option");
    option.textContent = c.split("#@#")[0];
    eventCategory.appendChild(option);
})
const eventDescription = document.getElementById("event-description") as HTMLTextAreaElement;
const eventStatus = document.getElementById("status") as HTMLSelectElement;
const saveButton = document.getElementById("save-event") as HTMLButtonElement;

const user = document.getElementById("username") as HTMLParagraphElement;

const back = document.getElementById("backbtn") as HTMLButtonElement;

back.addEventListener("click", function(){
    window.location.href="./my-events.html";
})
document.addEventListener("DOMContentLoaded", function() {
    const now = new Date();
    const formattedDateTime = now.toISOString().slice(0, 16);
    eventDate.setAttribute("min", formattedDateTime);
});

user.textContent = username;
user.style.display = 'block';
saveButton.addEventListener("click", function(event) {
    event.preventDefault();
    const eventId: string = Date.now().toString();
    const name: string = eventName.value;
    const date: Date = new Date(eventDate.value);
    const location: string = eventLocation.value;
    const category: string = eventCategory.value;
    const description: string = eventDescription.value;
    const status: string = eventStatus.value;

    if (name === "" || eventDate.value === "" || location === "" || category === "Event category" || description === "" || status === "Event Status") {
        err.textContent = ".........Enter ALL DETAILS........";
        return;
    }
     else {
        const newEvent = createEvent(eventId, name, date, location, category, description, status);
        loadEventListFromLocalStorage();

        if(username){
            if (hasEvent(username!, newEvent.date)) {
                err.textContent = "Event is already saved.";
            } else {
                userEventList(username!, newEvent);
                err.textContent = "Event Added!...Ready to Celebrate...Huraaahhhh";
                window.location.href="./my-events.html";
            }
        } 

    }
});


export function createEvent(
    eventId: string,
    eventName: string,
    date: Date,
    location: string,
    category: string,
    description: string,
    status: string
): AppEvent {
    const newEvent: AppEvent = {
        eventId,
        eventName,
        date,
        location,
        category,
        description,
        status
    };
    return newEvent;
}

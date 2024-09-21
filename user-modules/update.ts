import { AppEvent } from '../interfaces/event';
import { getCategory } from '../repo/category';
import { getUserEvent, hasEvent, loadEventListFromLocalStorage, userEventList } from '../repo/saveUserEvent';
import { updateEventById } from '../repo/saveUserEvent';

const username = sessionStorage.getItem('username');
const eventid = sessionStorage.getItem('EventId');


const eventName = document.getElementById("event-name") as HTMLInputElement;
const eventDate = document.getElementById("event-date") as HTMLInputElement;
const eventLocation = document.getElementById("location") as HTMLInputElement;
const eventCategory = document.getElementById("category") as HTMLSelectElement;
const eventDescription = document.getElementById("event-description") as HTMLTextAreaElement;
const eventStatus = document.getElementById("status") as HTMLSelectElement;
const updateButton = document.getElementById("update-event") as HTMLButtonElement;
const err = document.getElementById("error") as HTMLDivElement;
console.log(eventid);
document.addEventListener("DOMContentLoaded", function() {
    const now = new Date();
    const formattedDateTime = now.toISOString().slice(0, 16);
    eventDate.setAttribute("min", formattedDateTime);
});
const back = document.getElementById("backbtn") as HTMLButtonElement;

back.addEventListener("click", function(){
    window.location.href="./my-events.html";
})
const categories = getCategory();
categories.forEach(c =>{
    const option = document.createElement("option");
    option.textContent = c.split("#@#")[0];
    eventCategory.appendChild(option);
})
if(eventid){
    loadEventListFromLocalStorage();
    const userOfEvent = getUserEvent(username!)?.find(e => e.eventId === eventid);
    console.log(userOfEvent);
    if(userOfEvent){
        eventName.value = userOfEvent.eventName;
        eventDate.value = new Date(userOfEvent.date).toISOString().slice(0,16);
        eventLocation.value = userOfEvent.location;
        eventCategory.value = userOfEvent.category;
        eventDescription.value = userOfEvent.description;
        eventStatus.value = userOfEvent.status;
        console.log(userOfEvent);  console.log(eventid);
    }
}

const user = document.getElementById("username") as HTMLParagraphElement;
user.textContent = username;
user.style.display = 'block';
updateButton.addEventListener("click", function(event) {
    event.preventDefault();
    const eventId: string = eventid!;
    const name: string = eventName.value;
    const date: Date = new Date(eventDate.value);
    const location: string = eventLocation.value;
    const category: string = eventCategory.value;
    const description: string = eventDescription.value;
    const status: string = eventStatus.value;

    if (name === "" || eventDate.value === "" || location === "" || category === "Event category" || description === "" || status === "Event Status") {
        err.textContent = ".........Enter ALL DETAILS........"
        return;
    }
    else {
        const newEvent = createEvent(eventId, name, date, location, category, description, status);
        loadEventListFromLocalStorage();

        if(username){
            if(updateEventById(username!, newEvent)){
                err.textContent = "Event Updated Successfully.....";
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

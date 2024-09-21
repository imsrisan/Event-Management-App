    import { AppEvent } from "../interfaces/event";
import { getCategory } from "../repo/category";
    import { getUserEvent, loadEventListFromLocalStorage, updateUserList, userEventList } from "../repo/saveUserEvent";
import { getUsers } from "../repo/userlist";

    const username = sessionStorage.getItem('username');

    const user = document.getElementById("name") as HTMLParagraphElement;

    const addevent = document.getElementById("addevent") as HTMLButtonElement;
    const logout = document.getElementById("logout") as HTMLButtonElement;

logout.addEventListener("click", function(){
    window.location.href="../index.html";
})

    const gallery = document.querySelector(".gallery") as HTMLDivElement;

const category = document.getElementById("category") as HTMLSelectElement;

    const filterByDate = document.getElementById("date") as HTMLSelectElement;
    const filterByCategory = document.getElementById("category") as HTMLSelectElement;
const categories = getCategory();
categories.forEach(c =>{
    const option = document.createElement("option");
    option.textContent = c.split("#@#")[0];
    category.appendChild(option);
})
    const filterByStatus = document.getElementById("status") as HTMLSelectElement;
    const filterBysearch = document.getElementById("search") as HTMLInputElement;



    if(username){
        user.textContent = username;
        user.style.display = 'block';
    }

    addevent.addEventListener("click", function(e){
        e.preventDefault();
        window.location.href="./event-creation.html";
    })

    if(username){
        loadEventListFromLocalStorage();
        const userEvent = getUserEvent(username);

        if(userEvent){
            displayEvents(userEvent);
            filterByStatus.addEventListener("change", () => filterByStatusList(userEvent));
            filterByDate.addEventListener("change", () => filterByDateList(userEvent));
            filterByCategory.addEventListener("change", () => filterByCategoryList(userEvent));
            filterBysearch.addEventListener("keypress", event => {
                if(event.key === "Enter"){
                    console.log("key Pressed");
                    filterBysearchList(userEvent);
                }
            })
        }
    }

    function filterBysearchList(userEvent : AppEvent []){
        gallery.innerHTML = "";
        const search = filterBysearch.value;
        const userEventFilter = userEvent.filter(event => {
            return event.eventName.toLowerCase().includes(search);

        });
        displayEvents(userEventFilter);
    }

    function filterByCategoryList(userEvent : AppEvent []){
        const category = filterByCategory.value;
        if(category !== "all"){     
            const userEventFilter = userEvent.filter(event => {
                console.log(category + "   " + event.category);
                return category === event.category;
            });
            displayEvents(userEventFilter);
        } else {
            displayEvents(userEvent);
        }

    }

    function filterByStatusList(userEvent : AppEvent[]){
        const statusValue = filterByStatus.value;
        if(statusValue === "all"){
            displayEvents(userEvent);
        } else {
            const userEventFilter = userEvent.filter(event => event.status === statusValue)
            displayEvents(userEventFilter);
        }
    }

    function filterByDateList(userEvent : AppEvent[]){
        const dateValue = filterByDate.value;
        gallery.innerHTML = "";
        const now = new Date();
        const userEventFilter = userEvent.filter(event => {
            const eventDate = new Date(event.date);
            if(dateValue === "today"){
                return isSameDay(eventDate, now);
            } else if(dateValue === "month"){
                return isSameMonth(eventDate, now);
            } else if(dateValue === "week"){
                return isSameWeek(eventDate, now);
            } else{
                return true;
            }

            return true;
        })
        displayEvents(userEventFilter);
    }

    function isSameDay(date1 : Date, date2 : Date){
        return date1.getDate() === date2.getDate() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getFullYear() === date2.getFullYear();
    }

    function isSameMonth(date1 : Date, date2 : Date){
        console.log(date1.getMonth() === date2.getMonth());
        console.log(date1.getMonth() + "   " + date2.getMonth() + 'This is a same month');
        return date1.getMonth() === date2.getMonth() + 1;
    }

    function isSameWeek(date1 : Date, date2 : Date){
        const startOfWeek = getStartOfWeek(date2);
        const endOfWeek = getEndOfWeek(date2);
        return date1 >= startOfWeek && date1 <= endOfWeek;
    }

    function getStartOfWeek(date: Date): Date {
        const day = date.getDay();
        const diff = date.getDate() - day + (day === 0 ? -6 : 1);
        return new Date(date.setDate(diff));
    }
    
    function getEndOfWeek(date: Date): Date {
        const startOfWeek = getStartOfWeek(date);
        return new Date(startOfWeek.setDate(startOfWeek.getDate() + 6));
    }


function displayEvents(events : AppEvent[] | undefined){
    gallery.innerHTML = '';
    events?.forEach(event => {
        const ename = event.eventName;
        const date = new Date(event.date);
        const dateTime = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
        const dateDay = `${date.getDate().toString().padStart(2,'0')}/${(date.getMonth()+1).toString().padStart(2, '0')}/${date.getFullYear().toString()}`       
        const location = event.location;        
        const description = event.description;
        const status = event.status;

        const cardH = document.createElement("div");
        cardH.classList.add("event-card");
        cardH.setAttribute('eventId', event.eventId);
    
        const cardInner = document.createElement("div");
        cardInner.classList.add("card-inner");
    
        const front = document.createElement("div");
        front.classList.add("front");
    
        const back = document.createElement("div");
        back.classList.add("back");
    
        const top = document.createElement("div");
        top.classList.add("top");
        const bottom = document.createElement("div");
        bottom.classList.add("bottom");
    
        const d1 = document.createElement("div");
        d1.classList.add("event-name");
        d1.textContent = ename;
    
        const d2 = document.createElement("div");
        d2.classList.add("event-date-time");
        d2.innerHTML = `<p>${dateTime}</p><p>${dateDay}</p>`;
    
        const d3 = document.createElement("div");
        d3.classList.add("event-location");
        d3.textContent = `Location: ${location}`;
    
        const d7 = document.createElement("div");
        d7.classList.add("event-description");
        d7.innerHTML = `<p>${description}</p>`;
    
        const d4 = document.createElement("div");
        d4.innerHTML = `<p>${status}</p>`;
        if(status.toLowerCase() === "finalized"){
            d4.classList.add("event-final");
        } else if(status.toLowerCase() === "planning"){
            d4.classList.add("event-planning");
        } else {
            d4.classList.add("event-cancelled");
        }

        const d5 = document.createElement("div");
        d5.classList.add("event-actions");
        d5.innerHTML = '<button class="agenda">Agenda</button> <button class="guest">Guest</button>';
    
        const d6 = document.createElement("div");
        d6.classList.add("event-edit");
        d6.innerHTML = '<button class="edit">Edit Event</button><button class="delete-event">Delete Event </button>';
    
        top.appendChild(d1);
        top.appendChild(d2);
        top.appendChild(d3);
        top.appendChild(d4);
        bottom.appendChild(d6);
    
        front.appendChild(top);
        front.appendChild(bottom);
        cardInner.appendChild(front);
    
        back.appendChild(d7);
        back.appendChild(d5);

        cardInner.appendChild(back);
        cardH.appendChild(cardInner);       
        gallery.appendChild(cardH);
    });


    
}

function deleteEvent(eventId : string){
    const userEvent  = getUserEvent(username!);
    if(userEvent){
        const update  = userEvent.filter(event => event.eventId !== eventId);
        updateUserList(username!, update);
        displayEvents(update);
    }
}


gallery.addEventListener("click", function (e: MouseEvent) {
    const target = e.target as HTMLElement | null;
    const card = target?.closest('.event-card') as HTMLElement | null;
    const eventId = card?.getAttribute('eventId');
    if (target && !target.closest('button')) {
        if (card) {
            card.classList.toggle('flipped');
        }
    } else if (target && target.matches('.event-card .delete-event')){
        if(card){
            if(eventId){
                if(confirm('Are you sure you want to delete the event')){
                    deleteEvent(eventId);
                }
            }
        }
    } else if(target && target.matches('.event-card .edit')){
        if(card){
            if(eventId){
                sessionStorage.setItem('EventId', eventId);
                console.log(eventId);
                window.location.href="./update-event.html";
            }
        }
    } else if(target && target.matches('.event-card .agenda')){
        if(card){
            if(eventId){
                sessionStorage.setItem('editEventId', eventId);
                window.location.href="./agenda.html";
            }
        }
    } else if(target && target.matches('.event-card .guest')){
        if(card){
            if(eventId){
                sessionStorage.setItem('editEventId',eventId);
                window.location.href="./guest-dashboard.html"
            }
        }
    }
    
});

            

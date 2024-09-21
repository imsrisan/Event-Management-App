import { Guest } from "../interfaces/guest";
import { getUserEvent } from "./saveUserEvent";


export function setGuests(eventId: string, guests: Guest[]): void {
    const storedGuests = getAllGuests();
    storedGuests[eventId] = guests;
    localStorage.setItem("guestList", JSON.stringify(storedGuests));
}


export function getGuests(eventId: string): Guest[] {
    const storedGuests = getAllGuests();
    return storedGuests[eventId] || [];
}

function getAllGuests(): { [key: string]: Guest[] } {
    const storedGuests = localStorage.getItem("guestList"); 
    return storedGuests ? JSON.parse(storedGuests) : {};
}

export function hasGuest(email : string, eventId : string) : boolean{
    const guest = getGuests(eventId);
    if(guest){
       if(guest.find(g => g.guestEmail === email)){
        return true;
       }
       return false;
    }
    return true;
}

export function guest(guestId : string, eventId : string) : Guest | undefined{
    return getGuests(eventId).find(g => g.guestId === guestId);
}

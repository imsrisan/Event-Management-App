import { AppEvent } from "../interfaces/event";


const eventListOfUsers : Map<string, AppEvent[]> = new Map();

export function userEventList(name : string, userevent: AppEvent) : void{
    let events = eventListOfUsers.get(name) || [];
    events.push(userevent);
    eventListOfUsers.set(name, events);
    const usereventMap = JSON.stringify([...eventListOfUsers]);
    localStorage.setItem('eventListOfUsers', usereventMap);
}


export function loadEventListFromLocalStorage(): void {
    const serializedMap = localStorage.getItem('eventListOfUsers');
    if (serializedMap) {
        const entries = JSON.parse(serializedMap) as [string, AppEvent[]][];
        eventListOfUsers.clear();
        entries.forEach(([key, value]) => {
            eventListOfUsers.set(key, value);
        });
    }
}


export function getUserEvent(name:string) : AppEvent[] | undefined{
    return eventListOfUsers.get(name);
}



export function hasEvent(name: string, date : Date): boolean {
    const events = eventListOfUsers.get(name);
    if (events) {
        return events.some(event => event.date === date);
    }
    return false;
}

export function updateEventById(username: string, updatedEvent: AppEvent): boolean {
    const userEvents = getUserEvent(username);
    if (userEvents) {
        const eventIndex = userEvents.findIndex(event => event.eventId === updatedEvent.eventId);
        if (eventIndex > -1) {
            userEvents[eventIndex] = updatedEvent;
            updateUserList(username, userEvents);
            return true;
        }
    }
    return false;
}

export function updateUserList(name: string, userEvents: AppEvent[]): void {
    let events = eventListOfUsers.get(name) || [];
    events = userEvents;
    eventListOfUsers.set(name, events);
    const userEventMap = JSON.stringify([...eventListOfUsers.entries()]);
    localStorage.setItem('eventListOfUsers', userEventMap);
}

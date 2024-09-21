/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./repo/category.ts":
/*!**************************!*\
  !*** ./repo/category.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getCategory = getCategory;
exports.setCategory = setCategory;
exports.updateCategory = updateCategory;
function getCategory() {
    const categoryList = localStorage.getItem('category');
    return categoryList ? JSON.parse(categoryList) : [];
}
function setCategory(category) {
    const categoryList = getCategory();
    if (categoryList.find(c => c === category)) {
        return false;
    }
    else {
        categoryList.push(category + "#@#" + Date.now().toString());
        localStorage.setItem('category', JSON.stringify(categoryList));
        return true;
    }
}
function updateCategory(category) {
    localStorage.setItem('category', JSON.stringify(category));
}


/***/ }),

/***/ "./repo/saveUserEvent.ts":
/*!*******************************!*\
  !*** ./repo/saveUserEvent.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.userEventList = userEventList;
exports.loadEventListFromLocalStorage = loadEventListFromLocalStorage;
exports.getUserEvent = getUserEvent;
exports.hasEvent = hasEvent;
exports.updateEventById = updateEventById;
exports.updateUserList = updateUserList;
const eventListOfUsers = new Map();
function userEventList(name, userevent) {
    let events = eventListOfUsers.get(name) || [];
    events.push(userevent);
    eventListOfUsers.set(name, events);
    const usereventMap = JSON.stringify([...eventListOfUsers]);
    localStorage.setItem('eventListOfUsers', usereventMap);
}
function loadEventListFromLocalStorage() {
    const serializedMap = localStorage.getItem('eventListOfUsers');
    if (serializedMap) {
        const entries = JSON.parse(serializedMap);
        eventListOfUsers.clear();
        entries.forEach(([key, value]) => {
            eventListOfUsers.set(key, value);
        });
    }
}
function getUserEvent(name) {
    return eventListOfUsers.get(name);
}
function hasEvent(name, date) {
    const events = eventListOfUsers.get(name);
    if (events) {
        return events.some(event => event.date === date);
    }
    return false;
}
function updateEventById(username, updatedEvent) {
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
function updateUserList(name, userEvents) {
    let events = eventListOfUsers.get(name) || [];
    events = userEvents;
    eventListOfUsers.set(name, events);
    const userEventMap = JSON.stringify([...eventListOfUsers.entries()]);
    localStorage.setItem('eventListOfUsers', userEventMap);
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it uses a non-standard name for the exports (exports).
(() => {
var exports = __webpack_exports__;
/*!*********************************!*\
  !*** ./user-modules/myevent.ts ***!
  \*********************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const category_1 = __webpack_require__(/*! ../repo/category */ "./repo/category.ts");
const saveUserEvent_1 = __webpack_require__(/*! ../repo/saveUserEvent */ "./repo/saveUserEvent.ts");
const username = sessionStorage.getItem('username');
const user = document.getElementById("name");
const addevent = document.getElementById("addevent");
const logout = document.getElementById("logout");
logout.addEventListener("click", function () {
    window.location.href = "../index.html";
});
const gallery = document.querySelector(".gallery");
const category = document.getElementById("category");
const filterByDate = document.getElementById("date");
const filterByCategory = document.getElementById("category");
const categories = (0, category_1.getCategory)();
categories.forEach(c => {
    const option = document.createElement("option");
    option.textContent = c.split("#@#")[0];
    category.appendChild(option);
});
const filterByStatus = document.getElementById("status");
const filterBysearch = document.getElementById("search");
if (username) {
    user.textContent = username;
    user.style.display = 'block';
}
addevent.addEventListener("click", function (e) {
    e.preventDefault();
    window.location.href = "./event-creation.html";
});
if (username) {
    (0, saveUserEvent_1.loadEventListFromLocalStorage)();
    const userEvent = (0, saveUserEvent_1.getUserEvent)(username);
    if (userEvent) {
        displayEvents(userEvent);
        filterByStatus.addEventListener("change", () => filterByStatusList(userEvent));
        filterByDate.addEventListener("change", () => filterByDateList(userEvent));
        filterByCategory.addEventListener("change", () => filterByCategoryList(userEvent));
        filterBysearch.addEventListener("keypress", event => {
            if (event.key === "Enter") {
                console.log("key Pressed");
                filterBysearchList(userEvent);
            }
        });
    }
}
function filterBysearchList(userEvent) {
    gallery.innerHTML = "";
    const search = filterBysearch.value;
    const userEventFilter = userEvent.filter(event => {
        return event.eventName.toLowerCase().includes(search);
    });
    displayEvents(userEventFilter);
}
function filterByCategoryList(userEvent) {
    const category = filterByCategory.value;
    if (category !== "all") {
        const userEventFilter = userEvent.filter(event => {
            console.log(category + "   " + event.category);
            return category === event.category;
        });
        displayEvents(userEventFilter);
    }
    else {
        displayEvents(userEvent);
    }
}
function filterByStatusList(userEvent) {
    const statusValue = filterByStatus.value;
    if (statusValue === "all") {
        displayEvents(userEvent);
    }
    else {
        const userEventFilter = userEvent.filter(event => event.status === statusValue);
        displayEvents(userEventFilter);
    }
}
function filterByDateList(userEvent) {
    const dateValue = filterByDate.value;
    gallery.innerHTML = "";
    const now = new Date();
    const userEventFilter = userEvent.filter(event => {
        const eventDate = new Date(event.date);
        if (dateValue === "today") {
            return isSameDay(eventDate, now);
        }
        else if (dateValue === "month") {
            return isSameMonth(eventDate, now);
        }
        else if (dateValue === "week") {
            return isSameWeek(eventDate, now);
        }
        else {
            return true;
        }
        return true;
    });
    displayEvents(userEventFilter);
}
function isSameDay(date1, date2) {
    return date1.getDate() === date2.getDate() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getFullYear() === date2.getFullYear();
}
function isSameMonth(date1, date2) {
    console.log(date1.getMonth() === date2.getMonth());
    console.log(date1.getMonth() + "   " + date2.getMonth() + 'This is a same month');
    return date1.getMonth() === date2.getMonth() + 1;
}
function isSameWeek(date1, date2) {
    const startOfWeek = getStartOfWeek(date2);
    const endOfWeek = getEndOfWeek(date2);
    return date1 >= startOfWeek && date1 <= endOfWeek;
}
function getStartOfWeek(date) {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(date.setDate(diff));
}
function getEndOfWeek(date) {
    const startOfWeek = getStartOfWeek(date);
    return new Date(startOfWeek.setDate(startOfWeek.getDate() + 6));
}
function displayEvents(events) {
    gallery.innerHTML = '';
    events === null || events === void 0 ? void 0 : events.forEach(event => {
        const ename = event.eventName;
        const date = new Date(event.date);
        const dateTime = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
        const dateDay = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear().toString()}`;
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
        if (status.toLowerCase() === "finalized") {
            d4.classList.add("event-final");
        }
        else if (status.toLowerCase() === "planning") {
            d4.classList.add("event-planning");
        }
        else {
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
function deleteEvent(eventId) {
    const userEvent = (0, saveUserEvent_1.getUserEvent)(username);
    if (userEvent) {
        const update = userEvent.filter(event => event.eventId !== eventId);
        (0, saveUserEvent_1.updateUserList)(username, update);
        displayEvents(update);
    }
}
gallery.addEventListener("click", function (e) {
    const target = e.target;
    const card = target === null || target === void 0 ? void 0 : target.closest('.event-card');
    const eventId = card === null || card === void 0 ? void 0 : card.getAttribute('eventId');
    if (target && !target.closest('button')) {
        if (card) {
            card.classList.toggle('flipped');
        }
    }
    else if (target && target.matches('.event-card .delete-event')) {
        if (card) {
            if (eventId) {
                if (confirm('Are you sure you want to delete the event')) {
                    deleteEvent(eventId);
                }
            }
        }
    }
    else if (target && target.matches('.event-card .edit')) {
        if (card) {
            if (eventId) {
                sessionStorage.setItem('EventId', eventId);
                console.log(eventId);
                window.location.href = "./update-event.html";
            }
        }
    }
    else if (target && target.matches('.event-card .agenda')) {
        if (card) {
            if (eventId) {
                sessionStorage.setItem('editEventId', eventId);
                window.location.href = "./agenda.html";
            }
        }
    }
    else if (target && target.matches('.event-card .guest')) {
        if (card) {
            if (eventId) {
                sessionStorage.setItem('editEventId', eventId);
                window.location.href = "./guest-dashboard.html";
            }
        }
    }
});

})();

/******/ })()
;
//# sourceMappingURL=myevents.bundle.js.map
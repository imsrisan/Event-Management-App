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
/*!**********************************!*\
  !*** ./user-modules/addevent.ts ***!
  \**********************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createEvent = createEvent;
const saveUserEvent_1 = __webpack_require__(/*! ../repo/saveUserEvent */ "./repo/saveUserEvent.ts");
const category_1 = __webpack_require__(/*! ../repo/category */ "./repo/category.ts");
const username = sessionStorage.getItem('username');
const eventName = document.getElementById("event-name");
const eventDate = document.getElementById("event-date");
const eventLocation = document.getElementById("location");
const eventCategory = document.getElementById("category");
const err = document.getElementById("error");
const categories = (0, category_1.getCategory)();
categories.forEach(c => {
    const option = document.createElement("option");
    option.textContent = c.split("#@#")[0];
    eventCategory.appendChild(option);
});
const eventDescription = document.getElementById("event-description");
const eventStatus = document.getElementById("status");
const saveButton = document.getElementById("save-event");
const user = document.getElementById("username");
const back = document.getElementById("backbtn");
back.addEventListener("click", function () {
    window.location.href = "./my-events.html";
});
document.addEventListener("DOMContentLoaded", function () {
    const now = new Date();
    const formattedDateTime = now.toISOString().slice(0, 16);
    eventDate.setAttribute("min", formattedDateTime);
});
user.textContent = username;
user.style.display = 'block';
saveButton.addEventListener("click", function (event) {
    event.preventDefault();
    const eventId = Date.now().toString();
    const name = eventName.value;
    const date = new Date(eventDate.value);
    const location = eventLocation.value;
    const category = eventCategory.value;
    const description = eventDescription.value;
    const status = eventStatus.value;
    if (name === "" || eventDate.value === "" || location === "" || category === "Event category" || description === "" || status === "Event Status") {
        err.textContent = ".........Enter ALL DETAILS........";
        return;
    }
    else {
        const newEvent = createEvent(eventId, name, date, location, category, description, status);
        (0, saveUserEvent_1.loadEventListFromLocalStorage)();
        if (username) {
            if ((0, saveUserEvent_1.hasEvent)(username, newEvent.date)) {
                err.textContent = "Event is already saved.";
            }
            else {
                (0, saveUserEvent_1.userEventList)(username, newEvent);
                err.textContent = "Event Added!...Ready to Celebrate...Huraaahhhh";
                window.location.href = "./my-events.html";
            }
        }
    }
});
function createEvent(eventId, eventName, date, location, category, description, status) {
    const newEvent = {
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

})();

/******/ })()
;
//# sourceMappingURL=addevent.bundle.js.map
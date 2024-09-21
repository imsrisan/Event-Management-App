/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./repo/guestList.ts":
/*!***************************!*\
  !*** ./repo/guestList.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.setGuests = setGuests;
exports.getGuests = getGuests;
exports.hasGuest = hasGuest;
exports.guest = guest;
function setGuests(eventId, guests) {
    const storedGuests = getAllGuests();
    storedGuests[eventId] = guests;
    localStorage.setItem("guestList", JSON.stringify(storedGuests));
}
function getGuests(eventId) {
    const storedGuests = getAllGuests();
    return storedGuests[eventId] || [];
}
function getAllGuests() {
    const storedGuests = localStorage.getItem("guestList");
    return storedGuests ? JSON.parse(storedGuests) : {};
}
function hasGuest(email, eventId) {
    const guest = getGuests(eventId);
    if (guest) {
        if (guest.find(g => g.guestEmail === email)) {
            return true;
        }
        return false;
    }
    return true;
}
function guest(guestId, eventId) {
    return getGuests(eventId).find(g => g.guestId === guestId);
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
/*!*************************************!*\
  !*** ./user-modules/guestManage.ts ***!
  \*************************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const guestList_1 = __webpack_require__(/*! ../repo/guestList */ "./repo/guestList.ts");
const guestName = document.getElementById("guest-name");
const guestEmail = document.getElementById("guest-email");
const guestStatus = document.getElementById("guest-status");
const eventId = sessionStorage.getItem('editEventId');
const guestList = document.getElementById("guest-list");
const addguest = document.getElementById("add-guest");
addguest.addEventListener("click", function () {
    window.location.href = "../dist/add-guest.html";
});
const back = document.getElementById("back");
back.addEventListener("click", function () {
    window.location.href = "./my-events.html";
});
const guests = (0, guestList_1.getGuests)(eventId);
displayGuest(guests);
const save = document.getElementById("save");
function displayGuest(guest) {
    guestList.innerHTML = "";
    guest.forEach(g => {
        const tr = document.createElement("tr");
        tr.classList.add("tr");
        tr.setAttribute("guestId", g.guestId);
        const td1 = document.createElement("td");
        td1.textContent = g.guestName;
        const td2 = document.createElement("td");
        td2.textContent = g.guestEmail;
        const td3 = document.createElement("td");
        td3.innerHTML = `<p><button> Send Invite </button></p>`;
        const td4 = document.createElement("td");
        if (g.guestStatus === "Accepted") {
            td4.classList.add("accepted");
        }
        else if (g.guestStatus === "Pending") {
            td4.classList.add("pending");
        }
        else {
            td4.classList.add("cancelled");
        }
        td4.innerHTML = `<p>${g.guestStatus}</p>`;
        const td5 = document.createElement("td");
        td5.innerHTML = '<p><Button class="edit">Edit</Button></p>';
        const td6 = document.createElement("td");
        td6.innerHTML = '<p><Button class="delete">Delete</Button></p>';
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        tr.appendChild(td6);
        guestList.appendChild(tr);
    });
}
guestList.addEventListener("click", function (event) {
    const target = event.target;
    const tr = target === null || target === void 0 ? void 0 : target.closest("tr");
    const guests = (0, guestList_1.getGuests)(eventId);
    const guestId = tr === null || tr === void 0 ? void 0 : tr.getAttribute("guestId");
    if (target && target.matches(".edit")) {
        console.log("Im invoked");
        sessionStorage.setItem('guestId', guestId);
        window.location.href = "./update-guest.html";
        displayGuest((0, guestList_1.getGuests)(eventId));
    }
    else if (target && target.matches(".delete")) {
        const updated = guests.filter(g => g.guestId !== guestId);
        if (confirm("Are you sure you need delete guest?")) {
            (0, guestList_1.setGuests)(eventId, updated);
            displayGuest(updated);
        }
    }
});

})();

/******/ })()
;
//# sourceMappingURL=manageguest.bundle.js.map
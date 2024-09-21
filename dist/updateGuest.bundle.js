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
  !*** ./user-modules/updateGuest.ts ***!
  \*************************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const guestList_1 = __webpack_require__(/*! ../repo/guestList */ "./repo/guestList.ts");
const guestName = document.getElementById("guest-name");
const guestEmail = document.getElementById("guest-email");
const guestStatus = document.getElementById("guest-status");
const eventId = sessionStorage.getItem('editEventId');
const save = document.getElementById("save");
const err = document.getElementById("error");
const back = document.getElementById("back");
if (back) {
    back.addEventListener("click", function () {
        window.location.href = "./guest-dashboard.html";
    });
}
const guestId = sessionStorage.getItem('guestId');
if (guestId) {
    const guest1 = (0, guestList_1.guest)(guestId, eventId);
    guestName.value = guest1.guestName;
    guestEmail.value = guest1.guestEmail;
    guestStatus.value = guest1.guestStatus;
}
save.addEventListener("click", function () {
    if (guestName.value === "" || guestEmail.value === "" || guestStatus.value === "") {
        err.textContent = "Fill the required details";
        return;
    }
    const guest = (0, guestList_1.getGuests)(eventId);
    const updates = guest.filter(g => g.guestId != guestId);
    const update = {
        guestId: guestId,
        guestName: guestName.value,
        guestEmail: guestEmail.value,
        guestStatus: guestStatus.value
    };
    updates.push(update);
    (0, guestList_1.setGuests)(eventId, updates);
    window.location.href = "./guest-dashboard.html";
});

})();

/******/ })()
;
//# sourceMappingURL=updateGuest.bundle.js.map
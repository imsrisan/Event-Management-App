/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./repo/agendaList.ts":
/*!****************************!*\
  !*** ./repo/agendaList.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.setAgenda = setAgenda;
exports.getAgenda = getAgenda;
function setAgenda(eventId, agendaDescription) {
    const storedAgenda = localStorage.getItem('agendaList');
    const agendaList = storedAgenda ? JSON.parse(storedAgenda) : {};
    agendaList[eventId] = agendaDescription;
    localStorage.setItem('agendaList', JSON.stringify(agendaList));
}
function getAgenda(eventId) {
    const storedAgenda = localStorage.getItem('agendaList');
    const agendaList = storedAgenda ? JSON.parse(storedAgenda) : {};
    return agendaList[eventId] || null;
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
/*!********************************!*\
  !*** ./user-modules/agenda.ts ***!
  \********************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const agendaList_1 = __webpack_require__(/*! ../repo/agendaList */ "./repo/agendaList.ts");
const agendaDescription = document.getElementById("agenda-description");
const startTime = document.getElementById("start-time");
const endTime = document.getElementById("end-time");
const save = document.getElementById("save-agenda");
const descriptionDiv = document.getElementById("criteria");
const eventId = sessionStorage.getItem('editEventId');
const err = document.getElementById("error");
displayAgenda();
save.addEventListener("click", function () {
    const description = agendaDescription.value;
    const start = startTime.value;
    const end = endTime.value;
    if (description && start && end) {
        (0, agendaList_1.setAgenda)(eventId, `${description} (Start-Time: ${start}, End-Time: ${end})`);
        err.textContent = "Agenda has been updated!";
        agendaDescription.value = '';
        startTime.value = '';
        endTime.value = '';
        displayAgenda();
    }
    else {
        err.textContent = "Please fill out all fields.";
    }
});
function displayAgenda() {
    const agenda = (0, agendaList_1.getAgenda)(eventId);
    err.textContent = "";
    if (agenda) {
        descriptionDiv.innerHTML = `<p>${agenda}</p>`;
    }
    else {
        descriptionDiv.innerHTML = '<p>No agenda found.</p>';
    }
}

})();

/******/ })()
;
//# sourceMappingURL=agenda.bundle.js.map
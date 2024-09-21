/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./repo/userlist.ts":
/*!**************************!*\
  !*** ./repo/userlist.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getUsers = getUsers;
exports.setUsers = setUsers;
exports.updatedUser = updatedUser;
exports.getUserById = getUserById;
exports.updateUser = updateUser;
function getUsers() {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
}
function setUsers(newUser) {
    const users = getUsers();
    if (users.find(u => u.email === newUser.email)) {
        return false;
    }
    else {
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        return true;
    }
}
function updatedUser(users) {
    localStorage.setItem('users', JSON.stringify(users));
    console.log("done");
}
function getUserById(id) {
    const users = getUsers();
    const user = users.find(u => u.id === id);
    return user ? user : null;
}
function filterByid(id) {
    const users = getUsers();
    return users.filter(u => u.id !== id);
}
function updateUser(user, id) {
    const users = filterByid(id);
    users.push(user);
    updatedUser(users);
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
  !*** ./admin-modules/addUser.ts ***!
  \**********************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const userlist_1 = __webpack_require__(/*! ../repo/userlist */ "./repo/userlist.ts");
const admin = sessionStorage.getItem('admin');
if (admin) {
    const username = document.getElementById("name");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const role = document.getElementById("role");
    const save = document.querySelector(".registerbtn");
    const err = document.getElementById("error");
    save.addEventListener("click", function () {
        let name = username.value;
        let mail = email.value;
        let pass = password.value;
        let rol = role.value;
        if (name === "" || mail === "" || pass === "" || rol === "") {
            err.textContent = "Enter All Details";
            return;
        }
        const newUser = {
            id: Date.now().toString(),
            username: name,
            email: mail,
            password: pass,
            role: rol
        };
        if ((0, userlist_1.setUsers)(newUser)) {
            err.textContent = "New User is Added";
        }
        else {
            err.textContent = "User Already found";
        }
    });
}

})();

/******/ })()
;
//# sourceMappingURL=addUser.bundle.js.map
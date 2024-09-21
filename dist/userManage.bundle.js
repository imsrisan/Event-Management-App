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
/*!*************************************!*\
  !*** ./admin-modules/userManage.ts ***!
  \*************************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const userlist_1 = __webpack_require__(/*! ../repo/userlist */ "./repo/userlist.ts");
const admin = sessionStorage.getItem('admin');
const username = document.querySelector(".admin");
username.innerHTML = `<p>${admin}</p>`;
if (admin) {
    const users = document.querySelector(".list");
    const categoryPage = document.querySelector(".category");
    categoryPage.addEventListener("click", function () {
        window.location.href = "./add-category.html";
    });
    const addUser = document.getElementById("add-user");
    addUser.addEventListener("click", function () {
        window.location.href = "./add-user.html";
    });
    let userList = (0, userlist_1.getUsers)();
    displayUsers(userList);
    function displayUsers(userList) {
        users.innerHTML = '';
        userList.forEach(u => {
            const parent = document.createElement("div");
            parent.classList.add("parent");
            const left = document.createElement("div");
            left.classList.add("left");
            const right = document.createElement("div");
            right.classList.add("right");
            const userid = document.createElement("div");
            userid.textContent = u.role;
            parent.setAttribute("userId", u.id);
            const username = document.createElement("div");
            username.textContent = u.username;
            const useremail = document.createElement("div");
            parent.setAttribute("email", u.email);
            useremail.textContent = u.email;
            const useredit = document.createElement("div");
            useredit.innerHTML = `<button class="edit">Edit</button>`;
            const userdelete = document.createElement("div");
            userdelete.innerHTML = `<button class="delete">Delete</button>`;
            left.appendChild(userid);
            left.appendChild(username);
            left.appendChild(useremail);
            right.appendChild(useredit);
            right.appendChild(userdelete);
            parent.appendChild(left);
            parent.appendChild(right);
            users.appendChild(parent);
        });
    }
    users.addEventListener("click", function (event) {
        const target = event.target;
        const parent = target === null || target === void 0 ? void 0 : target.closest(".parent");
        if (target && target.matches(".edit")) {
            const userId = parent.getAttribute('userId');
            sessionStorage.setItem('userId', userId);
            window.location.href = 'update-user.html';
        }
        if (target && target.matches(".delete")) {
            const status = confirm("Are you sure you want to delete a user");
            if (status) {
                userList = userList.filter(user => user.email !== parent.getAttribute('email'));
                displayUsers(userList);
                (0, userlist_1.updatedUser)(userList);
            }
        }
    });
    const logout = document.getElementById("logout");
    logout.addEventListener("click", function () {
        sessionStorage.clear();
        window.location.replace('../index.html');
    });
    const backUp = document.getElementById("backup");
    const restore = document.getElementById("restore");
    const fileInput = document.getElementById("file-input");
    backUp.addEventListener("click", function () {
        backupLocalStorage();
    });
    restore.addEventListener("click", function () {
        fileInput.click();
    });
    fileInput.addEventListener("change", function (event) {
        var _a;
        const file = (_a = event.target.files) === null || _a === void 0 ? void 0 : _a[0];
        if (file) {
            restoreLocalStorage(file);
        }
    });
    function backupLocalStorage() {
        const keys = Object.keys(localStorage);
        const backupData = {};
        keys.forEach(key => {
            backupData[key] = localStorage.getItem(key);
        });
        const jsonBackupData = JSON.stringify(backupData, null, 2);
        const blob = new Blob([jsonBackupData], { type: 'application/json' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'backup.json';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        alert('Backup completed and saved as file');
    }
    function restoreLocalStorage(file) {
        const reader = new FileReader();
        reader.onload = function (event) {
            var _a;
            const backupData = JSON.parse((_a = event.target) === null || _a === void 0 ? void 0 : _a.result);
            Object.keys(backupData).forEach(key => {
                localStorage.setItem(key, backupData[key]);
            });
            alert('Restore completed successfully');
            window.location.reload();
        };
        reader.readAsText(file);
    }
}

})();

/******/ })()
;
//# sourceMappingURL=userManage.bundle.js.map
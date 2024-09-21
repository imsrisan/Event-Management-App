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
/*!**************************************!*\
  !*** ./admin-modules/addCategory.ts ***!
  \**************************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const category_1 = __webpack_require__(/*! ../repo/category */ "./repo/category.ts");
const admin = sessionStorage.getItem('admin');
if (admin) {
    const newCategory = document.getElementById("add-category");
    const add = document.getElementById("add");
    const err = document.getElementById("error");
    let listOfcategory = (0, category_1.getCategory)();
    listOfcategory.forEach(c => console.log(c));
    const table = document.getElementById("table");
    displayCategory(listOfcategory);
    let editingCategoryId = null;
    function displayCategory(listOfcategory) {
        table.innerHTML = "";
        err.textContent = "";
        listOfcategory.forEach(c => {
            const row = document.createElement("tr");
            row.classList.add("row");
            row.setAttribute('category', c.split("#@#")[1]);
            row.setAttribute('categoryname', c.split("#@#")[0]);
            const action = document.createElement("td");
            const data = document.createElement("td");
            action.style.textAlign = 'left';
            action.style.paddingLeft = '20px';
            data.innerHTML = `
                <button class="edit">Edit</button>
                <button class="delete">Delete</button>`;
            action.innerHTML = `<p>${c.split("#@#")[0]}</p>`;
            row.appendChild(action);
            row.appendChild(data);
            table.appendChild(row);
        });
    }
    function loadData() {
        const categories = (0, category_1.getCategory)();
        displayCategory(categories);
    }
    add.addEventListener("click", function () {
        const category = newCategory.value.trim();
        if (category === "") {
            err.textContent = "Category cannot be empty";
            return;
        }
        const categories = (0, category_1.getCategory)();
        if (editingCategoryId) {
            const existingCategory = categories.find(c => c.split("#@#")[0] === category);
            if (!existingCategory || existingCategory.split("#@#")[1] === editingCategoryId) {
                const updatedCategories = categories.map(c => {
                    const [catName, catId] = c.split("#@#");
                    if (catId === editingCategoryId) {
                        return `${category}#@#${catId}`;
                    }
                    return c;
                });
                (0, category_1.updateCategory)(updatedCategories);
                err.textContent = "Category updated successfully";
                loadData();
                editingCategoryId = null;
            }
            else {
                err.textContent = "Category already exists";
            }
        }
        else {
            if (!categories.find(c => c.split("#@#")[0] === category)) {
                if ((0, category_1.setCategory)(category)) {
                    loadData();
                    err.textContent = "Category added successfully";
                }
            }
            else {
                err.textContent = "Category already exists";
            }
        }
        newCategory.value = "";
    });
    table.addEventListener("click", function (event) {
        const target = event.target;
        const row = target === null || target === void 0 ? void 0 : target.closest(".row");
        const category = row === null || row === void 0 ? void 0 : row.getAttribute('category');
        const categoryname = row === null || row === void 0 ? void 0 : row.getAttribute('categoryname');
        if (target === null || target === void 0 ? void 0 : target.classList.contains("delete")) {
            if (confirm("Are you sure you want to delete the category?")) {
                const categories = (0, category_1.getCategory)();
                const remainingCategories = categories.filter(c => c.split("#@#")[0] !== categoryname);
                (0, category_1.updateCategory)(remainingCategories);
                displayCategory(remainingCategories);
                err.textContent = "Category deleted successfully";
            }
        }
        if (target === null || target === void 0 ? void 0 : target.classList.contains("edit")) {
            console.log("Editing category");
            newCategory.value = categoryname || "";
            editingCategoryId = category || null;
            err.textContent = "";
        }
    });
}

})();

/******/ })()
;
//# sourceMappingURL=addCategory.bundle.js.map
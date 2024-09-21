import { getCategory, setCategory, updateCategory } from "../repo/category";
const admin = sessionStorage.getItem('admin');

if (admin) {

    const newCategory = document.getElementById("add-category") as HTMLInputElement;
    const add = document.getElementById("add") as HTMLButtonElement;
    const err = document.getElementById("error") as HTMLParagraphElement;

    let listOfcategory: string[] = getCategory();
    listOfcategory.forEach(c => console.log(c));

    const table = document.getElementById("table") as HTMLTableElement;
    displayCategory(listOfcategory);

    let editingCategoryId: string | null = null;

    function displayCategory(listOfcategory: string[]): void {
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
        const categories = getCategory();
        displayCategory(categories);
    }

    add.addEventListener("click", function () {
        const category = newCategory.value.trim();

        if (category === "") {
            err.textContent = "Category cannot be empty";
            return;
        }

        const categories = getCategory();

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

                updateCategory(updatedCategories);
                err.textContent = "Category updated successfully";
                loadData();
                editingCategoryId = null; 
            } else {
                err.textContent = "Category already exists";
            }
        } else {
            if (!categories.find(c => c.split("#@#")[0] === category)) {
                if (setCategory(category)) {
                    loadData();
                    err.textContent = "Category added successfully";
                }
            } else {
                err.textContent = "Category already exists";
            }
        }

        newCategory.value = ""; 
    });

    table.addEventListener("click", function (event) {
        const target = event.target as HTMLElement | null;
        const row = target?.closest(".row");
        const category = row?.getAttribute('category'); 
        const categoryname = row?.getAttribute('categoryname');

        if (target?.classList.contains("delete")) {
            if (confirm("Are you sure you want to delete the category?")) {
                const categories = getCategory();
                const remainingCategories = categories.filter(c => c.split("#@#")[0] !== categoryname);
                updateCategory(remainingCategories);
                displayCategory(remainingCategories);
                err.textContent = "Category deleted successfully";
            }
        }

        if (target?.classList.contains("edit")) {
            console.log("Editing category");
            newCategory.value = categoryname || ""; 
            editingCategoryId = category || null;
            err.textContent = ""; 
        }
    });
}

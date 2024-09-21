import { User } from "../interfaces/User";
import { getUsers, updatedUser } from "../repo/userlist";

const admin = sessionStorage.getItem('admin');


const username = document.querySelector(".admin") as HTMLDivElement;
username.innerHTML = `<p>${admin}</p>`;

if(admin){
    const users = document.querySelector(".list") as HTMLDivElement;
    
    const categoryPage = document.querySelector(".category") as HTMLButtonElement;
    
    categoryPage.addEventListener("click", function(){
        window.location.href="./add-category.html";
    });
    
    const addUser = document.getElementById("add-user") as HTMLButtonElement;
    
    addUser.addEventListener("click", function(){
        window.location.href="./add-user.html";
    })
    
    let userList : User[] = getUsers();
    
    displayUsers(userList);
    
    function displayUsers(userList : User[]){
        users.innerHTML = '';
        userList.forEach(u =>{
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
            
        })
    }
    
    users.addEventListener("click", function(event){
        const target = event.target as HTMLElement | null;
        const parent = target?.closest(".parent") as HTMLDivElement;
        if(target && target.matches(".edit")){
            const userId = parent.getAttribute('userId');
            sessionStorage.setItem('userId', userId!);
            window.location.href='update-user.html';
        }
        if(target && target.matches(".delete")){
            const status = confirm("Are you sure you want to delete a user");
            if(status){
                userList = userList.filter(user => user.email !== parent.getAttribute('email'));
                displayUsers(userList);
                updatedUser(userList);
            }    
        }
    })
    
    const logout = document.getElementById("logout") as HTMLButtonElement;
    
    logout.addEventListener("click", function(){
        sessionStorage.clear();
        window.location.replace('../index.html');
    })
    
    const backUp = document.getElementById("backup") as HTMLButtonElement;
    const restore = document.getElementById("restore") as HTMLButtonElement;
    const fileInput = document.getElementById("file-input") as HTMLInputElement;
    
    backUp.addEventListener("click", function() {
        backupLocalStorage();
    });
    
    restore.addEventListener("click", function() {
        fileInput.click();
    });
    
    fileInput.addEventListener("change", function(event) {
        const file = (event.target as HTMLInputElement).files?.[0];
        if (file) {
            restoreLocalStorage(file);
        }
    });
    
    
    function backupLocalStorage(): void {
        const keys = Object.keys(localStorage);
        const backupData: { [key: string]: any } = {};
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
    
    function restoreLocalStorage(file: File): void {
        const reader = new FileReader();
    
        reader.onload = function(event) {
            const backupData = JSON.parse(event.target?.result as string);
            Object.keys(backupData).forEach(key => {
                localStorage.setItem(key, backupData[key]);
            });
            alert('Restore completed successfully');
            window.location.reload();
        };
    
        reader.readAsText(file);
    }
}

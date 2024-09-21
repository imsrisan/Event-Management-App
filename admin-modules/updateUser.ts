import { User } from "../interfaces/User";
import { getUserById, setUsers, updateUser } from "../repo/userlist";

const admin = sessionStorage.getItem('admin');
if(admin){
    const userId = sessionStorage.getItem('userId')!;
    const user = getUserById(userId);
    const username = document.getElementById("name") as HTMLInputElement;
    username.value = user!.username;
    const email = document.getElementById("email") as HTMLInputElement;
    email.value = user!.email;
    const password = document.getElementById("password") as HTMLInputElement;
    password.value = user!.password;

    const role = document.getElementById("role") as HTMLSelectElement;
    role.value = user!.role;
    
    const save = document.querySelector(".registerbtn") as HTMLButtonElement;
    const err = document.getElementById("error") as HTMLDivElement;
    
    
    save.addEventListener("click", function(e){
        e.preventDefault();
        let name = username.value;
        let mail = email.value;
        let pass = password.value;
    
        if (!name || !mail || !pass) {
            err.textContent = "All fields are required.";
            return;
        }
    
        const newUser : User = {
            id : userId,
            username : name,
            email : mail,
            password : pass,
            role : role.value
        }
    
        updateUser(newUser, userId);
        err.textContent = "Update-Completed";
    })
}
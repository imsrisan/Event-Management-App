import { User } from "../interfaces/User";
import { setUsers } from "../repo/userlist";

const admin = sessionStorage.getItem('admin');

if(admin){
    const username = document.getElementById("name") as HTMLInputElement;
    const email = document.getElementById("email") as HTMLInputElement;
    const password = document.getElementById("password") as HTMLInputElement;
    const role = document.getElementById("role") as HTMLSelectElement;
    
    const save = document.querySelector(".registerbtn") as HTMLButtonElement;

    const err = document.getElementById("error") as HTMLDivElement;
    
    save.addEventListener("click", function(){
        let name = username.value;
        let mail = email.value;
        let pass = password.value;
        let rol = role.value;

        if(name === "" || mail === "" || pass === "" || rol === ""){
            err.textContent = "Enter All Details";
            return;
        }
    
        const newUser : User = {
            id : Date.now().toString(),
            username : name,
            email : mail,
            password : pass,
            role : rol
        }
    
        if(setUsers(newUser)){
            err.textContent = "New User is Added";
        } else {
            err.textContent = "User Already found";
        }
    })
}
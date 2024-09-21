import { User } from '../interfaces/User';
import { setUsers } from '../repo/userlist';

const nameInput = document.getElementById("name") as HTMLInputElement;
const email = document.getElementById("email") as HTMLInputElement;
const  password = document.getElementById("password") as HTMLInputElement;
const  confirmPassword = document.getElementById("confirm-password") as HTMLInputElement;

const submitDetails = document.querySelector(".registerbtn") as HTMLButtonElement;
const err = document.getElementById("error") as HTMLDivElement;

submitDetails.addEventListener("click", function(event){

    event.preventDefault();

    const name : string = nameInput.value.trim();
    const mail : string = email.value.trim();
    const pass : string = password.value;
    const conPas : string = confirmPassword.value;
    if(name == ""){
        err.textContent = "Invalid Username";
        return;
    }

    if(!mail.includes("@")){
        err.textContent = "Invalid email";
        return;
    }

    if(pass == "" || pass != conPas){
        err.textContent = "Invalid password";
        return;
    }

    const newUser : User = {
        id : Date.now().toString(),
        username : name,
        email : mail,
        password : pass,
        role : "user"
    };

    registerUser(newUser);
})

function registerUser(user: User) : void{

   if(!setUsers(user)){
        err.textContent = "User already found";
        return;
   } else {
        window.alert("User Registered Successfully");
        sessionStorage.setItem('username', user.username);
        window.location.href="./my-events.html";
   }
}


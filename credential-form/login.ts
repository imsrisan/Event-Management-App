import { User } from '../interfaces/User';
import { getUsers } from '../repo/userlist';

const email = document.getElementById("email") as HTMLInputElement;
const password = document.getElementById("password") as HTMLInputElement;
const login = document.querySelector(".loginbtn") as HTMLButtonElement;
const err = document.getElementById("error") as HTMLDivElement;

login.addEventListener("click", function(event) {
    event.preventDefault();
    err.textContent = "";

    const userList = getUsers();
    const mail = email.value.trim();
    const pass = password.value.trim();

    if (mail === "admin@gmail.com" && pass === "admin") {
        sessionStorage.setItem('admin', "admin");
        alert("Login Successful");
        window.location.assign("dist/admin-dashboard.html");
        return;
    }

    const user = userList.find(u => u.email === mail && u.password === pass);

    if (user) {
        sessionStorage.setItem('username', user.username);
        alert("Login Successful");
        if (user.role === "admin") {
            sessionStorage.setItem('admin', user.username);
            window.location.href = "dist/admin-dashboard.html";
        } else {
            window.location.href = "dist/my-events.html";
        }
    } else {
        err.textContent = "Invalid Email or Password";
    }
});

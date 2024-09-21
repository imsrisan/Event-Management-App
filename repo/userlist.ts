import { User } from "../interfaces/User";


export function getUsers() : User[]{

    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
}

export function setUsers(newUser : User) : boolean{
    const users = getUsers();
    if(users.find(u => u.email === newUser.email)){
        return false;
    } else {
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        return true;
    }
}

export function updatedUser(users : User[]){
    localStorage.setItem('users', JSON.stringify(users));
    console.log("done");
}

export function getUserById(id : string) : User | null{
    const users = getUsers();
    const user = users.find(u => u.id === id);
    return user? user : null;
}

function filterByid(id : string) : User[]{
    const users = getUsers();
    return users.filter(u => u.id !== id);
}

export function updateUser(user : User, id : string) : void {
    const users = filterByid(id);
    users.push(user);
    updatedUser(users);
}


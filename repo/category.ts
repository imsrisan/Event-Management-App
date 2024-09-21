

export function getCategory() : string[]{

    const categoryList = localStorage.getItem('category');
    return categoryList ? JSON.parse(categoryList) : [];

}

export function setCategory(category : string) : boolean{

    const categoryList = getCategory();
    if(categoryList.find(c => c === category)){
        return false;
    } else {
        categoryList.push(category+"#@#"+Date.now().toString());
        localStorage.setItem('category', JSON.stringify(categoryList));
        return true;
    }
}

export function updateCategory(category : string []) : void{
    localStorage.setItem('category', JSON.stringify(category));
}

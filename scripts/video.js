// load and display categories from api start
// loadCategories start 
const loadCategories = async () => {
    try {
        const res = await fetch(`https://openapi.programming-hero.com/api/phero-tube/categories`);
        if(!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        displayCategories(data.categories);
    }
    catch(err) {
        console.log(err);
    }
    // fetch(`https://openapi.programming-hero.com/api/phero-tube/categories`)
    // .then(res => res.json())
    // .then(data => console.log(data))
}
// loadCategories end 

// displayCategories start 
const displayCategories = (categories) => {
    categories.forEach(category =>{
        // console.log(category.category);
        const button = document.createElement('button');
        button.className = "btn text-[#252525B3] font-[600] text-[1rem]";
        button.innerText = category.category;
        const categoryContainer = document.querySelector("#categories");
        categoryContainer.appendChild(button);
    })
}
// displayCategories end 

// calling loadCategories function 
loadCategories();

// load and display categories from api end 
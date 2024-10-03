// convert second to hours,minutes, second function start 
const convertTimeHMS = (seconds) => {
    const second = seconds;
    const date = new Date(second * 1000);

    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const secs = date.getUTCSeconds();
    return `${hours}hrs ${minutes}min ago`
}

// convert second to hours,minutes, second function end 

// remove all active class function start 
const removeActiveClass = () => {
    const btnContainer = document.querySelectorAll(".category-btn");
    for (const btn of btnContainer) {
        btn.classList.remove("active");
    }
}
// remove all active class function end 

// category wise loading videos start 
const categoryWiseLoadData = async (category_id) => {
    if (category_id === "all") {
        document.querySelector("#videos").innerHTML = "";
        loadVideos();
        return
    }
    const res = await fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${category_id}`);
    const data = await res.json();
    // remove active class from all category btn 
    displayVideos(data.category);
    removeActiveClass();
    const activeBtn = document.querySelector(`#btn-${category_id}`);
    activeBtn.classList.add("active");
}
// category wise loading videos end 


// load and display categories from api start
// loadCategories start 
const loadCategories = async () => {
    try {
        const res = await fetch(`https://openapi.programming-hero.com/api/phero-tube/categories`);
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        displayCategories(data.categories);
    }
    catch (err) {
        console.log(err);
    }
    // fetch(`https://openapi.programming-hero.com/api/phero-tube/categories`)
    // .then(res => res.json())
    // .then(data => console.log(data))
}
// loadCategories end 


// displayCategories start 
const displayCategories = (categories) => {
    const categoryContainer = document.querySelector("#categories");
    categories.forEach(category => {
        // console.log(category.category);
        const buttonContainer = document.createElement('div');
        buttonContainer.innerHTML = `
            <button id="btn-${category.category_id}" onclick='categoryWiseLoadData(${category.category_id})' class="btn font-[600] text-[1rem] category-btn">${category.category}</button>
        `
        // button.className = "btn text-[#252525B3] font-[600] text-[1rem]";
        // button.innerText = category.category;
        categoryContainer.appendChild(buttonContainer);
    })
}
// displayCategories end 
// load and display categories from api end 

// load videos and display start 

const loadVideos = async (title = "") => {
    try {
        const res = await fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${title}`);
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        displayVideos(data.videos)
    }
    catch (err) {
        console.log(err);
    }
}
// load details function start 
const loadDetails = async (videoId) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`);
    const data = await res.json();
    displayDetails(data.video);
}
// load details function end 

// display details video function start
const displayDetails = (video) => {
    // console.log(video);
    const detailsContainer = document.querySelector("#modal-content");
    detailsContainer.innerHTML = `
        <img class="h-[70%] w-full rounded-t-lg object-cover" src="${video.thumbnail}" alt="" />
        <div class="px-0 py-3 flex gap-5 mb-3">
            <div>
                <img class="rounded-[50%] w-24 h-24 object-cover" src="${video?.authors[0]?.profile_picture}" alt="">
            </div>
            <div>
                <h2 class=" font-[700] text-[#171717] text-2xl">${video.title}</h2>
                <div class="flex gap-2 items-center">
                    <p class="text-[#171717B3] font-[500] text-xl">${video?.authors[0]?.profile_name} </p>
                    ${video?.authors[0]?.verified
            ? `<img class="w-5 h-5" src="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png" alt=''>`
            : ""}
                      
                </div>
                <p class="text-[#171717B3] font-[500] mb-2 text-xl">${video?.others?.views}</p>
            </div>
        </div>
        <div>
            <h3 class="text-xl font-[700] mb-2">Description : </h3>
            <p>${video.description}</p>
        </div>
    `

    // calling modal ways 
    // way-1 
    // document.querySelector('#showModalBtn').click();
    // way-2 
    // detailModal.showModal();
    // way-3 
    document.querySelector('#detailModal').showModal();
}
// display details video function end 

const displayVideos = (videos) => {
    document.querySelector("#videos").innerHTML = "";
    const videoContainer = document.querySelector("#videos");
    if (videos.length === 0) {
        videoContainer.classList.remove('grid');
        videoContainer.innerHTML = `
            <div class=" flex justify-center items-center py-5">
                <img class="w-[25%]" src="./assets/error_icon.png" alt="">
            </div>
            <h2 class="text-[#171717] text-center font-[700] text-[2rem] w-[25%] mx-auto">Oops!! Sorry, There is no content here</h2>
        `
        return
    }
    else {
        videoContainer.classList.add('grid');
    }
    videos.forEach(video => {
        // console.log(parseFloat(video.others.views) * 1000);
        const div = document.createElement("div");
        div.classList = "card card-compact bg-base-100 rounded-none";
        div.innerHTML = `
        <figure class="h-48 relative">
            <img
            class="h-full w-full rounded-t-lg object-cover"
            src="${video?.thumbnail}"
            alt="${video?.title}" />
            ${video?.others?.posted_date ? `<span class="bg-[#171717] text-white p-1 bottom-3 right-3 rounded absolute">${convertTimeHMS(video?.others?.posted_date)}</span>` : ""}
            
        </figure>
        <div class="px-0 py-3 flex gap-3">
            <div>
                <img class="rounded-[50%] w-10 h-10 object-cover" src="${video?.authors[0]?.profile_picture}" alt="">
            </div>
            <div>
                <h2 class=" font-[700] text-[#171717]">${video.title}</h2>
                <div class="flex gap-2 items-center">
                    <p class="text-[#171717B3] font-[500]">${video?.authors[0]?.profile_name} </p>
                    ${video?.authors[0]?.verified
                ? `<img class="w-5 h-5" src="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png" alt=''>`
                : ""}
                      
                </div>
                <p class="text-[#171717B3] font-[500] mb-2">${video?.others?.views}</p>
                <div>
                    <p><button onclick="loadDetails('${video.video_id}')" class="btn btn-accent">Details</button></p>
                </div>
            </div>
        </div>
        `
        videoContainer.append(div);
    })
}
// load videos and display end 

// search by keyword function start 
const searchInput = document.querySelector("#searchInput");
searchInput.addEventListener('keyup', (e) => {
    loadVideos(e.target.value);
    // console.log(e.target.value);
    // loadVideos(searchInput.value);
})
// search by keyword function end

// calling loadCategories function 
loadCategories();
// calling loadVideos function
loadVideos();

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

// no content function start 
const noContentError = () => {
    document.querySelector("#videos").innerHTML = "";
    document.querySelector("#error-section").innerHTML = `
        <div class=" flex justify-center items-center py-5">
            <img class="w-[25%]" src="./assets/error_icon.png" alt="">
        </div>
        <h2 class="text-[#171717] text-center font-[700] text-[2rem] w-[25%] mx-auto">Oops!! Sorry, There is no content here</h2>
    `
}
// no content function end 

// category wise loading videos start 
const categoryWiseLoadData = async (category_id) => {
    document.querySelector("#error-section").innerHTML = "";
    if (category_id === "all") {
        document.querySelector("#videos").innerHTML = "";
        loadVideos();
        return
    }
    document.querySelector("#error-section").innerHTML = "";
    const res = await fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${category_id}`);
    const data = await res.json();
    // displayVideos(data);
    if (data.category.length === 0) {
        noContentError();
        return
    }
    displayVideos(data.category);
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
            <button onclick='categoryWiseLoadData(${category.category_id})' class="btn text-[#252525B3] font-[600] text-[1rem]">${category.category}</button>
        `
        // button.className = "btn text-[#252525B3] font-[600] text-[1rem]";
        // button.innerText = category.category;
        categoryContainer.appendChild(buttonContainer);
    })
}
// displayCategories end 
// load and display categories from api end 

// load videos and display start 

const loadVideos = async () => {
    try {
        const res = await fetch(`https://openapi.programming-hero.com/api/phero-tube/videos`);
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
const demoOjb = {
    "category_id": "1001",
    "video_id": "aaaa",
    "thumbnail": "https://i.ibb.co/L1b6xSq/shape.jpg",
    "title": "Shape of You",
    "authors": [
        {
            "profile_picture": "https://i.ibb.co/D9wWRM6/olivia.jpg",
            "profile_name": "Olivia Mitchell",
            "verified": ""
        }
    ],
    "others": {
        "views": "100K",
        "posted_date": "16278"
    },
    "description": "Dive into the rhythm of 'Shape of You,' a captivating track that blends pop sensibilities with vibrant beats. Created by Olivia Mitchell, this song has already gained 100K views since its release. With its infectious melody and heartfelt lyrics, 'Shape of You' is perfect for fans looking for an uplifting musical experience. Let the music take over as Olivia's vocal prowess and unique style create a memorable listening journey."
}
const displayVideos = (videos) => {
    document.querySelector("#videos").innerHTML = "";
    const videoContainer = document.querySelector("#videos");
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
                <p class="text-[#171717B3] font-[500]">${video?.others?.views}</p>
            </div>
        </div>
        `
        videoContainer.append(div);
    })
}
// load videos and display end 
// calling loadCategories function 
loadCategories();
// calling loadVideos function
loadVideos();

import { getWork } from "./api.js"

const portfolio = document.querySelector("#portfolio");
const gallery = document.createElement("div");

//create a set to store the categories
const setCategories = new Set();
const worksData = await getWork()
worksData.forEach(work => {
    setCategories.add(work.category.name);
});
//Create an array from the set of "id"
const setCategoriesId = new Set();
worksData.forEach(work => {
    setCategoriesId.add(work.category.id);
});
const categoriesId = Array.from(setCategoriesId);


/**
 * Generates a filter list for a given array of filters.
 * @param {Array} filters 
*/
function generateFilter(filters) {
    const filterList = document.createElement("ul");
    portfolio.append(filterList);
    
    const filterAll = document.createElement("li");
    filterAll.textContent = "Tous";
    filterList.append(filterAll);
    filterAll.setAttribute("id", 0);
    filterAll.classList.add("filter", "filter-active");
    filterAll.addEventListener("click", () => {
        generateGallery(worksData);
        const filters = document.querySelectorAll("#portfolio ul li");
        
        activateFilters(filters, filterAll);
    });
    
    let i = 0;
    
    for (let filter of filters) {
        
        const filterItem = document.createElement("li");
        filterItem.textContent = filter;
        filterList.append(filterItem);
        filterItem.setAttribute("id", categoriesId[i++]);
        filterItem.classList.add("filter")
        
        filterItem.addEventListener("click", (event) => {
            const filterId = event.target.id;
            
            const filter = worksData.filter(work => work.category.id == filterId);
            gallery.innerHTML = "";
            generateGallery(filter);
            const filters = document.querySelectorAll("#portfolio ul li");
            
            activateFilters(filters, filterItem);
            
        });
        
    }
}
function activateFilters(filters, filterItem) {
    filters.forEach(filter => {
        filter.classList.remove("filter-active");
        filter.classList.add("filter");
    });
    
    filterItem.classList.add("filter-active");
}

/**
 * Generates a gallery of works by creating HTML elements and appending them to the DOM.
*
* @param {string[]} works )- An array of objects representing the works to be displayed in the gallery.
*/
function generateGallery(works) {
    
    gallery.classList.add("gallery");
    portfolio.append(gallery);
    
    // Loop through the array of works and create a new HTML figure element for each work.
    for (let element of works) {
        const figure = document.createElement("figure");
        const imageFigure = document.createElement("img");
        imageFigure.src = element.imageUrl;
        imageFigure.alt = element.title;
        const captionFigure = document.createElement("figcaption");
        captionFigure.innerText = element.title;
        gallery.append(figure);
        figure.append(imageFigure);
        figure.append(captionFigure);
    }
}

generateFilter(setCategories);
generateGallery(worksData);

const tokenValue = localStorage.getItem("token");
console.log(tokenValue)
function verificationOfAdminStatus(token) {
    
    if (token === "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY4MDI4ODQyNSwiZXhwIjoxNjgwMzc0ODI1fQ.yBzoJrpNc4CUlIS5xY6DdOVooEpeL2cK1TUNnGLu2YE") {
        const CreationModeBar = document.createElement("div");
        CreationModeBar.classList.add("creationModeBar");
        const body = document.getElementById("body-content");
        body.insertBefore(CreationModeBar, body.firstChild);
        CreationModeBar.innerHTML = "<span>"
    }
}
    verificationOfAdminStatus(tokenValue);
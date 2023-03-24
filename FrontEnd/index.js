import { getWork } from "./api.js"


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

const portfolio = document.querySelector("#portfolio");
const gallery = document.createElement("div");

/**
 * Generates a filter list for a given array of filters.
 * @param {Array} filters 
*/
function generateFilter(filters) {
    const filterList = document.createElement("ul");
    portfolio.append(filterList)

    const filterAll = document.createElement("li");
    filterAll.textContent = "Tous"
    filterList.append(filterAll)
    filterAll.setAttribute("id",0)

    let i=0;
    for (let filter of filters) {
        const filterItem = document.createElement("li");
        filterItem.textContent = filter;
        filterList.append(filterItem);
        filterItem.setAttribute("id",categoriesId[i++])
    }
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

generateFilter(setCategories)
generateGallery(worksData)


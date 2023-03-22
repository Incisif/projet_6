//Fetching works data from server.
const workResponse = await fetch('http://localhost:5678/api/works');
const worksData = await workResponse.json();

//Creates a new Set and adds unique category names from worksData to it.
const setCategories = new Set();
worksData.forEach(work => {
    
    setCategories.add(work.category.name);
});


const portfolio = document.querySelector("#portfolio");
const gallery = document.createElement("div");

/**
 * Generates a filter list for a given array of filters.
 * @param {Array} filters 
*/
function generateFilter(filters) {
    const filterList = document.createElement("ul");
    portfolio.appendChild(filterList)

    const filterAll = document.createElement("li");
    filterAll.textContent = "Tous"
    filterList.appendChild(filterAll)

    for (let filter of filters) {
        const filterItem = document.createElement("li");
        filterItem.textContent = filter;
        filterList.appendChild(filterItem);
    }
}
/**
 * Generates a gallery of works by creating HTML elements and appending them to the DOM.
*
* @param {array} works - An array of objects representing the works to be displayed in the gallery.
*/
function generateGallery(works) {
    
    gallery.classList.add("gallery");
    portfolio.appendChild(gallery);
    
    // Loop through the array of works and create a new HTML figure element for each work.
    for (let element of works) {
        const figure = document.createElement("figure");
        const imageFigure = document.createElement("img");
        imageFigure.src = element.imageUrl;
        imageFigure.alt = element.title;
        const captionFigure = document.createElement("figcaption");
        captionFigure.innerText = element.title;
        gallery.appendChild(figure);
        figure.appendChild(imageFigure);
        figure.appendChild(captionFigure);
        
        // Add the category of the work to the set of categories.
        setCategories.add(element.category);
    }
}


generateFilter(setCategories)
generateGallery(worksData)

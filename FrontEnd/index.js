import { getWork } from "./api.js";
import { modalHandler } from "./modal.js";

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

    let categoryIndex = 0;

    for (let filter of filters) {

        const filterItem = document.createElement("li");
        filterItem.textContent = filter;
        filterList.append(filterItem);
        filterItem.setAttribute("id", categoriesId[categoryIndex++]);
        filterItem.classList.add("filter");

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


//Verify admin status and add creation mode  to HTML page if matched.
const tokenValue = sessionStorage.getItem("token");

function creationMode() {
    const loginHtml = document.getElementById("login");


    if (tokenValue !== null) {
        loginHtml.innerHTML = "logout";
        loginHtml.removeAttribute("href");
        logout(loginHtml);


        //Creation mode header bar
        const editionBar = document.createElement("div");
        editionBar.classList.add("editionBar");
        const body = document.getElementById("body-content");
        body.insertBefore(editionBar, body.firstChild);
        editionBar.innerHTML =

            `<span  id= "editionBar__icone" class="fa-sharp fa-solid fa-pen-to-square"></span>
            <p id= editionBar__text >Mode création</p>
            <div id= "editionBar__publicationButton">
                <p id= "publicationButton__text">Publier les changements<p/>
            </div>`;

        //Link to edit the introductory image
        const introduction = document.getElementById("introduction");
        const introModifyButton = document.createElement("div");
        introModifyButton.classList.add("img-modify-container");
        introModifyButton.innerHTML = `<span class="fa-sharp fa-solid fa-pen-to-square" id="modify-icone"></span><span id= "modify-text">Modifier</span>`;
        introduction.append(introModifyButton);

        //Link to edit the introduction text
        const introductionTitle = document.getElementById("introduction__title");
        const introTextModifyButton = document.createElement("div");
        introTextModifyButton.classList.add("txt-modify-container");
        introTextModifyButton.innerHTML = `<span class="fa-sharp fa-solid fa-pen-to-square" id="modify-icone"></span><span id= "modify-text">Modifier</span>`;
        introductionTitle.parentNode.insertBefore(introTextModifyButton, introductionTitle.nextSibling);

        //Link to edit the gallery
        const portfolioTitle = document.querySelector("#portfolio h2");
        const galleryModifyButton = document.createElement("div");
        galleryModifyButton.classList.add("gallery-edition-container", "first-modal-trigger");
        galleryModifyButton.innerHTML = `<span class="fa-sharp fa-solid fa-pen-to-square" id="modify-icone"></span><span id= "modify-text">Modifier</span>`;
        portfolioTitle.insertAdjacentElement("afterend", galleryModifyButton);

        //Hide filters in edition mode
        const filterList = document.querySelector("#portfolio ul");
        filterList.style.display = "none";
        modalHandler();


    }
}

creationMode();

function logout(loginLink) {
    loginLink.addEventListener("click", () => {
        sessionStorage.removeItem("token");
        loginLink.setAttribute("href", "/FrontEnd/login.html");

    });
}
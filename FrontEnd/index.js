import { getWork } from "./api.js";
import { modalHandler } from "./modal.js";

const portfolio = document.querySelector("#portfolio");
const gallery = document.createElement("div");

/**
Populates a Set object with unique categories extracted from an array of work objects.
@returns {Set<string>} - A Set object containing unique category names.
*/
const setCategories = new Set();
const worksData = await getWork()
worksData.forEach(work => {
    setCategories.add(work.category.name);
});

/**
Populates a Set object with unique category IDs extracted from an array of work objects,
and then converts the Set into an Array.
@returns {Array<number>} - An Array object containing unique category IDs.
*/
const setCategoriesId = new Set();
worksData.forEach(work => {
    setCategoriesId.add(work.category.id);
});
const categoriesId = Array.from(setCategoriesId);



/**

Generates the HTML elements for the filters, adds them to the portfolio element, and sets up event listeners 
to filter the gallery based on the selected category.
@param {Array} filters - An array of strings representing the different categories to filter the gallery by.
@returns {void}
*/
function generateFilters(filters) {
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

/**
Activates a selected filter by adding "filter-active" class and removing it from other filters.
@param {NodeList} filters - A list of filter elements to be activated/deactivated.
@param {HTMLElement} filterItem - The selected filter element to be activated.
@returns {void}
*/
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
export function generateGallery(works) {

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

generateFilters(setCategories);
generateGallery(worksData);



/**
 * Sets up the creation mode, which allows the user to modify the website.
 * If a token is present, the user is considered logged in.
 * The function adds buttons to modify the introductory image and text, and the gallery.
 * It also hides the filters and displays the publication button.
*/
function creationMode() {
    const loginHtml = document.getElementById("login");
    const tokenValue = sessionStorage.getItem("token");


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

/**
 * Removes the token from the sessionStorage and sets the login link's href attribute to /FrontEnd/login.html
 * @param {HTMLElement} loginLink - The login link element that will trigger the logout function
 * @returns {void}
 */
function logout(loginLink) {
    loginLink.addEventListener("click", () => {
        sessionStorage.removeItem("token");
        loginLink.setAttribute("href", "/FrontEnd/login.html");

    });
}
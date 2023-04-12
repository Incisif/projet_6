import { worksData } from "./index.js";
const firstModalContainer = document.querySelector(".first-page-modal-container");

export function modalHandler() {
    // Toggles the visibility of the modal container and generates a new gallery
    function toggleFirstPageModal() {
        const firstModalTriggers = document.querySelectorAll(".first-modal-trigger");

        firstModalTriggers.forEach(trigger => trigger.addEventListener("click", function () {

            const modalGallery = document.querySelector("#modal__gallery");
            firstModalContainer.classList.toggle("active");
            modalGallery.innerHTML = "";
            createGalleryModal(worksData);
        }));
    }

    function toggleSecondPageModal() {
        
        const secondModalContainer = document.querySelector(".second-page-modal-container");
        const secondModalTriggers = document.querySelectorAll(".second-modal-trigger");
        const addButton = document.querySelector("#modal__add-button");
        const backArrow = document.querySelector(".back-arrow")

        addButton.addEventListener("click", function () {
            // Remove the "active" class from the first-page-modal-container
            
            firstModalContainer.classList.toggle("active");
            // Add the "active" class to the second-page-modal-container
            secondModalContainer.classList.add("active");
        });
        secondModalTriggers.forEach(trigger => trigger.addEventListener("click", function () {
            secondModalContainer.classList.remove("active");
        }))
        backArrow.addEventListener("click", function () {

            secondModalContainer.classList.remove("active");
            firstModalContainer.classList.add("active");
        })

    }

    //Create the modal gallery
    function createGalleryModal(works) {
        for (let element of works) {
            const modalGallery = document.querySelector("#modal__gallery")
            const figure = document.createElement("figure");
            const imageFigure = document.createElement("img");
            const trashCanContainer = document.createElement("div");
            trashCanContainer.classList.add("figure__icon");
            trashCanContainer.innerHTML = `<i class="fa-solid fa-trash-can trash-can-icon"></i>`
            imageFigure.src = element.imageUrl;
            imageFigure.alt = element.title;
            const captionFigure = document.createElement("figcaption");
            captionFigure.innerText = "éditer";
            modalGallery.append(figure);
            figure.append(imageFigure);
            figure.append(captionFigure);
            figure.append(trashCanContainer);
        }
    }
    toggleFirstPageModal();
    toggleSecondPageModal();
}



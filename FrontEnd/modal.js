import { worksData } from "./index.js";

// Toggles the visibility of the modal container and generates a new gallery
export function toggleModal() {
    const modalContainer = document.querySelector(".modal-container");
    const modalTriggers = document.querySelectorAll(".modal-trigger");

    modalTriggers.forEach(trigger => trigger.addEventListener("click", function () {
        const modalGallery = document.querySelector("#modal__gallery");
        modalContainer.classList.toggle("active");
        modalGallery.innerHTML = "";
        createGalleryModal(worksData);
        updateModalContent();
    }));
}

//Create the modal gallery
export function createGalleryModal(works) {
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

function updateModalContent() {
    const addButton = document.querySelector("#modal__add-button");
    addButton.addEventListener("click", (e) => {
        e.preventDefault();
        const modalContainer = document.querySelector(".modal");
        modalContainer.innerHTML = "";
        modalContainer.innerHTML = `
            <i class="fa-solid fa-arrow-left back-arrow"></i>
            <i class="fa-solid fa-xmark modal-trigger close-modal" ></i>
			<H2 id="modal__title">Ajout photo</H2>
			<div id="modal__content">
                <div class="content__preview">
                    <div class="preview__bckgd">
                        <i class="fa-solid fa-image preview__logo"></i>
                        <div id="preview__add-button">
                            <p id="add-button__text">+ Ajouter photo</p>
                        </div>
                        <p id="preview__form-reco">jpg, png: 4 mo max </p> 
                 </div>   
			</div>
			<div id="modal__separation"></div>
			<div class="button-conatiner">
                <input type="submit" value="valider" id="modal__validation-button">
            </div>
            `

    })
}
import { worksData } from "./index.js";
export function toggleModal() {
    const modalContainer = document.querySelector(".modal-container");
    const modalTriggers = document.querySelectorAll(".modal-trigger");

    modalTriggers.forEach(trigger => trigger.addEventListener("click", function () {
        const modalGallery = document.querySelector("#modal__gallery");
        modalContainer.classList.toggle("active");
        modalGallery.innerHTML = "";
        createGalleryModal(worksData);
    }));
}
export function createGalleryModal(works) {
    for (let element of works){
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


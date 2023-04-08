import { worksData,categories } from "./index.js";


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
                <form>
                    <div class="preview__bckgd">
                        <i class="fa-solid fa-image preview__logo"></i>
                         <label for="file-upload" class="custom-file-upload">
                            + Ajouter photo
                         </label>
                         <input type="file" accept="image/*" onchange="previewImage(event)" id="file-upload">
                         <p id="preview__form-reco">jpg, png: 4mo max</p> 
                    </div>
                    <div class="preview__title">
                        <label for="photo-title">Titre</label>
                        <input type="text" id="photo-title" name="photo-title" placeholder="Donnez un titre à votre photo">
                    </div>
                    <div class="upload-categories">
                        <label for="category">Catégorie</label>
                        <select id="category">
                            <option  value="${categories[0]}">${categories[0]}</option>
                            <option  value="${categories[1]}">${categories[1]}</option>
                            <option  value="${categories[2]}">${categories[2]}</option>
                        </select>
                    </div>
                </form>   
			</div>
			<div id="modal__separation"></div>
			<div class="button-conatiner">
                <input type="submit" value="valider" id="modal__validation-button">
            </div>
            `

           
    })
}
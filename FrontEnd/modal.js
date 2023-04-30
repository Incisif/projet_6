import { getWork, fetchDeleteWork, postNewWork } from "./api.js";
import { generateGallery } from "./index.js"


const firstModalContainer = document.querySelector(".first-page-modal-container");

export function modalHandler() {

    //Toggles the first page modal and updates its content.
    function toggleFirstPageModal() {
        const firstModalTriggers = document.querySelectorAll(".first-modal-trigger");
        firstModalTriggers.forEach(trigger => trigger.addEventListener("click", function () {
            firstModalContainer.classList.toggle("active");
            updateModalGallery();

        }));
    }

    //Toggles the second page modal and updates its content.
    function toggleSecondPageModal() {
        const secondModalContainer = document.querySelector(".second-page-modal-container");
        const secondModalTriggers = document.querySelectorAll(".second-modal-trigger");
        const addButton = document.querySelector("#modal__add-button");
        const backArrow = document.querySelector(".back-arrow")

        addButton.addEventListener("click", function () {
            firstModalContainer.classList.toggle("active");
            secondModalContainer.classList.add("active");
        });
        secondModalTriggers.forEach(trigger => trigger.addEventListener("click", function () {
            secondModalContainer.classList.remove("active");
        }))
        backArrow.addEventListener("click", function () {

            secondModalContainer.classList.remove("active");
            firstModalContainer.classList.add("active");
            updateModalGallery();

        })

        submitButtonHandler();


    }
    async function updateModalGallery() {
        const worksData = await getWork()
        const modalGallery = document.querySelector("#modal__gallery");
        modalGallery.innerHTML = "";
        createGalleryModal(worksData);
        deleteWorkListener();
    }
    async function updateIndexGallery() {
        const worksData = await getWork();
        const indexGallery = document.querySelector(".gallery");
        indexGallery.innerHTML = "";
        generateGallery(worksData)

    }

    /**
    * Create gallery modal from the given works array.
    * @param {Array} works - Array of work objects.
    * @returns {void}
    */
    function createGalleryModal(works) {
        for (let element of works) {
            const modalGallery = document.querySelector("#modal__gallery")
            const figure = document.createElement("figure");
            const imageFigure = document.createElement("img");
            const trashCanContainer = document.createElement("div");
            trashCanContainer.classList.add("figure__icon");
            trashCanContainer.setAttribute("data-id", element.id);
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

    /**
    Adds a click event listener to all trash can icons to delete the corresponding work.
    Retrieves the token from the sessionStorage.
    @function
    @async
    @returns {void}
    */
    function deleteWorkListener() {
        const token = sessionStorage.getItem("token");
        const trashCanIcons = document.querySelectorAll(".trash-can-icon");
        trashCanIcons.forEach(icon => icon.addEventListener("click", async function (event) {
            event.preventDefault();
            const workId = event.target.closest('.figure__icon').getAttribute('data-id');
            console.log(workId);
            await fetchDeleteWork(workId, token);
            updateModalGallery();
            updateIndexGallery();

        }));
    }

    /**
    Preview the image selected in a file input and display it in an image tag.
    When the preview image is clicked, trigger a click on the corresponding file input.
    */
    function previewImageFromFileInput() {
        const fileInput = document.querySelector("#file-upload");
        const previewImage = document.querySelector("#preview__img");
        const previewInput = document.querySelector("#preview__input-visibility");
        fileInput.addEventListener("change", function () {
            const file = this.files[0];
            if (file) {
                const reader = new FileReader();
                reader.addEventListener("load", function () {
                    previewImage.setAttribute("src", this.result);
                    previewImage.classList.add("active");
                    previewInput.classList.add("hidden");
                })
                reader.readAsDataURL(file);
            }
        });
        previewImage.addEventListener("click", function () {
            fileInput.click();
        });
    }

    previewImageFromFileInput()
    /**
    Handles the click event of the submit button on the form, validates the form inputs,
    and sends a POST request to create a new work if all inputs are valid.
    */
    function submitButtonHandler() {
        const message = document.getElementById("second-modal__confirmation-message");
        function hideMessage() {
            message.innerHTML = "";
        }
        const submitBtn = document.querySelector("#modal__validation-button");
        submitBtn.addEventListener("click", async function (event) {
            event.preventDefault();
            const form = document.querySelector("#myForm");
            const fileInput = form.querySelector("#file-upload");
            const titleInput = document.querySelector("#img-title");
            const categoryInput = form.querySelector("#category");
            const token = sessionStorage.getItem("token");
            const categorySelect = document.querySelector('#category');
            const index = categorySelect.selectedIndex;
            let isTitleValid = titleInput.value.length > 0;
            let isCategoryValid = categoryInput.value !== "default";
            let isFileValid = fileInput.value !== "";

            if (!isTitleValid) {
                message.innerHTML = "Veuillez saisir un titre!";
            }
            else if (!isCategoryValid) {
                message.innerHTML = "Veuillez choisir une catégorie!";
            }
            else if (!isFileValid) {
                message.innerHTML = "Veuillez sélectionner une image!";
            }
            else if (isTitleValid && isCategoryValid && isFileValid) {
                hideMessage();
                await postNewWork(fileInput, index, token);
                updateIndexGallery();
                updateModalGallery();
                resetForm();
            }
        });
    }

    /**
    * Resets the form by clearing the input values and setting default values for the category selection and preview image.
    */
    function resetForm() {

        const previewImage = document.querySelector("#preview__img");
        const previewInput = document.querySelector("#preview__input-visibility");
        const categorySelect = document.querySelector("#category");
        const imgInput = document.querySelector("#img-title");


        previewImage.classList.remove("active");
        previewInput.classList.remove("hidden");
        categorySelect.selectedIndex = 0;
        imgInput.value = "";
        previewImage.removeAttribute("src");
    }
}
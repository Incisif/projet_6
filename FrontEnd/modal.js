import { getWork, fetchDeleteWork, postNewWork } from "./api.js";

const firstModalContainer = document.querySelector(".first-page-modal-container");

export function modalHandler() {
    // Toggles the visibility of the modal container and generates a new gallery

    async function toggleFirstPageModal() {
        const firstModalTriggers = document.querySelectorAll(".first-modal-trigger");
        const worksData = await getWork()
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
            firstModalContainer.classList.toggle("active");
            secondModalContainer.classList.add("active");
        });
        secondModalTriggers.forEach(trigger => trigger.addEventListener("click", function () {
            secondModalContainer.classList.remove("active");
        }))
        backArrow.addEventListener("click", function () {

            secondModalContainer.classList.remove("active");
            firstModalContainer.classList.add("active");
        })
        checkFormValidity();

    }

    //Create the modal gallery
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

        deleteWorkListener();
    }

    toggleFirstPageModal();
    toggleSecondPageModal();

    function deleteWorkListener() {
        const token = sessionStorage.getItem("token");
        const trashCanIcons = document.querySelectorAll(".trash-can-icon");
        const modalGallery = document.querySelector("#modal__gallery");
        trashCanIcons.forEach(icon => icon.addEventListener("click", async function (event) {
            event.preventDefault(); // ajout de la méthode preventDefault()
            const workId = event.target.closest('.figure__icon').getAttribute('data-id');
            console.log(workId);
            fetchDeleteWork(workId, token);
            const worksData = await getWork();
            modalGallery.innerHTML = "";
            createGalleryModal(worksData);
        }));
    }
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

    function checkFormValidity() {
        const form = document.querySelector("#myForm");
        const titleInput = form.querySelector("#img-title");
        const categoryInput = form.querySelector("#category");
        const fileInput = form.querySelector("#file-upload");


        let isTitleValid = false;
        let isCategoryValid = false;
        let isFileValid = false;

        titleInput.addEventListener("change", function () {
            isTitleValid = titleInput.value.length > 0;
            updateSubmitButton();

        });
        categoryInput.addEventListener("change", function () {
            isCategoryValid = categoryInput.value !== "default";
            updateSubmitButton();


        });
        fileInput.addEventListener("change", function () {
            isFileValid = fileInput.value !== "";
            updateSubmitButton();

        });

        function updateSubmitButton() {

            const submitBtn = document.querySelector("#modal__validation-button");
            let valid = isTitleValid && isCategoryValid && isFileValid
            console.log(valid)
            if (valid) {
                const token = sessionStorage.getItem("token");
                const categorySelect = document.querySelector('#category');
                const index = categorySelect.selectedIndex;
                submitBtn.classList.add("active");
                submitBtn.addEventListener("click", function () {
                    postNewWork(fileInput, index, token);
                    resetForm();
                });
                console.log(index)

            } else if (submitBtn.classList.contains("active")) {
                submitBtn.classList.remove("active");
            }


        }
    }
    function resetForm() {
        const submitBtn = document.querySelector("#modal__validation-button");
        const previewImage = document.querySelector("#preview__img");
        const previewInput = document.querySelector("#preview__input-visibility");
        const categorySelect = document.querySelector("#category");
        const imgInput = document.querySelector("#img-title");

        submitBtn.classList.remove("active");
        previewImage.classList.remove("active");
        previewInput.classList.remove("hidden");
        categorySelect.selectedIndex = 0;
        imgInput.value = "";
        previewImage.removeAttribute("src");
    }
}
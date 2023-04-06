
export function toggleModal() {
    const modalContainer = document.querySelector(".modal-container");
    const modalTriggers = document.querySelectorAll(".modal-trigger");

    modalTriggers.forEach(trigger => trigger.addEventListener("click", function () {
        modalContainer.classList.toggle("active")
    }));
}
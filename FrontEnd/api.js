/**
 * Retrieves a JSON array of work items from the server using an HTTP GET request.
 *
 * @async
 * @function
 * @returns {Promise<Array>} - A Promise object that resolves with an array of work items.
 */
export async function getWork() {
  const workResponse = await fetch('http://localhost:5678/api/works');
  const worksData = await workResponse.json();
  return worksData
}


/**
 * Deletes a work item with the specified ID from the server using an HTTP DELETE request with an authorization token.
 *
 * @async
 * @function
 * @param {string} id - The ID of the work item to be deleted.
 * @param {string} token - The authorization token to be used for the request.
 * @returns {Promise<void>} - A Promise object that resolves once the deletion is successful.
 */
export async function fetchDeleteWork(id, token) {
  const message = document.getElementById("first-modal__confirmation-message");
  function hideMessage() {
    message.innerHTML = "";
  }

  try {
    const response = await fetch(`http://localhost:5678/api/works/${id}`, {
      method: 'DELETE',
      headers: {
        'accept': '*/*',
        'Authorization': `Bearer ${token}`
      }
    });
    if (response.ok) {
      message.innerHTML = "Le projet a bien été supprimé!";
      setTimeout(hideMessage, 3000);
    } else {
      message.innerHTML = "Erreur lors de la suppression du projet!";
      setTimeout(hideMessage, 3000);
    }
  } catch (error) {
    console.error(error);

  }
}
/**
 * Posts a new work item to the server using an HTTP POST request with an authorization token.
 *
 * @async
 * @function
 * @param {Object} file - The file object to be uploaded.
 * @param {number} index - The index of the category to which the work item belongs.
 * @param {string} token - The authorization token to be used for the request.
 * @returns {Promise<void>} - A Promise object that resolves once the post is successful.
 */
export async function postNewWork(file, index, token) {
  function hideMessage() {
    message.innerHTML = "";
  }
  const message = document.getElementById("second-modal__confirmation-message");
  const formData = new FormData();
  const titleInput = document.querySelector('#img-title');
  const title = titleInput.value;

  // Checking file type
  if (file.files[0].type !== "image/jpeg" && file.files[0].type !== "image/png") {
    message.innerHTML = "Le fichier doit être en format JPEG ou PNG.";
    setTimeout(hideMessage, 3000);
    return;
  }

  //Checking file size"
  if (file.files[0].size > 4 * 1024 * 1024) { 
    message.innerHTML = "Le fichier ne doit pas dépasser 4 Mo.";
    setTimeout(hideMessage, 3000);
    return;
  }
  formData.append('image', file.files[0]);
  formData.append('title', title);
  formData.append('category', index);

  const response = await fetch(`http://localhost:5678/api/works`, {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: formData
  });
  if (response.ok) {
    message.innerHTML = "Le projet a bien été posté!";
    setTimeout(hideMessage, 3000);
  }
}

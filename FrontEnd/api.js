export async function getWork() {
  const workResponse = await fetch('http://localhost:5678/api/works');
  const worksData = await workResponse.json();
  return worksData
}
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
export async function postNewWork(file, index, token) {
  function hideMessage() {
    message.innerHTML = "";
  }
  const message = document.getElementById("second-modal__confirmation-message");
  const formData = new FormData();
  const titleInput = document.querySelector('#img-title');
  const title = titleInput.value;
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

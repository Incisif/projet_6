export async function getWork() {
  const workResponse = await fetch('http://localhost:5678/api/works');
  const worksData = await workResponse.json();
  return worksData
}
export async function fetchDeleteWork(id, token) {

  try {
    const response = await fetch(`http://localhost:5678/api/works/${id}`, {
      method: 'DELETE',
      headers: {
        'accept': '*/*',
        'Authorization': `Bearer ${token}`
      }
    });
    if (response.ok) {
      alert("La photo a bien été supprimée !");
    } else {
      alert("Erreur lors de la suppression de la photo !");
    }
  } catch (error) {
    console.error(error);

  }
}
export async function postNewWork(file, index, token) {
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
  console.log(response);
}

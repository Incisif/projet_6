export async function getWork() {
    const workResponse = await fetch('http://localhost:5678/api/works');
    const worksData = await workResponse.json();
    return worksData
}
export async function deleteWork(id, token) {
    const url = `http://localhost:5678/api/works/${id}`;
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    };
  
    try {
      const response = await fetch(url, options);
      if (response.ok) {
        alert ("La photo a bien été supprimée !");
      } else {
        alert ("Erreur lors de la suppression de la photo !");
      }
    } catch (error) {
      console.error(error);
    }
  }
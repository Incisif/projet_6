export async function getWork() {
    const workResponse = await fetch('http://localhost:5678/api/works');
    const worksData = await workResponse.json();
    return worksData
}

const BASE_API = "http://192.168.1.1:3000";

// Obtener encabezados de autenticación
const fetchAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Cargar y mostrar la lista de mascotas
const fetchAndRenderPets = async () => {
  try {
    const response = await fetch(`${BASE_API}/petshltl`, { headers: fetchAuthHeaders() });
    if (!response.ok) throw new Error(`Error al cargar mascotas: ${response.statusText}`);

    const pets = await response.json();
    const petListContainer = document.querySelector("#petList");
    petListContainer.innerHTML = "";

    if (!pets || pets.length === 0) {
      petListContainer.innerHTML = "<p>No hay mascotas registradas.</p>";
      return;
    }

    pets.forEach((pet) => {
      const petCard = document.createElement("div");
      petCard.classList.add("pet-card");

      petCard.innerHTML = `
        <div class="pet-info">
          <img class="pet-photo" src="${pet.photo ? `${BASE_API}/images/${pet.photo}` : 'images/default-pet.png'}" alt="Foto de la mascota">
          <div>
            <h2 class="pet-name">${pet.name || "Sin nombre"}</h2>
            <p class="pet-race">${pet.race?.name || "Sin raza"}</p>
          </div>
        </div>
        <div class="pet-actions">
          <a href="vermascota.html?id=${pet.id}" class="btn-view">
            <img src="images/btn-show.svg" alt="Ver detalles">
          </a>
          <a href="editarmascotas.html?id=${pet.id}" class="btn-edit">
            <img src="images/btn-edit.svg" alt="Editar">
          </a>
          <button class="btn-delete" data-id="${pet.id}">
            <img src="images/btn-delete.svg" alt="Eliminar">
          </button>
        </div>
      `;

      petListContainer.appendChild(petCard);
    });

    initializeDeleteButtons();
    initializeReportButton();
  } catch (error) {
    console.error("Error al cargar mascotas:", error);
    const petListContainer = document.querySelector("#petList");
    petListContainer.innerHTML = `<p>Error al cargar las mascotas: ${error.message}</p>`;
  }
};

// Configurar botones de eliminación
const initializeDeleteButtons = () => {
  document.querySelectorAll(".btn-delete").forEach((button) => {
    button.addEventListener("click", async (event) => {
      const petId = event.target.closest(".btn-delete").dataset.id;
      if (!confirm("¿Estás seguro de que deseas eliminar esta mascota?")) return;

      try {
        const response = await fetch(`${BASE_API}/petshltl/${petId}`, {
          method: "DELETE",
          headers: fetchAuthHeaders(),
        });

        if (!response.ok) throw new Error(`Error al eliminar mascota: ${response.statusText}`);

        alert("Mascota eliminada correctamente");
        fetchAndRenderPets(); // Recargar la lista
      } catch (error) {
        console.error("Error al eliminar mascota:", error);
        alert(`Error al eliminar mascota: ${error.message}`);
      }
    });
  });
};

// Configurar botón de reporte
const initializeReportButton = () => {
  const reportButton = document.querySelector("#generateReportBtn");
  if (!reportButton) {
    console.warn("Botón de generar reporte no encontrado");
    return;
  }

  reportButton.addEventListener("click", async () => {
    try {
      const response = await fetch(`${BASE_API}/generar-reporte-mascotas`, {
        method: "GET",
        headers: fetchAuthHeaders(),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al generar el reporte");
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const downloadLink = document.createElement("a");
      downloadLink.href = url;
      downloadLink.download = "reporte_mascotas.pdf";
      document.body.appendChild(downloadLink);
      downloadLink.click();
      downloadLink.remove();
      URL.revokeObjectURL(url);

      alert("Reporte generado exitosamente");
    } catch (error) {
      console.error("Error al generar el reporte:", error);
      alert(`Error: ${error.message}`);
    }
  });
};

// Inicializar la página al cargar
document.addEventListener("DOMContentLoaded", fetchAndRenderPets);
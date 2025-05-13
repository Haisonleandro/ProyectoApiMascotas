const BASE_API = "http://192.168.1.1:3000";

// Obtener encabezados de autenticación
const fetchAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Llenar un select con datos
const populateSelect = (selectId, items, label = "name") => {
  const selectElement = document.querySelector(`#${selectId}`);
  selectElement.innerHTML = '<option value="">Seleccione...</option>';
  items.forEach((item) => {
    const option = document.createElement("option");
    option.value = item.id || item.identificacion;
    option.textContent = item[label] || `Sin ${label}`;
    selectElement.appendChild(option);
  });
};

// Cargar datos para los selects
const fetchSelectData = async () => {
  try {
    const [races, categories, genders, users] = await Promise.all([
      fetch(`${BASE_API}/racehltl`, { headers: fetchAuthHeaders() }).then((res) => res.json()),
      fetch(`${BASE_API}/categoryhltl`, { headers: fetchAuthHeaders() }).then((res) => res.json()),
      fetch(`${BASE_API}/genderhltl`, { headers: fetchAuthHeaders() }).then((res) => res.json()),
      fetch(`${BASE_API}/usershltl`, { headers: fetchAuthHeaders() }).then((res) => res.json()),
    ]);

    populateSelect("race", races);
    populateSelect("category", categories);
    populateSelect("gender", genders);
    populateSelect("User", users, "fullname");
  } catch (error) {
    console.error("Error al cargar datos para los selects:", error);
    alert("Error al cargar datos para los selects.");
  }
};

// Cargar datos de la mascota
const fetchPetData = async (petId) => {
  try {
    const response = await fetch(`${BASE_API}/petshltl/${petId}`, { headers: fetchAuthHeaders() });
    const pet = await response.json();

    document.querySelector("#name").value = pet.name;
    document.querySelector("#race").value = pet.race_id;
    document.querySelector("#category").value = pet.category_id;
    document.querySelector("#gender").value = pet.gender_id;
    document.querySelector("#User").value = pet.User_id;
    document.querySelector("#estado").value = pet.estado;
  } catch (error) {
    console.error("Error al cargar datos de la mascota:", error);
    alert("Error al cargar los datos de la mascota.");
  }
};

// Obtener el ID de la mascota desde la URL
const getPetIdFromURL = () => new URLSearchParams(window.location.search).get("id");

// Configurar el formulario para enviar datos
const setupFormSubmission = (petId) => {
  const formElement = document.querySelector("#petForm");

  formElement.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(formElement);

    try {
      const response = await fetch(`${BASE_API}/petshltl/update/${petId}`, {
        method: "POST",
        headers: fetchAuthHeaders(),
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.msg || "Error al actualizar la mascota");
      }

      alert("Mascota actualizada correctamente");
      window.location.href = "listarMascotashltl.html";
    } catch (error) {
      console.error("Error al actualizar la mascota:", error);
      alert(`Error: ${error.message}`);
    }
  });
};

// Inicializar la aplicación
const initializeApp = async () => {
  const petId = getPetIdFromURL();
  if (!petId) {
    alert("No se especificó el ID de la mascota.");
    return;
  }

  await fetchSelectData();
  await fetchPetData(petId);
  setupFormSubmission(petId);
};

// Ejecutar la inicialización al cargar la página
document.addEventListener("DOMContentLoaded", initializeApp);
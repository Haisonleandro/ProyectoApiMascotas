const BASE_API = "http://192.168.1.1:3000";

// Obtener encabezados de autenticación
const fetchAuthHeaders = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    console.warn("Token no encontrado en localStorage");
    return {};
  }
  return { Authorization: `Bearer ${token}` };
};

// Llenar un select con datos
const populateSelect = (selectId, items, label = "name") => {
  const selectElement = document.querySelector(`#${selectId}`);
  if (!selectElement) {
    console.error(`Elemento con ID ${selectId} no encontrado`);
    return;
  }

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
      fetch(`${BASE_API}/racefhltl`, { headers: fetchAuthHeaders() }).then((res) => res.json()),
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
    alert("Error al cargar datos iniciales.");
  }
};

// Configurar geolocalización
const setupGeolocation = () => {
  const locationButton = document.querySelector("#getLocation");
  if (!locationButton) return;

  locationButton.addEventListener("click", () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          document.querySelector("#latitude").value = position.coords.latitude;
          document.querySelector("#longitude").value = position.coords.longitude;
        },
        (error) => {
          console.error("Error al obtener la ubicación:", error);
          alert("No se pudo obtener la ubicación. Por favor, ingrese las coordenadas manualmente.");
        }
      );
    } else {
      alert("La geolocalización no es compatible con este navegador.");
    }
  });
};

// Configurar el formulario para registrar mascota
const setupFormSubmission = () => {
  const formElement = document.querySelector("#petForm");
  if (!formElement) {
    console.error("Formulario no encontrado");
    return;
  }

  formElement.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(formElement);

    try {
      const response = await fetch(`${BASE_API}/petshltl`, {
        method: "POST",
        headers: fetchAuthHeaders(),
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error en el servidor");
      }

      alert("Mascota registrada exitosamente");
      window.location.href = "listarMascotashltl.html";
      formElement.reset();
    } catch (error) {
      console.error("Error al registrar mascota:", error);
      alert(`Error: ${error.message}`);
    }
  });
};

// Inicializar la aplicación
const initializeApp = async () => {
  try {
    await fetchSelectData(); // Cargar datos para los selects
    setupGeolocation(); // Configurar geolocalización
    setupFormSubmission(); // Configurar el formulario
  } catch (error) {
    console.error("Error al inicializar la aplicación:", error);
    alert("Error al cargar la aplicación.");
  }
};

// Ejecutar la inicialización al cargar la página
document.addEventListener("DOMContentLoaded", initializeApp);
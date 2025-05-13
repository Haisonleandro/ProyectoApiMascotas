const BASE_API = "http://192.168.1.1:3000";

// Recuperar encabezados de autenticación
const fetchAuthHeaders = () => {
  const authToken = localStorage.getItem("token");
  if (!authToken) {
    console.warn("Token no encontrado en localStorage");
    return {};
  }
  return { Authorization: `Bearer ${authToken}` };
};

// Cargar y mostrar mascotas en el mapa
const renderPetsOnMap = async () => {
  try {
    const res = await fetch(`${BASE_API}/petsfjbs`, { headers: fetchAuthHeaders() });
    if (!res.ok) throw new Error("No se pudieron obtener las mascotas");

    const petsList = await res.json();

    // Crear el mapa centrado en una ubicación predeterminada
    const mapInstance = L.map("map").setView([4.60971, -74.08175], 10); // Bogotá
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '© OpenStreetMap contributors',
    }).addTo(mapInstance);

    // Agregar marcadores para las mascotas con coordenadas válidas
    const markers = petsList
      .filter((pet) => pet.latitude && pet.longitude)
      .map((pet) => {
        const marker = L.marker([pet.latitude, pet.longitude]).addTo(mapInstance);
        marker.bindPopup(`
          <strong>${pet.name}</strong><br>
          Raza: ${pet.race?.name || "Sin raza"}<br>
          Categoría: ${pet.category?.name || "Sin categoría"}<br>
          Género: ${pet.gender?.name || "Sin género"}<br>
          Estado: ${pet.estado || "Sin estado"}<br>
          <a href="vermascota.html?id=${pet.id}">Ver detalles</a>
        `);
        return marker;
      });

    // Ajustar el mapa para mostrar todos los marcadores
    if (markers.length > 0) {
      const group = L.featureGroup(markers);
      mapInstance.fitBounds(group.getBounds(), { padding: [50, 50] });
    }
  } catch (err) {
    console.error("Error al cargar las mascotas en el mapa:", err);
    alert("No se pudo cargar el mapa de mascotas.");
    document.querySelector("#map").innerHTML = "<p>Error al cargar las mascotas.</p>";
  }
};

// Inicializar el mapa al cargar la página
document.addEventListener("DOMContentLoaded", renderPetsOnMap);
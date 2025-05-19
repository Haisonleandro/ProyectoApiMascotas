const API_URL = "http://192.168.1.2:3000";

function getAuthHeaders() {
  const token = localStorage.getItem("token");
  return token ? { "Authorization": `Bearer ${token}` } : {};
}

async function loadReports() {
  try {
    const response = await fetch(`${API_URL}/stats`, { headers: getAuthHeaders() });
    if (!response.ok) throw new Error(`Error al cargar los datos: ${response.statusText}`);
    const { pets, stats } = await response.json();

    
    const tableBody = document.getElementById("reportBody");
    tableBody.innerHTML = "";
    if (!pets || pets.length === 0) {
      tableBody.innerHTML = "<tr><td colspan='7'>No hay mascotas registradas.</td></tr>";
      return;
    }

    pets.forEach(pet => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${pet.id}</td>
        <td>${pet.name || 'Sin nombre'}</td>
        <td>${pet.race?.name || 'Sin raza'}</td>
        <td>${pet.category?.name || 'Sin categoría'}</td>
        <td>${pet.gender?.name || 'Sin género'}</td>
        <td>${pet.estado || 'Sin estado'}</td>
        <td>${pet.user?.fullname || 'Sin propietario'}</td>
      `;
      tableBody.appendChild(row);
    });

    // Crear la gráfica
    const ctx = document.getElementById("statsChart").getContext("2d");
    new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["Disponible", "Adoptado"],
        datasets: [{
          label: "Cantidad de Mascotas",
          data: [stats.Disponible, stats.Adoptado],
          backgroundColor: ["#36A2EB", "#FF6384"],
        }],
      },
      options: {
        scales: {
          y: { beginAtZero: true },
        },
      },
    });
  } catch (error) {
    console.error("Error al cargar reportes:", error);
    const tableBody = document.getElementById("reportBody");
    tableBody.innerHTML = `<tr><td colspan="7">Error al cargar los datos: ${error.message}</td></tr>`;
  }
}

async function downloadReport() {
  try {
    const response = await fetch(`${API_URL}/download-pdf`, {
      method: "GET",
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Error al generar el reporte");
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "reporte-mascotas.pdf";
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error al descargar reporte:", error);
    alert(`Error al descargar el reporte: ${error.message}`);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadReports();
  const downloadBtn = document.getElementById("downloadReportBtn");
  if (downloadBtn) {
    downloadBtn.addEventListener("click", downloadReport);
  }
});
window.addEventListener('load', async () => {
    const API_BASE = "http://192.168.1.1:3000";
    const petId = new URLSearchParams(window.location.search).get('id');

    const fetchAuthHeaders = () => {
        const authToken = localStorage.getItem('token');
        return authToken ? { 'Authorization': `Bearer ${authToken}` } : {};
    };

    const loadPetData = async () => {
        try {
            const res = await fetch(`${API_BASE}/petshltl/${petId}`, {
                method: 'GET',
                headers: fetchAuthHeaders()
            });

            const petData = await res.json();

            if (!res.ok) {
                throw new Error(petData.msg || 'No se pudo cargar la información de la mascota');
            }

            updateUI(petData);
        } catch (err) {
            console.error('Error al obtener los datos de la mascota:', err);
            alert('Hubo un problema al conectar con el servidor.');
        }
    };

    const updateUI = (pet) => {
        const defaultPhoto = 'images/default-pet.png';
        document.querySelector('#petPhoto').src = pet.photo 
            ? `${API_BASE}/images/${pet.photo}` 
            : defaultPhoto;
        document.querySelector('#petName').textContent = pet.name || 'Sin nombre';
        document.querySelector('#petRace').textContent = pet.race?.name || 'Sin raza';
        document.querySelector('#petCategory').textContent = pet.category?.name || 'Sin categoría';
        document.querySelector('#petGender').textContent = pet.gender?.name || 'Sin género';
        document.querySelector('#petEstado').textContent = pet.estado || 'Sin estado';

        initializeMap(pet.latitude, pet.longitude, pet.name);
    };

    const initializeMap = (lat, lng, name) => {
        const mapElement = document.querySelector('#map');
        if (lat && lng) {
            const map = L.map(mapElement).setView([lat, lng], 13);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors'
            }).addTo(map);
            L.marker([lat, lng])
                .addTo(map)
                .bindPopup(`<b>${name}</b>`)
                .openPopup();
        } else {
            mapElement.innerHTML = '<p>No hay datos de ubicación disponibles.</p>';
            Object.assign(mapElement.style, {
                height: 'auto',
                textAlign: 'center',
                color: '#E0E0E0'
            });
        }
    };

    await loadPetData();
});
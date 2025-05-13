import multer from "multer";
import path from "path";

// Configuración del almacenamiento para archivos
const almacenamiento = multer.diskStorage({
    destination: (req, archivo, callback) => {
        callback(null, "./imagenes"); // Carpeta destino para las imágenes
    },
    filename: (req, archivo, callback) => {
        const nombreUnico = `${Date.now()}_${archivo.originalname.replace(/\s+/g, "-")}`;
        callback(null, nombreUnico);
    }
});

// Filtro para validar tipos de archivo
const validarArchivo = (req, archivo, callback) => {
    const tiposPermitidos = ["image/jpeg", "image/jpg", "image/png", "image/svg+xml"];
    if (tiposPermitidos.includes(archivo.mimetype)) {
        callback(null, true);
    } else {
        callback(new Error("Solo se permiten archivos JPEG, JPG, PNG y SVG"), false);
    }
};

// Configuración de Multer sin límite de tamaño
export const subirArchivo = multer({
    storage: almacenamiento,
    fileFilter: validarArchivo
});
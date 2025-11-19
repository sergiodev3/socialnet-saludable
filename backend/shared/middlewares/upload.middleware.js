import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// Obtener __dirname en módulos ES6
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Crea un storage para una subcarpeta específica dentro de upload (con ruta absoluta)
const makeStorage = (subfolder) => multer.diskStorage({
  destination: (req, file, cb) => {
    // Usar ruta absoluta: subir 3 niveles desde middleware hasta backend, luego a upload
    const uploadPath = path.join(__dirname, '../../upload', subfolder);
    // Asegurar que exista la carpeta
    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const safeName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}${ext}`;
    cb(null, safeName);
  }
});

// Límites y filtros básicos pueden ajustarse aquí
export const uploadPost = multer({
  storage: makeStorage('images-post'),
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB
});

export const uploadProfile = multer({
  storage: makeStorage('images-profile'),
  limits: { fileSize: 2 * 1024 * 1024 } // 2MB
});

// Memory storage variants - useful si queremos guardar los bytes directamente en la base de datos
export const uploadPostMemory = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }
});

export const uploadProfileMemory = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 2 * 1024 * 1024 }
});

export default { uploadPost, uploadProfile };

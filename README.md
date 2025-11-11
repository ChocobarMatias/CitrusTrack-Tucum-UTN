🟢 README — Proyecto Full Stack CitrusTrack (Node.js + React + WebSocket + MySQL)
🌎 CitrusTrack Tucumán

Sistema de trazabilidad y control de calidad agroindustrial
Tecnicatura Universitaria en Programación – UTN FRT
Proyecto transversal con Mecatrónica y Logística

🎯 Objetivo del Proyecto

Construir un sistema full stack funcional que reciba datos desde sensores IoT y muestre lecturas en tiempo real sobre un dashboard web, permitiendo monitorear temperatura, humedad y golpes durante el empaque y transporte de frutas.
🧩 Flujo General del Sistema
---
[Hardware IoT (Arduino / PLC / Gateway)]
   ↓ JSON (Serial / MQTT)
[Backend Node.js + WebSocket]
   ↓ SQL directo (MySQL)
[Frontend React]
   ↓
[App Móvil Flutter]
---

⚙️ Tecnologías Clave

| Componente       | Tecnología          | Rol                                       |
| ---------------- | ------------------- | ----------------------------------------- |
| Backend          | Node.js + Express   | API REST y canal WebSocket                |
| Base de Datos    | MySQL               | Almacenamiento de trazabilidad            |
| Comunicación IoT | SerialPort / MQTT   | Recepción de lecturas desde hardware      |
| Realtime         | WebSocket (ws)      | Comunicación instantánea con el dashboard |
| Frontend         | React + Vite        | Visualización y control de alertas        |
| Seguridad        | JWT, helmet, bcrypt | Autenticación y protección                |
| Despliegue       | Docker / PM2        | Ejecución estable y portable              |

📁 Estructura del Proyecto
```
CitrusTrack/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── database/
│   │   ├── mqtt/
│   │   ├── websocket/
│   │   └── utils/
│   ├── .env
│   └── server.js
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── hooks/
    │   ├── services/
    │   ├── store/
    │   └── styles/
    └── vite.config.js

🔧 Backend (Node.js + Express + MySQL)

Instalación

```bash
cd backend
npm install express cors dotenv mysql2 jsonwebtoken bcryptjs helmet morgan ws serialport mqtt
npm install nodemon --save-dev
```
Variables de entorno

.env
```
PORT=8000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=citrustrack
JWT_SECRET=clave_segura
---

🔹 Conexión a MySQL
```javascript
// src/database/db.js
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

export const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});
```

🔹 Configuración WebSocket
```javascript
// src/websocket/websocket.js
import { WebSocketServer } from 'ws';

export const initWebSocket = (server) => {
  const wss = new WebSocketServer({ server });
  console.log('🟢 WebSocket activo en CitrusTrack');

  wss.on('connection', (ws) => {
    console.log('Cliente conectado');
    ws.send(JSON.stringify({ mensaje: 'Conectado al servidor WebSocket' }));
  });

  // Función para enviar datos en tiempo real
  const broadcast = (data) => {
    wss.clients.forEach((client) => {
      if (client.readyState === 1) client.send(JSON.stringify(data));
    });
  };

  return { wss, broadcast };
};
```

🔹 Servidor principal
```javascript
// server.js
import express from 'express';
import http from 'http';
import cors from 'cors';
import { initWebSocket } from './src/websocket/websocket.js';
import { pool } from './src/database/db.js';

const app = express();
app.use(cors());
app.use(express.json());
const server = http.createServer(app);
const { broadcast } = initWebSocket(server);

// Ruta de lectura (simulación de IoT)
app.post('/api/sensores', async (req, res) => {
  const { idCaja, temperatura, humedad, golpe } = req.body;
  await pool.query(
    'INSERT INTO LecturasIoT (ID_CAJA, TEMPERATURA, HUMEDAD, GOLPE, FECHA) VALUES (?, ?, ?, ?, NOW())',
    [idCaja, temperatura, humedad, golpe]
  );
  broadcast({ idCaja, temperatura, humedad, golpe, timestamp: new Date() });
  res.json({ ok: true });
});

server.listen(8000, () => console.log('🚀 Backend CitrusTrack activo en puerto 8000'));
```

🔹 Recepción Serial (modo local con Arduino)
```javascript
import { SerialPort } from 'serialport';
import { pool } from './src/database/db.js';
import { broadcast } from './src/websocket/websocket.js';

const port = new SerialPort({ path: 'COM3', baudRate: 9600 });
port.on('data', async (data) => {
  try {
    const lectura = JSON.parse(data.toString());
    await pool.query(
      'INSERT INTO LecturasIoT (ID_CAJA, TEMPERATURA, HUMEDAD, GOLPE, FECHA) VALUES (?, ?, ?, ?, NOW())',
      [lectura.idCaja, lectura.temperatura, lectura.humedad, lectura.golpe]
    );
    broadcast(lectura); // 🔥 Envío en tiempo real al dashboard
  } catch (e) {
    console.error('Error al procesar datos seriales:', e.message);
  }
});
```

🧠 Frontend (React)
Instalación

```bash
cd frontend
npm install axios react-router-dom zustand sweetalert2 chart.js react-chartjs-2 bootstrap react-bootstrap
```
Consumo del WebSocket
```javascript
// src/hooks/useWebSocket.js
import { useEffect } from 'react';

export const useWebSocket = (onMessage) => {
  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8000');
    socket.onmessage = (event) => onMessage(JSON.parse(event.data));
    return () => socket.close();
  }, []);
};
```

Uso en Dashboard
```javascript
import { useState } from 'react';
import { useWebSocket } from '../hooks/useWebSocket';

export default function Dashboard() {
  const [lecturas, setLecturas] = useState([]);
  useWebSocket((data) => setLecturas((prev) => [data, ...prev]));

  return (
    <div>
      <h2>Lecturas en tiempo real</h2>
      {lecturas.map((l, i) => (
        <p key={i}>Caja {l.idCaja} | Temp: {l.temperatura}°C | Hum: {l.humedad}%</p>
      ))}
    </div>
  );
}
```

🧱 1️⃣ TABLA: USUARIOS

Controla autenticación JWT y roles de acceso.
```sql
CREATE TABLE Usuarios (
  ID_USUARIO INT AUTO_INCREMENT PRIMARY KEY,
  NOMBRE VARCHAR(100),
  APELLIDO VARCHAR(100),
  EMAIL VARCHAR(150) UNIQUE,
  PASSWORD_HASH VARCHAR(255),
  ROL ENUM('ADMIN', 'CHOFER', 'TECNICO') DEFAULT 'TECNICO',
  FECHA_CREACION DATETIME DEFAULT CURRENT_TIMESTAMP,
  ACTIVO BOOLEAN DEFAULT TRUE
);

---
📘 Usada por: dashboard (admin) y app móvil (choferes).

🧩 2️⃣ TABLA: PRODUCTOS

Lista los tipos de producto que maneja la planta.
---sql
CREATE TABLE Productos (
  ID_PRODUCTO INT AUTO_INCREMENT PRIMARY KEY,
  CODIGO VARCHAR(10) UNIQUE,
  NOMBRE VARCHAR(100),
  PERFIL_FRIO TINYINT,  -- 1=0–1°C, 2=4–7°C, 3=10–12°C, 4=ambiente
  FRAGILIDAD TINYINT,
  MADURACION TINYINT,
  FECHA_REGISTRO DATETIME DEFAULT CURRENT_TIMESTAMP
);
---
📘 Ejemplos: LIM (limón), PAL (palta), ARN (arándano), FRS (frutilla), AZD (caña).


📦 3️⃣ TABLA: LOTES

Agrupa cajas del mismo origen/producto.
```sql
CREATE TABLE Lotes (
  ID_LOTE INT AUTO_INCREMENT PRIMARY KEY,
  CODIGO_LOTE VARCHAR(50) UNIQUE,
  ID_PRODUCTO INT,
  PLANTA VARCHAR(10),
  LINEA CHAR(1),
  FECHA_CREACION DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (ID_PRODUCTO) REFERENCES Productos(ID_PRODUCTO)
);
---
📘 Se usa para vincular cada caja a su lote.

📦 4️⃣ TABLA: CAJAS

Cada caja individual del sistema de trazabilidad.
```sql
CREATE TABLE Cajas (
  ID_CAJA INT AUTO_INCREMENT PRIMARY KEY,
  ID_LOTE INT,
  CODIGO_CAJA VARCHAR(50) UNIQUE,
  PESO DECIMAL(5,2),
  PERFIL_FRIO TINYINT,
  ESTADO ENUM('EN_PLANTA', 'EN_RUTA', 'ENTREGADA', 'ALERTA') DEFAULT 'EN_PLANTA',
  FECHA_REGISTRO DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (ID_LOTE) REFERENCES Lotes(ID_LOTE)
);
---
📘 El código de caja sigue el formato propuesto:
<PL><LN><DDD><HHMM><PRD><LOT><M><F><CF><CHK>

🌡️ 5️⃣ TABLA: LECTURAS_IOT

Registra las lecturas que llegan desde el hardware IoT (por Serial o MQTT).
```sql
CREATE TABLE LecturasIoT (
  ID_LECTURA INT AUTO_INCREMENT PRIMARY KEY,
  ID_CAJA INT,
  TEMPERATURA FLOAT,
  HUMEDAD FLOAT,
  GOLPE BOOLEAN,
  VELOCIDAD_CINTA FLOAT NULL,
  FECHA DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (ID_CAJA) REFERENCES Cajas(ID_CAJA)
);
---
📘 Se actualiza automáticamente cada vez que el backend recibe un JSON del hardware.

🚨 6️⃣ TABLA: ALERTAS

Guarda rupturas de frío, golpes o lecturas fuera de rango.
```sql
CREATE TABLE Alertas (
  ID_ALERTA INT AUTO_INCREMENT PRIMARY KEY,
  ID_CAJA INT,
  TIPO ENUM('FRIO','GOLPE','HUMEDAD','SENSOR'),
  DESCRIPCION VARCHAR(255),
  NIVEL ENUM('BAJO','MEDIO','ALTO') DEFAULT 'BAJO',
  FECHA DATETIME DEFAULT CURRENT_TIMESTAMP,
  ATENDIDA BOOLEAN DEFAULT FALSE,
  FOREIGN KEY (ID_CAJA) REFERENCES Cajas(ID_CAJA)
);
---
📘 El backend puede dispararlas automáticamente al detectar valores fuera del perfil de frío

🚚 7️⃣ TABLA: VEHICULOS

Identifica los medios de transporte.
```sql
CREATE TABLE Vehiculos (
  ID_VEHICULO INT AUTO_INCREMENT PRIMARY KEY,
  PATENTE VARCHAR(20),
  TIPO VARCHAR(50),
  CAPACIDAD DECIMAL(6,2),
  ACTIVO BOOLEAN DEFAULT TRUE
);

---

👨‍✈️ 8️⃣ TABLA: VIAJES

Registra los traslados (inicio, destino, chofer, vehículo, tiempos, alertas).
```sql
CREATE TABLE Viajes (
  ID_VIAJE INT AUTO_INCREMENT PRIMARY KEY,
  ID_CHOFER INT,
  ID_VEHICULO INT,
  ORIGEN VARCHAR(150),
  DESTINO VARCHAR(150),
  FECHA_INICIO DATETIME,
  FECHA_FIN DATETIME,
  COSTO_ESTIMADO DECIMAL(10,2) NULL,
  CO2_ESTIMADO DECIMAL(10,2) NULL,
  FOREIGN KEY (ID_CHOFER) REFERENCES Usuarios(ID_USUARIO),
  FOREIGN KEY (ID_VEHICULO) REFERENCES Vehiculos(ID_VEHICULO)
);
---
📘 La app móvil registra inicio/fin de viaje y posición GPS.

🧭 9️⃣ TABLA: CAJAS_VIAJES (intermedia muchos-a-muchos)

Asocia qué cajas viajan en cada viaje.
```sql
CREATE TABLE Cajas_Viajes (
  ID_CAJA INT,
  ID_VIAJE INT,
  PRIMARY KEY (ID_CAJA, ID_VIAJE),
  FOREIGN KEY (ID_CAJA) REFERENCES Cajas(ID_CAJA),
  FOREIGN KEY (ID_VIAJE) REFERENCES Viajes(ID_VIAJE)
);
---

📈 🔟 TABLA: INDICADORES (opcional, para KPIs y reportes)

Se puede recalcular automáticamente o alimentar desde la app web.
```sql
CREATE TABLE Indicadores (
  ID_INDICADOR INT AUTO_INCREMENT PRIMARY KEY,
  FECHA_CALCULO DATE,
  RUPTURAS_FRIO INT,
  MERMA DECIMAL(5,2),
  PUNTUALIDAD DECIMAL(5,2),
  COSTO_PROMEDIO DECIMAL(10,2)
);
---
📘 Sirve para mostrar KPIs de la documentación: rupturas de frío, merma, puntualidad, costos.

🧩 Relaciones principales (resumen visual lógico)

Usuarios (choferes, técnicos)
        │
        ├──► Viajes ◄── Vehiculos
        │       │
        │       └──► Cajas_Viajes ◄── Cajas ◄── Lotes ◄── Productos
        │                                │
        │                                └──► LecturasIoT
        │                                        │
        │                                        └──► Alertas
        └──► Indicadores (resumen de datos globales)


✅ En resumen

Total: 10 tablas

Usuarios

Productos

Lotes

Cajas

LecturasIoT

Alertas

Vehiculos

Viajes

Cajas_Viajes

Indicadores


📌 Estructuras sugerida para cubrir todo lo que pide el documento de CitrusTrack Tucumán:

Identificación unitaria

Sensado, trazabilidad y control de calidad

Viajes y optimización logística

KPIs de rendimiento.



🚀 Flujo de trabajo sugerido

| Semana | Objetivo                         | Entregable                |
| ------ | -------------------------------- | ------------------------- |
| 1–2    | Configurar DB y backend          | API REST + conexión MySQL |
| 3–5    | Integrar Serial/MQTT + WebSocket | Recepción en tiempo real  |
| 6–8    | Crear dashboard React            | Mostrar lecturas y KPIs   |
| 9–10   | App Flutter conectada            | Escaneo y reportes        |
| 11–12  | Pruebas + demo local             | Presentación en la feria  |


💡 Librerías clave
Backend

express, mysql2, dotenv, ws, serialport, mqtt, helmet, cors, morgan, jsonwebtoken, bcryptjs

Frontend

axios, react-router-dom, zustand, sweetalert2, chart.js, react-chartjs-2, bootstrap, react-bootstrap
## Inspiration
El observar como la contaminación sigue siendo un problema latente hoy en día, desde latas tiradas por la calle hasta contenedores de basura al borde de su capacidad y queremos disponer de las herramientas con las que tratamos hoy en dia para darle solucion a este problema.
## What it does
Pensamos como objetivo lograr que el Estado de Querétaro consiga una ciudad mas limpa con contenedores inteligentes: sensores ultrasónicos (Arduino) miden su llenado en tiempo real y un código QR permite reportar problemas (sobrecarga, daños) mediante formulario. Los datos de sensores se almacenan en Firebase, migran a MySQL, y se integran en una app para conductores que, usando OpenStreetMap, calcula rutas óptimas (priorizando llenado, distancia y variables clave). Incluimos un modelo predictivo que estima cuándo se llenará cada contenedor (ej: probabilidad el sábado).
## How we built it
Nos dividimos las tecnologías de la siguiente manera: 
-  Diego Sensores (Esp32 , sensor ultrasonico, Metodo de agrupamiento predictivo)
- David Backend (Base de datos y rutas de la API) 
- Fer (Base datos , API y video)
- Ana (Frontend,  Metodo de agrupamiento predictivo)
- Alexis (Frontend)


-Tecnologias
- Sensores (Arduino, Sensores, firebase)
- Backend (MySQL, Node.js (Express), firebase)
- Frontend (Tildwind, chadcm,TypeScript, Nextjs, React, OpenStreetMap, Leaflet Sunsset)
- Video (Kinemaster)

## Challenges we ran into
- Manejo de Rutas de la API
- Problemas de diseño
- Conexion WI-FI

## Accomplishments that we're proud of
- No habernos peleado
- Lograr nuestro MVP (Producto Minimo Variable del proyecto)
## What we learned
- Aprender a manejar nuevas tecnologias
- Aprender a trabajar en equipo
- Mejorar demasiado la comunicacion
- Balance entre diversion y competitividad
## What's next for Clear-Route
-  Implementar un Modelo completo Predictivo
- Cumplir con mas problemas de rutas



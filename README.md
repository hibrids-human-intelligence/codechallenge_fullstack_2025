# Code Challenge — CMS (perfil Fullstack: Angular v22 + Node/TS/Express)

## Contexto

Heredas dos proyectos de otro equipo: un **frontend** en Angular v22 (enfoque zoneless) y un **backend** en Node/TypeScript/Express, que en conjunto muestran y actualizan el checklist de una campaña dentro del CMS. Ambos están en uso — **no se pueden congelar releases** mientras los tocas.

No se espera que arregles todo. Interesa tu criterio de priorización tanto como el código: qué es un riesgo real (seguridad, datos, producción) frente a qué es mejora cosmética.

## Qué hacer

1. Clona este repositorio y crea tu propia rama: `candidato/tu-nombre`.
2. Corre ambos proyectos localmente (`npm install` en cada carpeta — ver detalles abajo).
3. **Diagnostica en voz alta** qué está mal o es riesgoso en cada proyecto, y **prioriza** qué arreglarías primero y por qué.
4. Arregla lo que el tiempo te permita, respetando las convenciones que ya existen en el código (no reescribas todo desde cero).
5. Documenta en `TICKET.md` (en la raíz del repo) lo que no alcanzaste: contexto, riesgo, y tu propuesta de solución.
6. Haz commit y **push a tu rama** (`git push origin candidato/tu-nombre`). No se espera que hagas Pull Request — con el push a tu rama es suficiente para que el equipo revise el diff.

Puedes usar tu IA como en un día normal de trabajo (Claude Code, Copilot, Cursor, la que prefieras) — de hecho, se espera que la uses.

## Estructura del repositorio

```
/backend           — API Node/TS/Express (Postgres)
/frontend          — CMS Angular v22 (zoneless)
/db/init.sql       — schema + datos de ejemplo para Postgres
docker-compose.yml — levanta Postgres local con los datos de ejemplo ya cargados
TICKET.md          — completa esto con lo que no alcanzaste
```

**El frontend y el backend ya vienen conectados entre sí** — el frontend apunta a `http://localhost:4000/api` y consume el checklist real de la campaña `demo-campaign-001`. No tienes que cablear nada para que funcione de punta a punta; sí vas a tener que diagnosticar por qué algunas cosas no se comportan como deberían una vez que lo pruebes.

## Levantar el proyecto completo

**1. Base de datos (Postgres, vía Docker):**
```bash
docker compose up -d
```
Esto levanta Postgres en `localhost:5432` con la tabla `campaign_checklist_items` ya creada y con 3 ítems de ejemplo para la campaña `demo-campaign-001`.

**2. Backend:**
```bash
cd backend
npm install
npm run dev     # levanta en http://localhost:4000
```

**3. Frontend (en otra terminal):**
```bash
cd frontend
npm install
npm start       # levanta en http://localhost:4200
```

Abre `http://localhost:4200` — deberías ver el checklist de la campaña demo cargado desde el backend real, con checkboxes que puedes togglear.

## Constraints

- El backend expone `GET /api/campaigns/:id/checklist` (lista de items) y `POST /api/campaigns/:id/checklist/:itemId/toggle` (marcar un item como hecho/no hecho) — no cambies la forma del contrato (los campos que espera/devuelve) sin dejarlo documentado en el ticket, ya que el frontend depende de ese contrato.
- El frontend usa **signals** como mecanismo de estado (no NgRx) — respeta ese enfoque en tus fixes, no introduzcas un state manager nuevo.
- No se pueden congelar releases: tus soluciones deben poder entrar de forma incremental (no se espera un rewrite total de ningún módulo).

## Qué se evalúa

- Diagnóstico y priorización (¿reconoces qué es crítico vs. cosmético?)
- Calidad de ejecución y arquitectura de tus fixes
- Dominio del stack (Angular zoneless, Node/Express, manejo de datos)
- Comunicación técnica — tanto en voz alta/en vivo como en el `TICKET.md` final
- Juicio en el uso de IA: validación antes de aceptar sugerencias, dirección con contexto del proyecto, detección de alucinaciones (si la IA te sugiere algo que no reconoces, verifícalo antes de usarlo), saber cuándo NO delegarle una decisión, y capacidad de defender cada línea que integraste.

Ninguna pista adicional aquí sobre qué está roto específicamente — eso es parte de lo que evaluamos.

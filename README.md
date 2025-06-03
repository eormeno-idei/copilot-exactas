# GitHub Copilot Gratuito - Presentación FCEFyN UNSJ

Una presentación web interactiva sobre el acceso gratuito a GitHub Copilot para la comunidad académica de la Facultad de Ciencias Exactas, Físicas y Naturales de la Universidad Nacional de San Juan.

## 📋 Descripción

Este proyecto es una presentación de slides moderna y responsiva que explica los beneficios y el proceso de acceso a GitHub Copilot gratuito para estudiantes y profesores universitarios. La presentación está diseñada para ser utilizada en conferencias, talleres y sesiones informativas.

## ✨ Características

- **Presentación interactiva**: Navegación fluida entre slides con animaciones suaves
- **Navegación múltiple**: 
  - Botones de navegación
  - Controles de teclado (flechas, espaciador, Home, End)
  - Contador de slides
- **Exportación a PDF**: Funcionalidad de impresión/exportación integrada
- **Modo pantalla completa**: Presentación profesional con F11
- **Diseño responsivo**: Compatible con diferentes tamaños de pantalla
- **Carga dinámica**: Los slides se cargan automáticamente desde archivos HTML individuales

## 🚀 Tecnologías Utilizadas

- **HTML5**: Estructura semántica y moderna
- **CSS3**: Estilos avanzados con gradientes, animaciones y responsive design
- **JavaScript ES6+**: Funcionalidad interactiva y carga dinámica de contenido
- **Fetch API**: Carga asíncrona de slides
- **Print CSS**: Optimización para exportación a PDF

## 📁 Estructura del Proyecto

```
copilot-exactas/
├── index.html              # Página principal de la presentación
├── main.js                 # Lógica de navegación y funcionalidad
├── styles.css              # Estilos de la presentación
├── start.ps1               # Script para iniciar servidor local (PHP)
├── README.md               # Este archivo
└── slides/
    ├── index.json          # Índice de slides para carga dinámica
    ├── 01-introduccion.html
    ├── 02-que-es-copilot.html
    ├── 03-beneficios-estudiantes.html
    ├── 03b-acceso-adicional.html
    ├── 03b-herramientas-adicionales.html
    ├── 03c-valor-agregado.html
    ├── 04-beneficios-profesores.html
    ├── 05-requisitos-acceso.html
    └── 06-cierre.html
```

## 🛠️ Instalación y Uso

### Opción 1: Servidor Local con PHP
1. Asegúrate de tener PHP instalado en tu sistema
2. Ejecuta el script de inicio:
   ```powershell
   .\start.ps1
   ```
3. Abre tu navegador en `http://localhost:8000`

### Opción 2: Servidor Local con Python
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

### Opción 3: Servidor Local con Node.js
```bash
# Instalar serve globalmente
npm install -g serve

# Ejecutar servidor
serve -s . -l 8000
```

### Opción 4: Live Server (VS Code)
1. Instala la extensión "Live Server" en VS Code
2. Haz clic derecho en `index.html`
3. Selecciona "Open with Live Server"

## 🎮 Controles de Navegación

### Teclado
- **← / →**: Navegar entre slides
- **Espacio**: Siguiente slide
- **Home**: Ir al primer slide
- **End**: Ir al último slide
- **F11**: Activar/desactivar pantalla completa

### Interfaz
- **Botones de navegación**: Anterior/Siguiente
- **Contador**: Muestra slide actual/total
- **Exportar PDF**: Botón para imprimir/guardar como PDF
- **Pantalla completa**: Botón para modo presentación

## 📄 Contenido de la Presentación

1. **Introducción**: Presentación del tema y objetivos
2. **¿Qué es GitHub Copilot?**: Explicación de la herramienta de IA
3. **Beneficios para Estudiantes**: Ventajas específicas para alumnos
4. **Herramientas Adicionales**: Servicios premium incluidos
5. **Beneficios para Profesores**: Ventajas para docentes
6. **Requisitos y Acceso**: Proceso de solicitud y requisitos
7. **Recursos y Contacto**: Enlaces útiles y información de contacto

## 🎨 Personalización

### Agregar Nuevos Slides
1. Crea un nuevo archivo HTML en la carpeta `slides/`
2. Actualiza el archivo `slides/index.json` con el nombre del nuevo slide
3. El slide se cargará automáticamente en la presentación

### Modificar Estilos
- Edita `styles.css` para cambiar colores, fuentes o animaciones
- Los estilos están organizados por secciones para facilitar la modificación

### Personalizar Contenido
- Edita los archivos HTML individuales en `slides/`
- Modifica la información de contacto en `06-cierre.html`
- Actualiza el branding en `styles.css` (logo, colores institucionales)

## 🖨️ Exportar a PDF

1. Usa el botón "📄 Exportar PDF" en la interfaz
2. O presiona `Ctrl+P` (Windows) / `Cmd+P` (Mac)
3. Selecciona "Guardar como PDF" en el diálogo de impresión
4. Los slides se optimizan automáticamente para impresión

## 🌐 Compatibilidad

- **Navegadores**: Chrome 60+, Firefox 55+, Safari 12+, Edge 79+
- **Dispositivos**: Desktop, tablet, móvil
- **Sistemas**: Windows, macOS, Linux

## 📝 Notas para Presentadores

- **Preparación**: Prueba la presentación antes del evento
- **Conectividad**: Asegúrate de tener conexión a internet para los enlaces externos
- **Backup**: Ten una copia en PDF como respaldo
- **Interacción**: Usa las teclas de navegación para una presentación fluida

## 🤝 Contribuciones

Para mejorar esta presentación:

1. Fork el proyecto
2. Crea una rama para tu característica (`git checkout -b feature/nueva-caracteristica`)
3. Commit tus cambios (`git commit -m 'Agregar nueva característica'`)
4. Push a la rama (`git push origin feature/nueva-caracteristica`)
5. Abre un Pull Request

## 📧 Contacto

Para consultas sobre GitHub Copilot o esta presentación:

- **Institución**: Facultad de Ciencias Exactas, Físicas y Naturales - UNSJ
- **Web**: [unsj.edu.ar](https://www.unsj.edu.ar)
- **GitHub Education**: [education.github.com](https://education.github.com)

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

---

**Desarrollado para la comunidad académica de FCEFyN - UNSJ**

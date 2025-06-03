// Variables globales
let currentSlide = 0;
let totalSlides = 0;
let slideFiles = [];

// Cargar slides al iniciar
document.addEventListener('DOMContentLoaded', async function() {
    await loadSlideList();
    loadAllSlides();
    updateSlideCounter();
    updateNavigationButtons();
});

// Cargar lista de slides dinámicamente
async function loadSlideList() {
    try {
        const indexResponse = await fetch('slides/index.json');
        if (indexResponse.ok) {
            const indexData = await indexResponse.json();
            slideFiles = indexData.files.sort();
            totalSlides = slideFiles.length;
            console.log('Slides cargados desde index.json:', slideFiles);
        } else {
            throw new Error('No se pudo cargar slides/index.json');
        }
    } catch (error) {
        console.error('Error cargando slides:', error);
        alert('Error: No se pudo cargar el archivo slides/index.json. Verifica que exista el archivo.');
        slideFiles = [];
        totalSlides = 0;
    }
}

// Cargar todos los slides
async function loadAllSlides() {
    const slideContainer = document.getElementById('slide-container');
    
    for (let i = 0; i < slideFiles.length; i++) {
        try {
            const response = await fetch(`slides/${slideFiles[i]}`);
            const html = await response.text();
            
            const slideDiv = document.createElement('div');
            slideDiv.className = 'slide';
            slideDiv.innerHTML = html;
            
            // Agregar logo y número de slide
            const logo = document.createElement('div');
            logo.className = 'logo';
            logo.textContent = 'FCEFyN - UNSJ';
            slideDiv.appendChild(logo);
            
            const slideNumber = document.createElement('div');
            slideNumber.className = 'slide-number';
            slideNumber.textContent = `${i + 1} / ${totalSlides}`;
            slideDiv.appendChild(slideNumber);
            
            slideContainer.appendChild(slideDiv);
        } catch (error) {
            console.error(`Error cargando slide ${slideFiles[i]}:`, error);
        }
    }
    
    // Mostrar el primer slide
    showSlide(0);
}

// Mostrar slide específico
function showSlide(index) {
    const slides = document.querySelectorAll('.slide');
    
    // Ocultar todos los slides
    slides.forEach(slide => slide.classList.remove('active'));
    
    // Mostrar el slide actual
    if (slides[index]) {
        slides[index].classList.add('active');
        currentSlide = index;
        updateSlideCounter();
        updateNavigationButtons();
    }
}

// Slide siguiente
function nextSlide() {
    if (currentSlide < totalSlides - 1) {
        showSlide(currentSlide + 1);
    }
}

// Slide anterior
function previousSlide() {
    if (currentSlide > 0) {
        showSlide(currentSlide - 1);
    }
}

// Actualizar contador
function updateSlideCounter() {
    const counter = document.getElementById('slide-counter');
    counter.textContent = `${currentSlide + 1} / ${totalSlides}`;
}

// Actualizar botones de navegación
function updateNavigationButtons() {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    prevBtn.disabled = currentSlide === 0;
    nextBtn.disabled = currentSlide === totalSlides - 1;
}

// Navegación con teclado
document.addEventListener('keydown', function(event) {
    switch(event.key) {
        case 'ArrowRight':
        case ' ':
            event.preventDefault();
            nextSlide();
            break;
        case 'ArrowLeft':
            event.preventDefault();
            previousSlide();
            break;
        case 'Home':
            event.preventDefault();
            showSlide(0);
            break;
        case 'End':
            event.preventDefault();
            showSlide(totalSlides - 1);
            break;
        case 'F11':
            event.preventDefault();
            toggleFullscreen();
            break;
    }
});

// Exportar a PDF
function exportToPDF() {
    // Mostrar todos los slides para impresión
    const slides = document.querySelectorAll('.slide');
    slides.forEach(slide => slide.style.display = 'flex');
    
    // Configurar título del documento
    document.title = 'GitHub Copilot Gratuito - FCEFyN UNSJ';
    
    // Abrir diálogo de impresión
    window.print();
    
    // Restaurar vista normal después de imprimir
    setTimeout(() => {
        slides.forEach((slide, index) => {
            slide.style.display = index === currentSlide ? 'flex' : 'none';
        });
    }, 1000);
}

// Pantalla completa
function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
            console.log(`Error intentando entrar en pantalla completa: ${err.message}`);
        });
    } else {
        document.exitFullscreen();
    }
}

// Auto-avance (opcional, comentado por defecto)
// function startAutoAdvance(intervalSeconds = 30) {
//     setInterval(() => {
//         if (currentSlide < totalSlides - 1) {
//             nextSlide();
//         }
//     }, intervalSeconds * 1000);
// }
// Variables globales
let currentSlide = 0;
let totalSlides = 0;
let slideFiles = [];
let router;

// Cargar slides al iniciar
document.addEventListener('DOMContentLoaded', async function() {
    console.log('DOM cargado, iniciando proceso...');
    await loadSlideList();
    console.log(`Lista de slides cargada: ${slideFiles.length} slides, totalSlides: ${totalSlides}`);
    await loadAllSlides();  // Hacer await para que termine antes de inicializar el router
    console.log('Todos los slides cargados, totalSlides final:', totalSlides);
    initializeRouter();
    console.log('Router inicializado');
    updateSlideCounter();
    updateNavigationButtons();
    setupEventListeners();
    console.log('Event listeners configurados');
});

// Configurar event listeners
function setupEventListeners() {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', previousSlide);
    }
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }
}

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
            const logoImg = document.createElement('img');
            logoImg.src = 'images/alternativa-exactas.png';
            logoImg.alt = 'Logo FCEFyN - UNSJ';
            logo.appendChild(logoImg);
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
    
    // No mostrar ningún slide aquí, dejar que el router se encargue
}

// Mostrar slide específico
function showSlide(index, updateUrl = true) {
    // Validar índice
    if (index < 0 || index >= totalSlides) {
        console.error('Índice de slide inválido:', index, 'totalSlides:', totalSlides);
        return;
    }
    
    console.log(`showSlide llamado con index: ${index}, currentSlide antes: ${currentSlide}, totalSlides: ${totalSlides}`);
    
    const slides = document.querySelectorAll('.slide');
    console.log(`Slides encontrados: ${slides.length}`);
    
    // Ocultar todos los slides
    slides.forEach(slide => slide.classList.remove('active'));
    
    // Mostrar el slide actual
    if (slides[index]) {
        slides[index].classList.add('active');
        currentSlide = index;
        console.log(`currentSlide actualizado a: ${currentSlide}`);
        updateSlideCounter();
        updateNavigationButtons();
        
        // Actualizar URL sin recargar la página
        if (updateUrl && router) {
            let route;
            if (index === 0) {
                route = '/';
            } else {
                route = `/${index}`;
            }
            console.log(`Navegando a ruta: ${route} para índice ${index} (totalSlides: ${totalSlides})`);
            router.navigate(route, false); // false para no disparar el handler
        }
    } else {
        console.error(`No se encontró slide con índice ${index}`);
    }
}

// Slide siguiente
function nextSlide() {
    console.log('nextSlide llamado, currentSlide:', currentSlide, 'totalSlides:', totalSlides);
    if (currentSlide < totalSlides - 1) {
        showSlide(currentSlide + 1);
    } else {
        console.log('Ya estás en el último slide');
    }
}

// Slide anterior
function previousSlide() {
    console.log('previousSlide llamado, currentSlide:', currentSlide);
    if (currentSlide > 0) {
        showSlide(currentSlide - 1);
    } else {
        console.log('Ya estás en el primer slide');
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
    
    console.log(`updateNavigationButtons: currentSlide=${currentSlide}, totalSlides=${totalSlides}`);
    
    if (prevBtn) {
        prevBtn.disabled = currentSlide === 0;
        console.log(`Botón anterior ${currentSlide === 0 ? 'deshabilitado' : 'habilitado'}`);
    }
    if (nextBtn) {
        nextBtn.disabled = currentSlide === totalSlides - 1;
        console.log(`Botón siguiente ${currentSlide === totalSlides - 1 ? 'deshabilitado' : 'habilitado'}`);
    }
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
    }
});

// Inicializar router
function initializeRouter() {
    console.log('Inicializando router con totalSlides:', totalSlides);
    
    // Verificar que totalSlides sea válido
    if (totalSlides === 0) {
        console.error('Error: totalSlides es 0, no se puede inicializar el router');
        return;
    }
    
    // Crear nueva instancia de Navigo
    router = new Navigo('/', { hash: true });
    
    // Definir rutas
    router
        .on({
            '/': function() {
                console.log('Ruta "/" - mostrando slide 0');
                showSlide(0, false); // false para evitar loop infinito
            },
            '/:slideNumber': function(params) {
                const slideIndex = parseInt(params.data.slideNumber);
                console.log('Ruta con número:', slideIndex, 'params:', params);
                console.log('totalSlides:', totalSlides, 'validando rango 0 a', totalSlides - 1);
                // Permitir slides del 0 al totalSlides-1
                if (!isNaN(slideIndex) && slideIndex >= 0 && slideIndex < totalSlides) {
                    showSlide(slideIndex, false);
                } else {
                    console.log('Número de slide inválido, redirigiendo a inicio');
                    router.navigate('/0');
                }
            }
        })
        .notFound(function() {
            console.log('Ruta no encontrada, redirigiendo a inicio');
            router.navigate('/');
        });
    
    // Si no hay hash en la URL, mostrar el primer slide por defecto
    if (!window.location.hash) {
        console.log('No hay hash, mostrando slide 0 por defecto');
        showSlide(0, false);
    }
    
    // Iniciar el router
    router.resolve();
}

// Función para obtener enlace compartible del slide actual
function getShareableLink() {
    const baseUrl = window.location.origin + window.location.pathname;
    if (currentSlide === 0) {
        return baseUrl;
    } else {
        return baseUrl + `#/${currentSlide}`;
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
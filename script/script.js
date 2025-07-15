// JavaScript para el toggle del menú móvil
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
const header = document.getElementById('header'); // Para la sombra del header
const backToTopButton = document.getElementById('back-to-top'); // Botón de volver arriba

mobileMenuButton.addEventListener('click', () => {
    // Alterna la clase 'hidden' para mostrar/ocultar el menú
    mobileMenu.classList.toggle('hidden');
    // Anima la altura máxima para una transición suave
    if (!mobileMenu.classList.contains('hidden')) {
        mobileMenu.style.maxHeight = mobileMenu.scrollHeight + "px"; // Establece la altura real del contenido
    } else {
        mobileMenu.style.maxHeight = "0px"; // Contrae el menú
    }
});

// Cierra el menú móvil cuando se hace clic en un enlace
const menuLinks = document.querySelectorAll('#mobile-menu a');
menuLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        mobileMenu.style.maxHeight = "0px"; // Asegura que la altura se restablezca
    });
});

// Añade/quita sombra al header al hacer scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
        header.classList.add('shadow-xl'); // Sombra más pronunciada al hacer scroll
    } else {
        header.classList.remove('shadow-xl');
    }

    // Muestra/oculta el botón "Volver arriba"
    if (window.scrollY > 300) { // Aparece después de 300px de scroll
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
});

// Funcionalidad del botón "Volver arriba"
backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Scroll suave
    });
});

// Animaciones de entrada al hacer scroll (Intersection Observer)
// Selecciona todos los elementos que deben animarse
const animatedElements = document.querySelectorAll('.fade-in-up, .fade-in');

// Opciones para el Intersection Observer
const observerOptions = {
    root: null, // El viewport es el root
    rootMargin: '0px', // Sin margen adicional
    threshold: 0.1 // El 10% del elemento debe ser visible para activar
};

// Callback que se ejecuta cuando un elemento entra/sale del viewport
const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Si el elemento es visible, añade la clase 'animate'
            entry.target.classList.add('animate');
            // Deja de observar el elemento una vez que se ha animado
            observer.unobserve(entry.target);
        }
    });
};

// Crea una nueva instancia del Intersection Observer
const observer = new IntersectionObserver(observerCallback, observerOptions);

// Observa cada elemento animado
animatedElements.forEach(element => {
    observer.observe(element);
});
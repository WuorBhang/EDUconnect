// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function () {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');

    mobileMenuBtn.addEventListener('click', function () {
        navMenu.classList.toggle('active');
    });

    // Close menu when a link is clicked
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            navMenu.classList.remove('active');
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Team Carousel functionality
    const carousel = document.querySelector('.team-carousel');
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');
    const members = document.querySelectorAll('.team-member');

    let currentPosition = 0;
    let memberWidth = members[0].offsetWidth + 30; // Width + gap
    let visibleMembers;

    // Determine visible members based on screen width
    function updateCarouselSettings() {
        if (window.innerWidth >= 992) {
            visibleMembers = 3;
        } else if (window.innerWidth >= 768) {
            visibleMembers = 2;
        } else {
            visibleMembers = 1;
        }

        memberWidth = members[0].offsetWidth + 30;
        currentPosition = 0;
        carousel.style.transform = `translateX(0)`;
    }

    window.addEventListener('resize', updateCarouselSettings);
    updateCarouselSettings();

    prevButton.addEventListener('click', function () {
        if (currentPosition > 0) {
            currentPosition--;
            carousel.style.transform = `translateX(-${currentPosition * memberWidth}px)`;
        }
    });

    nextButton.addEventListener('click', function () {
        if (currentPosition < members.length - visibleMembers) {
            currentPosition++;
            carousel.style.transform = `translateX(-${currentPosition * memberWidth}px)`;
        }
    });
});

//  adding footer year
document.getElementById("current-year").textContent = new Date().getFullYear();
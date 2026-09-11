// ===== Navbar Scroll Effect =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ===== Mobile Menu Toggle =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close menu on link click
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('active'));
});

// ===== Typing Effect =====
const roles = [
    'Aspiring Data Scientist',
    'Python Developer',
    'ML Enthusiast',
    'Continuous Learner & Improver',
    'Visualization Expert',
    'Problem Solver'
];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingEl = document.getElementById('typingText');

function typeEffect() {
    const currentRole = roles[roleIndex];
    if (isDeleting) {
        typingEl.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingEl.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
    }

    let speed = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex === currentRole.length) {
        speed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        speed = 500;
    }

    setTimeout(typeEffect, speed);
}
typeEffect();

// ===== Scroll Animations =====
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');

            // Animate skill bars
            if (entry.target.classList.contains('skill-bars')) {
                entry.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
                    bar.style.width = bar.dataset.width + '%';
                });
            }
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// Also observe skill-bars container
document.querySelectorAll('.skill-bars').forEach(el => observer.observe(el));

// ===== Counter Animation =====
const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const count = parseInt(el.dataset.count);
            if (!count) return;
            let current = 0;
            const increment = Math.ceil(count / 40);
            const timer = setInterval(() => {
                current += increment;
                if (current >= count) {
                    current = count;
                    clearInterval(timer);
                }
                el.textContent = current + '+';
            }, 40);
            countObserver.unobserve(el);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number[data-count]').forEach(el => countObserver.observe(el));

// ===== Form Submit (Delivers to ojshvisharma64@gmail.com) =====
async function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;

    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending to Gmail...';

    const formData = new FormData(form);

    try {
        const response = await fetch('https://formsubmit.co/ajax/ojshvisharma64@gmail.com', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            btn.innerHTML = '<i class="fas fa-check"></i> Message Delivered to Gmail!';
            btn.style.background = 'linear-gradient(135deg, #10B981, #059669)';
            form.reset();
        } else {
            throw new Error('Form service error');
        }
    } catch (err) {
        // Fallback: Open mail client
        const name = form.querySelector('[name="name"]').value;
        const email = form.querySelector('[name="email"]').value;
        const subject = encodeURIComponent(form.querySelector('[name="subject"]').value || 'Portfolio Contact');
        const message = encodeURIComponent(`From: ${name} (${email})\n\n${form.querySelector('[name="message"]').value}`);
        window.location.href = `mailto:ojshvisharma64@gmail.com?subject=${subject}&body=${message}`;
        
        btn.innerHTML = '<i class="fas fa-paper-plane"></i> Opening Email Client...';
        btn.style.background = 'linear-gradient(135deg, #10B981, #059669)';
    } finally {
        setTimeout(() => {
            btn.disabled = false;
            btn.innerHTML = originalText;
            btn.style.background = '';
        }, 4000);
    }
}

// ===== Smooth reveal on load =====
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    requestAnimationFrame(() => {
        document.body.style.opacity = '1';
    });
});

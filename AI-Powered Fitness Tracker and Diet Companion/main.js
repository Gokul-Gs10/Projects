// Slideshow functionality
let slideIndex = 0;
showSlides();

function showSlides() {
    const slides = document.querySelectorAll('.slide');
    
    // Hide all slides
    slides.forEach(slide => {
        slide.style.display = 'none';
    });

    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }

    // Display current slide with fade-in effect
    slides[slideIndex - 1].style.display = 'block';
    slides[slideIndex - 1].classList.add('fade-in');

    setTimeout(showSlides, 3000); // Change slide every 3 seconds
}

// Scroll to form functionality
function scrollToForm() {
    document.getElementById("features").scrollIntoView({ behavior: "smooth" });
}

// FAQ toggle functionality
document.querySelectorAll('.faq-btn').forEach(button => {
    button.addEventListener('click', () => {
        const content = button.nextElementSibling;
        content.style.display = content.style.display === 'block' ? 'none' : 'block';
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    header.classList.toggle('scrolled', window.scrollY > 50);
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', event => {
        event.preventDefault();
        document.querySelector(anchor.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
    });
});

// Posts and interactivity
document.addEventListener('DOMContentLoaded', () => {
    const postsContainer = document.querySelector('.posts-container');
    const postForm = document.getElementById('postForm');
    const postContent = document.getElementById('postContent');
    const postImage = document.getElementById('postImage');

    const posts = [
        { content: "Completed 10,000 steps today!", user: "Alice", image: "step-challenge.jpg" },
        { content: "Made a vegan smoothie, it's delicious!", user: "Bob", image: "smoothie.jpg" }
    ];

    // Render posts
    function renderPosts() {
        postsContainer.innerHTML = '';
        posts.forEach(post => {
            const postCard = document.createElement('div');
            postCard.classList.add('post-card');
            postCard.innerHTML = `
                <img src="${post.image}" alt="Post Image">
                <p>${post.content}</p>
                <small>- ${post.user}</small>
                <button>Like</button>
                <button>Comment</button>
            `;
            postsContainer.appendChild(postCard);
        });
    }

    // Handle post submission
    postForm.addEventListener('submit', event => {
        event.preventDefault();
        const content = postContent.value.trim();
        const image = postImage.files[0] ? URL.createObjectURL(postImage.files[0]) : null;
        if (content) {
            posts.unshift({ content, user: "You", image });
            renderPosts();
            postContent.value = "";
            postImage.value = null;
        }
    });

    renderPosts();
});

// Dynamic profile data
document.addEventListener("DOMContentLoaded", () => {
    // Fetch profile data dynamically
    const username = "JohnDoe"; // Replace with dynamic data
    const avatarUrl = "path/to/user-avatar.jpg"; // Replace with dynamic URL

    // Update profile details
    document.getElementById("username").textContent = username;
    document.getElementById("user-avatar").src = avatarUrl;

    // Graph placeholder (replace with a real graph library like Chart.js)
    const progressGraph = document.getElementById("progress-graph");
    progressGraph.textContent = "Graph will display here!";

    // Streak Calendar Placeholder
    const streakCalendar = document.getElementById("streak-calendar");
    streakCalendar.textContent = "Streak Calendar will display here!";
});

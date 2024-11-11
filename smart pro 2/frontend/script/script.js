document.getElementById("newsletter-form").addEventListener("submit", function(event) {
  event.preventDefault(); // Empêche le rechargement de la page

  const email = document.getElementById("email").value;
  const logo = document.querySlector('.logo');
  const width = window.innerwidth;
  if (width<768) {
    logo.style.width = '20px';
  }
  else{
    logo.style.width = '80px';
  }

  // Vérifiez si l'email est valide
  if (!validateEmail(email)) {
    alert("Veuillez entrer une adresse email valide.");
    return;
  }
  
  const slides = document.querySelectorAll('.slide');
  let currentSlide = 0;

  function showSlide() {
    slides.forEach((slide) => {
      slide.classList.remove('active');
    });

    slides[currentSlide].classList.add('active');

    currentSlide = (currentSlide + 1) % slides.length;
  }

  setInterval(showSlide, 4000); // Change the interval as needed

  // Envoyez la demande au serveur (backend)
  fetch('/subscribe', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email: email })
  })
  .then(response => {
    if (response.ok) {
      alert("Merci de vous être inscrit !");
    } else {
      alert("Une erreur est survenue. Veuillez réessayer.");
    }
  })
  .catch(error => {
    console.error('Erreur lors de l\'envoi de la demande :', error);
    alert("Une erreur est survenue. Veuillez réessayer.");
  });
});

function validateEmail(email) {
  // Vérification basique de l'adresse email
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}
function openModal(img) {
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImage");
    const captionText = document.getElementById("caption");

    modal.style.display = "block"; // Afficher le modal
    modalImg.src = img.src; // Définir l'image source
    captionText.innerHTML = img.alt; // Définir la légende
}

function closeModal() {
    const modal = document.getElementById("imageModal");
    modal.style.display = "none"; // Masquer le modal
}

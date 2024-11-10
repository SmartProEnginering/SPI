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

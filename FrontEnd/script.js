document.addEventListener('DOMContentLoaded', async () => {
    console.log("DOM chargé");

    // recuperer le token depuis le localStorage
    const storedToken = localStorage.getItem('token');
    const loginLink = document.getElementById('loginLink');
    const logoutLink = document.getElementById('logoutLink');  

    // token présent = utilisateur connecté
    if (storedToken) {
        // Cacher les filtres 
        const buttons = document.querySelector('.btn-filter');
        buttons.style.display = 'none';

        // Afficher le bouton "MODIFIER"
        const modifierButton = document.getElementById('modifierButton');
        if (modifierButton) {
            modifierButton.classList.remove('hidden');
            modifierButton.addEventListener('click', () => {
                const modal = document.getElementById('myModal');
                if (modal) {
                    modal.style.display = 'block';
                }
            });
        }

        // empecher rechargement de la page au click de modifier
    document.getElementById('modifierButton').addEventListener('click', function(event) {
        event.preventDefault();
    });

// Afficher la div "connexionBanner" + rajout padding
const header = document.querySelector('.header');
const connexionBanner = document.getElementById('connexionBanner');
if (connexionBanner) {
    connexionBanner.classList.remove('hidden');
    // utilisateur est connecté = ajout classe 'header-padding'
    header.classList.add('header-padding');
} else {
    // utilisateur pas connecté = suppression classe 'header-padding'
    header.classList.remove('header-padding');
}

        // Masquer le login
        if (loginLink) {
            loginLink.style.display = 'none';
        }
        // afficher le logout
        if (logoutLink) {
            logoutLink.classList.remove('hidden');
        }

        // deconnexion
        if (logoutLink) {
            logoutLink.addEventListener('click', () => {
                localStorage.removeItem('token');
                // Recharger la page
                window.location.href = 'index.html';
            });
        }
    } else {
        // si l'utilisateur n'est pas connecté = masquer logout
        if (logoutLink) {
            logoutLink.style.display = 'none';
        }
    }

    // fermer la premiere modale
    const closeFirstModal = document.querySelectorAll('.closeFirstModal');
    closeFirstModal.forEach(button => {
        button.addEventListener('click', () => {
            const firstModal = document.getElementById('myModal');
            if (firstModal) {
                firstModal.style.display = 'none';
            }
        });
    });
    
    // retour a la premiere modale
        // fermer la deuxième modale
        document.getElementById('closeSecondModal').addEventListener('click', () => {
            // Masquer la deuxième modale
            document.getElementById('secondModal').style.display = 'none';
    
            // Afficher la premeire modale
            document.getElementById('myModal').style.display = 'block';
        }
        );

    // fermer les 2 modales au click de la croix sur la 2eme modale
    document.getElementById('closeBothModals').addEventListener('click', () => {
        const firstModal = document.getElementById('myModal');
        const secondModal = document.getElementById('secondModal');
        
        if (firstModal) {
            firstModal.style.display = 'none';
        }
        if (secondModal) {
            secondModal.style.display = 'none';
        }
    });

    // Fermer les modales lorsqu'on clique a coté de la page
    window.addEventListener('click', (event) => {
        const firstModal = document.getElementById('myModal');
        const secondModal = document.getElementById('secondModal');
    
        if (firstModal && event.target === firstModal) {
            firstModal.style.display = 'none';
        }
        if (secondModal && event.target === secondModal) {
            secondModal.style.display = 'none';
        }
    });


        // click "Ajouter une photo"
        document.querySelector('.addImg').addEventListener('click', function(event) {
            event.preventDefault();
    
            // masquer la première modale
            document.getElementById('myModal').style.display = 'none';
    
            // afficher la deuxième modale
            document.getElementById('secondModal').style.display = 'block';
        });
    


// les miniatures des images dans la modal
function genererMiniatures(images) {
    const galleryThumbnails = document.querySelector('.gallery-thumbnails');

    images.forEach(image => {
        const thumbnailContainer = document.createElement('div');
        thumbnailContainer.setAttribute('data-id', image.id);
        thumbnailContainer.classList.add('thumbnail'); // Ajouté

        const thumbnail = document.createElement('img');
        thumbnail.src = image.imageUrl;
        thumbnail.alt = image.title;

        const deleteIcon = document.createElement('i');
        deleteIcon.classList.add('fas', 'fa-trash', 'fa-sm', 'delete-icon');
        deleteIcon.addEventListener('click', () => supprimerPhoto(image.id));

        thumbnailContainer.appendChild(thumbnail);
        thumbnailContainer.appendChild(deleteIcon);

        galleryThumbnails.appendChild(thumbnailContainer);
    });
}


    const reponse = await fetch("http://localhost:5678/api/works/");
    const works = await reponse.json();
    genererMiniatures(works);

                        // gallery

function genererWorks(works) {
    for (let i = 0; i < works.length; i++) {

        const article = works[i];
        // Récupération de l'élément du DOM qui accueillera les fiches
        const divGallery = document.querySelector(".gallery");
        if (!divGallery) {
            console.error("L'élément .gallery n'existe pas.");
            return;
        }
        const worksElement = document.createElement("figure");

        // Création des balises 
        const imageElement = document.createElement("img");
        imageElement.src = article.imageUrl;
        const nomElement = document.createElement("figcaption");
        nomElement.innerText = article.title;

        divGallery.appendChild(worksElement);
        worksElement.appendChild(imageElement);
        worksElement.appendChild(nomElement);
    }
}
genererWorks(works);

                        // buttons

const reponseCategories = await fetch("http://localhost:5678/api/categories");
const categories = await reponseCategories.json();

    // menu deroulant "categorie 2eme modale
    const categoryDropdown = document.getElementById('category');

    // case vide au début du menu déroulant
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.text = '';

    categoryDropdown.appendChild(defaultOption);
    
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.id; 
        option.text = category.name;
        categoryDropdown.appendChild(option);
    });

    function genererCategories(categories) {
        const sectionFilter = document.querySelector(".btn-filter");
        // creer le bouton tous
        const tousButton = document.createElement("a"); 
        tousButton.href = "#"; 
        tousButton.innerText = "Tous";
        sectionFilter.appendChild(tousButton);
        // creer les autres boutons 
        for (let i = 0; i < categories.length; i++) {
            const filter = categories[i];
            const buttonElement = document.createElement("a"); 
            buttonElement.href = "#"; 
            buttonElement.innerText = filter.name;
            sectionFilter.appendChild(buttonElement);
        }
    }
    genererCategories(categories);

    function displayImagePreview(file, imgInput, previewContainer) {
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
    
            reader.onload = function (e) {
                const img = document.createElement('img');
                img.src = e.target.result;
                img.alt = 'Image Preview';
                img.style.width = '30%'; 
    
                // ACTUALISER imgInput
                while (imgInput.firstChild) {
                    imgInput.removeChild(imgInput.firstChild);
                }
    
                previewContainer.appendChild(img);
                imgInput.appendChild(previewContainer);
            };
    
            reader.readAsDataURL(file);
        } else {
            alert('Veuillez sélectionner un fichier image.');
            fileInput.value = ''; 
            // ACTUALISER imgInput
            while (imgInput.firstChild) {
                imgInput.removeChild(imgInput.firstChild);
            }
        }
    }
    
    document.getElementById('file').addEventListener('change', function() {
        const file = this.files[0];
        const imgInput = document.querySelector('.imginput');
        const previewContainer = document.getElementById('previewContainer');
        if (file) {
            displayImagePreview(file, imgInput, previewContainer);
        }
    });

    
const fileInput = document.getElementById('file');
console.log('File Input:', fileInput);

fileInput.addEventListener('change', function() {
    console.log('File input changed.');
    console.log('File Input Files:', fileInput.files);

    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        console.log('Selected File:', file);

        validerButton.style.backgroundColor = checkButton() ? '#00a854' : '#ccc';
        errorMessage.textContent = checkButton() ? '' : 'Veuillez remplir tous les champs requis.';

        validerButton.disabled = !checkButton();
    } else {
        console.log('No file selected.');
    }
});
console.log('After File Input Event Listener');

document.getElementById('validerButton').addEventListener('click', async (event) => {
    event.preventDefault();

    if (checkButton()) {
        const title = document.getElementById('title').value;
        const category = document.getElementById('category').value;
        const fileInput = document.querySelector('#uploadForm input[type="file"]');
        console.log('File Input:', fileInput); 
        const file = fileInput ? fileInput.files[0] : null;
        console.log('Selected File:', file); 
    
            if (file) {
                await ajouterImageAGalerie(title, file, category);
    
                document.getElementById('secondModal').style.display = 'none';
                // MAJ galerie
                const updatedWorksResponse = await fetch("http://localhost:5678/api/works/");
                const updatedWorks = await updatedWorksResponse.json();
                genererMiniatures(updatedWorks);
            } else {
                console.log('Aucun fichier sélectionné.');
            }
        } else {
            //message d'erreur
            console.log('Veuillez remplir tous les champs requis.');
        }
    });

async function ajouterImageAGalerie(title, file, category) {

    console.log('title:', title);
    console.log('category:', category);
    console.log('file:', file);
    
    const formData = new FormData();
    formData.append('image', file);
    formData.append('title', title);
    formData.append('category', category);
    
    for (var pair of formData.entries()) {
        console.log(pair[0]+ ', ' + pair[1]); 
    }

    const response = await fetch('http://localhost:5678/api/works', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + storedToken
        },
        body: formData
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const json = await response.json();
    console.log(json);
}


// boutton "Valider "change de couleur

const titleInput = document.getElementById('title');
const categoryInput = document.getElementById('category');
const validerButton = document.getElementById('validerButton');
const errorMessage = document.getElementById('errorMessage');

function checkButton() {
    const title = titleInput.value;
    const file = fileInput.files.length > 0 ? fileInput.files[0] : null;
    const category = categoryInput.value;

    // verifier si le titre et le fichier sont remplis
    if (title.trim() !== '' && file && category !== '') {
        return true; // Les champs sont remplis
    } else {
        return false; // Les champs ne sont pas remplis
    }
}

// verif champ fichier
fileInput.addEventListener('change', () => {
    console.log('File input changed.');

    validerButton.style.backgroundColor = checkButton() ? '#00a854' : '#ccc';
    errorMessage.textContent = checkButton() ? '' : 'Veuillez remplir tous les champs requis.';

    validerButton.disabled = !checkButton();
});

// verif champ titre
titleInput.addEventListener('input', () => {
    console.log('Title input changed.');

    validerButton.style.backgroundColor = checkButton() ? '#00a854' : '#ccc';
    errorMessage.textContent = checkButton() ? '' : 'Veuillez remplir tous les champs requis.';

    validerButton.disabled = !checkButton();
});

// verif champ catégorie
categoryInput.addEventListener('change', () => {
    console.log('Category input changed.');

    validerButton.style.backgroundColor = checkButton() ? '#00a854' : '#ccc';
    errorMessage.textContent = checkButton() ? '' : 'Veuillez remplir tous les champs requis.';

    validerButton.disabled = !checkButton();
});

validerButton.addEventListener('click', function(e) {
    // champs ne sont pas remplis = message d'erreur
    if (!checkButton()) {
        e.preventDefault(); // empeche la soumission du formulaire
        errorMessage.textContent = 'Veuillez remplir tous les champs requis.'; // afficher le message d'erreur
    }
});

// suppression image
function supprimerPhoto(imageId) {

    fetch(`http://localhost:5678/api/works/${imageId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + storedToken, 
            'Accept': '*/*'
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });

    const thumbnailContainer = document.querySelector(`.thumbnail-container[data-id="${imageId}"]`);
    if (thumbnailContainer) {
        thumbnailContainer.remove();
    }
}


const gallery = document.querySelector(".gallery");
const boutonsFiltrer = document.querySelectorAll(".btn-filter a"); 

const allButton = Array.from(boutonsFiltrer).find(bouton => bouton.innerText === 'Tous');
if (allButton) {
    allButton.style.backgroundColor = '#1D6154';
    allButton.style.color = 'white';
}

window.onload = function() {
    if (allButton) {
        allButton.click();
    }
};


boutonsFiltrer.forEach(bouton => {
    bouton.addEventListener("click", function (event) {
        event.preventDefault(); 

        const category = bouton.innerText;
        console.log("Button catégorie :", category);



        boutonsFiltrer.forEach(function(button) {
            button.style.backgroundColor = 'white';
            button.style.color = '#1D6154';
        });


        bouton.style.backgroundColor = '#1D6154';
        bouton.style.color = 'white';

        if (category === "Tous") {
            gallery.innerHTML = "";
            genererWorks(works);
        } else {
            const worksFiltres = works.filter(function (work) {
                return work.category.name === category;
            });

            gallery.innerHTML = "";
            genererWorks(worksFiltres);
        }
    });
});

    });




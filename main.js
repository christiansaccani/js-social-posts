const posts = [
    {
        "id": 1,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/300?image=171",
        "author": {
            "name": "Phil Mangione",
            "image": "https://unsplash.it/300/300?image=15"
        },
        "likes": 80,
        "created": "2021-06-25"
    },
    {
        "id": 2,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=112",
        "author": {
            "name": "Sofia Perlari",
            "image": "https://unsplash.it/300/300?image=10"
        },
        "likes": 120,
        "created": "2021-09-03"
    },
    {
        "id": 3,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=234",
        "author": {
            "name": "Chiara Passaro",
            "image": "https://unsplash.it/300/300?image=20"
        },
        "likes": 78,
        "created": "2021-05-15"
    },
    {
        "id": 4,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=24",
        "author": {
            "name": "Luca Formicola",
            "image": null
        },
        "likes": 56,
        "created": "2021-04-03"
    },
    {
        "id": 5,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=534",
        "author": {
            "name": "Alessandro Sainato",
            "image": "https://unsplash.it/300/300?image=29"
        },
        "likes": 95,
        "created": "2021-03-05"
    }
];
 
let idLikedPosts = [];

const containerEl = document.getElementById("container");

posts.forEach(function(element) {

    containerEl.innerHTML += `
    <div class="post">
        <div class="post__header">
            <div class="post-meta">                    
                <div class="post-meta__icon p-m-i-${element.id} ">
                <!-- <img class="profile-pic" src="${element.author.image}" alt="Phil Mangione"> -->                   
                </div>
                <div class="post-meta__data">
                    <div class="post-meta__author">${element.author.name}</div>
                    <div class="post-meta__time">${element.created}</div>
                </div>                    
            </div>
        </div>
        <div class="post__text">${element.content}</div>
        <div class="post__image">
            <img src="${element.media}" alt="">
        </div>
        <div class="post__footer">
            <div class="likes js-likes">
                <div class="likes__cta">
                    <a class="like-button-${element.id}  js-like-button" href="#" data-postid="${element.id}">
                        <i class="like-button__icon fas fa-thumbs-up" aria-hidden="true"></i>
                        <span class="like-button__label">Mi Piace</span>
                    </a>
                </div>
                <div class="likes__counter">
                    Piace a <b id="like-counter-${element.id}" class="js-likes-counter">${element.likes}</b> persone
                </div>
            </div> 
        </div>            
    </div>
    `;

    const profilePicture = document.querySelector(`.p-m-i-${element.id}`);

    if (element.author.image != null) {
        const newElement = document.createElement("img");
        newElement.className = "profile-pic";
        newElement.src = element.author.image;
        newElement.alt = element.author.name;
        profilePicture.append(newElement);
    } else {
        const newElement = document.createElement("div");
        newElement.className = "profile-pic-default";

        const newSpanElement = document.createElement("span");
        let nameSurname = element.author.name.split(" ");
        newSpanElement.innerText = nameSurname[0][0] + nameSurname[1][0];
        newElement.append(newSpanElement);

        newElement.alt = element.author.name;
        profilePicture.append(newElement);
    }



    document.querySelectorAll('.js-like-button').forEach(element => { // lo stesso comportamento relativo agli array
        element.addEventListener('click', function(event) {
            event.preventDefault(); // Previene il reset della pagina
    
            const postId = this.getAttribute("data-postid");  //this ci riporta al bottone, getAttribute attribuisce l'id del post alla costante
            const likeCounter = document.getElementById(`like-counter-${postId}`);   //associo ad una variabile il like-counter relativo al post
    
            // Ciclo per rendere element l'oggetto attuale
            for (let i = 0; i < posts.length; i++) {
                if (posts[i].id == postId) {
                    element = posts[i];
                    break; // Esce dal ciclo una volta trovato l'elemento
                }
            }

            if (! idLikedPosts.includes(postId)) {
                element.likes++;
                likeCounter.textContent = element.likes;

                this.style.color = ("#219de1");
                idLikedPosts.push(postId);
                console.log(idLikedPosts)

                } else {
                    element.likes--;
                    likeCounter.textContent = element.likes;

                    this.style.color = ("");
                    let elementToRemove = postId;

                    let indexToRemove = idLikedPosts.indexOf(elementToRemove);  //indicizzo l'index con il contenuto che mi interessa rimuovere
                    idLikedPosts.splice(indexToRemove, 1);  //rimuovo 1 elemento con quell'indice 
                    console.log(idLikedPosts);

            }
        });
    });

    // Converto la data in formato americano a fprmato italiano
    const dataAmericana = element.created; 

    // Converte la data in un oggetto Date
    const data = new Date(dataAmericana);

    // converto il formato della data ad impostazioni locali e la inizializzo ad una variabile
    const dataItaliana = data.toLocaleDateString();

    document.querySelector(".post-meta__time").innerText = dataItaliana;
    // element.created = dataItaliana; -> questo comando per modificare il formato direttamente nell'array
});


const authToken = "KfKfR^zxJP83ULiw"; 

localStorage.setItem('token', authToken);


// recuperer le token depuis le localStorage
const storedToken = localStorage.getItem('token');
console.log(storedToken); // affiche le token stocké
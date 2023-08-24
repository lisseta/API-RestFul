//Constantes Importantes 
const searchInput = document.getElementById('searchInput');
const houseFilter = document.getElementById('houseFilter');
const charactersContainer = document.getElementById('characters');

//1er Avance
//Funcion Asyn Await para traer toda la informacion solicitada
async function fetchPersonajes() {
  try {
	const response = await fetch('https://hp-api.onrender.com/api/characters'); //Funcion FETCH para mandar a llamar a la API
	const personajes = await response.json();
	return personajes;
  } catch (error) {
	//console.error('Error!!!!!:', error); 
	return [];
  }
}

//Funcion para rastrear (RENDER JAVA SCRIPT)
function renderPersonajes(characters) { //Para mandar a traer a todos los personajes 
  charactersContainer.innerHTML = ''; //
// Aquì se mandan a llamar documento HTML para poder mostrar las tarjetas que presentan la inormacion

characters.forEach(character => {
	const card = document.createElement('div'); 
	card.classList.add('col-md-4', 'mb-4');
	
    card.innerHTML = `
  	<div class="card">
    	<img src="${character.image || 'default-image.jpg'}" class="card-img-top" alt="${character.name}">
    	<div class="card-body">
      	<h5 class="card-title">${character.name}</h5>
      	<p class="card-text">${character.house}</p>
        <p class="card-text">${character.patronus}</p>
        <p class="card-text">${character.alive}</p>
        <p class="card-text">${character.ancestry}</p>
    	</div>
  	</div>
	`;

	charactersContainer.appendChild(card); //Agrega nuevos elemtnos a un documento existente 
  });
}

//El filtrado de los personajes con FILTER 
function filterPersonajes() {
  const searchText = searchInput.value.toLowerCase();
  const selectedHouse = houseFilter.value;

  const filtrandoPersonajes = characters.filter(character => {
	const nameMatches = character.name.toLowerCase().includes(searchText);
	const houseMatches = selectedHouse === 'all' || character.house === selectedHouse;
	return nameMatches && houseMatches; //True y False CONC
  });

  renderPersonajes(filtrandoPersonajes);
}

let characters = [];

(async () => {
  characters = await fetchPersonajes();
  renderPersonajes(characters);

//Eventos
  searchInput.addEventListener('input', filterPersonajes); //INPUT Filtrado de Personajes, BUSCAR**
  houseFilter.addEventListener('change', filterPersonajes); //Filtrado por CASA
})();


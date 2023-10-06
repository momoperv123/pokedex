async function fetchPokemon() {

  let pokemon = $(".pokemon").val().toLowerCase().replace(/\s/g, "");
  let request = new XMLHttpRequest();

  let url = "https://pokeapi.co/api/v2/pokemon/" + pokemon;
  console.log(url);
  request.open("GET", url, true);
  request.onload = async function() {

    if (this.response == "Not Found") {
      $("#res").text('Search Result for: "' + pokemon + '"');
      $("#pokeId").html("This is not a registered pokemon in the pokedex <br>Check your spelling and enter a valid pokemon name or ID");
      $("#moveset").empty();
      $("#weakness").empty();
      $('#front').attr('src', '');
      $('#back').attr('src', '');
      $("#imgCaption").empty();
      $('#shinyFront').attr('src', '')
      $('#shinyBack').attr('src', '')
      $("#shinyImgCaption").empty();
      $("#pokeHandW").empty();
      $("#pokeType").empty();
      $("#evolutions").empty();
      $("#ability").empty();
      $("#strong").empty();
    }

    else {

      let data = JSON.parse(this.response);

      if (request.status >= 200 && request.status < 400) {
        let frontImg = data.sprites.front_default;
        let backImg = data.sprites.back_default;
        let shinyFrontImg = data.sprites.front_shiny;
        let shinyBackImg = data.sprites.back_shiny;
        let pokeId = data.id;
        let pokeName = data.name;
        let heightM = data.height / 10;
        let weightKg = data.weight / 10;
        let heightFt = (heightM * 3.28084).toFixed(2);
        let weightLbs = (weightKg * 2.20462).toFixed(2);
        let moves = data.moves.map(move => move.move.name);
        let randomMoves = getRandomElements(moves, 4);
        let pokeType = data.types.map(type => type.type.name);
        let evolutionForms = await getPokemonEvolutionForms(pokemon);
        let ability = await getPokemonAbilities(pokemon);

        $("#res").text('Search Result for: "' + pokemon + '"');
        $("#pokeId").text(pokeName + "'s Pokedex ID is " + pokeId);
        $("#pokeHandW").html(pokeName + " is <span style='color: #3B4CCA'>" + heightFt + " feet tall</span> and <span style='color: #3B4CCA'>weighs " + weightLbs + " pounds</span>");
        if (pokeType.length === 1) {
          $("#pokeType").html(pokeName + " is a <span class='" + pokeType[0].toLowerCase() + "'>" + pokeType[0] + "</span> type");
        } else {
          $("#pokeType").html(pokeName + " is a <span class='" + pokeType[0].toLowerCase() + "'>" + pokeType[0] + "</span> and <span class='" + pokeType[pokeType.length - 1].toLowerCase() + "'>" + pokeType[pokeType.length - 1] + "</span> type");
        }
        if (ability.length === 1) {
          $("#ability").html(pokeName + "'s ability is <span class='ability'>" + ability[0] + "</span>");
        } else {
          $("#ability").html(pokeName + "'s ability can be <span class='ability'>" + ability[0] + "</span> or <span class='ability'>" + ability[1] + "</span>");
        }
        $("#evolutions").text(pokeName + "'s evolution forms are:");
        $("#evolutions").append("<li>" + evolutionForms.join("</li><li>") + "</li>");

        $('#imgCaption').text("Regular");
        $('#front').attr('src', frontImg);
        $('#back').attr('src', backImg);
        $('#shinyImgCaption').text("Shiny");
        $('#shinyFront').attr('src', shinyFrontImg);
        $('#shinyBack').attr('src', shinyBackImg);

        $('#front').off('click');
        $('#back').off('click');
        $('#shinyFront').off('click');
        $('#shinyBack').off('click');

        $('#front').on('click', function() {
          toggleImage(this, frontImg, backImg);
        });
        $('#back').on('click', function() {
          toggleImage(this, backImg, frontImg);
        });
        $('#shinyFront').on('click', function() {
          toggleImage(this, shinyFrontImg, shinyBackImg);
        });
        $('#shinyBack').on('click', function() {
          toggleImage(this, shinyBackImg, shinyFrontImg);
        });

        $("#moveset").empty();
        $("#moveset").html("Some of " + pokeName + "'s moves are (<span style='color: forestgreen'>Click 'Fetch' to re-roll</span>):");
        randomMoves.forEach(function(move) {
          $("#moveset").append("<li>" + move + "</li>");
        });

        $("#weakness").empty();
        $("#weakness").text(pokeName + " is weak against:");
        for (let i = 0; i < pokeType.length; i++) {
          let typeUrl = "https://pokeapi.co/api/v2/type/" + pokeType[i];
          let typeRequest = new XMLHttpRequest();
          typeRequest.open("GET", typeUrl, true);
          typeRequest.onload = function() {
            if (typeRequest.status >= 200 && typeRequest.status < 400) {
              let typeData = JSON.parse(typeRequest.response);
              let damageRelations = typeData.damage_relations.double_damage_from;
              damageRelations.forEach(function(relation) {
                let weakType = relation.name;
                $("#weakness").append("<li class='" + weakType + "'>" + weakType + "</li>");
              });
            }
          };
          typeRequest.send();
        }
        for (let i = 0; i < pokeType.length; i++) {
          let typeUrl = "https://pokeapi.co/api/v2/type/" + pokeType[i];
          let typeRequest = new XMLHttpRequest();
          typeRequest.open("GET", typeUrl, true);
          typeRequest.onload = function() {
            if (typeRequest.status >= 200 && typeRequest.status < 400) {
              let typeData = JSON.parse(typeRequest.response);
              let damageRelations = typeData.damage_relations.double_damage_to;
              let strongAgainstTypes = [];
              damageRelations.forEach(function(relation) {
                let strongType = relation.name;
                strongAgainstTypes.push(strongType);
              });
              $("#strong").empty();
              $("#strong").text(pokeName + " is strong against:");
              strongAgainstTypes.forEach(function(strongType) {
                let $typeElement = $("<li>" + strongType + "</li>");
                $typeElement.addClass(strongType.toLowerCase());
                $("#strong").append($typeElement);
              });
            }
          };
          typeRequest.send();
        }
      }
    }
  };

  request.send();

  function getRandomElements(arr, n) {
  if (arr.length <= n) {
    return arr;
  }

  let result = new Array(n);
  let len = arr.length;
  let taken = new Array(len);
  
  while (n--) {
    let x = Math.floor(Math.random() * len);
    result[n] = arr[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }
  
  return result;
}

  async function getPokemonAbilities(pokemon) {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}/`;
    const response = await fetch(url);
    const data = await response.json();
    const abilities = data.abilities.map(ability => ability.ability.name);
    return abilities;
  }

  async function getPokemonEvolutionForms(pokemon) {
    const speciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${pokemon}/`;
    const speciesResponse = await fetch(speciesUrl);
    const speciesData = await speciesResponse.json();
    const evolutionChainUrl = speciesData.evolution_chain.url;
    const evolutionChainResponse = await fetch(evolutionChainUrl);
    const evolutionChainData = await evolutionChainResponse.json();

    const evolutionForms = [evolutionChainData.chain.species.name];
    let evolutionStep = evolutionChainData.chain.evolves_to[0];
    while (evolutionStep) {
      evolutionForms.push(evolutionStep.species.name);
      evolutionStep = evolutionStep.evolves_to[0];
    }

    return evolutionForms;
  }


  const pdImgSound = new Audio('sfx/pokedex-image-sfx.mp3');

  function toggleImage(imgElement, currentImage, newImage) {
    if (imgElement.src === currentImage) {
      imgElement.src = newImage;
    } else {
      imgElement.src = currentImage;
    }

    pdImgSound.volume = 1;
    pdImgSound.currentTime = 0;
    pdImgSound.play();
  }
}

const button = document.getElementById('fetchButton');
const buttonSound = document.getElementById('buttonSound');

button.addEventListener('click', () => {
  buttonSound.currentTime = 0;
  buttonSound.volume = 0.5;
  buttonSound.play();
});

document.getElementById("pokemon-input").addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    fetchPokemon();
    buttonSound.play();
  }
});

const toggleBtn = document.getElementById('toggle-examples');
const examplesImg = document.getElementById('examples');

toggleBtn.addEventListener('click', function() {
  if (examplesImg.style.display === 'block') {
    examplesImg.style.display = 'none';
  } else {
    examplesImg.style.display = 'block';
  }
  buttonSound.currentTime = 0;
  buttonSound.volume = 0.5;
  buttonSound.play();
});

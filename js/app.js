/* js/app.js - Pokémon Team Builder & Analyzer Logic */

// Global App State
let activeTeam = [];
let currentSlotIndex = -1;
let activeTab = "builder";
let activeAnalysisSlide = 0; // 0: Eficaz, 1: Inmunes y Resistencias, 2: Débil
let activeBuildeoTabSlide = 0; // 0: Movimientos, 1: Habilidades/Stats, 2: Objetos
let buildeoSlides = [0, 0, 0, 0, 0, 0]; // Active slide for each slot in the buildeo tab

// --- DYNAMIC DATA INJECTION ---
if (typeof POKEDEX !== 'undefined') {
  POKEDEX["girafarig"] = {
    "num": 203,
    "name": "Girafarig",
    "types": ["Normal", "Psychic"],
    "baseStats": { "hp": 70, "atk": 80, "def": 65, "spa": 90, "spd": 65, "spe": 85 },
    "abilities": { "0": "Inner Focus", "1": "Early Bird", "H": "Sap Sipper" },
    "heightm": 1.5,
    "weightkg": 41.5,
    "color": "Yellow",
    "eggGroups": ["Field"],
    "tier": "ZU"
  };

  POKEDEX["farigiraf"] = {
    "num": 981,
    "name": "Farigiraf",
    "types": ["Normal", "Psychic"],
    "baseStats": { "hp": 120, "atk": 90, "def": 70, "spa": 110, "spd": 70, "spe": 60 },
    "abilities": { "0": "Cud Chew", "1": "Armor Tail", "H": "Sap Sipper" },
    "heightm": 3.2,
    "weightkg": 160,
    "color": "Yellow",
    "prevo": "Girafarig",
    "eggGroups": ["Field"],
    "tier": "ZU"
  };

  POKEDEX["decidueyehisui"] = {
    "num": 724,
    "name": "Decidueye-Hisui",
    "baseSpecies": "Decidueye",
    "forme": "Hisui",
    "types": ["Grass", "Fighting"],
    "baseStats": { "hp": 88, "atk": 112, "def": 80, "spa": 95, "spd": 95, "spe": 60 },
    "abilities": { "0": "Overgrow", "H": "Scrappy" },
    "heightm": 1.6,
    "weightkg": 37,
    "color": "Brown",
    "eggGroups": ["Flying"],
    "tier": "RU"
  };

  POKEDEX["decidueye"] = {
    "num": 724,
    "name": "Decidueye",
    "types": ["Grass", "Ghost"],
    "baseStats": { "hp": 78, "atk": 107, "def": 75, "spa": 100, "spd": 100, "spe": 70 },
    "abilities": { "0": "Overgrow", "H": "Long Reach" },
    "heightm": 1.6,
    "weightkg": 36.6,
    "color": "Brown",
    "eggGroups": ["Flying"],
    "tier": "NU"
  };

  POKEDEX["lycanrocmidnight"] = {
    "num": 745,
    "name": "Lycanroc-Midnight",
    "baseSpecies": "Lycanroc",
    "forme": "Midnight",
    "types": ["Rock"],
    "baseStats": { "hp": 85, "atk": 115, "def": 75, "spa": 55, "spd": 75, "spe": 82 },
    "abilities": { "0": "Keen Eye", "1": "Vital Spirit", "H": "No Guard" },
    "heightm": 1.1,
    "weightkg": 25,
    "color": "Red",
    "eggGroups": ["Field"],
    "tier": "PU"
  };

  POKEDEX["lycanroc"] = {
    "num": 745,
    "name": "Lycanroc",
    "types": ["Rock"],
    "baseStats": { "hp": 75, "atk": 115, "def": 65, "spa": 55, "spd": 65, "spe": 112 },
    "abilities": { "0": "Keen Eye", "1": "Sand Rush", "H": "Steadfast" },
    "heightm": 0.8,
    "weightkg": 25,
    "color": "Brown",
    "eggGroups": ["Field"],
    "tier": "PU"
  };

  POKEDEX["ceruledge"] = {
    "num": 937,
    "name": "Ceruledge",
    "types": ["Fire", "Ghost"],
    "baseStats": { "hp": 75, "atk": 125, "def": 80, "spa": 60, "spd": 100, "spe": 85 },
    "abilities": { "0": "Flash Fire", "H": "Weak Armor" },
    "heightm": 1.6,
    "weightkg": 62,
    "color": "Purple",
    "eggGroups": ["Human-Like"],
    "tier": "OU"
  };

  POKEDEX["armarouge"] = {
    "num": 936,
    "name": "Armarouge",
    "types": ["Fire", "Psychic"],
    "baseStats": { "hp": 85, "atk": 60, "def": 100, "spa": 125, "spd": 80, "spe": 75 },
    "abilities": { "0": "Flash Fire", "H": "Weak Armor" },
    "heightm": 1.5,
    "weightkg": 85,
    "color": "Red",
    "eggGroups": ["Human-Like"],
    "tier": "UU"
  };

  POKEDEX["zoroarkhisui"] = {
    "num": 571,
    "name": "Zoroark-Hisui",
    "baseSpecies": "Zoroark",
    "forme": "Hisui",
    "types": ["Normal", "Ghost"],
    "baseStats": { "hp": 55, "atk": 100, "def": 60, "spa": 125, "spd": 60, "spe": 110 },
    "abilities": { "0": "Illusion" },
    "heightm": 1.6,
    "weightkg": 73,
    "color": "Gray",
    "eggGroups": ["Field"],
    "tier": "OU"
  };

  POKEDEX["goodrahisui"] = {
    "num": 706,
    "name": "Goodra-Hisui",
    "baseSpecies": "Goodra",
    "forme": "Hisui",
    "types": ["Steel", "Dragon"],
    "baseStats": { "hp": 80, "atk": 100, "def": 100, "spa": 110, "spd": 150, "spe": 60 },
    "abilities": { "0": "Sap Sipper", "1": "Overcoat", "H": "Gooey" },
    "heightm": 1.7,
    "weightkg": 334.1,
    "color": "Purple",
    "eggGroups": ["Dragon"],
    "tier": "OU"
  };

  POKEDEX["annihilape"] = {
    "num": 979,
    "name": "Annihilape",
    "types": ["Fighting", "Ghost"],
    "baseStats": { "hp": 110, "atk": 115, "def": 80, "spa": 50, "spd": 90, "spe": 90 },
    "abilities": { "0": "Vital Spirit", "1": "Inner Focus", "H": "Defiant" },
    "heightm": 1.2,
    "weightkg": 56,
    "color": "Gray",
    "eggGroups": ["Field"],
    "tier": "Uber"
  };

  POKEDEX["incineroar"] = {
    "num": 727,
    "name": "Incineroar",
    "types": ["Fire", "Dark"],
    "baseStats": { "hp": 95, "atk": 115, "def": 90, "spa": 80, "spd": 90, "spe": 60 },
    "abilities": { "0": "Blaze", "H": "Intimidate" },
    "heightm": 1.8,
    "weightkg": 83,
    "color": "Red",
    "eggGroups": ["Field"],
    "tier": "OU"
  };

  POKEDEX["primarina"] = {
    "num": 730,
    "name": "Primarina",
    "types": ["Water", "Fairy"],
    "baseStats": { "hp": 80, "atk": 74, "def": 74, "spa": 126, "spd": 116, "spe": 60 },
    "abilities": { "0": "Torrent", "H": "Liquid Voice" },
    "heightm": 1.8,
    "weightkg": 44,
    "color": "Blue",
    "eggGroups": ["Water 1", "Field"],
    "tier": "UU"
  };

  POKEDEX["toxapex"] = {
    "num": 748,
    "name": "Toxapex",
    "types": ["Poison", "Water"],
    "baseStats": { "hp": 50, "atk": 63, "def": 152, "spa": 53, "spd": 142, "spe": 35 },
    "abilities": { "0": "Merciless", "1": "Limber", "H": "Regenerator" },
    "heightm": 0.7,
    "weightkg": 14.5,
    "color": "Blue",
    "eggGroups": ["Water 1"],
    "tier": "OU"
  };

  POKEDEX["corviknight"] = {
    "num": 823,
    "name": "Corviknight",
    "types": ["Flying", "Steel"],
    "baseStats": { "hp": 98, "atk": 87, "def": 105, "spa": 53, "spd": 85, "spe": 67 },
    "abilities": { "0": "Pressure", "1": "Unnerve", "H": "Mirror Armor" },
    "heightm": 2.2,
    "weightkg": 75,
    "color": "Purple",
    "eggGroups": ["Flying"],
    "tier": "OU"
  };

  POKEDEX["grimmsnarl"] = {
    "num": 861,
    "name": "Grimmsnarl",
    "types": ["Dark", "Fairy"],
    "baseStats": { "hp": 95, "atk": 120, "def": 65, "spa": 95, "spd": 75, "spe": 60 },
    "abilities": { "0": "Prankster", "1": "Frisk", "H": "Pickpocket" },
    "heightm": 1.5,
    "weightkg": 61,
    "color": "Purple",
    "eggGroups": ["Fairy", "Human-Like"],
    "tier": "OU"
  };

  POKEDEX["hatterene"] = {
    "num": 858,
    "name": "Hatterene",
    "types": ["Psychic", "Fairy"],
    "baseStats": { "hp": 57, "atk": 90, "def": 95, "spa": 136, "spd": 103, "spe": 29 },
    "abilities": { "0": "Healer", "1": "Anticipation", "H": "Magic Bounce" },
    "heightm": 2.1,
    "weightkg": 5.1,
    "color": "Pink",
    "eggGroups": ["Fairy"],
    "tier": "OU"
  };

  POKEDEX["dragapult"] = {
    "num": 887,
    "name": "Dragapult",
    "types": ["Dragon", "Ghost"],
    "baseStats": { "hp": 88, "atk": 120, "def": 75, "spa": 100, "spd": 75, "spe": 142 },
    "abilities": { "0": "Clear Body", "1": "Infiltrator", "H": "Cursed Body" },
    "heightm": 3,
    "weightkg": 50,
    "color": "Green",
    "eggGroups": ["Dragon", "Amorphous"],
    "tier": "OU"
  };

  POKEDEX["meowscarada"] = {
    "num": 908,
    "name": "Meowscarada",
    "types": ["Grass", "Dark"],
    "baseStats": { "hp": 76, "atk": 110, "def": 70, "spa": 81, "spd": 70, "spe": 123 },
    "abilities": { "0": "Overgrow", "H": "Protean" },
    "heightm": 1.5,
    "weightkg": 31.2,
    "color": "Green",
    "eggGroups": ["Field", "Grass"],
    "tier": "OU"
  };

  POKEDEX["skeledirge"] = {
    "num": 911,
    "name": "Skeledirge",
    "types": ["Fire", "Ghost"],
    "baseStats": { "hp": 104, "atk": 75, "def": 100, "spa": 110, "spd": 75, "spe": 66 },
    "abilities": { "0": "Blaze", "H": "Unaware" },
    "heightm": 1.6,
    "weightkg": 326.5,
    "color": "Red",
    "eggGroups": ["Field"],
    "tier": "OU"
  };

  POKEDEX["quaquaval"] = {
    "num": 914,
    "name": "Quaquaval",
    "types": ["Water", "Fighting"],
    "baseStats": { "hp": 85, "atk": 120, "def": 80, "spa": 85, "spd": 75, "spe": 85 },
    "abilities": { "0": "Torrent", "H": "Moxie" },
    "heightm": 1.8,
    "weightkg": 61.9,
    "color": "Blue",
    "eggGroups": ["Flying", "Water 1"],
    "tier": "UU"
  };

  POKEDEX["maushold"] = {
    "num": 925,
    "name": "Maushold",
    "types": ["Normal"],
    "baseStats": { "hp": 74, "atk": 75, "def": 70, "spa": 65, "spd": 75, "spe": 111 },
    "abilities": { "0": "Friend Guard", "1": "Cheek Pouch", "H": "Technician" },
    "heightm": 0.3,
    "weightkg": 2.8,
    "color": "White",
    "eggGroups": ["Field", "Fairy"],
    "tier": "RU"
  };

  POKEDEX["garganacl"] = {
    "num": 934,
    "name": "Garganacl",
    "types": ["Rock"],
    "baseStats": { "hp": 100, "atk": 100, "def": 130, "spa": 45, "spd": 90, "spe": 35 },
    "abilities": { "0": "Purifying Salt", "1": "Sturdy", "H": "Clear Body" },
    "heightm": 2.3,
    "weightkg": 240,
    "color": "Brown",
    "eggGroups": ["Mineral"],
    "tier": "OU"
  };

  POKEDEX["tinkaton"] = {
    "num": 959,
    "name": "Tinkaton",
    "types": ["Fairy", "Steel"],
    "baseStats": { "hp": 85, "atk": 75, "def": 77, "spa": 70, "spd": 105, "spe": 94 },
    "abilities": { "0": "Mold Breaker", "1": "Own Tempo", "H": "Pickpocket" },
    "heightm": 0.7,
    "weightkg": 112.8,
    "color": "Pink",
    "eggGroups": ["Fairy"],
    "tier": "RU"
  };

  POKEDEX["glimmora"] = {
    "num": 970,
    "name": "Glimmora",
    "types": ["Rock", "Poison"],
    "baseStats": { "hp": 83, "atk": 55, "def": 90, "spa": 130, "spd": 81, "spe": 86 },
    "abilities": { "0": "Toxic Debris", "H": "Corrosion" },
    "heightm": 1.5,
    "weightkg": 45,
    "color": "Blue",
    "eggGroups": ["Mineral"],
    "tier": "OU"
  };

  POKEDEX["kingambit"] = {
    "num": 983,
    "name": "Kingambit",
    "types": ["Dark", "Steel"],
    "baseStats": { "hp": 100, "atk": 135, "def": 120, "spa": 60, "spd": 85, "spe": 50 },
    "abilities": { "0": "Defiant", "1": "Supreme Overlord", "H": "Pressure" },
    "heightm": 2,
    "weightkg": 120,
    "color": "Black",
    "eggGroups": ["Human-Like"],
    "tier": "OU"
  };

  POKEDEX["gholdengo"] = {
    "num": 1000,
    "name": "Gholdengo",
    "types": ["Steel", "Ghost"],
    "baseStats": { "hp": 87, "atk": 60, "def": 95, "spa": 133, "spd": 91, "spe": 84 },
    "abilities": { "0": "Good as Gold" },
    "heightm": 1.2,
    "weightkg": 30,
    "color": "Yellow",
    "eggGroups": ["Genderless"],
    "tier": "OU"
  };

  POKEDEX["sinistcha"] = {
    "num": 1013,
    "name": "Sinistcha",
    "types": ["Grass", "Ghost"],
    "baseStats": { "hp": 71, "atk": 60, "def": 106, "spa": 121, "spd": 80, "spe": 70 },
    "abilities": { "0": "Hospitality", "H": "Heatproof" },
    "heightm": 0.2,
    "weightkg": 2.2,
    "color": "Green",
    "eggGroups": ["Amorphous"],
    "tier": "UU"
  };

  POKEDEX["archaludon"] = {
    "num": 1018,
    "name": "Archaludon",
    "types": ["Steel", "Dragon"],
    "baseStats": { "hp": 90, "atk": 105, "def": 130, "spa": 125, "spd": 65, "spe": 85 },
    "abilities": { "0": "Stamina", "1": "Sturdy", "H": "Stalwart" },
    "heightm": 2,
    "weightkg": 60,
    "color": "Blue",
    "eggGroups": ["Mineral", "Dragon"],
    "tier": "OU"
  };

  POKEDEX["rotom"] = {
    "num": 479,
    "name": "Rotom",
    "types": ["Electric", "Ghost"],
    "baseStats": { "hp": 50, "atk": 50, "def": 77, "spa": 95, "spd": 77, "spe": 91 },
    "abilities": { "0": "Levitate", "1": "Static", "H": "Motor Drive" },
    "heightm": 0.3,
    "weightkg": 0.3,
    "color": "Red",
    "eggGroups": ["Amorphous"],
    "tier": "ZU"
  };

  POKEDEX["rotomheat"] = {
    "num": 479,
    "name": "Rotom-Heat",
    "baseSpecies": "Rotom",
    "forme": "Heat",
    "types": ["Electric", "Fire"],
    "baseStats": { "hp": 50, "atk": 65, "def": 107, "spa": 105, "spd": 107, "spe": 86 },
    "abilities": { "0": "Levitate", "1": "Flame Body", "H": "Motor Drive" },
    "heightm": 0.3,
    "weightkg": 0.3,
    "color": "Red",
    "eggGroups": ["Amorphous"],
    "tier": "UU"
  };

  POKEDEX["rotomwash"] = {
    "num": 479,
    "name": "Rotom-Wash",
    "baseSpecies": "Rotom",
    "forme": "Wash",
    "types": ["Electric", "Water"],
    "baseStats": { "hp": 50, "atk": 65, "def": 107, "spa": 105, "spd": 107, "spe": 86 },
    "abilities": { "0": "Levitate", "1": "Water Absorb", "H": "Storm Drain" },
    "heightm": 0.3,
    "weightkg": 0.3,
    "color": "Red",
    "eggGroups": ["Amorphous"],
    "tier": "OU"
  };

  POKEDEX["rotomfrost"] = {
    "num": 479,
    "name": "Rotom-Frost",
    "baseSpecies": "Rotom",
    "forme": "Frost",
    "types": ["Electric", "Ice"],
    "baseStats": { "hp": 50, "atk": 65, "def": 107, "spa": 105, "spd": 107, "spe": 86 },
    "abilities": { "0": "Levitate", "1": "Slush Rush", "H": "Refrigerate" },
    "heightm": 0.3,
    "weightkg": 0.3,
    "color": "Red",
    "eggGroups": ["Amorphous"],
    "tier": "ZU"
  };

  POKEDEX["rotomfan"] = {
    "num": 479,
    "name": "Rotom-Fan",
    "baseSpecies": "Rotom",
    "forme": "Fan",
    "types": ["Electric", "Flying"],
    "baseStats": { "hp": 50, "atk": 65, "def": 107, "spa": 105, "spd": 107, "spe": 86 },
    "abilities": { "0": "Levitate", "1": "Speed Boost", "H": "Wind Power" },
    "heightm": 0.3,
    "weightkg": 0.3,
    "color": "Red",
    "eggGroups": ["Amorphous"],
    "tier": "ZU"
  };  POKEDEX["rotommow"] = {
    "num": 479,
    "name": "Rotom-Mow",
    "baseSpecies": "Rotom",
    "forme": "Mow",
    "types": ["Electric", "Grass"],
    "baseStats": { "hp": 50, "atk": 65, "def": 107, "spa": 105, "spd": 107, "spe": 86 },
    "abilities": { "0": "Levitate", "1": "Chlorophyll", "H": "Grassy Surge" },
    "heightm": 0.3,
    "weightkg": 0.3,
    "color": "Red",
    "eggGroups": ["Amorphous"],
    "tier": "PU"
  };

  POKEDEX["raichumegax"] = {
    "num": 26,
    "name": "Raichu-Mega-X",
    "baseSpecies": "Raichu",
    "forme": "Mega-X",
    "types": ["Electric", "Fighting"],
    "baseStats": { "hp": 60, "atk": 130, "def": 75, "spa": 90, "spd": 90, "spe": 140 },
    "abilities": { "0": "Speed Boost", "1": "Surge Surfer", "H": "Motor Drive" },
    "requiredItem": "Raichunite X",
    "heightm": 0.8,
    "weightkg": 30,
    "color": "Yellow",
    "eggGroups": ["Field", "Fairy"],
    "tier": "OU"
  };

  POKEDEX["raichumegay"] = {
    "num": 26,
    "name": "Raichu-Mega-Y",
    "baseSpecies": "Raichu",
    "forme": "Mega-Y",
    "types": ["Electric", "Psychic"],
    "baseStats": { "hp": 60, "atk": 70, "def": 65, "spa": 140, "spd": 110, "spe": 140 },
    "abilities": { "0": "Electric Surge", "1": "Levitate", "H": "Magic Guard" },
    "requiredItem": "Raichunite Y",
    "heightm": 0.8,
    "weightkg": 30,
    "color": "Yellow",
    "eggGroups": ["Field", "Fairy"],
    "tier": "OU"
  };
}

if (typeof LEARNSETS !== 'undefined') {
  LEARNSETS["girafarig"] = [
    "astonish", "growl", "tackle", "confusion", "stomp", "agility",
    "psybeam", "batonpass", "doublehit", "psychic", "nastyplot",
    "shadowball", "thunderbolt", "dazzlinggleam", "energyball", "trick", "calmmind"
  ];

  LEARNSETS["farigiraf"] = [
    "tackle", "growl", "confusion", "stomp", "psybeam", "agility",
    "psychic", "nastyplot", "shadowball", "thunderbolt", "dazzlinggleam",
    "energyball", "trick", "calmmind", "hypervoice", "earthquake", "bodypress"
  ];

  LEARNSETS["decidueyehisui"] = ["leafblade", "closecombat", "bravebird", "shadowsneak", "roost", "swordsdance", "protect", "suckerpunch", "uturn"];
  LEARNSETS["decidueye"] = ["leafblade", "bravebird", "shadowsneak", "roost", "swordsdance", "protect", "nastyplot", "uturn"];
  LEARNSETS["lycanrocmidnight"] = ["stoneedge", "rockslide", "closecombat", "counter", "stealthrock", "suckerpunch", "thunderfang", "firefang", "protect"];
  LEARNSETS["lycanroc"] = ["accelerock", "stoneedge", "rockslide", "closecombat", "crunch", "swordsdance", "stealthrock", "protect"];
  LEARNSETS["ceruledge"] = ["bitterblade", "poltergeist", "shadowsneak", "closecombat", "swordsdance", "shadowball", "fireblast", "protect", "willowisp"];
  LEARNSETS["armarouge"] = ["expandingforce", "energyball", "calmmind", "heatwave", "psyshock", "trickroom", "protect", "willowisp"];
  LEARNSETS["zoroarkhisui"] = ["hypervoice", "shadowball", "flamethrower", "nastyplot", "trick", "uturn", "protect"];
  LEARNSETS["goodrahisui"] = ["dragonpulse", "flashcannon", "dracometeor", "thunderbolt", "flamethrower", "earthquake", "bodypress", "protect"];
  LEARNSETS["annihilape"] = ["drainpunch", "closecombat", "shadowclaw", "bulkup", "stealthrock", "taunt", "finalgambit", "protect"];
  LEARNSETS["incineroar"] = ["flareblitz", "knockoff", "fakeout", "partingshot", "willowisp", "closecombat", "taunt", "protect"];
  LEARNSETS["primarina"] = ["hypervoice", "moonblast", "surf", "energyball", "calmmind", "sparklingaria", "icebeam", "protect"];
  LEARNSETS["toxapex"] = ["scald", "toxic", "recover", "banefulbunker", "haze", "toxicspikes", "sludgebomb", "protect"];
  LEARNSETS["corviknight"] = ["bravebird", "ironhead", "bodypress", "roost", "defog", "u-turn", "tailwind", "protect"];
  LEARNSETS["grimmsnarl"] = ["spiritbreak", "suckerpunch", "reflect", "lightscreen", "taunt", "thunderwave", "foulplay", "protect"];
  LEARNSETS["hatterene"] = ["psychic", "dazzlinggleam", "trickroom", "calmmind", "mysticalfire", "healingwish", "protect"];
  LEARNSETS["dragapult"] = ["dragondarts", "phantomforce", "shadowball", "dracometeor", "flamethrower", "uturn", "willowisp", "protect"];
  LEARNSETS["meowscarada"] = ["flowertrick", "knockoff", "playrough", "uturn", "suckerpunch", "trick", "toxicspikes", "protect"];
  LEARNSETS["skeledirge"] = ["torchsong", "shadowball", "slackoff", "willowisp", "earthpower", "alluringvoice", "hex", "protect"];
  LEARNSETS["quaquaval"] = ["aquastep", "closecombat", "bravebird", "swordsdance", "icespinner", "roost", "rapidspin", "protect"];
  LEARNSETS["maushold"] = ["populationbomb", "tidyingup", "superfang", "playrough", "followme", "u-turn", "encore", "protect"];
  LEARNSETS["garganacl"] = ["saltcure", "recover", "stealthrock", "irondefense", "bodypress", "earthquake", "protect"];
  LEARNSETS["tinkaton"] = ["gigatonhammer", "playrough", "knockoff", "fakeout", "stealthrock", "encore", "thunderwave", "protect"];
  LEARNSETS["glimmora"] = ["sludgewave", "powergem", "earthpower", "stealthrock", "spikes", "mortalspin", "energyball", "protect"];
  LEARNSETS["kingambit"] = ["kowtowcleave", "suckerpunch", "ironhead", "swordsdance", "lowkick", "protect"];
  LEARNSETS["gholdengo"] = ["makeitrain", "shadowball", "nastyplot", "recover", "thunderbolt", "focusblast", "trick", "protect"];
  LEARNSETS["sinistcha"] = ["matchagotcha", "shadowball", "strengthsap", "calmmind", "life-dew", "trickroom", "ragepowder", "protect"];
  LEARNSETS["archaludon"] = ["electroshot", "flashcannon", "dracometeor", "bodypress", "dragonpulse", "stealthrock", "snarl", "protect"];
  LEARNSETS["rotom"] = ["thunderbolt", "shadowball", "voltswitch", "willowisp", "trick", "nastyplot", "substitute", "protect"];
  LEARNSETS["rotomheat"] = ["overheat", "thunderbolt", "voltswitch", "willowisp", "trick", "nastyplot", "substitute", "protect"];
  LEARNSETS["rotomwash"] = ["hydropump", "thunderbolt", "voltswitch", "willowisp", "trick", "nastyplot", "substitute", "protect"];
  LEARNSETS["rotomfrost"] = ["blizzard", "thunderbolt", "voltswitch", "willowisp", "trick", "nastyplot", "substitute", "protect"];
  LEARNSETS["rotomfan"] = ["airslash", "thunderbolt", "voltswitch", "willowisp", "trick", "nastyplot", "substitute", "protect"];
  LEARNSETS["rotommow"] = ["leafstorm", "thunderbolt", "voltswitch", "willowisp", "trick", "nastyplot", "substitute", "protect"];
  LEARNSETS["raichumegax"] = ["thunderbolt", "closecombat", "volt-tackle", "drainpunch", "voltswitch", "fakeout", "nastyplot", "protect"];
  LEARNSETS["raichumegay"] = ["thunderbolt", "psychic", "expandingforce", "focusblast", "voltswitch", "nastyplot", "calmmind", "protect"];
}

if (typeof ABILITIES_DB !== 'undefined') {
  ABILITIES_DB["Inner Focus"] = "Foco Interno";
  ABILITIES_DB["Early Bird"] = "Madrugar";
  ABILITIES_DB["Sap Sipper"] = "Herbívoro";
  ABILITIES_DB["Cud Chew"] = "Rumia";
  ABILITIES_DB["Armor Tail"] = "Cola Armadura";
  ABILITIES_DB["Overgrow"] = "Espesura";
  ABILITIES_DB["Scrappy"] = "Intrépido";
  ABILITIES_DB["Long Reach"] = "Remoto";
  ABILITIES_DB["Vital Spirit"] = "Espíritu Vital";
  ABILITIES_DB["No Guard"] = "Indefenso";
  ABILITIES_DB["Flash Fire"] = "Absorbe Fuego";
  ABILITIES_DB["Weak Armor"] = "Armadura Frágil";
  ABILITIES_DB["Illusion"] = "Ilusión";
  ABILITIES_DB["Gooey"] = "Baboso";
  ABILITIES_DB["Defiant"] = "Competitivo";
  ABILITIES_DB["Intimidate"] = "Intimidación";
  ABILITIES_DB["Regenerator"] = "Regeneración";
  ABILITIES_DB["Prankster"] = "Bromista";
  ABILITIES_DB["Magic Bounce"] = "Espejo Mágico";
  ABILITIES_DB["Clear Body"] = "Cuerpo Puro";
  ABILITIES_DB["Protean"] = "Mutatipo";
  ABILITIES_DB["Unaware"] = "Ignorante";
  ABILITIES_DB["Technician"] = "Experto";
  ABILITIES_DB["Purifying Salt"] = "Sal Purificadora";
  ABILITIES_DB["Surge Surfer"] = "Cola Surf";
  ABILITIES_DB["Electric Surge"] = "Electrogénesis";
  ABILITIES_DB["Magic Guard"] = "Muro Mágico";
  ABILITIES_DB["Mold Breaker"] = "Rompemoldes";
  ABILITIES_DB["Toxic Debris"] = "Capas Tóxicas";
  ABILITIES_DB["Supreme Overlord"] = "General Supremo";
  ABILITIES_DB["Good as Gold"] = "Cuerpo de Oro";
  ABILITIES_DB["Hospitality"] = "Hospitalidad";
  ABILITIES_DB["Stamina"] = "Firmeza";
  ABILITIES_DB["Levitate"] = "Levitación";
  ABILITIES_DB["Flame Body"] = "Cuerpo Llama";
  ABILITIES_DB["Motor Drive"] = "Electromotor";
  ABILITIES_DB["Water Absorb"] = "Absorbe Agua";
  ABILITIES_DB["Storm Drain"] = "Colector";
  ABILITIES_DB["Slush Rush"] = "Quitanieves";
  ABILITIES_DB["Refrigerate"] = "Piel Helada";
  ABILITIES_DB["Speed Boost"] = "Impulso";
  ABILITIES_DB["Wind Power"] = "Energía Eólica";
  ABILITIES_DB["Chlorophyll"] = "Clorofila";
  ABILITIES_DB["Grassy Surge"] = "Herbogénesis";
  ABILITIES_DB["Static"] = "Electricidad Estática";
  ABILITIES_DB["Drizzle"] = "Llovizna";
  ABILITIES_DB["Rain Dish"] = "Cura Lluvia";
  ABILITIES_DB["Keen Eye"] = "Vista Lince";
  ABILITIES_DB["Lightning Rod"] = "Pararrayos";
  ABILITIES_DB["Unburden"] = "Liviano";
  ABILITIES_DB["Solar Power"] = "Poder Solar";
  ABILITIES_DB["Drought"] = "Sequía";
  ABILITIES_DB["Sand Veil"] = "Velo Arena";
  ABILITIES_DB["Sand Rush"] = "Impulso Arena";
  ABILITIES_DB["Sand Stream"] = "Chorro Arena";
  ABILITIES_DB["Sand Force"] = "Fuerza Arena";
  ABILITIES_DB["Multiscale"] = "Compensación";
  ABILITIES_DB["Marvel Scale"] = "Escala Especial";
  ABILITIES_DB["Steadfast"] = "Impertérrito";
}

function getPokemonLearnset(key) {
  let learnset = LEARNSETS[key] || [];
  if (key && key.startsWith("rotom") && key !== "rotom") {
    const baseLearnset = LEARNSETS["rotom"] || [];
    learnset = [...new Set([...learnset, ...baseLearnset])];
  }
  return learnset;
}


// Search Filters State
let searchQuery = "";
let selectedGen = "all";
let selectedTypes = [];

// Type translations English -> Spanish
const typeTranslations = {
  normal: "Normal",
  fire: "Fuego",
  water: "Agua",
  grass: "Planta",
  electric: "Eléctrico",
  ice: "Hielo",
  fighting: "Lucha",
  poison: "Veneno",
  ground: "Tierra",
  flying: "Volador",
  psychic: "Psíquico",
  bug: "Bicho",
  rock: "Roca",
  ghost: "Fantasma",
  dragon: "Dragón",
  dark: "Siniestro",
  steel: "Acero",
  fairy: "Hada"
};

// Types list for UI
const allTypes = Object.keys(typeTranslations);

// Type Chart: defendingType -> attackingType -> multiplier
const typeChart = {
  normal: { fighting: 2, ghost: 0 },
  fire: { fire: 0.5, grass: 0.5, ice: 0.5, bug: 0.5, steel: 0.5, fairy: 0.5, water: 2, ground: 2, rock: 2 },
  water: { fire: 0.5, water: 0.5, ice: 0.5, steel: 0.5, grass: 2, electric: 2 },
  grass: { water: 0.5, grass: 0.5, electric: 0.5, ground: 0.5, fire: 2, ice: 2, poison: 2, flying: 2, bug: 2 },
  electric: { electric: 0.5, flying: 0.5, steel: 0.5, ground: 2 },
  ice: { ice: 0.5, fire: 2, fighting: 2, rock: 2, steel: 2 },
  fighting: { bug: 0.5, rock: 0.5, dark: 0.5, flying: 2, psychic: 2, fairy: 2 },
  poison: { grass: 0.5, fighting: 0.5, poison: 0.5, bug: 0.5, fairy: 0.5, ground: 2, psychic: 2 },
  ground: { poison: 0.5, rock: 0.5, electric: 0, water: 2, grass: 2, ice: 2 },
  flying: { grass: 0.5, fighting: 0.5, bug: 0.5, ground: 0, electric: 2, ice: 2, rock: 2 },
  psychic: { fighting: 0.5, psychic: 0.5, bug: 2, ghost: 2, dark: 2 },
  bug: { grass: 0.5, fighting: 0.5, ground: 0.5, fire: 2, flying: 2, rock: 2 },
  rock: { normal: 0.5, fire: 0.5, poison: 0.5, flying: 0.5, water: 2, grass: 2, fighting: 2, ground: 2, steel: 2 },
  ghost: { poison: 0.5, bug: 0.5, normal: 0, fighting: 0, ghost: 2, dark: 2 },
  dragon: { fire: 0.5, water: 0.5, grass: 0.5, electric: 0.5, ice: 2, dragon: 2, fairy: 2 },
  dark: { ghost: 0.5, dark: 0.5, psychic: 0, fighting: 2, bug: 2, fairy: 2 },
  steel: { normal: 0.5, grass: 0.5, ice: 0.5, flying: 0.5, psychic: 0.5, bug: 0.5, rock: 0.5, dragon: 0.5, steel: 0.5, fairy: 0.5, poison: 0, fire: 2, fighting: 2, ground: 2 },
  fairy: { fighting: 0.5, bug: 0.5, dark: 0.5, dragon: 0, poison: 2, steel: 2 }
};

// --- INITIALIZATION ---
window.addEventListener("DOMContentLoaded", () => {
  renderEmptySlots();
  renderTypeFiltersInModal();

  // Load team from Hash or LocalStorage
  if (!loadTeamFromHash()) {
    loadTeamFromLocalStorage();
  }

  updateUI();
});

// --- CAROUSEL NAVIGATION ---
function changeAnalysisSlide(direction) {
  activeAnalysisSlide = (activeAnalysisSlide + direction + 4) % 4;
  updateAnalysisSlideUI();
}

function setAnalysisSlide(slideIndex) {
  activeAnalysisSlide = slideIndex;
  updateAnalysisSlideUI();
}

function updateAnalysisSlideUI() {
  const titles = [
    '<i class="lucide-icon" data-lucide="swords"></i> Eficaz Contra (Ofensivo)',
    '<i class="lucide-icon" data-lucide="shield-check"></i> Inmunidades y Resistencias (Defensivo)',
    '<i class="lucide-icon" data-lucide="shield-alert"></i> Débil Contra (Defensivo)',
    '<i class="lucide-icon" data-lucide="shield-alert"></i> Falta por cubrir'
  ];

  const titleEl = document.getElementById("analysis-section-title");
  if (titleEl) {
    titleEl.innerHTML = titles[activeAnalysisSlide];
  }

  const dots = document.querySelectorAll("#analysis-carousel-dots .dot");
  dots.forEach((dot, idx) => {
    if (idx === activeAnalysisSlide) {
      dot.classList.add("active");
    } else {
      dot.classList.remove("active");
    }
  });

  runCoverageAnalysis();
  lucide.createIcons();
}

// Global slide navigation for the entire Buildeo tab
function changeBuildeoTabSlide(direction) {
  activeBuildeoTabSlide = (activeBuildeoTabSlide + direction + 3) % 3;
  updateBuildeoTabSlideUI();
}

function setBuildeoTabSlide(slideIndex) {
  activeBuildeoTabSlide = slideIndex;
  updateBuildeoTabSlideUI();
}

function updateBuildeoTabSlideUI() {
  const titles = [
    '<i class="lucide-icon" data-lucide="swords"></i> Personalizar Movimientos (Paso 1 / 3)',
    '<i class="lucide-icon" data-lucide="wrench"></i> Configurar Habilidades y Stats (Paso 2 / 3)',
    '<i class="lucide-icon" data-lucide="package"></i> Equipar Objetos Competitivos (Paso 3 / 3)'
  ];

  const titleEl = document.getElementById("buildeo-section-title");
  if (titleEl) {
    titleEl.innerHTML = titles[activeBuildeoTabSlide];
  }

  const dots = document.querySelectorAll("#buildeo-carousel-dots .dot");
  dots.forEach((dot, idx) => {
    if (idx === activeBuildeoTabSlide) {
      dot.classList.add("active");
    } else {
      dot.classList.remove("active");
    }
  });



  // Update slide for all card tracks
  for (let i = 0; i < 6; i++) {
    buildeoSlides[i] = activeBuildeoTabSlide;
    const card = document.querySelector(`.buildeo-card[data-slot="${i}"]`);
    if (card) {
      const track = card.querySelector('.buildeo-slider-track');
      if (track) {
        track.style.transform = `translateX(-${activeBuildeoTabSlide * 33.333}%)`;
      }
    }
  }
}


// Switch between tabs
function switchTab(tabId) {
  activeTab = tabId;
  document.querySelectorAll(".tab-btn").forEach(btn => btn.classList.remove("active"));
  document.querySelectorAll(".app-section").forEach(sec => sec.classList.remove("active"));

  if (tabId === "builder") {
    document.getElementById("tab-builder").classList.add("active");
    document.getElementById("section-builder").classList.add("active");
  } else if (tabId === "buildeo") {
    document.getElementById("tab-buildeo").classList.add("active");
    document.getElementById("section-buildeo").classList.add("active");
    renderBuildeoTab();
    updateBuildeoTabSlideUI();
  } else if (tabId === "estrategias") {
    document.getElementById("tab-estrategias").classList.add("active");
    document.getElementById("section-estrategias").classList.add("active");
    renderPresetsPage(PRESET_TEAMS);
  }
}

// --- TEAM MANAGEMENT ---

function renderEmptySlots() {
  const teamGrid = document.getElementById("active-team-grid");
  teamGrid.innerHTML = "";

  for (let i = 0; i < 6; i++) {
    const slot = document.createElement("div");
    slot.className = "pokemon-slot glass-card";
    slot.setAttribute("onclick", `openSearchModal(${i})`);

    if (activeTeam[i]) {
      const p = activeTeam[i];
      slot.classList.add("filled");
      slot.innerHTML = `
        <button class="btn-remove-pokemon" onclick="removePokemon(${i}, event)">
          <i data-lucide="x"></i>
        </button>
        <div class="slot-filled">
          <img class="poke-sprite" src="${getPokemonSpriteUrl(p)}" alt="${p.name}" onerror="handleImageError(this, '${p.key}')">
          <div class="poke-name">${p.name}</div>
          <div class="poke-types">
            ${getPokemonTypes(p).map(t => `<span class="type-badge type-${t.toLowerCase()}">${typeTranslations[t.toLowerCase()]}</span>`).join("")}
          </div>
        </div>
      `;
    } else {
      // Predict teammate from PRESET_TEAMS
      const currentNames = activeTeam.filter(p => p).map(p => p.key);
      let predictedPoke = null;

      if (currentNames.length > 0) {
        // Find matching teams
        const teamMatches = PRESET_TEAMS.map(team => {
          let matchCount = 0;
          currentNames.forEach(name => {
            const matches = team.pokemon.some(p => {
              const key1 = findPokedexKeyByName(p);
              const key2 = findPokedexKeyByName(name);
              return key1 && key2 && key1 === key2;
            });
            if (matches) matchCount++;
          });
          return { team, matchCount };
        }).filter(tm => tm.matchCount > 0);

        if (teamMatches.length > 0) {
          // Sort matches descending
          teamMatches.sort((a, b) => b.matchCount - a.matchCount);

          // Count candidate frequencies
          const candidateCounts = {};
          teamMatches.forEach(tm => {
            const weight = tm.matchCount;
            tm.team.pokemon.forEach(p => {
              const key = findPokedexKeyByName(p);
              if (key) {
                const alreadyInTeam = currentNames.some(name => findPokedexKeyByName(name) === key);
                if (!alreadyInTeam) {
                  candidateCounts[key] = (candidateCounts[key] || 0) + weight;
                }
              }
            });
          });

          const sortedCandidates = Object.keys(candidateCounts).sort((a, b) => candidateCounts[b] - candidateCounts[a]);

          // How many empty slots precede us?
          let emptySlotsBefore = 0;
          for (let prevIdx = 0; prevIdx < i; prevIdx++) {
            if (!activeTeam[prevIdx]) emptySlotsBefore++;
          }

          if (sortedCandidates[emptySlotsBefore]) {
            const candidateKey = sortedCandidates[emptySlotsBefore];
            predictedPoke = POKEDEX[candidateKey];
            if (predictedPoke) {
              predictedPoke.key = candidateKey;
            }
          }
        }
      }

      if (predictedPoke) {
        slot.className = "pokemon-slot glass-card slot-suggested";
        slot.innerHTML = `
          <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%;">
            <span class="suggested-label">Recomendado</span>
            <img class="suggested-sprite" src="${getPokemonSpriteUrl(predictedPoke)}" alt="${predictedPoke.name}" onerror="handleImageError(this, '${predictedPoke.key}')">
            <span class="suggested-name">${predictedPoke.name}</span>
            <button class="btn-add-suggested" onclick="addSuggestedPokemon(${i}, '${predictedPoke.key}', event)">
              <i data-lucide="plus" style="width: 12px; height: 12px; display: inline-block; vertical-align: middle;"></i> Añadir
            </button>
          </div>
        `;
      } else {
        slot.innerHTML = `
          <div class="slot-empty">
            <i data-lucide="plus-circle"></i>
            <span style="font-family: var(--font-display); font-weight: 500; font-size: 0.9rem;">Añadir Pokémon</span>
          </div>
        `;
      }
    }
    teamGrid.appendChild(slot);
  }
  lucide.createIcons();
}

function getPokemonSpriteUrl(p) {
  if (!p) return "";

  // Specific override for custom Mega Greninja asset
  if (p.key === "greninjamega" || p.name === "Greninja-Mega") {
    return "img/mega_greninja_square.webp";
  }

  // Specific overrides for Raichu Mega X and Y images downloaded from Bulbapedia
  if (p.key === "raichumegax" || p.name === "Raichu-Mega-X" || p.name === "Raichu-Mega X") {
    return "img/raichumegax.png";
  }
  if (p.key === "raichumegay" || p.name === "Raichu-Mega-Y" || p.name === "Raichu-Mega Y") {
    return "img/raichumegay.png";
  }

  let filename = (p.key || p.name).toLowerCase();

  if (p.baseSpecies && p.forme) {
    const base = p.baseSpecies.toLowerCase().replace(/[^a-z0-9]/g, "");
    const forme = p.forme.toLowerCase().replace(/[^a-z0-9]/g, "");
    filename = `${base}-${forme}`;
  } else {
    filename = filename.replace(/[^a-z0-9]/g, "");
  }

  // If it's custom, future, or CAP, look in local folder 'img/' first
  const isCustomOrNonstandard = p.isNonstandard && (p.isNonstandard === "Future" || p.isNonstandard === "Custom" || p.isNonstandard === "CAP");
  if (isCustomOrNonstandard) {
    return `img/${filename}.png`;
  }

  return `https://play.pokemonshowdown.com/sprites/dex/${filename}.png`;
}

function handleImageError(imgElement, key) {
  let p = POKEDEX[key];

  const step = parseInt(imgElement.dataset.fallbackStep || "0");

  if (step === 0) {
    imgElement.dataset.fallbackStep = "1";

    // Attempt internet showdown dex sprite
    let filename = key;
    if (p) {
      filename = (p.key || p.name).toLowerCase();
      if (p.baseSpecies && p.forme) {
        const base = p.baseSpecies.toLowerCase().replace(/[^a-z0-9]/g, "");
        const forme = p.forme.toLowerCase().replace(/[^a-z0-9]/g, "");
        filename = `${base}-${forme}`;
      } else {
        filename = filename.replace(/[^a-z0-9]/g, "");
      }
    }
    imgElement.src = `https://play.pokemonshowdown.com/sprites/dex/${filename}.png`;
  } else if (step === 1) {
    imgElement.dataset.fallbackStep = "2";

    // Fallback to base species Showdown sprite
    if (p && p.baseSpecies) {
      const base = p.baseSpecies.toLowerCase().replace(/[^a-z0-9]/g, "");
      imgElement.src = `https://play.pokemonshowdown.com/sprites/dex/${base}.png`;
    } else {
      // Fallback: if key ends with "mega" or "megax" or "megay", try without the suffix
      let baseKey = String(key || "");
      if (baseKey.endsWith("mega")) {
        baseKey = baseKey.slice(0, -4);
        imgElement.src = `https://play.pokemonshowdown.com/sprites/dex/${baseKey}.png`;
      } else if (baseKey.endsWith("megax") || baseKey.endsWith("megay")) {
        baseKey = baseKey.slice(0, -5);
        imgElement.src = `https://play.pokemonshowdown.com/sprites/dex/${baseKey}.png`;
      } else {
        // Fallback to PokeAPI sprite using database number if available
        if (p && p.num) {
          imgElement.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${p.num}.png`;
        } else {
          imgElement.src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png";
        }
      }
    }
  } else if (step === 2) {
    imgElement.dataset.fallbackStep = "3";

    // Try PokeAPI as step 3
    if (p && p.num) {
      imgElement.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${p.num}.png`;
    } else {
      imgElement.src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png";
    }
  } else {
    // Ultimate fallback to Pokéball
    imgElement.src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png";
  }
}

function addPokemonToSlot(pKey) {
  const pData = POKEDEX[pKey];
  if (!pData) return;

  const learnset = getPokemonLearnset(pKey);
  const megaStoneId = getMegaStoneIdForPokemon({ ...pData, key: pKey });
  const pokemonObj = {
    ...pData,
    key: pKey,
    selectedAbility: Object.values(pData.abilities)[0],
    equippedItem: megaStoneId || null,
    selectedMoves: [
      learnset[0] || null,
      learnset[1] || null,
      learnset[2] || null,
      learnset[3] || null
    ]
  };

  if (currentSlotIndex >= 0 && currentSlotIndex < 6) {
    activeTeam[currentSlotIndex] = pokemonObj;
  } else {
    // Add to first empty slot
    const emptyIndex = activeTeam.findIndex(p => !p);
    if (emptyIndex !== -1) {
      activeTeam[emptyIndex] = pokemonObj;
    } else if (activeTeam.length < 6) {
      activeTeam.push(pokemonObj);
    } else {
      showToast("Tu equipo ya está lleno (máximo 6 Pokémon)", "error");
      return;
    }
  }

  closeSearchModal();
  saveTeamToLocalStorage();
  updateUI();
  showToast(`¡${pokemonObj.name} añadido al equipo!`, "success");
}

function removePokemon(index, event) {
  event.stopPropagation(); // Prevent opening modal
  const removedName = activeTeam[index] ? activeTeam[index].name : "";
  activeTeam[index] = null;

  // Clean up trailing nulls, but keep positions relative
  saveTeamToLocalStorage();
  updateUI();
  if (removedName) {
    showToast(`¡${removedName} eliminado del equipo!`, "success");
  }
}

function clearTeam() {
  activeTeam = [];
  saveTeamToLocalStorage();
  updateUI();
  showToast("Equipo limpiado", "success");
}



// --- UTILITIES & STORAGE ---

function saveTeamToLocalStorage() {
  const keys = activeTeam.map(p => p ? p.key : null);
  localStorage.setItem("pokemon_team", JSON.stringify(keys));

  const details = activeTeam.map(p => {
    if (!p) return null;
    return {
      key: p.key,
      selectedAbility: p.selectedAbility || Object.values(p.abilities)[0],
      equippedItem: p.equippedItem || null,
      selectedMoves: p.selectedMoves || [null, null, null, null]
    };
  });
  localStorage.setItem("pokemon_team_details", JSON.stringify(details));
  updateUrlHash();
}

function loadTeamFromLocalStorage() {
  try {
    const keysData = localStorage.getItem("pokemon_team");
    const detailsData = localStorage.getItem("pokemon_team_details");

    let keys = [];
    let details = [];

    if (keysData) keys = JSON.parse(keysData);
    if (detailsData) details = JSON.parse(detailsData);

    activeTeam = [];
    for (let i = 0; i < 6; i++) {
      const key = keys[i];
      if (key && POKEDEX[key]) {
        const detail = details[i] && details[i].key === key ? details[i] : (details.find(d => d && d.key === key) || {});
        const learnset = getPokemonLearnset(key);
        const defaultMoves = [
          learnset[0] || null,
          learnset[1] || null,
          learnset[2] || null,
          learnset[3] || null
        ];
        const megaStoneId = getMegaStoneIdForPokemon({ ...POKEDEX[key], key });
        activeTeam[i] = {
          ...POKEDEX[key],
          key: key,
          selectedAbility: detail.selectedAbility || Object.values(POKEDEX[key].abilities)[0],
          equippedItem: megaStoneId || detail.equippedItem || null,
          selectedMoves: detail.selectedMoves || defaultMoves
        };
      } else {
        activeTeam[i] = null;
      }
    }
  } catch (e) {
    console.error("Error loading team from local storage", e);
  }
}

function updateUrlHash() {
  const keys = activeTeam.filter(p => p).map(p => p.key).join(",");
  if (keys) {
    window.location.hash = `team=${keys}`;
  } else {
    window.location.hash = "";
  }
}

function loadTeamFromHash() {
  const hash = window.location.hash;
  if (hash.startsWith("#team=")) {
    const keysStr = hash.replace("#team=", "");
    if (keysStr) {
      const keys = keysStr.split(",");

      // Load details from localStorage to preserve moves/items/abilities
      let details = [];
      try {
        const detailsData = localStorage.getItem("pokemon_team_details");
        if (detailsData) details = JSON.parse(detailsData);
      } catch (e) {
        console.error(e);
      }

      activeTeam = [];
      keys.forEach((key, index) => {
        if (key && POKEDEX[key]) {
          // Find detail by index matching key, or fallback to find first matching key in details
          const detail = details[index] && details[index].key === key ? details[index] : (details.find(d => d && d.key === key) || {});

          const learnset = getPokemonLearnset(key);
          const defaultMoves = [
            learnset[0] || null,
            learnset[1] || null,
            learnset[2] || null,
            learnset[3] || null
          ];

          const megaStoneId = getMegaStoneIdForPokemon({ ...POKEDEX[key], key });
          activeTeam[index] = {
            ...POKEDEX[key],
            key: key,
            selectedAbility: detail.selectedAbility || Object.values(POKEDEX[key].abilities)[0],
            equippedItem: megaStoneId || detail.equippedItem || null,
            selectedMoves: detail.selectedMoves || defaultMoves
          };
        }
      });
      return true;
    }
  }
  return false;
}

function shareTeam() {
  const keys = activeTeam.filter(p => p).map(p => p.key).join(",");
  if (!keys) {
    showToast("Añade Pokémon a tu equipo antes de compartir", "error");
    return;
  }

  const shareUrl = `${window.location.origin}${window.location.pathname}#team=${keys}`;
  navigator.clipboard.writeText(shareUrl).then(() => {
    showToast("¡Enlace de equipo copiado al portapapeles!", "success");
  }).catch(() => {
    showToast("No se pudo copiar el enlace automáticamente", "error");
  });
}

function showToast(message, type = "success") {
  const container = document.getElementById("toast-container");
  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;

  const icon = type === "success" ? "check-circle" : "alert-circle";
  toast.innerHTML = `<i data-lucide="${icon}"></i> <span>${message}</span>`;

  container.appendChild(toast);
  lucide.createIcons();

  setTimeout(() => {
    toast.style.animation = "slideIn 0.3s ease reverse forwards";
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// --- UPDATE INTERFACE ---

function updateUI() {
  renderEmptySlots();

  // Count active team members
  const count = activeTeam.filter(p => p).length;
  document.getElementById("team-counter").innerText = `${count} / 6 Pokémon`;

  // Run coverage diagnostics
  updateAnalysisSlideUI();

  if (activeTab === "buildeo") {
    renderBuildeoTab();
  }
}

// --- DEFENSIVE COVERAGE CALCULATOR ---

function getEffectiveness(attacker, defender) {
  const atk = attacker.toLowerCase();
  const def = defender.toLowerCase();
  if (typeChart[def] && typeChart[def][atk] !== undefined) {
    return typeChart[def][atk];
  }
  return 1.0;
}

function getPokemonEffectiveness(attacker, defendingTypes) {
  let mult = 1.0;
  for (const type of defendingTypes) {
    mult *= getEffectiveness(attacker, type);
  }
  return mult;
}

function getPokemonActiveAbility(p) {
  if (!p) return "Ninguna";
  const abilities = p.abilities || {};
  return p.selectedAbility || Object.values(abilities)[0] || "Ninguna";
}

function getModifiedPokemonEffectiveness(attacker, p) {
  let mult = getPokemonEffectiveness(attacker, getPokemonTypes(p));
  if (!p) return mult;

  const selectedAbilityName = getPokemonActiveAbility(p);
  const atkType = attacker.toLowerCase();

  if (selectedAbilityName === "Levitate" && atkType === "ground") {
    mult = 0;
  } else if ((selectedAbilityName === "Volt Absorb" || selectedAbilityName === "Lightning Rod" || selectedAbilityName === "Motor Drive") && atkType === "electric") {
    mult = 0;
  } else if ((selectedAbilityName === "Water Absorb" || selectedAbilityName === "Storm Drain" || selectedAbilityName === "Dry Skin") && atkType === "water") {
    mult = 0;
  } else if (selectedAbilityName === "Flash Fire" && atkType === "fire") {
    mult = 0;
  } else if (selectedAbilityName === "Sap Sipper" && atkType === "grass") {
    mult = 0;
  } else if (selectedAbilityName === "Earth Eater" && atkType === "ground") {
    mult = 0;
  } else if (selectedAbilityName === "Well-Baked Body" && atkType === "fire") {
    mult = 0;
  } else if (selectedAbilityName === "Thick Fat" && (atkType === "fire" || atkType === "ice")) {
    mult *= 0.5;
  }

  return mult;
}


function runCoverageAnalysis() {
  const container = document.getElementById("individual-coverage-container");
  container.innerHTML = "";

  const filledTeam = activeTeam.filter(p => p);

  if (filledTeam.length === 0) {
    container.className = "individual-coverage-grid";
    container.style.display = "";
    container.innerHTML = `
      <div class="glass-card" style="text-align: center; color: var(--color-text-muted); padding: 3rem; width: 100%;">
        <i data-lucide="help-circle" style="font-size: 3rem; margin-bottom: 1rem; color: var(--primary);"></i>
        <p style="font-family: var(--font-display); font-size: 1.1rem;">Agrega Pokémon a tu equipo para ver su análisis.</p>
      </div>
    `;
    lucide.createIcons();
    return;
  }

  if (activeAnalysisSlide === 3) {
    container.style.display = "block";

    const defensiveGaps = [];
    const offensiveGaps = [];

    allTypes.forEach(type => {
      // 1. Defensive gaps: 2 or more weaknesses to 'type' and no resistances/immunities
      let weakCount = 0;
      let resistCount = 0;

      filledTeam.forEach(p => {
        const mult = getModifiedPokemonEffectiveness(type, p);
        if (mult > 1) {
          weakCount++;
        } else if (mult < 1) {
          resistCount++;
        }
      });

      if (weakCount >= 2 && resistCount === 0) {
        defensiveGaps.push({
          type: type,
          weakCount: weakCount,
          reason: `Tienes ${weakCount} Pokémon débiles a este tipo y ninguna resistencia o inmunidad en el equipo para compensarlo.`
        });
      }

      // 2. Offensive gaps: no STAB type or active damage move that is super effective against 'type'
      let hasSuperEffective = false;
      filledTeam.forEach(p => {
        // Check STAB effectiveness against 'type'
        getPokemonTypes(p).forEach(t => {
          const atkType = t.toLowerCase();
          if (typeChart[type] && typeChart[type][atkType] === 2) {
            hasSuperEffective = true;
          }
        });

        // Check selected moves' effectiveness against 'type'
        if (p.selectedMoves) {
          p.selectedMoves.forEach(moveId => {
            if (moveId) {
              const moveInfo = MOVES_INFO[moveId];
              if (moveInfo && moveInfo.c !== "Status" && moveInfo.t) {
                const atkType = moveInfo.t.toLowerCase();
                if (typeChart[type] && typeChart[type][atkType] === 2) {
                  hasSuperEffective = true;
                }
              }
            }
          });
        }
      });

      if (!hasSuperEffective) {
        offensiveGaps.push({
          type: type,
          reason: `No tienes movimientos de ataque ni tipos de tu equipo eficaces (2x) contra oponentes de este tipo.`
        });
      }
    });

    let html = `
      <div class="glass-card" style="padding: 1.75rem; border-radius: var(--radius-lg); background: rgba(30, 41, 59, 0.45); border: 1px solid rgba(255,255,255,0.06); width: 100%;">
    `;

    if (defensiveGaps.length === 0 && offensiveGaps.length === 0) {
      html += `
        <div style="display: flex; align-items: center; gap: 0.5rem; color: #10b981; font-size: 0.95rem; padding: 0.5rem;">
          <i data-lucide="check-circle" style="width: 20px; height: 20px; flex-shrink: 0;"></i>
          <span>¡Tu equipo tiene una cobertura excelente! No se detectaron debilidades críticas sin compensar ni faltas de ofensiva.</span>
        </div>
      `;
    } else {
      // Helper function to get counter types (super effective 2x against defendingType)
      const getCounterTypesFor = (defendingType) => {
        const defLower = defendingType.toLowerCase();
        return allTypes.filter(atkType => typeChart[defLower] && typeChart[defLower][atkType] === 2);
      };

      // Helper function to get resisting types (0.5x or 0x against attackingType)
      const getResistingTypesFor = (attackingType) => {
        const atkLower = attackingType.toLowerCase();
        return allTypes.filter(defType => typeChart[defType] && (typeChart[defType][atkLower] === 0.5 || typeChart[defType][atkLower] === 0));
      };

      // Render Defensive Gaps
      if (defensiveGaps.length > 0) {
        html += `
          <div style="margin-bottom: 1.5rem;">
            <h4 style="margin: 0 0 0.8rem 0; font-size: 0.85rem; color: #f43f5e; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;">Debilidades sin cubrir (Defensivo):</h4>
            <div style="display: flex; flex-direction: column; gap: 0.6rem;">
              ${defensiveGaps.map(g => {
                const resisters = getResistingTypesFor(g.type);
                return `
                  <div style="display: flex; flex-direction: column; gap: 0.4rem; background: rgba(244, 63, 94, 0.08); padding: 0.75rem 0.9rem; border-radius: var(--radius-md); border-left: 4px solid #f43f5e;">
                    <div style="display: flex; align-items: center; gap: 0.75rem;">
                      <span class="type-badge type-${g.type}" style="font-size: 0.7rem; min-width: 80px; text-align: center; font-weight: 600; flex-shrink: 0;">${typeTranslations[g.type].toUpperCase()}</span>
                      <span style="font-size: 0.85rem; color: var(--color-text-muted); line-height: 1.4;">${g.reason}</span>
                    </div>
                    ${resisters.length > 0 ? `
                      <div style="display: flex; align-items: center; gap: 0.4rem; flex-wrap: wrap; margin-top: 0.2rem; padding-left: 0.1rem;">
                        <span style="font-size: 0.78rem; color: #fbbf24; font-weight: 600; display: inline-flex; align-items: center; gap: 0.25rem;">
                          <i data-lucide="shield-check" style="width: 14px; height: 14px;"></i> Solución recomendada: Añade un Pokémon tipo
                        </span>
                        <div style="display: inline-flex; gap: 0.3rem; flex-wrap: wrap; align-items: center;">
                          ${resisters.map(c => `<span class="type-badge type-${c}" style="font-size: 0.68rem; padding: 0.15rem 0.5rem; text-transform: uppercase;">${typeTranslations[c]}</span>`).join("")}
                        </div>
                      </div>
                    ` : ""}
                  </div>
                `;
              }).join("")}
            </div>
          </div>
        `;
      }

      // Render Offensive Gaps
      if (offensiveGaps.length > 0) {
        html += `
          <div>
            <h4 style="margin: 0 0 0.8rem 0; font-size: 0.85rem; color: #3b82f6; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;">Falta de daño súper eficaz (Ofensivo):</h4>
            <div style="display: flex; flex-direction: column; gap: 0.6rem;">
              ${offensiveGaps.map(g => {
                const counters = getCounterTypesFor(g.type);
                return `
                  <div style="display: flex; flex-direction: column; gap: 0.4rem; background: rgba(59, 130, 246, 0.08); padding: 0.75rem 0.9rem; border-radius: var(--radius-md); border-left: 4px solid #3b82f6;">
                    <div style="display: flex; align-items: center; gap: 0.75rem;">
                      <span class="type-badge type-${g.type}" style="font-size: 0.7rem; min-width: 80px; text-align: center; font-weight: 600; flex-shrink: 0;">${typeTranslations[g.type].toUpperCase()}</span>
                      <span style="font-size: 0.85rem; color: var(--color-text-muted); line-height: 1.4;">${g.reason}</span>
                    </div>
                    ${counters.length > 0 ? `
                      <div style="display: flex; align-items: center; gap: 0.4rem; flex-wrap: wrap; margin-top: 0.2rem; padding-left: 0.1rem;">
                        <span style="font-size: 0.78rem; color: #fbbf24; font-weight: 600; display: inline-flex; align-items: center; gap: 0.25rem;">
                          <i data-lucide="zap" style="width: 14px; height: 14px;"></i> Solución recomendada: Añade ataques o un Pokémon tipo
                        </span>
                        <div style="display: inline-flex; gap: 0.3rem; flex-wrap: wrap; align-items: center;">
                          ${counters.map(c => `<span class="type-badge type-${c}" style="font-size: 0.68rem; padding: 0.15rem 0.5rem; text-transform: uppercase;">${typeTranslations[c]}</span>`).join("")}
                        </div>
                      </div>
                    ` : ""}
                  </div>
                `;
              }).join("")}
            </div>
          </div>
        `;
      }
    }

    html += `</div>`;
    container.innerHTML = html;
    lucide.createIcons();
    return;
  }

  container.className = "individual-coverage-grid";
  container.style.display = "";

  activeTeam.forEach((p, idx) => {
    if (!p) return;

    const row = document.createElement("div");
    row.className = "pokemon-coverage-row glass-card";

    // Build HTML for the 4 moves slots
    const movesHTML = Array.from({ length: 4 }).map((_, i) => {
      const moveId = p.selectedMoves && p.selectedMoves[i];
      const moveName = moveId ? (MOVES_DB[moveId] || moveId) : "-- Seleccionar --";
      const selectedClass = moveId ? "selected" : "";
      const moveDesc = moveId ? (MOVES_DESC[moveId] || "Sin descripción disponible.") : "Selecciona un ataque para este slot.";
      return `
        <button class="pcr-move-btn ${selectedClass}" onclick="openMovesModal(${idx}, ${i})" title="${moveDesc}">
          <span>${moveName}</span>
          <i data-lucide="chevron-right" style="width: 12px; height: 12px; opacity: 0.5;"></i>
        </button>
      `;
    }).join("");

    let middleLabel = "";
    let middleHTML = "";

    if (activeAnalysisSlide === 0) {
      // --- SLIDE 0: EFICAZ CONTRA (FUERTE CONTRA) ---
      middleLabel = "Fuerte Contra";

      const strongAgainst = [];

      // 1. Pokémon's own typing (STAB)
      getPokemonTypes(p).forEach(t => {
        const atkType = t.toLowerCase();
        allTypes.forEach(defType => {
          if (typeChart[defType] && typeChart[defType][atkType] === 2) {
            if (!strongAgainst.includes(defType)) {
              strongAgainst.push(defType);
            }
          }
        });
      });

      // 2. Selected moves' typings (excluding Status)
      if (p.selectedMoves) {
        p.selectedMoves.forEach(moveId => {
          if (moveId) {
            const moveInfo = MOVES_INFO[moveId];
            if (moveInfo && moveInfo.c !== "Status" && moveInfo.t) {
              const atkType = moveInfo.t.toLowerCase();
              allTypes.forEach(defType => {
                if (typeChart[defType] && typeChart[defType][atkType] === 2) {
                  if (!strongAgainst.includes(defType)) {
                    strongAgainst.push(defType);
                  }
                }
              });
            }
          }
        });
      }

      if (strongAgainst.length === 0) {
        middleHTML = '<span style="font-size: 0.8rem; color: var(--color-text-muted); font-style: italic;">Ninguno</span>';
      } else {
        middleHTML = strongAgainst.map(t => `
          <div class="multiplier-badge">
            <span class="mb-type type-${t}">${typeTranslations[t]}</span>
            <span class="mb-val val-2x">2x</span>
          </div>
        `).join("");
      }

    } else if (activeAnalysisSlide === 1) {
      // --- SLIDE 1: INMUNIDADES Y RESISTENCIAS ---
      middleLabel = "";

      const resistances = [];
      const immunities = [];

      allTypes.forEach(atkType => {
        const mult = getModifiedPokemonEffectiveness(atkType, p);
        if (mult === 0) {
          immunities.push(atkType);
        } else if (mult < 1) {
          resistances.push({ type: atkType, mult });
        }
      });
      resistances.sort((a, b) => a.mult - b.mult);

      let immunitiesHTML = "";
      if (immunities.length === 0) {
        immunitiesHTML = '<span style="font-size: 0.8rem; color: var(--color-text-muted); font-style: italic; margin-right: 0.5rem;">Ninguna</span>';
      } else {
        immunitiesHTML = immunities.map(t => `
          <div class="multiplier-badge" style="margin-bottom: 0.2rem;">
            <span class="mb-type type-${t}">${typeTranslations[t]}</span>
            <span class="mb-val val-immune">0x</span>
          </div>
        `).join("");
      }

      let resistancesHTML = "";
      if (resistances.length === 0) {
        resistancesHTML = '<span style="font-size: 0.8rem; color: var(--color-text-muted); font-style: italic; margin-right: 0.5rem;">Ninguna</span>';
      } else {
        resistancesHTML = resistances.map(r => {
          const valClass = r.mult === 0.25 ? "val-quarter" : "val-half";
          const label = r.mult === 0.25 ? "1/4x" : "1/2x";
          return `
            <div class="multiplier-badge" style="margin-bottom: 0.2rem;">
              <span class="mb-type type-${r.type}">${typeTranslations[r.type]}</span>
              <span class="mb-val ${valClass}">${label}</span>
            </div>
          `;
        }).join("");
      }

      middleHTML = `
        <div style="display: flex; flex-direction: column; gap: 0.85rem; width: 100%; padding-top: 0.25rem;">
          <div style="display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap;">
            <span style="font-size: 0.78rem; font-weight: 700; color: var(--color-text-muted); width: 95px; flex-shrink: 0;">Inmunidades:</span>
            <div style="display: flex; flex-wrap: wrap; gap: 0.25rem; flex-grow: 1;">${immunitiesHTML}</div>
          </div>
          <div style="display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap;">
            <span style="font-size: 0.78rem; font-weight: 700; color: var(--color-text-muted); width: 95px; flex-shrink: 0;">Resistencias:</span>
            <div style="display: flex; flex-wrap: wrap; gap: 0.25rem; flex-grow: 1;">${resistancesHTML}</div>
          </div>
        </div>
      `;

    } else if (activeAnalysisSlide === 2) {
      // --- SLIDE 2: DEBILIDADES ---
      middleLabel = "Debilidades";

      const weaknesses = [];
      allTypes.forEach(atkType => {
        const mult = getModifiedPokemonEffectiveness(atkType, p);
        if (mult > 1) {
          weaknesses.push({ type: atkType, mult });
        }
      });
      weaknesses.sort((a, b) => b.mult - a.mult);

      if (weaknesses.length === 0) {
        middleHTML = '<span style="font-size: 0.8rem; color: var(--color-text-muted); font-style: italic;">Ninguna</span>';
      } else {
        middleHTML = weaknesses.map(w => {
          const valClass = w.mult === 4 ? "val-4x" : "val-2x";
          const label = w.mult === 4 ? "4x" : "2x";
          return `
            <div class="multiplier-badge">
              <span class="mb-type type-${w.type}">${typeTranslations[w.type]}</span>
              <span class="mb-val ${valClass}">${label}</span>
            </div>
          `;
        }).join("");
      }
    }

    row.innerHTML = `
      <div class="pcr-pokemon-info">
        <div class="pcr-poke-header" style="display: flex; align-items: center; gap: 0.6rem; width: 100%;">
          <img class="pcc-sprite" src="${getPokemonSpriteUrl(p)}" alt="${p.name}" onerror="handleImageError(this, '${p.key}')" style="width: 38px; height: 38px; flex-shrink: 0;">
          <div style="text-align: left;">
            <h4 style="margin: 0 0 0.1rem 0; font-size: 0.95rem; line-height: 1.2;">${p.name}</h4>
            <div class="poke-types" style="display: flex; gap: 0.15rem; flex-wrap: wrap;">
              ${getPokemonTypes(p).map(t => `<span class="type-badge type-${t.toLowerCase()}" style="font-size: 0.65rem; padding: 0.05rem 0.35rem;">${typeTranslations[t.toLowerCase()]}</span>`).join("")}
            </div>
          </div>
        </div>
        <div class="pcr-moves-container">
          ${movesHTML}
        </div>
      </div>
      
      <div class="pcr-tables">
        <div class="pcr-table-row">
          ${middleLabel ? `<div class="pcr-table-label">${middleLabel}</div>` : ''}
          <div class="pcr-table-content">
            ${middleHTML}
          </div>
        </div>
      </div>
    `;

    container.appendChild(row);
  });

  lucide.createIcons();
}

// --- SEARCH MODAL FILTERING & RENDERING ---

function openSearchModal(slotIndex = -1) {
  currentSlotIndex = slotIndex;
  document.getElementById("search-modal").classList.add("active");

  // Clear search input and filters
  document.getElementById("pokemon-search-input").value = "";
  searchQuery = "";
  selectedGen = "all";
  selectedTypes = [];

  // Reset filter badge actives
  document.querySelectorAll("#generation-filters .filter-badge").forEach(b => {
    b.classList.remove("active");
    if (b.getAttribute("data-gen") === "all") b.classList.add("active");
  });

  document.querySelectorAll("#type-filters .filter-badge").forEach(b => {
    b.classList.remove("active");
  });

  filterPokemonResults();
  document.getElementById("pokemon-search-input").focus();
}

function closeSearchModal(event) {
  if (event) event.stopPropagation();
  document.getElementById("search-modal").classList.remove("active");
  currentSlotIndex = -1;
}

function renderTypeFiltersInModal() {
  const container = document.getElementById("type-filters");
  container.innerHTML = "";

  const sortedTypes = [...allTypes].sort((a, b) =>
    typeTranslations[a].localeCompare(typeTranslations[b], 'es', { sensitivity: 'base' })
  );

  sortedTypes.forEach(type => {
    const badge = document.createElement("span");
    badge.className = `filter-badge type-filter-badge type-${type}`;
    badge.setAttribute("data-type", type);
    badge.innerText = typeTranslations[type];
    badge.setAttribute("onclick", `toggleTypeFilter('${type}', this)`);
    container.appendChild(badge);
  });
}

function toggleTypeFilter(type, element) {
  const index = selectedTypes.indexOf(type);
  if (index === -1) {
    if (selectedTypes.length >= 2) {
      showToast("Solamente puedes elegir hasta 2 tipos", "error");
      return;
    }
    selectedTypes.push(type);
    element.classList.add("active");
  } else {
    selectedTypes.splice(index, 1);
    element.classList.remove("active");
  }
  filterPokemonResults();
}

function filterByGen(gen) {
  selectedGen = gen;

  document.querySelectorAll("#generation-filters .filter-badge").forEach(b => {
    b.classList.remove("active");
    if (b.getAttribute("data-gen") == gen) {
      b.classList.add("active");
    }
  });

  filterPokemonResults();
}

// Helper to get types safely (inheriting from baseSpecies for cosmetic forms)
function getPokemonTypes(p) {
  if (!p) return [];
  if (p.types && Array.isArray(p.types) && p.types.length > 0) return p.types;
  if (p.baseSpecies) {
    const baseKey = p.baseSpecies.toLowerCase().replace(/[^a-z0-9]/g, "");
    if (typeof POKEDEX !== "undefined" && POKEDEX[baseKey] && POKEDEX[baseKey].types) {
      return POKEDEX[baseKey].types;
    }
  }
  return [];
}

// Helper to determine the generation of a Pokémon or its form
function determinePokemonGen(p, key) {
  if (!p) return 10;
  let num = p.num;
  if (!num && p.baseSpecies) {
    const baseKey = p.baseSpecies.toLowerCase().replace(/[^a-z0-9]/g, "");
    if (typeof POKEDEX !== "undefined" && POKEDEX[baseKey] && POKEDEX[baseKey].num) {
      num = POKEDEX[baseKey].num;
    }
  }
  if (!num || num <= 0 || num > 1025) return 10; // Custom/CAP/New at the bottom

  if (num >= 1 && num <= 151) return 1;
  if (num >= 152 && num <= 251) return 2;
  if (num >= 252 && num <= 386) return 3;
  if (num >= 387 && num <= 493) return 4;
  if (num >= 494 && num <= 649) return 5;
  if (num >= 650 && num <= 721) return 6;
  if (num >= 722 && num <= 809) return 7;
  if (num >= 810 && num <= 905) return 8;
  if (num >= 906 && num <= 1025) return 9;

  return 10;
}

function filterPokemonResults() {
  const container = document.getElementById("search-results-container");
  container.innerHTML = "";

  searchQuery = document.getElementById("pokemon-search-input").value.toLowerCase().trim();

  const results = [];

  Object.keys(POKEDEX).forEach(key => {
    const p = POKEDEX[key];

    // Check if matching query
    const matchName = p.name.toLowerCase().includes(searchQuery) || key.includes(searchQuery);
    if (!matchName) return;

    // Check if matching types
    if (selectedTypes.length > 0) {
      const pTypes = getPokemonTypes(p).map(t => t.toLowerCase());
      const matchType = selectedTypes.every(t => pTypes.includes(t.toLowerCase()));
      if (!matchType) return;
    }

    // Check if matching generation
    if (selectedGen !== "all") {
      const genNum = parseInt(selectedGen);
      const pGen = determinePokemonGen(p, key);
      if (pGen !== genNum) return;
    }

    // Exclude custom non-standard forms (Keep "Past" standard forms like Megas!)
    const isNonstandard = p.isNonstandard && (p.isNonstandard === "LGPE" || p.isNonstandard === "Cap" || p.isNonstandard === "Custom");
    const isGmax = p.forme && p.forme.includes("Gmax");
    const isCosplay = p.forme && p.forme.includes("Cosplay");

    let pNum = p.num;
    if (!pNum && p.baseSpecies) {
      const baseKey = p.baseSpecies.toLowerCase().replace(/[^a-z0-9]/g, "");
      if (POKEDEX[baseKey] && POKEDEX[baseKey].num) {
        pNum = POKEDEX[baseKey].num;
      }
    }

    if (!isNonstandard && !isGmax && !isCosplay && (pNum || 9999) <= 1025) {
      results.push({ ...p, key });
    }
  });

  // Sort results by Generation, then by Pokédex Number, then alphabetically by key
  results.sort((a, b) => {
    const genA = determinePokemonGen(a, a.key);
    const genB = determinePokemonGen(b, b.key);

    if (genA !== genB) {
      return genA - genB;
    }
    if (a.num !== b.num) {
      return a.num - b.num;
    }
    return a.key.localeCompare(b.key);
  });

  // Show message if empty
  if (results.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; padding: 2rem 0; text-align: center; color: var(--color-text-muted);">
        No se encontraron Pokémon con los filtros actuales.
      </div>
    `;
    return;
  }

  // Render results (Limit to 100 to prevent DOM lag)
  const slicedResults = results.slice(0, 100);

  slicedResults.forEach(p => {
    const card = document.createElement("div");
    card.className = "search-result-item";
    card.setAttribute("onclick", `addPokemonToSlot('${p.key}')`);

    card.innerHTML = `
      <img class="sri-sprite" src="${getPokemonSpriteUrl(p)}" alt="${p.name}" onerror="handleImageError(this, '${p.key}')">
      <div class="sri-name">${p.name}</div>
      <div class="sri-types">
        ${getPokemonTypes(p).map(t => `<span class="type-badge type-${t.toLowerCase()}">${typeTranslations[t.toLowerCase()]}</span>`).join("")}
      </div>
    `;
    container.appendChild(card);
  });
}

// --- ESCAPE KEY & KEYBOARD LISTENERS ---
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" || event.key === "Esc") {
    const searchModal = document.getElementById("search-modal");
    if (searchModal && searchModal.classList.contains("active")) {
      closeSearchModal();
    }
    const itemModal = document.getElementById("item-modal");
    if (itemModal && itemModal.classList.contains("active")) {
      closeItemModal();
    }
  }
});

// --- SIMULADOR DE BUILDEO LOGIC & STATE ---

const COMPETITIVE_ITEMS = [
  // 1. Objetos de Potenciación de Tipo (Fijos +20%)
  {
    id: "dragon-fang",
    name: "Colmillo Dragón (Dragon Fang)",
    description: "Potencia los movimientos de tipo Dragón un 20%.",
    sprite: "img/items/dragon-fang.png"
  },
  {
    id: "charcoal",
    name: "Carbón (Charcoal)",
    description: "Potencia los movimientos de tipo Fuego un 20%.",
    sprite: "img/items/charcoal.png"
  },
  {
    id: "mystic-water",
    name: "Agua Mística (Mystic Water)",
    description: "Potencia los movimientos de tipo Agua un 20%.",
    sprite: "img/items/mystic-water.png"
  },
  {
    id: "miracle-seed",
    name: "Semilla Milagro (Miracle Seed)",
    description: "Potencia los movimientos de tipo Planta un 20%.",
    sprite: "img/items/miracle-seed.png"
  },
  {
    id: "magnet",
    name: "Imán (Magnet)",
    description: "Potencia los movimientos de tipo Eléctrico un 20%.",
    sprite: "img/items/magnet.png"
  },
  {
    id: "spell-tag",
    name: "Hechizo (Spell Tag)",
    description: "Potencia los movimientos de tipo Fantasma un 20%.",
    sprite: "img/items/spell-tag.png"
  },
  {
    id: "twisted-spoon",
    name: "Cuchara Torcida (Twisted Spoon)",
    description: "Potencia los movimientos de tipo Psíquico un 20%.",
    sprite: "img/items/twisted-spoon.png"
  },
  {
    id: "black-belt",
    name: "Cinturón Negro (Black Belt)",
    description: "Potencia los movimientos de tipo Lucha un 20%.",
    sprite: "img/items/black-belt.png"
  },
  {
    id: "sharp-beak",
    name: "Pico Afilado (Sharp Beak)",
    description: "Potencia los movimientos de tipo Volador un 20%.",
    sprite: "img/items/sharp-beak.png"
  },
  {
    id: "poison-barb",
    name: "Flecha Venenosa (Poison Barb)",
    description: "Potencia los movimientos de tipo Veneno un 20%.",
    sprite: "img/items/poison-barb.png"
  },
  {
    id: "soft-sand",
    name: "Arena Fina (Soft Sand)",
    description: "Potencia los movimientos de tipo Tierra un 20%.",
    sprite: "img/items/soft-sand.png"
  },
  {
    id: "hard-stone",
    name: "Piedra Dura (Hard Stone)",
    description: "Potencia los movimientos de tipo Roca un 20%.",
    sprite: "img/items/hard-stone.png"
  },
  {
    id: "silk-scarf",
    name: "Pañuelo Seda (Silk Scarf)",
    description: "Potencia los movimientos de tipo Normal un 20%.",
    sprite: "img/items/silk-scarf.png"
  },
  {
    id: "silver-powder",
    name: "Plata Alada (Silver Powder)",
    description: "Potencia los movimientos de tipo Bicho un 20%.",
    sprite: "img/items/silver-powder.png"
  },
  {
    id: "black-glasses",
    name: "Gafas de Sol (Black Glasses)",
    description: "Potencia los movimientos de tipo Siniestro un 20%.",
    sprite: "img/items/black-glasses.png"
  },
  {
    id: "metal-coat",
    name: "Revestimiento Metálico (Metal Coat)",
    description: "Potencia los movimientos de tipo Acero un 20%.",
    sprite: "img/items/metal-coat.png"
  },
  {
    id: "never-melt-ice",
    name: "Nevera (Never-Melt Ice)",
    description: "Potencia los movimientos de tipo Hielo un 20%.",
    sprite: "img/items/never-melt-ice.png"
  },
  {
    id: "destiny-knot",
    name: "Lazo Destino (Destiny Knot)",
    description: "Ajustado para potenciar los movimientos de tipo Hada un 20%.",
    sprite: "img/items/destiny-knot.png"
  },

  // 2. Objetos de Elección e Intercambio (Stats +50%)
  {
    id: "choice-band",
    name: "Cinta Elección (Choice Band)",
    description: "Aumenta el Ataque un 50%, pero te bloquea en el primer movimiento usado.",
    sprite: "img/items/choice-band.png"
  },
  {
    id: "choice-specs",
    name: "Gafas Elección (Choice Specs)",
    description: "Aumenta el Ataque Especial un 50%, pero te bloquea en el primer movimiento usado.",
    sprite: "img/items/choice-specs.png"
  },
  {
    id: "choice-scarf",
    name: "Pañuelo Elección (Choice Scarf)",
    description: "Aumenta la Velocidad un 50%, pero te bloquea en el primer movimiento usado.",
    sprite: "img/items/choice-scarf.png"
  },

  // 3. Objetos de Modificación de Daño y Daño Recibido
  {
    id: "life-orb",
    name: "Vidasfera (Life Orb)",
    description: "Daño infligido +30%, consumo de 10% de PS por golpe.",
    sprite: "img/items/life-orb.png"
  },
  {
    id: "expert-belt",
    name: "Cinta Experto (Expert Belt)",
    description: "Aumenta el daño de los ataques súper efectivos en un 20%.",
    sprite: "img/items/expert-belt.png"
  },
  {
    id: "metronome",
    name: "Metrónomo (Metronome)",
    description: "Aumenta la potencia consecutiva un 20% por cada uso consecutivo del mismo movimiento (máximo 100%).",
    sprite: "img/items/metronome.png"
  },
  {
    id: "assault-vest",
    name: "Chaleco Asalto (Assault Vest)",
    description: "Aumenta la Defensa Especial un 50%, pero impide usar movimientos de estado.",
    sprite: "img/items/assault-vest.png"
  },
  {
    id: "weakness-policy",
    name: "Seguro Debilidad (Weakness Policy)",
    description: "Si es golpeado por un ataque súper efectivo, aumenta el Ataque y el Ataque Especial 2 niveles (+100%). Se consume.",
    sprite: "img/items/weakness-policy.png"
  },
  {
    id: "rocky-helmet",
    name: "Casco Dentado (Rocky Helmet)",
    description: "Si el portador recibe un golpe físico de contacto, el atacante pierde 1/6 de sus PS máximos.",
    sprite: "img/items/rocky-helmet.png"
  },

  // 4. Objetos de Probabilidad Matemática (RNG)
  {
    id: "quick-claw",
    name: "Garra Rápida (Quick Claw)",
    description: "Otorga un 20% de probabilidad de moverte primero dentro de tu misma prioridad.",
    sprite: "img/items/quick-claw.png"
  },
  {
    id: "kings-rock",
    name: "Roca del Rey (King's Rock)",
    description: "Otorga un 10% de probabilidad de hacer retroceder (flinch) al rival al golpear.",
    sprite: "img/items/kings-rock.png"
  },
  {
    id: "focus-band",
    name: "Cinta Focus (Focus Band)",
    description: "Si el Pokémon va a ser debilitado, hay un 10% de probabilidad de resistir con 1 PS (reutilizable).",
    sprite: "img/items/focus-band.png"
  },
  {
    id: "bright-powder",
    name: "Polvo Brillo (Bright Powder)",
    description: "Reduce la precisión de los movimientos del rival en un 10%.",
    sprite: "img/items/bright-powder.png"
  },
  {
    id: "scope-lens",
    name: "Periscopio (Scope Lens)",
    description: "Aumenta el ratio de golpes críticos del portador en 1 nivel (pasa de 4.17% a 12.5%).",
    sprite: "img/items/scope-lens.png"
  },
  {
    id: "razor-claw",
    name: "Garra Afilada (Razor Claw)",
    description: "Mismo efecto que el Periscopio (+1 nivel de crítico).",
    sprite: "img/items/razor-claw.png"
  },

  // 5. Objetos de Precisión y Turnos
  {
    id: "wide-lens",
    name: "Lente Amplia (Wide Lens)",
    description: "Aumenta la precisión general un 10% multiplicativo.",
    sprite: "img/items/wide-lens.png"
  },
  {
    id: "zoom-lens",
    name: "Lente Zoom (Zoom Lens)",
    description: "Aumenta la precisión un 20% si el portador se mueve de último.",
    sprite: "img/items/zoom-lens.png"
  },
  {
    id: "light-clay",
    name: "Reflejaluz (Light Clay)",
    description: "Extiende la duración de Pantalla de Luz, Reflejo y Velo Aurora de 5 a 8 turnos.",
    sprite: "img/items/light-clay.png"
  },
  {
    id: "damp-rock",
    name: "Roca Lluvia (Damp Rock)",
    description: "Extiende la duración de la Lluvia invocada de 5 a 8 turnos.",
    sprite: "img/items/damp-rock.png"
  },
  {
    id: "heat-rock",
    name: "Roca Calor (Heat Rock)",
    description: "Extiende la duración del Sol invocado de 5 a 8 turnos.",
    sprite: "img/items/heat-rock.png"
  },
  {
    id: "smooth-rock",
    name: "Roca Suave (Smooth Rock)",
    description: "Extiende la duración de la Tormenta de Arena invocada de 5 a 8 turnos.",
    sprite: "img/items/smooth-rock.png"
  },
  {
    id: "icy-rock",
    name: "Roca Helada (Icy Rock)",
    description: "Extiende la duración de la Nieve invocada de 5 a 8 turnos.",
    sprite: "img/items/icy-rock.png"
  },

  // 6. Objetos de Recuperación Pasiva y Curación
  {
    id: "leftovers",
    name: "Restos (Leftovers)",
    description: "Cura 1/16 (6.25%) de los PS máximos al final de cada turno.",
    sprite: "img/items/leftovers.png"
  },
  {
    id: "black-sludge",
    name: "Lodo Negro (Black Sludge)",
    description: "Cura 1/16 de los PS a los tipo Veneno al final de cada turno; daña 1/8 a los demás tipos.",
    sprite: "img/items/black-sludge.png"
  },
  {
    id: "shell-bell",
    name: "Campana Concha (Shell Bell)",
    description: "Recupera en PS el 12.5% del daño provocado al rival.",
    sprite: "img/items/shell-bell.png"
  },
  {
    id: "big-root",
    name: "Raíz Grande (Big Root)",
    description: "Aumenta la curación por drenaje un 30%.",
    sprite: "img/items/big-root.png"
  },
  {
    id: "sitrus-berry",
    name: "Baya Cidra (Sitrus Berry)",
    description: "Cura un 25% de los PS máximos al bajar del 50% de vida. Se consume.",
    sprite: "img/items/sitrus-berry.png"
  },
  {
    id: "lum-berry",
    name: "Baya Ziuela (Lum Berry)",
    description: "Cura cualquier problema de estado al instante. Se consume.",
    sprite: "img/items/lum-berry.png"
  },

  // 7. Objetos de Control y Estado Fijo
  {
    id: "flame-orb",
    name: "Llamasfera (Flame Orb)",
    description: "Quema al portador al final del primer turno.",
    sprite: "img/items/flame-orb.png"
  },
  {
    id: "toxic-orb",
    name: "Toxisfera (Toxic Orb)",
    description: "Envenena gravemente al portador al final del primer turno.",
    sprite: "img/items/toxic-orb.png"
  },
  {
    id: "mental-herb",
    name: "Hierba Mental (Mental Herb)",
    description: "Cura inmediatamente al portador de mofa, atracción u otros efectos mentales. Se consume.",
    sprite: "img/items/mental-herb.png"
  },
  {
    id: "white-herb",
    name: "Hierba Blanca (White Herb)",
    description: "Restaura al instante cualquier estadística que haya sido bajada. Se consume.",
    sprite: "img/items/white-herb.png"
  },
  {
    id: "mirror-herb",
    name: "Hierba Copia (Mirror Herb)",
    description: "Copia los aumentos de estadísticas del rival una sola vez. Se consume.",
    sprite: "img/items/mirror-herb.png"
  },
  {
    id: "clear-amulet",
    name: "Amuleto Puro (Clear Amulet)",
    description: "Protege al portador de que el rival le baje las estadísticas (Inmune a Intimidación, etc.).",
    sprite: "img/items/clear-amulet.png"
  },
  {
    id: "focus-sash",
    name: "Banda Focus (Focus Sash)",
    description: "Resiste con 1 PS si tenías el 100% de vida al recibir un golpe fulminante. Se consume.",
    sprite: "img/items/focus-sash.png"
  },
  {
    id: "eviolite",
    name: "Mineral Evolutivo (Eviolite)",
    description: "Aumenta la Defensa y Defensa Especial en un 50% si el portador aún puede evolucionar.",
    sprite: "img/items/eviolite.png"
  },

  // 8. Bloque Especial: Megapiedras de Champions (Oficiales)
  {
    id: "raichunite-x",
    name: "Raichunita X (Raichunite X)",
    description: "Permite megaevolucionar a Raichu en Mega-Raichu X en combate.",
    sprite: "img/items/raichunite-x.png"
  },
  {
    id: "raichunite-y",
    name: "Raichunita Y (Raichunite Y)",
    description: "Permite megaevolucionar a Raichu en Mega-Raichu Y en combate.",
    sprite: "img/items/raichunite-y.png"
  },
  {
    id: "charizardite-x",
    name: "Charizardita X (Charizardite X)",
    description: "Permite megaevolucionar a Charizard en Mega-Charizard X en combate.",
    sprite: "img/items/charizardite-x.png"
  },
  {
    id: "charizardite-y",
    name: "Charizardita Y (Charizardite Y)",
    description: "Permite megaevolucionar a Charizard en Mega-Charizard Y en combate.",
    sprite: "img/items/charizardite-y.png"
  },
  {
    id: "venusaurite",
    name: "Venusaurita (Venusaurite)",
    description: "Permite megaevolucionar a Venusaur en Mega-Venusaur en combate.",
    sprite: "img/items/venusaurite.png"
  },
  {
    id: "blastoisite",
    name: "Blastoisita (Blastoisite)",
    description: "Permite megaevolucionar a Blastoise en Mega-Blastoise en combate.",
    sprite: "img/items/blastoisite.png"
  },
  {
    id: "beedrillite",
    name: "Beedrillita (Beedrillite)",
    description: "Permite megaevolucionar a Beedrill en Mega-Beedrill en combate.",
    sprite: "img/items/beedrillite.png"
  },
  {
    id: "pidgeotite",
    name: "Pidgeotita (Pidgeotite)",
    description: "Permite megaevolucionar a Pidgeot en Mega-Pidgeot en combate.",
    sprite: "img/items/pidgeotite.png"
  },
  {
    id: "alakazite",
    name: "Alakazamita (Alakazite)",
    description: "Permite megaevolucionar a Alakazam en Mega-Alakazam en combate.",
    sprite: "img/items/alakazite.png"
  },
  {
    id: "gengarite",
    name: "Gengarita (Gengarite)",
    description: "Permite megaevolucionar a Gengar en Mega-Gengar en combate.",
    sprite: "img/items/gengarite.png"
  },
  {
    id: "gyaradosite",
    name: "Gyaradosita (Gyaradosite)",
    description: "Permite megaevolucionar a Gyarados en Mega-Gyarados en combate.",
    sprite: "img/items/gyaradosite.png"
  },
  {
    id: "aerodactylite",
    name: "Aerodactylita (Aerodactylite)",
    description: "Permite megaevolucionar a Aerodactyl en Mega-Aerodactyl en combate.",
    sprite: "img/items/aerodactylite.png"
  },
  {
    id: "ampharosite",
    name: "Ampharosita (Ampharosite)",
    description: "Permite megaevolucionar a Ampharos en Mega-Ampharos en combate.",
    sprite: "img/items/ampharosite.png"
  },
  {
    id: "scizorite",
    name: "Scizorita (Scizorite)",
    description: "Permite megaevolucionar a Scizor en Mega-Scizor en combate.",
    sprite: "img/items/scizorite.png"
  },
  {
    id: "heracronite",
    name: "Heracrossita (Heracronite)",
    description: "Permite megaevolucionar a Heracross en Mega-Heracross en combate.",
    sprite: "img/items/heracronite.png"
  },
  {
    id: "houndoominite",
    name: "Houndoomita (Houndoominite)",
    description: "Permite megaevolucionar a Houndoom en Mega-Houndoom en combate.",
    sprite: "img/items/houndoominite.png"
  },
  {
    id: "tyranitarite",
    name: "Tyranitarita (Tyranitarite)",
    description: "Permite megaevolucionar a Tyranitar en Mega-Tyranitar en combate.",
    sprite: "img/items/tyranitarite.png"
  },
  {
    id: "sceptilite",
    name: "Sceptilita (Sceptilite)",
    description: "Permite megaevolucionar a Sceptile en Mega-Sceptile en combate.",
    sprite: "img/items/sceptilite.png"
  },
  {
    id: "blazikenite",
    name: "Blazikenita (Blazikenite)",
    description: "Permite megaevolucionar a Blaziken en Mega-Blaziken en combate.",
    sprite: "img/items/blazikenite.png"
  },
  {
    id: "swampertite",
    name: "Swampertita (Swampertita)",
    description: "Permite megaevolucionar a Swampert en Mega-Swampert en combate.",
    sprite: "img/items/swampertite.png"
  },
  {
    id: "gardevoirite",
    name: "Gardevoirita (Gardevoirite)",
    description: "Permite megaevolucionar a Gardevoir en Mega-Gardevoir en combate.",
    sprite: "img/items/gardevoirite.png"
  },
  {
    id: "sablenite",
    name: "Sableyeita (Sablenite)",
    description: "Permite megaevolucionar a Sableye en Mega-Sableye en combate.",
    sprite: "img/items/sablenite.png"
  },
  {
    id: "mawilite",
    name: "Mawilita (Mawilite)",
    description: "Permite megaevolucionar a Mawile en Mega-Mawile en combate.",
    sprite: "img/items/mawilite.png"
  },
  {
    id: "aggronite",
    name: "Aggronita (Aggronite)",
    description: "Permite megaevolucionar a Aggron en Mega-Aggron en combate.",
    sprite: "img/items/aggronite.png"
  },
  {
    id: "medichamite",
    name: "Medichamita (Medichamite)",
    description: "Permite megaevolucionar a Medicham en Mega-Medicham en combate.",
    sprite: "img/items/medichamite.png"
  },
  {
    id: "manectrite",
    name: "Manectricita (Manectrite)",
    description: "Permite megaevolucionar a Manectric en Mega-Manectric en combate.",
    sprite: "img/items/manectrite.png"
  },
  {
    id: "sharpedonite",
    name: "Sharpedonita (Sharpedonite)",
    description: "Permite megaevolucionar a Sharpedo en Mega-Sharpedo en combate.",
    sprite: "img/items/sharpedonite.png"
  },
  {
    id: "cameruptite",
    name: "Cameruptita (Cameruptite)",
    description: "Permite megaevolucionar a Camerupt en Mega-Camerupt en combate.",
    sprite: "img/items/cameruptite.png"
  },
  {
    id: "altarianite",
    name: "Altarianita (Altarianite)",
    description: "Permite megaevolucionar a Altaria en Mega-Altaria en combate.",
    sprite: "img/items/altarianite.png"
  },
  {
    id: "banettite",
    name: "Banettita (Banettite)",
    description: "Permite megaevolucionar a Banette en Mega-Banette en combate.",
    sprite: "img/items/banettite.png"
  },
  {
    id: "absolite",
    name: "Absolita (Absolite)",
    description: "Permite megaevolucionar a Absol en Mega-Absol en combate.",
    sprite: "img/items/absolite.png"
  },
  {
    id: "glalitite",
    name: "Glalita (Glalitite)",
    description: "Permite megaevolucionar a Glalie en Mega-Glalie en combate.",
    sprite: "img/items/glalitite.png"
  },
  {
    id: "salamencite",
    name: "Salamencita (Salamencite)",
    description: "Permite megaevolucionar a Salamence en Mega-Salamence en combate.",
    sprite: "img/items/salamencite.png"
  },
  {
    id: "metagrossite",
    name: "Metagrossita (Metagrossite)",
    description: "Permite megaevolucionar a Metagross en Mega-Metagross en combate.",
    sprite: "img/items/metagrossite.png"
  },
  {
    id: "pinsirite",
    name: "Pinsirita (Pinsirite)",
    description: "Permite megaevolucionar a Pinsir en Mega-Pinsir en combate.",
    sprite: "img/items/pinsirite.png"
  },
  {
    id: "garchompite",
    name: "Garchompita (Garchompite)",
    description: "Permite megaevolucionar a Garchomp en Mega-Garchomp en combate.",
    sprite: "img/items/garchompite.png"
  },
  {
    id: "lucarinite",
    name: "Lucarita (Lucarinite)",
    description: "Permite megaevolucionar a Lucario en Mega-Lucario en combate.",
    sprite: "img/items/lucarinite.png"
  },
  {
    id: "lopunnite",
    name: "Lopunnita (Lopunnite)",
    description: "Permite megaevolucionar a Lopunny en Mega-Lopunny en combate.",
    sprite: "img/items/lopunnite.png"
  },
  {
    id: "abomasnowite",
    name: "Abomasnowita (Abomasnowite)",
    description: "Permite megaevolucionar a Abomasnow en Mega-Abomasnow en combate.",
    sprite: "img/items/abomasnowite.png"
  },
  {
    id: "galladite",
    name: "Galladita (Galladite)",
    description: "Permite megaevolucionar a Gallade en Mega-Gallade en combate.",
    sprite: "img/items/galladite.png"
  },
  {
    id: "audinite",
    name: "Audinita (Audinite)",
    description: "Permite megaevolucionar a Audino en Mega-Audino en combate.",
    sprite: "img/items/audinite.png"
  },

  // 9. Bloque Especial: Megapiedras de Champions (Exclusivas Custom)
  {
    id: "raichuite-x",
    name: "Raichuita X (Raichuite X)",
    description: "Permite megaevolucionar a Raichu en Mega-Raichu X en combate.",
    sprite: "img/items/raichuite-x.png"
  },
  {
    id: "raichuite-y",
    name: "Raichuita Y (Raichuite Y)",
    description: "Permite megaevolucionar a Raichu en Mega-Raichu Y en combate.",
    sprite: "img/items/raichuite-y.png"
  },
  {
    id: "dragonitite",
    name: "Dragonitita (Dragonitite)",
    description: "Permite megaevolucionar a Dragonite en Mega-Dragonite en combate.",
    sprite: "img/items/dragonitite.png"
  },
  {
    id: "meganiumite",
    name: "Meganiumita (Meganiumite)",
    description: "Permite megaevolucionar a Meganium en Mega-Meganium en combate.",
    sprite: "img/items/meganiumite.png"
  },
  {
    id: "feraligatrite",
    name: "Feraligatrita (Feraligatrite)",
    description: "Permite megaevolucionar a Feraligatr en Mega-Feraligatr en combate.",
    sprite: "img/items/feraligatrite.png"
  },
  {
    id: "typhlosite",
    name: "Typhlosita (Typhlosite)",
    description: "Permite megaevolucionar a Typhlosion en Mega-Typhlosion en combate.",
    sprite: "img/items/typhlosite.png"
  },
  {
    id: "serperiorite",
    name: "Serperiorita (Serperiorite)",
    description: "Permite megaevolucionar a Serperior en Mega-Serperior en combate.",
    sprite: "img/items/serperiorite.png"
  },
  {
    id: "emboarite",
    name: "Emboarita (Emboarite)",
    description: "Permite megaevolucionar a Emboar en Mega-Emboar en combate.",
    sprite: "img/items/emboarite.png"
  },
  {
    id: "samurottite",
    name: "Samurottita (Samurottite)",
    description: "Permite megaevolucionar a Samurott en Mega-Samurott en combate.",
    sprite: "img/items/samurottite.png"
  },
  {
    id: "greninjite",
    name: "Greninjita (Greninjite)",
    description: "Permite megaevolucionar a Greninja en Mega-Greninja en combate.",
    sprite: "img/items/greninjite.png"
  },
  {
    id: "chesnaughtite",
    name: "Chesnaughtita (Chesnaughtite)",
    description: "Permite megaevolucionar a Chesnaught en Mega-Chesnaught en combate.",
    sprite: "img/items/chesnaughtite.png"
  },
  {
    id: "delphoxite",
    name: "Delphoxita (Delphoxite)",
    description: "Permite megaevolucionar a Delphox en Mega-Delphox en combate.",
    sprite: "img/items/delphoxite.png"
  },
  {
    id: "meowsticite",
    name: "Meowsticita (Meowsticite)",
    description: "Permite megaevolucionar a Meowstic en Mega-Meowstic en combate.",
    sprite: "img/items/meowsticite.png"
  },
  {
    id: "floettite",
    name: "Floettite (Floettite)",
    description: "Permite megaevolucionar a Floette en Mega-Floette en combate.",
    sprite: "img/items/floettite.png"
  },
  {
    id: "garganaclita",
    name: "Garganaclita (Garganaclita)",
    description: "Permite megaevolucionar a Garganacl en Mega-Garganacl en combate.",
    sprite: "img/items/garganaclita.png"
  },
  {
    id: "scovillainita",
    name: "Scovillainita (Scovillainita)",
    description: "Permite megaevolucionar a Scovillain en Mega-Scovillain en combate.",
    sprite: "img/items/scovillainita.png"
  },
  {
    id: "falinksita",
    name: "Falinksita (Falinksita)",
    description: "Permite megaevolucionar a Falinks en Mega-Falinks en combate.",
    sprite: "img/items/falinksita.png"
  },

  // 10. Bloque Especial: Piedras Mega adicionales
  {
    id: "blastoisite",
    name: "Blastoisita (Blastoisite)",
    description: "Permite megaevolucionar a Blastoise en Mega-Blastoise en combate.",
    sprite: "img/items/blastoisite.png"
  },
  {
    id: "clefablite",
    name: "Clefablita (Clefablite)",
    description: "Permite megaevolucionar a Clefable en Mega-Clefable en combate.",
    sprite: "img/items/clefablite.png"
  },
  {
    id: "victreebelite",
    name: "Victreebelita (Victreebelite)",
    description: "Permite megaevolucionar a Victreebel en Mega-Victreebel en combate.",
    sprite: "img/items/victreebelite.png"
  },
  {
    id: "slowbronite",
    name: "Slowbronita (Slowbronite)",
    description: "Permite megaevolucionar a Slowbro en Mega-Slowbro en combate.",
    sprite: "img/items/slowbronite.png"
  },
  {
    id: "kangaskhanite",
    name: "Kangaskhanita (Kangaskhanite)",
    description: "Permite megaevolucionar a Kangaskhan en Mega-Kangaskhan en combate.",
    sprite: "img/items/kangaskhanite.png"
  },
  {
    id: "starminite",
    name: "Starminita (Starminite)",
    description: "Permite megaevolucionar a Starmie en Mega-Starmie en combate.",
    sprite: "img/items/starminite.png"
  },
  {
    id: "dragoninite",
    name: "Dragonitita (Dragonitite)",
    description: "Permite megaevolucionar a Dragonite en Mega-Dragonite en combate.",
    sprite: "img/items/dragoninite.png"
  },
  {
    id: "steelixite",
    name: "Steelixita (Steelixite)",
    description: "Permite megaevolucionar a Steelix en Mega-Steelix en combate.",
    sprite: "img/items/steelixite.png"
  },
  {
    id: "skarmorite",
    name: "Skarmorita (Skarmorite)",
    description: "Permite megaevolucionar a Skarmory en Mega-Skarmory en combate.",
    sprite: "img/items/skarmorite.png"
  },
  {
    id: "chimechite",
    name: "Chimechita (Chimechite)",
    description: "Permite megaevolucionar a Chimecho en Mega-Chimecho en combate.",
    sprite: "img/items/chimechite.png"
  },
  {
    id: "staraptite",
    name: "Staraptita (Staraptite)",
    description: "Permite megaevolucionar a Staraptor en Mega-Staraptor en combate.",
    sprite: "img/items/staraptite.png"
  },
  {
    id: "froslassite",
    name: "Froslassita (Froslassite)",
    description: "Permite megaevolucionar a Froslass en Mega-Froslass en combate.",
    sprite: "img/items/froslassite.png"
  },
  {
    id: "excadrite",
    name: "Excadrillita (Excadrite)",
    description: "Permite megaevolucionar a Excadrill en Mega-Excadrill en combate.",
    sprite: "img/items/excadrite.png"
  },
  {
    id: "scolipite",
    name: "Scolipedita (Scolipite)",
    description: "Permite megaevolucionar a Scolipede en Mega-Scolipede en combate.",
    sprite: "img/items/scolipite.png"
  },
  {
    id: "scraftinite",
    name: "Scraftita (Scraftinite)",
    description: "Permite megaevolucionar a Scrafty en Mega-Scrafty en combate.",
    sprite: "img/items/scraftinite.png"
  },
  {
    id: "eelektrossite",
    name: "Eelektrossita (Eelektrossite)",
    description: "Permite megaevolucionar a Eelektross en Mega-Eelektross en combate.",
    sprite: "img/items/eelektrossite.png"
  },
  {
    id: "chandelurite",
    name: "Chandelurita (Chandelurite)",
    description: "Permite megaevolucionar a Chandelure en Mega-Chandelure en combate.",
    sprite: "img/items/chandelurite.png"
  },
  {
    id: "golurkite",
    name: "Golurkita (Golurkite)",
    description: "Permite megaevolucionar a Golurk en Mega-Golurk en combate.",
    sprite: "img/items/golurkite.png"
  },
  {
    id: "malamarite",
    name: "Malamarita (Malamarite)",
    description: "Permite megaevolucionar a Malamar en Mega-Malamar en combate.",
    sprite: "img/items/malamarite.png"
  },
  {
    id: "barbaracite",
    name: "Barbaraclita (Barbaracite)",
    description: "Permite megaevolucionar a Barbaracle en Mega-Barbaracle en combate.",
    sprite: "img/items/barbaracite.png"
  },
  {
    id: "dragalgite",
    name: "Dragalgita (Dragalgite)",
    description: "Permite megaevolucionar a Dragalge en Mega-Dragalge en combate.",
    sprite: "img/items/dragalgite.png"
  },
  {
    id: "hawluchanite",
    name: "Hawluchanita (Hawluchanite)",
    description: "Permite megaevolucionar a Hawlucha en Mega-Hawlucha en combate.",
    sprite: "img/items/hawluchanite.png"
  },
  {
    id: "crabominite",
    name: "Crabominita (Crabominite)",
    description: "Permite megaevolucionar a Crabominable en Mega-Crabominable en combate.",
    sprite: "img/items/crabominite.png"
  },
  {
    id: "drampanite",
    name: "Drampanita (Drampanite)",
    description: "Permite megaevolucionar a Drampa en Mega-Drampa en combate.",
    sprite: "img/items/drampanite.png"
  },
  {
    id: "glimmoranite",
    name: "Glimmoranita (Glimmoranite)",
    description: "Permite megaevolucionar a Glimmora en Mega-Glimmora en combate.",
    sprite: "img/items/glimmoranite.png"
  }
];

// --- MEGA EVOLUTION HELPERS ---
function isMegaPokemon(p) {
  if (!p) return false;
  const name = p.name || "";
  const key = p.key || "";
  return (p.forme && p.forme.includes("Mega")) ||
    name.includes("-Mega") ||
    key.includes("mega") ||
    !!p.requiredItem;
}

function getMegaStoneIdForPokemon(p) {
  if (!isMegaPokemon(p)) return null;

  const req = p.requiredItem ? p.requiredItem.toLowerCase().replace(/[^a-z0-9]/g, "") : "";
  const name = (p.name || "").toLowerCase();
  const baseName = (p.baseSpecies || p.name || "").toLowerCase().replace(/-mega(-[xyz])?/g, "").replace(/[^a-z0-9]/g, "");

  let suffix = "";
  if (name.includes("-mega-x") || name.includes("-x")) suffix = "x";
  if (name.includes("-mega-y") || name.includes("-y")) suffix = "y";
  if (name.includes("-mega-z") || name.includes("-z")) suffix = "z";

  // 1. Direct or partial requiredItem match
  if (req) {
    const cleanReq = req.replace(/ite$|ita$|nite$/g, "");
    const directMatch = COMPETITIVE_ITEMS.find(item => {
      const cleanId = item.id.toLowerCase().replace(/[^a-z0-9]/g, "");
      const cleanIdNoIte = cleanId.replace(/ite$|ita$|nite$/g, "");
      if (cleanId === req || cleanId.includes(cleanReq) || cleanReq.includes(cleanIdNoIte) || cleanIdNoIte.includes(cleanReq)) {
        if (suffix && !cleanId.endsWith(suffix)) return false;
        return true;
      }
      return false;
    });
    if (directMatch) return directMatch.id;
  }

  // 2. Base species match
  const cleanBase = baseName.length > 4 ? baseName.substring(0, 5) : baseName;
  const matched = COMPETITIVE_ITEMS.find(item => {
    const cleanId = item.id.toLowerCase().replace(/[^a-z0-9]/g, "");
    if (cleanId.includes(cleanBase) || baseName.includes(cleanId.replace(/ite$|ita$/g, ""))) {
      if (suffix) {
        return cleanId.endsWith(suffix);
      } else {
        return !cleanId.match(/[xyz]$/);
      }
    }
    return false;
  });

  if (matched) return matched.id;

  // 3. Fallback search item name
  const fallback = COMPETITIVE_ITEMS.find(item => {
    const itemName = item.name.toLowerCase();
    return itemName.includes(baseName);
  });

  if (fallback) return fallback.id;

  return null;
}

let activeItemSelectSlotIndex = -1;

function openItemModal(slotIndex) {
  activeItemSelectSlotIndex = slotIndex;
  document.getElementById("item-modal").classList.add("active");

  const p = activeTeam[slotIndex];
  if (p) {
    const headerTitle = document.querySelector("#item-modal .modal-header h2");
    if (headerTitle) {
      headerTitle.innerHTML = `<i data-lucide="package"></i> Equipar Objeto a ${p.name}`;
      if (window.lucide) lucide.createIcons();
    }
  }

  // Clear search
  document.getElementById("item-search-input").value = "";
  filterItemsResults();

  document.getElementById("item-search-input").focus();
}

function closeItemModal(event) {
  if (event) event.stopPropagation();
  document.getElementById("item-modal").classList.remove("active");
  activeItemSelectSlotIndex = -1;
}

function filterItemsResults() {
  const query = document.getElementById("item-search-input").value.toLowerCase().trim();
  const container = document.getElementById("items-selection-container");
  container.innerHTML = "";

  const p = activeTeam[activeItemSelectSlotIndex];

  // Get all equipped item IDs on other team members (exclude current editing slot)
  const equippedElsewhere = activeTeam
    .filter((member, idx) => member && idx !== activeItemSelectSlotIndex && member.equippedItem)
    .map(member => member.equippedItem);

  const filtered = COMPETITIVE_ITEMS.filter(item =>
    !equippedElsewhere.includes(item.id) &&
    (item.name.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query))
  );

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; padding: 2rem 0; text-align: center; color: var(--color-text-muted);">
        No se encontraron objetos competitivos disponibles.
      </div>
    `;
    return;
  }

  // If no search query and we have a valid pokemon, show recommended section at top
  const recommended = (p && !query) ? getRecommendedItems(p, activeItemSelectSlotIndex) : [];
  const recIds = recommended.map(r => r.id);

  if (recommended.length > 0) {
    const recHeader = document.createElement("div");
    recHeader.style.cssText = "grid-column: 1 / -1; display: flex; align-items: center; gap: 0.5rem; color: var(--accent-yellow); font-family: var(--font-display); font-size: 0.95rem; margin-top: 0.25rem; margin-bottom: 0.25rem; padding-bottom: 0.35rem; border-bottom: 1px solid rgba(251, 191, 36, 0.2);";
    recHeader.innerHTML = `<i data-lucide="sparkles" style="width: 16px; height: 16px;"></i> Objetos Recomendados para ${p.name}`;
    container.appendChild(recHeader);

    recommended.forEach(item => {
      const card = document.createElement("div");
      card.className = "item-select-card recommended-card";
      card.style.cssText = "border: 1px solid rgba(251, 191, 36, 0.4); background: rgba(251, 191, 36, 0.06);";
      card.setAttribute("onclick", `equipItem(${activeItemSelectSlotIndex}, '${item.id}')`);
      card.innerHTML = `
        <img class="item-select-sprite" src="${item.sprite}" alt="${item.name}" onerror="this.src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png'">
        <div class="item-select-info">
          <div class="item-select-name" style="display: flex; align-items: center; justify-content: space-between;">
            <span>${item.name}</span>
            <span style="font-size: 0.65rem; background: rgba(251, 191, 36, 0.2); color: var(--accent-yellow); padding: 0.1rem 0.4rem; border-radius: 4px; font-weight: bold;">⭐ RECOMENDADO</span>
          </div>
          <div class="item-select-desc">${item.description}</div>
        </div>
      `;
      container.appendChild(card);
    });

    const allHeader = document.createElement("div");
    allHeader.style.cssText = "grid-column: 1 / -1; display: flex; align-items: center; gap: 0.5rem; color: var(--color-text-muted); font-family: var(--font-display); font-size: 0.9rem; margin-top: 1rem; margin-bottom: 0.25rem; padding-bottom: 0.35rem; border-bottom: 1px solid rgba(255, 255, 255, 0.08);";
    allHeader.innerHTML = `<i data-lucide="list" style="width: 16px; height: 16px;"></i> Todos los Objetos Competitivos`;
    container.appendChild(allHeader);
  }

  // Render remaining items
  const remaining = query ? filtered : filtered.filter(item => !recIds.includes(item.id));

  remaining.forEach(item => {
    const card = document.createElement("div");
    card.className = "item-select-card";
    card.setAttribute("onclick", `equipItem(${activeItemSelectSlotIndex}, '${item.id}')`);
    card.innerHTML = `
      <img class="item-select-sprite" src="${item.sprite}" alt="${item.name}" onerror="this.src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png'">
      <div class="item-select-info">
        <div class="item-select-name">${item.name}</div>
        <div class="item-select-desc">${item.description}</div>
      </div>
    `;
    container.appendChild(card);
  });

  if (window.lucide) lucide.createIcons();
}

function equipItem(slotIndex, itemId) {
  if (slotIndex < 0 || slotIndex >= 6 || !activeTeam[slotIndex]) return;
  const p = activeTeam[slotIndex];
  if (isMegaPokemon(p)) {
    const megaStoneId = getMegaStoneIdForPokemon(p);
    activeTeam[slotIndex].equippedItem = megaStoneId;
    saveTeamToLocalStorage();
    renderBuildeoTab();
    closeItemModal();
    showToast(`${p.name} combate con su Megapiedra obligatoria`, "info");
    return;
  }
  const item = COMPETITIVE_ITEMS.find(i => i.id === itemId);
  if (item) {
    activeTeam[slotIndex].equippedItem = item.id;
    saveTeamToLocalStorage();
    renderBuildeoTab();
    closeItemModal();
    showToast(`¡${item.name} equipado a ${activeTeam[slotIndex].name}!`, "success");
  }
}

function unequipItem(slotIndex, event) {
  if (event) event.stopPropagation();
  if (slotIndex < 0 || slotIndex >= 6 || !activeTeam[slotIndex]) return;
  const p = activeTeam[slotIndex];
  if (isMegaPokemon(p)) {
    showToast(`Las Megaevoluciones no pueden desequipar su Megapiedra`, "error");
    return;
  }

  const oldItemName = activeTeam[slotIndex].equippedItem;
  activeTeam[slotIndex].equippedItem = null;
  saveTeamToLocalStorage();
  renderBuildeoTab();

  if (oldItemName) {
    showToast(`Objeto desequipado de ${activeTeam[slotIndex].name}`, "success");
  }
}

function selectAbility(slotIndex, abilityKey) {
  if (slotIndex < 0 || slotIndex >= 6 || !activeTeam[slotIndex]) return;

  const p = activeTeam[slotIndex];
  const abilityName = p.abilities[abilityKey];
  p.selectedAbility = abilityName;
  saveTeamToLocalStorage();
  updateUI();

  const esAbilityName = ABILITIES_DB[abilityName] || abilityName;
  showToast(`Habilidad '${esAbilityName}' seleccionada para ${p.name}`, "success");
}

function getRecommendedItems(p, slotIndex) {
  if (!p) return [];
  const recs = [];

  // Required Item (like Megas)
  if (p.requiredItem) {
    const item = COMPETITIVE_ITEMS.find(i => i.name.toLowerCase().includes(p.requiredItem.toLowerCase()));
    if (item) {
      recs.push(item);
    } else {
      recs.push({
        id: p.requiredItem.toLowerCase().replace(/[^a-z0-9]/g, "-"),
        name: p.requiredItem,
        description: `Objeto necesario para activar la forma de ${p.name}.`,
        sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/mega-ring.png"
      });
    }
  }

  // Eviolite for non-fully evolved
  const isNFE = p.evos && p.evos.length > 0;
  if (isNFE || p.tier === "NFE" || p.tier === "LC") {
    const eviolite = COMPETITIVE_ITEMS.find(i => i.id === "eviolite");
    if (eviolite) recs.push(eviolite);
  }

  // Black Sludge for Poison
  const pTypes = getPokemonTypes(p);
  const isPoison = pTypes.some(t => t.toLowerCase() === "poison");
  if (isPoison) {
    const sludge = COMPETITIVE_ITEMS.find(i => i.id === "black-sludge");
    if (sludge) recs.push(sludge);
  }

  const hp = p.baseStats.hp;
  const def = p.baseStats.def;
  const spd = p.baseStats.spd;
  const atk = p.baseStats.atk;
  const spa = p.baseStats.spa;
  const spe = p.baseStats.spe;

  const isBulky = hp >= 80 || def >= 90 || spd >= 90;

  if (isBulky) {
    const leftovers = COMPETITIVE_ITEMS.find(i => i.id === "leftovers");
    if (leftovers && !recs.includes(leftovers)) recs.push(leftovers);

    const helmet = COMPETITIVE_ITEMS.find(i => i.id === "rocky-helmet");
    if (helmet && !recs.includes(helmet)) recs.push(helmet);
  }

  const isFastAttacker = spe >= 90 && (atk >= 95 || spa >= 95);
  const isFragile = hp < 75 && def < 75 && spd < 75;

  if (isFastAttacker && isFragile) {
    const sash = COMPETITIVE_ITEMS.find(i => i.id === "focus-sash");
    if (sash && !recs.includes(sash)) recs.push(sash);
  }

  if (isFastAttacker || spe >= 85) {
    const lifeOrb = COMPETITIVE_ITEMS.find(i => i.id === "life-orb");
    if (lifeOrb && !recs.includes(lifeOrb)) recs.push(lifeOrb);

    const scarf = COMPETITIVE_ITEMS.find(i => i.id === "choice-scarf");
    if (scarf && !recs.includes(scarf)) recs.push(scarf);

    if (atk > spa) {
      const band = COMPETITIVE_ITEMS.find(i => i.id === "choice-band");
      if (band && !recs.includes(band)) recs.push(band);
    } else {
      const specs = COMPETITIVE_ITEMS.find(i => i.id === "choice-specs");
      if (specs && !recs.includes(specs)) recs.push(specs);
    }
  }

  if (atk >= 90 || spa >= 90) {
    const belt = COMPETITIVE_ITEMS.find(i => i.id === "expert-belt");
    if (belt && !recs.includes(belt)) recs.push(belt);

    const policy = COMPETITIVE_ITEMS.find(i => i.id === "weakness-policy");
    if (policy && !recs.includes(policy) && isBulky) recs.push(policy);
  }

  const lum = COMPETITIVE_ITEMS.find(i => i.id === "lum-berry");
  if (lum && !recs.includes(lum)) recs.push(lum);

  const leftovers = COMPETITIVE_ITEMS.find(i => i.id === "leftovers");
  if (leftovers && !recs.includes(leftovers)) recs.push(leftovers);

  const vest = COMPETITIVE_ITEMS.find(i => i.id === "assault-vest");
  if (vest && !recs.includes(vest) && (hp >= 70 || spd >= 70)) recs.push(vest);

  // Filter out any recommended items that are already equipped by ANOTHER Pokémon on the active team
  const equippedElsewhere = activeTeam
    .filter((member, idx) => member && idx !== slotIndex && member.equippedItem)
    .map(member => member.equippedItem);

  let availableRecs = recs.filter(item => !equippedElsewhere.includes(item.id));

  // If we have less than 3 recommendations, add type-boosting items matching the Pokémon's types (e.g. Carbón for Fire)
  if (availableRecs.length < 3) {
    const typeBoosters = {
      "fire": "charcoal",
      "water": "mystic-water",
      "grass": "miracle-seed",
      "electric": "magnet",
      "ice": "never-melt-ice",
      "fighting": "black-belt",
      "poison": "poison-barb",
      "ground": "soft-sand",
      "flying": "sharp-beak",
      "psychic": "twisted-spoon",
      "bug": "silver-powder",
      "rock": "hard-stone",
      "ghost": "spell-tag",
      "dragon": "dragon-fang",
      "dark": "black-glasses",
      "steel": "metal-coat",
      "fairy": "destiny-knot"
    };

    getPokemonTypes(p).forEach(t => {
      const typeKey = t.toLowerCase();
      const boosterId = typeBoosters[typeKey];
      if (boosterId && !equippedElsewhere.includes(boosterId)) {
        const boosterItem = COMPETITIVE_ITEMS.find(item => item.id === boosterId);
        if (boosterItem && !availableRecs.some(r => r.id === boosterId)) {
          availableRecs.push(boosterItem);
        }
      }
    });
  }

  // If we still have less than 3, add general backup fillers (e.g. Metrónomo)
  if (availableRecs.length < 3) {
    const backupFillers = ["metronome", "expert-belt", "life-orb", "leftovers", "lum-berry", "rocky-helmet", "focus-sash", "choice-scarf", "weakness-policy"];
    for (const fillerId of backupFillers) {
      if (availableRecs.length >= 3) break;
      if (!equippedElsewhere.includes(fillerId)) {
        const fillerItem = COMPETITIVE_ITEMS.find(item => item.id === fillerId);
        if (fillerItem && !availableRecs.some(r => r.id === fillerId)) {
          availableRecs.push(fillerItem);
        }
      }
    }
  }

  return availableRecs.slice(0, 3);
}

function renderBuildeoTab() {
  const container = document.getElementById("buildeo-grid-container");
  container.innerHTML = "";

  for (let i = 0; i < 6; i++) {
    const p = activeTeam[i];
    const card = document.createElement("div");
    card.className = "buildeo-card glass-card";
    card.setAttribute("data-slot", i);

    if (p) {
      const isMega = isMegaPokemon(p);
      const megaStoneId = isMega ? getMegaStoneIdForPokemon(p) : null;
      if (isMega && megaStoneId) {
        p.equippedItem = megaStoneId;
      }
      const equippedItemId = p.equippedItem;
      const equippedItem = COMPETITIVE_ITEMS.find(item => item.id === equippedItemId);

      const abilities = p.abilities || {};
      const selectedAbilityName = getPokemonActiveAbility(p);

      const recommended = getRecommendedItems(p, i);

      const stats = p.baseStats || { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 };

      let speedText = stats.spe;
      if (equippedItemId === "choice-scarf") {
        speedText = `${Math.floor(stats.spe * 1.5)} <span style="color: var(--accent-green); font-size: 0.65rem;">(+50% Pañuelo)</span>`;
      }

      let spdText = stats.spd;
      if (equippedItemId === "assault-vest") {
        spdText = `${Math.floor(stats.spd * 1.5)} <span style="color: var(--accent-green); font-size: 0.65rem;">(+50% Chaleco)</span>`;
      }

      let defText = stats.def;
      if (equippedItemId === "eviolite" && (p.evos && p.evos.length > 0 || p.tier === "NFE" || p.tier === "LC")) {
        defText = `${Math.floor(stats.def * 1.5)} <span style="color: var(--accent-green); font-size: 0.65rem;">(+50%)</span>`;
        spdText = `${Math.floor(stats.spd * 1.5)} <span style="color: var(--accent-green); font-size: 0.65rem;">(+50% Mineral)</span>`;
      }

      card.innerHTML = `
        <div class="buildeo-card-header">
          <div class="buildeo-poke-header-left">
            <img class="buildeo-poke-sprite" src="${getPokemonSpriteUrl(p)}" alt="${p.name}" onerror="handleImageError(this, '${p.key}')">
            <div class="buildeo-poke-info">
              <h3>${p.name}</h3>
              <div class="poke-types">
                ${getPokemonTypes(p).map(t => `<span class="type-badge type-${t.toLowerCase()}">${typeTranslations[t.toLowerCase()]}</span>`).join("")}
              </div>
            </div>
          </div>
        </div>
        
        <div class="buildeo-slider-viewport">
          <div class="buildeo-slider-track" style="transform: translateX(-${activeBuildeoTabSlide * 33.333}%); width: 300%;">
            
            <!-- DIAPOSITIVA 0: MOVIMIENTOS -->
            <div class="buildeo-slide" style="width: 33.333%;">
              <div class="buildeo-ability-section">
                <span class="buildeo-section-label">Movimientos Pokémon</span>
                <div class="buildeo-moves-list" style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.35rem; width: 100%; margin-top: 0.4rem;">
                  ${Array.from({ length: 4 }).map((_, moveIdx) => {
        const moveId = p.selectedMoves && p.selectedMoves[moveIdx];
        const moveName = moveId ? (MOVES_DB[moveId] || moveId) : "-- Seleccionar --";
        const selectedClass = moveId ? "selected" : "";
        const moveDesc = moveId ? (MOVES_DESC[moveId] || "Sin descripción disponible.") : "Selecciona un ataque para este slot.";
        return `
                      <button class="pcr-move-btn ${selectedClass}" onclick="openMovesModal(${i}, ${moveIdx})" title="${moveDesc}" style="width: 100%; text-align: left; display: flex; justify-content: space-between; align-items: center;">
                        <span>${moveName}</span>
                        <i data-lucide="chevron-right" style="width: 12px; height: 12px; opacity: 0.5;"></i>
                      </button>
                    `;
      }).join("")}
                </div>
              </div>
            </div>
            
            <!-- DIAPOSITIVA 1: HABILIDADES Y STATS -->
            <div class="buildeo-slide" style="width: 33.333%;">
              <div class="buildeo-stats">
                <div class="stat-item">
                  <span class="stat-label">PS</span>
                  <span class="stat-value">${stats.hp}</span>
                </div>
                <div class="stat-item">
                  <span class="stat-label">Atk</span>
                  <span class="stat-value">${stats.atk}</span>
                </div>
                <div class="stat-item">
                  <span class="stat-label">Def</span>
                  <span class="stat-value">${defText}</span>
                </div>
                <div class="stat-item">
                  <span class="stat-label">Atk Sp</span>
                  <span class="stat-value">${stats.spa}</span>
                </div>
                <div class="stat-item">
                  <span class="stat-label">Def Sp</span>
                  <span class="stat-value">${spdText}</span>
                </div>
                <div class="stat-item">
                  <span class="stat-label">Vel</span>
                  <span class="stat-value">${speedText}</span>
                </div>
              </div>
              
              <div class="buildeo-ability-section">
                <span class="buildeo-section-label">Habilidad</span>
                <div class="ability-selector-group">
                  ${Object.entries(abilities).map(([key, name]) => {
        const isActive = name === selectedAbilityName;
        const isHidden = key === "H";
        const esName = ABILITIES_DB[name] || name;
        return `
                      <button 
                        class="ability-badge-btn ${isActive ? "active" : ""}" 
                        data-ability-key="${key}"
                        onclick="selectAbility(${i}, '${key}')"
                      >
                        ${esName}${isHidden ? `<span class="ability-hidden-badge">Oculta</span>` : ""}
                      </button>
                    `;
      }).join("")}
                </div>
              </div>
            </div>
            
            <!-- DIAPOSITIVA 2: OBJETOS -->
            <div class="buildeo-slide" style="width: 33.333%;">
              <div class="buildeo-ability-section">
                <span class="buildeo-section-label">Objeto Equipado</span>
                ${isMega ? `
                  <div class="equipped-item-box filled mega-locked-box" onclick="showToast('${p.name} combate con su Megapiedra obligatoria', 'info')" style="cursor: default; border-color: rgba(99, 102, 241, 0.4); background: rgba(99, 102, 241, 0.08);">
                    <div class="item-slot-icon">
                      <img src="${equippedItem ? equippedItem.sprite : 'img/items/mega-ring.png'}" alt="" onerror="this.src='img/items/mega-ring.png'">
                    </div>
                    <div class="item-slot-info">
                      <div class="item-slot-name" style="display: flex; align-items: center; gap: 0.4rem;">
                        ${equippedItem ? equippedItem.name : 'Megapiedra'}
                        <span style="font-size: 0.65rem; background: var(--primary); color: #fff; padding: 0.1rem 0.35rem; border-radius: 4px; display: inline-flex; align-items: center; gap: 0.2rem;">
                          <i data-lucide="lock" style="width: 10px; height: 10px;"></i> Obligatorio
                        </span>
                      </div>
                      <div class="item-slot-desc">${equippedItem ? equippedItem.description : 'Objeto necesario para megaevolucionar en combate.'}</div>
                    </div>
                  </div>
                ` : equippedItem ? `
                  <div class="equipped-item-box filled" onclick="openItemModal(${i})">
                    <div class="item-slot-icon">
                      <img src="${equippedItem.sprite}" alt="" onerror="this.src='img/items/mega-ring.png'">
                    </div>
                    <div class="item-slot-info">
                      <div class="item-slot-name">${equippedItem.name}</div>
                      <div class="item-slot-desc">${equippedItem.description}</div>
                    </div>
                    <button class="btn-unequip-item" onclick="unequipItem(${i}, event)">
                      <i data-lucide="trash-2" style="width: 16px; height: 16px;"></i>
                    </button>
                  </div>
                ` : `
                  <div class="equipped-item-box" onclick="openItemModal(${i})">
                    <div class="item-slot-icon">
                      <i data-lucide="plus" style="width: 20px; height: 20px;"></i>
                    </div>
                    <div class="item-slot-info">
                      <div class="item-slot-name" style="color: var(--color-text-muted); font-weight: 500;">Sin Objeto</div>
                      <div class="item-slot-desc">Haz clic para equipar un objeto competitivo</div>
                    </div>
                  </div>
                `}
              </div>
              
              <div class="recommended-items-row">
                <span class="buildeo-section-label">Recomendados</span>
                <div class="rec-items-list">
                  ${isMega ? `
                    <div class="rec-item-badge active-mega-badge" style="cursor: default; background: rgba(99, 102, 241, 0.15); border-color: var(--primary);">
                      <img src="${equippedItem ? equippedItem.sprite : 'img/items/mega-ring.png'}" alt="" onerror="this.src='img/items/mega-ring.png'">
                      <span>${equippedItem ? equippedItem.name : 'Megapiedra'}</span>
                    </div>
                  ` : recommended.map(item => `
                    <div class="rec-item-badge" onclick="equipItem(${i}, '${item.id}')">
                      <img src="${item.sprite}" alt="" onerror="this.src='img/items/mega-ring.png'">
                      <span>${item.name.split(" ")[0]}</span>
                    </div>
                  `).join("")}
                </div>
              </div>
            </div>
            
          </div>
        </div>
      `;
    } else {
      card.innerHTML = `
        <div style="height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; color: var(--color-text-muted); min-height: 250px; border: 2px dashed rgba(255, 255, 255, 0.05); border-radius: var(--radius-lg); cursor: pointer;" onclick="switchTab('builder')">
          <i data-lucide="plus-circle" style="width: 40px; height: 40px; margin-bottom: 0.75rem; color: rgba(255, 255, 255, 0.2);"></i>
          <div style="font-family: var(--font-display); font-weight: 600;">Ranura vacía</div>
          <div style="font-size: 0.8rem; max-width: 200px; margin-top: 0.25rem;">Añade un Pokémon desde el Creador de Equipos</div>
        </div>
      `;
    }
    container.appendChild(card);
  }
  lucide.createIcons();
}



// --- VGC PRESET TEAMS PAGE SYSTEM ---

function renderPresetsPage(teamsList) {
  const container = document.getElementById("presets-page-container");
  if (!container) return;
  container.innerHTML = "";

  if (teamsList.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; color: var(--color-text-muted); padding: 2rem; font-style: italic;">
        No se encontraron plantillas coincidentes.
      </div>
    `;
    return;
  }

  teamsList.forEach(team => {
    const card = document.createElement("div");
    card.className = "preset-select-card";
    card.setAttribute("onclick", `loadPresetTeam('${team.id}')`);

    // Process mini sprites list
    const pokesHTML = team.pokemon.map(name => {
      const key = findPokedexKeyByName(name);
      let matchedData = POKEDEX[key];
      if (!matchedData) {
        matchedData = { name: name, key: name.toLowerCase().replace(/[^a-z0-9]/g, "") };
      } else {
        matchedData = { ...matchedData, key: key };
      }
      return `
        <div class="preset-poke-mini" title="${name}">
          <img src="${getPokemonSpriteUrl(matchedData)}" alt="${name}" onerror="handleImageError(this, '${matchedData.key}')">
          <span class="preset-poke-mini-name">${matchedData.name.split("-")[0]}</span>
        </div>
      `;
    }).join("");

    card.innerHTML = `
      <div class="preset-card-header">
        <span class="preset-card-title">${team.description}</span>
      </div>
      <div style="display: flex; justify-content: space-between; align-items: center; margin-top: -0.25rem;">
        <span class="preset-card-creator">Creador: <strong>${team.creator || "Desconocido"}</strong></span>
        ${team.pokepaste ? `<a href="${team.pokepaste}" target="_blank" onclick="event.stopPropagation()" style="font-size: 0.7rem; color: var(--color-text-highlight); text-decoration: none;">Pokepaste <i data-lucide="external-link" style="width: 10px; height: 10px; display: inline-block;"></i></a>` : ""}
      </div>
      <div class="preset-card-pokes">
        ${pokesHTML}
      </div>
    `;
    container.appendChild(card);
  });

  lucide.createIcons();
}

function filterPresetsPageResults() {
  const query = document.getElementById("presets-page-search-input").value.toLowerCase().trim();
  if (!query) {
    renderPresetsPage(PRESET_TEAMS);
    return;
  }

  const filtered = PRESET_TEAMS.filter(team => {
    const matchDesc = team.description.toLowerCase().includes(query);
    const matchCreator = team.creator.toLowerCase().includes(query);
    const matchPoke = team.pokemon.some(p => p.toLowerCase().includes(query));
    return matchDesc || matchCreator || matchPoke;
  });

  renderPresetsPage(filtered);
}

// --- SHOWDOWN TEXT / PASTE IMPORT SYSTEM ---

function openImportModal() {
  document.getElementById("import-modal").classList.add("active");
  document.getElementById("import-team-textarea").value = "";
  document.getElementById("import-team-textarea").focus();
}

function closeImportModal(event) {
  if (event) event.stopPropagation();
  document.getElementById("import-modal").classList.remove("active");
}

function parseShowdownPaste(pasteText) {
  if (!pasteText || !pasteText.trim()) return [];

  const pokemonBlocks = pasteText.split(/\n\s*\n/);
  const parsedTeam = [];

  for (const block of pokemonBlocks) {
    const lines = block.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    if (lines.length === 0) continue;

    let speciesName = "";
    let itemName = "";
    let abilityName = "";
    const moves = [];

    const firstLine = lines[0];
    const atSplit = firstLine.split('@');

    let namePart = atSplit[0].trim();
    if (atSplit.length > 1) {
      itemName = atSplit[1].trim();
    }

    const parenMatch = namePart.match(/\(([^)]+)\)/);
    if (parenMatch) {
      const inside = parenMatch[1].trim();
      if (inside === 'M' || inside === 'F') {
        speciesName = namePart.replace(/\((M|F)\)/, '').trim();
      } else {
        speciesName = inside;
      }
    } else {
      speciesName = namePart;
    }

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i];
      if (line.toLowerCase().startsWith('ability:')) {
        abilityName = line.replace(/ability:/i, '').trim();
      } else if (line.startsWith('-')) {
        const moveName = line.replace(/^-+\s*/, '').trim();
        if (moveName && moves.length < 4) {
          moves.push(moveName);
        }
      }
    }

    if (speciesName) {
      parsedTeam.push({
        speciesName,
        itemName,
        abilityName,
        moves
      });
    }
  }

  return parsedTeam;
}

function findMoveIdByName(moveNameStr) {
  if (!moveNameStr) return null;
  const clean = moveNameStr.toLowerCase().replace(/[^a-z0-9]/g, "");

  if (typeof MOVES_DB !== "undefined" && MOVES_DB[clean]) return clean;

  if (typeof MOVES_DB !== "undefined") {
    for (const [id, name] of Object.entries(MOVES_DB)) {
      const cleanDbName = name.toLowerCase().replace(/[^a-z0-9]/g, "");
      if (cleanDbName === clean || id === clean) {
        return id;
      }
    }
  }
  return clean;
}

function findItemKeyByName(itemStr) {
  if (!itemStr) return null;
  const clean = itemStr.toLowerCase().replace(/[^a-z0-9]/g, "");

  const found = COMPETITIVE_ITEMS.find(item => {
    const cleanId = item.id.toLowerCase().replace(/[^a-z0-9]/g, "");
    const cleanName = item.name.toLowerCase().replace(/[^a-z0-9]/g, "");
    return cleanId === clean || cleanName.includes(clean) || clean.includes(cleanId);
  });

  return found ? found.id : null;
}

function importTeamFromText() {
  const text = document.getElementById("import-team-textarea").value;
  const parsed = parseShowdownPaste(text);

  if (!parsed || parsed.length === 0) {
    showToast("No se detectaron Pokémon válidos en el texto", "error");
    return;
  }

  activeTeam = [null, null, null, null, null, null];
  let importedCount = 0;

  parsed.forEach((item, index) => {
    if (index >= 6) return;

    let key = findPokedexKeyByName(item.speciesName);

    // Check if item implies mega evolution
    if (item.itemName && (item.itemName.toLowerCase().includes("ite") || item.itemName.toLowerCase().includes("ita"))) {
      const cleanKey = key ? key.replace(/mega$/i, "") : "";
      if (cleanKey && POKEDEX[cleanKey + "mega"]) {
        key = cleanKey + "mega";
      }
    }

    if (key && POKEDEX[key]) {
      const dbPoke = POKEDEX[key];
      const isMega = isMegaPokemon(dbPoke);

      // Resolve item
      let equippedItem = null;
      if (isMega) {
        equippedItem = getMegaStoneIdForPokemon(dbPoke);
      } else if (item.itemName) {
        equippedItem = findItemKeyByName(item.itemName);
      }

      // Resolve ability
      let selectedAbility = dbPoke.abilities["0"] || dbPoke.abilities["H"] || "";
      if (item.abilityName && dbPoke.abilities) {
        const cleanAbility = item.abilityName.toLowerCase().replace(/[^a-z0-9]/g, "");
        for (const [aKey, aName] of Object.entries(dbPoke.abilities)) {
          const cleanAName = aName.toLowerCase().replace(/[^a-z0-9]/g, "");
          const cleanEsName = (typeof ABILITIES_DB !== "undefined" && ABILITIES_DB[aName] ? ABILITIES_DB[aName] : "").toLowerCase().replace(/[^a-z0-9]/g, "");
          if (cleanAName === cleanAbility || cleanEsName === cleanAbility || cleanAName.includes(cleanAbility)) {
            selectedAbility = aName;
            break;
          }
        }
      }

      // Resolve moves
      const learnset = getPokemonLearnset(key);
      const selectedMoves = [null, null, null, null];
      item.moves.forEach((mName, mIdx) => {
        if (mIdx < 4) {
          selectedMoves[mIdx] = findMoveIdByName(mName);
        }
      });
      for (let mIdx = 0; mIdx < 4; mIdx++) {
        if (!selectedMoves[mIdx]) {
          selectedMoves[mIdx] = learnset[mIdx] || null;
        }
      }

      activeTeam[index] = {
        ...dbPoke,
        key: key,
        selectedAbility: selectedAbility,
        equippedItem: equippedItem,
        selectedMoves: selectedMoves
      };
      importedCount++;
    }
  });

  if (importedCount > 0) {
    closeImportModal();
    saveTeamToLocalStorage();
    updateUI();
    showToast(`¡Se importaron ${importedCount} Pokémon con sus Movimientos, Habilidades y Objetos! 🚀`, "success");
  } else {
    showToast("No se pudo coincidir ningún Pokémon de la lista", "error");
  }
}

function loadPresetTeam(teamId) {
  const team = PRESET_TEAMS.find(t => t.id === teamId);
  if (!team) return;

  // Clear team
  activeTeam = [null, null, null, null, null, null];

  if (team.pokepasteText) {
    const parsed = parseShowdownPaste(team.pokepasteText);
    parsed.forEach((item, index) => {
      if (index >= 6) return;

      let key = findPokedexKeyByName(item.speciesName);
      if (item.itemName && (item.itemName.toLowerCase().includes("ite") || item.itemName.toLowerCase().includes("ita"))) {
        const cleanKey = key ? key.replace(/mega$/i, "") : "";
        if (cleanKey && POKEDEX[cleanKey + "mega"]) {
          key = cleanKey + "mega";
        }
      }

      if (key && POKEDEX[key]) {
        const dbPoke = POKEDEX[key];
        const isMega = isMegaPokemon(dbPoke);

        let equippedItem = isMega ? getMegaStoneIdForPokemon(dbPoke) : (findItemKeyByName(item.itemName) || null);

        let selectedAbility = dbPoke.abilities["0"] || dbPoke.abilities["H"] || "";
        if (item.abilityName && dbPoke.abilities) {
          const cleanAbility = item.abilityName.toLowerCase().replace(/[^a-z0-9]/g, "");
          for (const [aKey, aName] of Object.entries(dbPoke.abilities)) {
            const cleanAName = aName.toLowerCase().replace(/[^a-z0-9]/g, "");
            if (cleanAName === cleanAbility || cleanAName.includes(cleanAbility)) {
              selectedAbility = aName;
              break;
            }
          }
        }

        const learnset = getPokemonLearnset(key);
        const selectedMoves = [null, null, null, null];
        if (item.moves) {
          item.moves.forEach((mName, mIdx) => {
            if (mIdx < 4) {
              selectedMoves[mIdx] = findMoveIdByName(mName);
            }
          });
        }
        for (let mIdx = 0; mIdx < 4; mIdx++) {
          if (!selectedMoves[mIdx]) {
            selectedMoves[mIdx] = learnset[mIdx] || null;
          }
        }

        activeTeam[index] = {
          ...dbPoke,
          key: key,
          selectedAbility: selectedAbility,
          equippedItem: equippedItem,
          selectedMoves: selectedMoves
        };
      }
    });
  } else if (team.details && team.details.length > 0) {
    team.details.forEach((detail, index) => {
      if (index >= 6) return;
      const key = findPokedexKeyByName(detail.species);
      if (key && POKEDEX[key]) {
        const dbPoke = POKEDEX[key];
        const isMega = isMegaPokemon(dbPoke);

        let equippedItem = isMega ? getMegaStoneIdForPokemon(dbPoke) : (findItemKeyByName(detail.item) || null);

        let selectedAbility = dbPoke.abilities["0"] || dbPoke.abilities["H"] || "";
        if (detail.ability && dbPoke.abilities) {
          const cleanAbility = detail.ability.toLowerCase().replace(/[^a-z0-9]/g, "");
          for (const [aKey, aName] of Object.entries(dbPoke.abilities)) {
            const cleanAName = aName.toLowerCase().replace(/[^a-z0-9]/g, "");
            if (cleanAName === cleanAbility || cleanAName.includes(cleanAbility)) {
              selectedAbility = aName;
              break;
            }
          }
        }

        const learnset = getPokemonLearnset(key);
        const selectedMoves = [null, null, null, null];
        if (detail.moves) {
          detail.moves.forEach((mName, mIdx) => {
            if (mIdx < 4) {
              selectedMoves[mIdx] = findMoveIdByName(mName);
            }
          });
        }
        for (let mIdx = 0; mIdx < 4; mIdx++) {
          if (!selectedMoves[mIdx]) {
            selectedMoves[mIdx] = learnset[mIdx] || null;
          }
        }

        activeTeam[index] = {
          ...dbPoke,
          key: key,
          selectedAbility: selectedAbility,
          equippedItem: equippedItem,
          selectedMoves: selectedMoves
        };
      }
    });
  } else {
    // Fallback for presets without details array
    team.pokemon.forEach((name, index) => {
      if (index >= 6) return;
      const key = findPokedexKeyByName(name);
      if (key && POKEDEX[key]) {
        const dbPoke = POKEDEX[key];
        const isMega = isMegaPokemon(dbPoke);
        const megaStoneId = isMega ? getMegaStoneIdForPokemon(dbPoke) : null;
        const learnset = getPokemonLearnset(key);
        activeTeam[index] = {
          ...dbPoke,
          key: key,
          selectedAbility: dbPoke.abilities["0"] || dbPoke.abilities["H"] || "",
          equippedItem: megaStoneId || null,
          selectedMoves: [
            learnset[0] || null,
            learnset[1] || null,
            learnset[2] || null,
            learnset[3] || null
          ]
        };
      }
    });
  }

  saveTeamToLocalStorage();
  updateUI();
  switchTab('builder');
  showToast(`¡Equipo VGC de ${team.creator || "Creador"} cargado con sus Movimientos, Habilidades y Objetos! 🚀`, "success");
}

function findPokedexKeyByName(name) {
  if (!name) return null;
  let cleanName = name.toLowerCase().replace(/[^a-z0-9]/g, "");

  // Handle some common item megas names in sheets
  if (cleanName.endsWith("ite")) {
    cleanName = cleanName.slice(0, -3) + "mega";
  } else if (cleanName.endsWith("itey")) {
    cleanName = cleanName.slice(0, -4) + "megay";
  } else if (cleanName.endsWith("itex")) {
    cleanName = cleanName.slice(0, -4) + "megax";
  }

  // 1. Direct match key
  if (POKEDEX[cleanName]) return cleanName;

  // 2. Loose key match
  const foundKey = Object.keys(POKEDEX).find(k => k === cleanName || k.includes(cleanName) || cleanName.includes(k));
  if (foundKey) return foundKey;

  // 3. Match by p.name property
  const byName = Object.keys(POKEDEX).find(k => {
    const pName = POKEDEX[k].name.toLowerCase().replace(/[^a-z0-9]/g, "");
    return pName === cleanName || pName.includes(cleanName) || cleanName.includes(pName);
  });
  if (byName) return byName;

  return null;
}

function addSuggestedPokemon(slotIndex, key, event) {
  if (event) event.stopPropagation(); // Prevent modal opening trigger

  if (POKEDEX[key]) {
    const p = POKEDEX[key];
    let ability = "";
    if (p.abilities) {
      ability = p.abilities["0"] || p.abilities["H"] || "";
    }

    const learnset = getPokemonLearnset(key);
    activeTeam[slotIndex] = {
      ...p,
      key: key,
      selectedAbility: ability,
      equippedItem: null,
      selectedMoves: [
        learnset[0] || null,
        learnset[1] || null,
        learnset[2] || null,
        learnset[3] || null
      ]
    };

    saveTeamToLocalStorage();
    renderEmptySlots();
    runCoverageAnalysis();

    // Refresh buildeo tab if active
    if (document.getElementById("section-buildeo").classList.contains("active")) {
      renderBuildeoTab();
    }

    showToast(`¡${p.name} sugerido añadido al equipo! 🎯`, "success");
  }
}

// --- MOVES SELECTION MODAL SYSTEM ---
let currentMoveIndex = -1;

function openMovesModal(slotIndex, moveIndex) {
  currentSlotIndex = slotIndex;
  currentMoveIndex = moveIndex;

  const p = activeTeam[slotIndex];
  if (!p) return;

  const modal = document.getElementById("moves-modal");
  modal.classList.add("active");

  document.getElementById("move-search-input").value = "";
  document.getElementById("move-search-input").focus();

  // Reset move details card to placeholder state
  const placeholder = document.getElementById("move-info-placeholder");
  const details = document.getElementById("move-info-details");
  if (placeholder && details) {
    placeholder.classList.remove("hidden");
    details.classList.add("hidden");
  }

  renderMovesList();
}

function closeMovesModal(event) {
  document.getElementById("moves-modal").classList.remove("active");
}

function filterMovesResults() {
  renderMovesList();
}

function showMoveDetails(moveId) {
  const placeholder = document.getElementById("move-info-placeholder");
  const details = document.getElementById("move-info-details");

  const nameEl = document.getElementById("info-move-name");
  const typeEl = document.getElementById("info-move-type");
  const categoryEl = document.getElementById("info-move-category");
  const powerEl = document.getElementById("info-move-power");
  const descEl = document.getElementById("info-move-desc");

  if (!placeholder || !details || !nameEl || !typeEl || !categoryEl || !powerEl || !descEl) return;

  const moveName = MOVES_DB[moveId] || moveId;
  const info = MOVES_INFO[moveId] || { c: "Status", p: 0, t: "Normal" };
  const desc = MOVES_DESC[moveId] || "Sin descripción disponible.";

  nameEl.textContent = moveName;

  // Set type badge content and background class
  const typeLower = info.t.toLowerCase();
  typeEl.textContent = typeTranslations[typeLower] || info.t;
  typeEl.className = `type-badge type-${typeLower}`;

  // Translate category and set category badge style
  let categoryLabel = "Estado";
  let categoryClass = "category-status";
  if (info.c === "Physical") {
    categoryLabel = "Físico";
    categoryClass = "category-physical";
  } else if (info.c === "Special") {
    categoryLabel = "Especial";
    categoryClass = "category-special";
  }
  categoryEl.textContent = categoryLabel;
  categoryEl.className = `category-badge ${categoryClass}`;

  // Set power element
  if (info.p > 0) {
    powerEl.textContent = info.p;
  } else {
    powerEl.textContent = "--";
  }

  descEl.textContent = desc;

  placeholder.classList.add("hidden");
  details.classList.remove("hidden");
}

function renderMovesList() {
  const physicalList = document.getElementById("physical-moves-list");
  const specialList = document.getElementById("special-moves-list");
  const statusList = document.getElementById("status-moves-list");

  if (!physicalList || !specialList || !statusList) return;

  physicalList.innerHTML = "";
  specialList.innerHTML = "";
  statusList.innerHTML = "";

  const p = activeTeam[currentSlotIndex];
  if (!p) return;

  const query = document.getElementById("move-search-input").value.toLowerCase().trim();
  const learnset = getPokemonLearnset(p.key);

  // Map internal keys to display names and attributes
  let movesToShow = learnset.map(mid => {
    const info = MOVES_INFO[mid] || { c: "Status", p: 0, t: "Normal" };
    return {
      id: mid,
      name: MOVES_DB[mid] || mid,
      category: info.c, // "Physical", "Special", "Status"
      power: info.p || 0,
      type: info.t || "Normal"
    };
  });

  // Sort moves: highest damage (power) at the top, then alphabetically
  movesToShow.sort((a, b) => {
    if (b.power !== a.power) {
      return b.power - a.power;
    }
    return a.name.localeCompare(b.name);
  });

  // Filter by query
  if (query) {
    movesToShow = movesToShow.filter(m => m.name.toLowerCase().includes(query) || m.id.includes(query));
  }

  const physicalArr = [];
  const specialArr = [];
  const statusArr = [];

  movesToShow.forEach(m => {
    if (m.category === "Physical") {
      physicalArr.push(m);
    } else if (m.category === "Special") {
      specialArr.push(m);
    } else {
      statusArr.push(m);
    }
  });

  const renderColumn = (listContainer, arr, emptyText) => {
    if (arr.length === 0) {
      listContainer.innerHTML = `<div style="text-align: center; color: var(--color-text-muted); font-style: italic; padding: 1rem; font-size: 0.8rem;">${emptyText}</div>`;
      return;
    }

    arr.forEach(m => {
      const btn = document.createElement("button");
      btn.className = "move-select-option";
      btn.setAttribute("onclick", `selectMove('${m.id}')`);

      const nameSpan = document.createElement("span");
      nameSpan.textContent = m.name;
      btn.appendChild(nameSpan);

      if (m.power > 0) {
        const powerBadge = document.createElement("span");
        powerBadge.className = "move-power-badge";
        powerBadge.textContent = m.power;
        btn.appendChild(powerBadge);
      }

      // Update details card on hover
      btn.addEventListener("mouseenter", () => {
        showMoveDetails(m.id);
      });

      // Highlight if currently selected
      if (p.selectedMoves && p.selectedMoves[currentMoveIndex] === m.id) {
        btn.style.borderColor = "var(--primary)";
        btn.style.background = "rgba(56, 189, 248, 0.15)";
        btn.style.color = "var(--color-text-highlight)";
      }

      listContainer.appendChild(btn);
    });
  };

  renderColumn(physicalList, physicalArr, "Ninguno");
  renderColumn(specialList, specialArr, "Ninguno");
  renderColumn(statusList, statusArr, "Ninguno");
}

function selectMove(moveId) {
  if (currentSlotIndex < 0 || currentSlotIndex >= 6 || !activeTeam[currentSlotIndex]) return;

  const p = activeTeam[currentSlotIndex];
  if (!p.selectedMoves) {
    p.selectedMoves = [null, null, null, null];
  }

  p.selectedMoves[currentMoveIndex] = moveId;
  saveTeamToLocalStorage();
  updateUI();

  // Refresh buildeo tab if active
  if (document.getElementById("section-buildeo").classList.contains("active")) {
    renderBuildeoTab();
  }

  closeMovesModal();
  showToast(`Movimiento ${MOVES_DB[moveId] || moveId} seleccionado para ${p.name}.`, "success");
}

// --- VIRTUAL URN: SUGGEST MISSING POKEMON ---
async function submitMissingPokemon() {
  const input = document.getElementById("missing-pokemon-input");
  if (!input) return;
  const val = input.value.trim();
  if (!val) {
    showToast("Por favor escribe el nombre del Pokémon faltante", "error");
    return;
  }

  try {
    const response = await fetch("guardar_falta.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pokemon: val })
    });

    // Also save in localStorage as secondary backup
    const stored = JSON.parse(localStorage.getItem("faltantes_sugeridos") || "[]");
    stored.push({ pokemon: val, timestamp: new Date().toISOString() });
    localStorage.setItem("faltantes_sugeridos", JSON.stringify(stored));

    showToast(`¡Gracias! Sugerencia "${val}" registrada correctamente.`, "success");
    input.value = "";
  } catch (err) {
    // LocalStorage fallback if server is non-PHP
    const stored = JSON.parse(localStorage.getItem("faltantes_sugeridos") || "[]");
    stored.push({ pokemon: val, timestamp: new Date().toISOString() });
    localStorage.setItem("faltantes_sugeridos", JSON.stringify(stored));

    showToast(`¡Sugerencia "${val}" registrada correctamente!`, "success");
    input.value = "";
  }
}



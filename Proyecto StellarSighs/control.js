// Función asincrónica para obtener los sistemas solares desde una API sin restricciones de CORS
async function getSolarSystems(){ 
    
    try {
        const response = await fetch("https://api.le-systeme-solaire.net/rest/bodies/");
        const data = await response.json();

        // Filtramos solo estrellas o sistemas principales con nombre
        const systems = data.bodies.filter(body => !body.isPlanet && body.englishName);

        return systems.map(system => system.englishName); // Extraemos los nombres

    } catch (error) {
        console.log("Hubo un error al obtener los sistemas solares", error);
        return [];
    }
}

// Función para randomizar los sistemas solares obtenidos y asignarlos a los botones
async function showRandomSolarSystems(){
    console.time("Carga total")
    const solarSystems = await getSolarSystems();

    if (solarSystems.length === 0) return;

    const randomSystems = solarSystems.sort(() => Math.random() - 0.5).slice(0, 6); 

    const buttons = document.querySelectorAll(".button_s");
    randomSystems.forEach((system, index) => {
        if (buttons[index]){
            buttons[index].innerText = system.toUpperCase();
            buttons[index].setAttribute("system_data", system);
        }
    });
    console.timeEnd("Carga total");
}

showRandomSolarSystems();

require('dotenv').config();

const { leerInput, inquireMenu, inquirePausa, listarLugares } = require('./helpers/inquirer');
const Busquedas = require('./models/busquedas');




const main = async()  =>{

    const busquedas = new Busquedas(); 
    let opt;
    
    do {

        opt = await inquireMenu();

        switch(opt) {
            case 1:
                //Mostrar mensaje
                const termino = await leerInput('Ciudad:');
                
                //Buscar lugares
                const lugares = await busquedas.ciudad( termino );

                //Seeccionar el lugar
                const id = await listarLugares(lugares);
                if ( id === '0' ) continue;

                const lugarSel = lugares.find(l => l.id === id );

                //Guardar en DB
                busquedas.agregarHistorial( lugarSel.nombre );
                
                // Clima
                const clima = await busquedas.climaLugar(lugarSel.lat, lugarSel.lng);

                //Mostrar resultados
                console.clear();
                console.log('\nInformacion del lugar:\n'.green);
                console.log('Ciudad:', lugarSel.nombre.blue );
                console.log('Lat:', lugarSel.lat );
                console.log('Lng:', lugarSel.lng );
                console.log('Temperatura:', clima.temp );
                console.log('Mínima:', clima.min );
                console.log('Máxima:', clima.max );
                console.log('Como está el clima:', clima.desc.blue );

                break;

            case 2:
                busquedas.historialCapitalizado.forEach( (lugar, i) => {
                    const idx = `${i+1}.`.green;
                    console.log(`${idx} ${lugar}`);
                })
                break;
        }

        if ( opt !== 0 ) await inquirePausa();

    }while(opt !== 0)



}


main();
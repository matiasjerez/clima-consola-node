const inquirer = require('inquirer');
require('colors');

const preguntas=[
    {
        type: 'list',
        name: 'opcion',
        message: '¿Que desea hacer?',
        choices: [
            {
                value: 1,
                name: `${'1.'.blue} Buscar ciudad`
            },
            {
                value: 2,
                name: `${'2.'.blue} Historial`
            },
            {
                value: 0,
                name: `${'0.'.blue} Salir`
            }
        ]
    }
];


const inquirePausa = async ()=>{

    const opcionPausa=[
        {
            type: 'input',
            name: 'pausa',
            message: `Presione ${'ENTER'.blue} para continuar\n`,
        }
    ];

    console.log(`\n`);
    const { p } = await inquirer.prompt(opcionPausa);
    return p;
}

const inquireMenu = async()=>{
    console.clear();
    console.log('================================='.green);
    console.log('      Seleccione una opción      '.green);
    console.log('=================================\n'.green);

    const { opcion } = await inquirer.prompt(preguntas);
    
    return opcion;
}

const leerInput = async( message ) =>{

    const pregunta = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate( value ){
                if( value.length === 0  ){
                    return 'Por favor ingresa un valor';
                }
                return true;
            }
        }
    ]

    const {desc} = await inquirer.prompt(pregunta);
    return desc;
}

const listarLugares = async ( lugares = [] )=>{
    const choices = lugares.map( (lugar, i) => {
        const idx = `${i+1}.`.green;
        
        return {
            value: lugar.id,
            name: `${idx} ${lugar.nombre}`
        }
    });

    choices.unshift({
        value: '0',
        name: '0.'.green + ' Cancelar'
    });

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Seleccione lugar:',
            choices
        }
    ]

    const { id } = await inquirer.prompt(preguntas);
    
    return id;
}



const confirmar = async(message) => {

    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];

    const { ok } = await inquirer.prompt(question);
    return ok;
}

const mostrarListadoChecklist = async ( tareas = [] )=>{
    const choices = tareas.map( (tarea, i) => {
        
        const idx = `${i+1}.`.green;
        
        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`,
            checked: (tarea.completadoEn) ? true : false
        }
    });


    const pregunta = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selecciones',
            choices
        }
    ]

    const { ids } = await inquirer.prompt(pregunta);
    
    return ids;
}


module.exports = {
    inquireMenu,
    inquirePausa,
    leerInput,
    listarLugares,
    confirmar,
    mostrarListadoChecklist

}
//harckodeo de la base de datos de productos (estadios y shows)
const API_URL = "https://api.jsonbin.io/v3/b/6a4458b4f5f4af5e294a6036?meta=false ";

// const database = async function getDatabase() {
		
// 		try {
// 			const resp = await axios.get(API_URL);
		
// 			return resp.data;
// 		} catch (err) {
// 			throw err;
// 		}
// 	}()

// console.log(database.then((data) => console.log(data)));

// const baseDatosEstadios = database.then((data) => data);

// console.log(baseDatosEstadios);

// let baseDatosEstadios
let baseDatosEstadios = {}; // Inicializamos como un objeto vacío
axios.get(API_URL)
    .then(response => {
        // Al usar meta=false, response.data es DIRECTAMENTE tu Array de estadios
        const arrayOriginal = response.data; 

        // Aplicamos el reduce directo sobre el array limpio
        const estructuraDeseada = arrayOriginal.reduce((acumulador, item) => {
            acumulador[item.id] = item;
            return acumulador;
        }, {});

        console.log("Estructura limpia y transformada:", estructuraDeseada);
        
        // Pasas el objeto a tu lógica existente
       baseDatosEstadios = estructuraDeseada;
    })
    .catch(error => {
        console.error("Error al obtener los datos limpios:", error);
    });

console.log("baseDatosEstadios después de la transformación:", baseDatosEstadios);
// const baseDatosEstadios = {
//     "estadio-river": {
//         id: "estadio-river",
//         ubicacion: "Buenos Aires",
//         show: "Coldplay - Music of the Spheres Tour",
//         fechas: {
//             "2026-11-11": {
//                 dia: "11 de Noviembre",
//                 horario: "21:00 HS",
//                 sectores: {
//                     "platea-este": {
//                         nombre: "Platea Este",
//                         subSectores: {
//                             "vip": { nombre: "VIP Alta", precio: 150000, asientosDisponibles: 0 },
//                             "balcon": { nombre: "Balcón", precio: 120000, asientosDisponibles: 5 },
//                             "tribuna": { nombre: "Tribuna Baja", precio: 90000, asientosDisponibles: 80 }
//                         }
//                     }, "platea-oeste": {
//                         nombre: "Platea Oeste",
//                         subSectores: {
//                             "vip": { nombre: "VIP Alta", precio: 150000, asientosDisponibles: 45 },
//                             "balcon": { nombre: "Balcón", precio: 120000, asientosDisponibles: 20 },
//                             "tribuna": { nombre: "Tribuna Baja", precio: 90000, asientosDisponibles: 110 }
//                         }
//                     },
//                     "campo": {
//                         nombre: "Campo General",
//                         subSectores: {
//                             "general": { nombre: "Campo General", precio: 70000, asientosDisponibles: 250 }
//                         }
//                     }
//                 }
//             },
//             "2026-11-10": {
//                 dia: "10 de Noviembre",
//                 horario: "21:00 HS",
//                 sectores: {
//                     "platea-este": {
//                         nombre: "Platea Este",
//                         subSectores: {
//                             "vip": { nombre: "VIP Alta", precio: 150000, asientosDisponibles: 45 },
//                             "balcon": { nombre: "Balcón", precio: 120000, asientosDisponibles: 20 },
//                             "tribuna": { nombre: "Tribuna Baja", precio: 90000, asientosDisponibles: 110 }
//                         }
//                     },
//                     "platea-oeste": {
//                         nombre: "Platea Oeste",
//                         subSectores: {
//                             "vip": { nombre: "VIP Alta", precio: 150000, asientosDisponibles: 45 },
//                             "balcon": { nombre: "Balcón", precio: 120000, asientosDisponibles: 20 },
//                             "tribuna": { nombre: "Tribuna Baja", precio: 90000, asientosDisponibles: 110 }
//                         }
//                     },
//                     "campo": {
//                         nombre: "Campo General",
//                         subSectores: {
//                             "general": { nombre: "Campo General", precio: 70000, asientosDisponibles: 500 }
//                         }
//                     }
//                 }
//             }
//         }
//     },
//     "estadio-velez": {
//         id: "estadio-velez",
//         ubicacion: "Buenos Aires",
//         show: "Los Rolingas - Homenaje a los Rolling Stones",
//         fechas: {
//             "2026-10-25": {
//                 dia: "25 de Octubre",
//                 horario: "21:00 HS",
//                 sectores: {
//                     "platea-este": {
//                         nombre: "Platea Este",
//                         subSectores: {
//                             "vip": { nombre: "VIP Alta", precio: 150000, asientosDisponibles: 45 },
//                             "balcon": { nombre: "Balcón", precio: 120000, asientosDisponibles: 20 },
//                             "tribuna": { nombre: "Tribuna Baja", precio: 90000, asientosDisponibles: 110 }
//                         }
//                     },
//                     "platea-oeste": {
//                         nombre: "Platea Oeste",
//                         subSectores: {
//                             "vip": { nombre: "VIP Alta", precio: 150000, asientosDisponibles: 45 },
//                             "balcon": { nombre: "Balcón", precio: 120000, asientosDisponibles: 20 },
//                             "tribuna": { nombre: "Tribuna Baja", precio: 90000, asientosDisponibles: 110 }
//                         }
//                     },
//                     "campo": {
//                         nombre: "Campo General",
//                         subSectores: {
//                             "general": { nombre: "Campo General", precio: 70000, asientosDisponibles: 500 }
//                         }
//                     }
//                 }
//             }
//         }
//     },
//     "estadio-movistar": {
//         id: "estadio-movistar",
//         ubicacion: "Buenos Aires",
//         show: "Fake Queen - Tribute",
//         fechas: {
//             "2026-09-13": {
//                 dia: "13 de Septiembre",
//                 horario: "21:00 HS",
//                 sectores: {
//                     "platea-este": {
//                         nombre: "Platea Este",
//                         subSectores: {
//                             "vip": { nombre: "VIP Alta", precio: 150000, asientosDisponibles: 0 },
//                             "balcon": { nombre: "Balcón", precio: 120000, asientosDisponibles: 5 },
//                             "tribuna": { nombre: "Tribuna Baja", precio: 90000, asientosDisponibles: 80 }
//                         }
//                     }, "platea-oeste": {
//                         nombre: "Platea Oeste",
//                         subSectores: {
//                             "vip": { nombre: "VIP Alta", precio: 150000, asientosDisponibles: 45 },
//                             "balcon": { nombre: "Balcón", precio: 120000, asientosDisponibles: 20 },
//                             "tribuna": { nombre: "Tribuna Baja", precio: 90000, asientosDisponibles: 110 }
//                         }
//                     },
//                     "campo": {
//                         nombre: "Campo General",
//                         subSectores: {
//                             "general": { nombre: "Campo General", precio: 70000, asientosDisponibles: 250 }
//                         }
//                     }
//                 }
//             },
//             "2026-09-14": {
//                 dia: "14 de Septiembre",
//                 horario: "21:00 HS",
//                 sectores: {
//                     "platea-este": {
//                         nombre: "Platea Este",
//                         subSectores: {
//                             "vip": { nombre: "VIP Alta", precio: 150000, asientosDisponibles: 45 },
//                             "balcon": { nombre: "Balcón", precio: 120000, asientosDisponibles: 20 },
//                             "tribuna": { nombre: "Tribuna Baja", precio: 90000, asientosDisponibles: 110 }
//                         }
//                     },
//                     "platea-oeste": {
//                         nombre: "Platea Oeste",
//                         subSectores: {
//                             "vip": { nombre: "VIP Alta", precio: 150000, asientosDisponibles: 45 },
//                             "balcon": { nombre: "Balcón", precio: 120000, asientosDisponibles: 20 },
//                             "tribuna": { nombre: "Tribuna Baja", precio: 90000, asientosDisponibles: 110 }
//                         }
//                     },
//                     "campo": {
//                         nombre: "Campo General",
//                         subSectores: {
//                             "general": { nombre: "Campo General", precio: 70000, asientosDisponibles: 500 }
//                         }
//                     }
//                 }
//             }
//         }
//     },

// }

//harckodeo de la base de datos de productos (estadios y shows)
const baseDatosEstadios = {
    "estadio-river": {
        id: "estadio-river",
        ubicacion: "Buenos Aires",
        show: "Coldplay - Music of the Spheres Tour",
        fechas: {
            "2026-11-11": {
                dia: "11 de Noviembre",
                horario: "21:00 HS",
                sectores: {
                    "platea-este": {
                        nombre: "Platea Este",
                        subSectores: {
                            "vip": { nombre: "VIP Alta", precio: 150000, asientosDisponibles: 0 },
                            "balcon": { nombre: "Balcón", precio: 120000, asientosDisponibles: 5 },
                            "tribuna": { nombre: "Tribuna Baja", precio: 90000, asientosDisponibles: 80 }
                        }
                    }, "platea-oeste": {
                        nombre: "Platea Oeste",
                        subSectores: {
                            "vip": { nombre: "VIP Alta", precio: 150000, asientosDisponibles: 45 },
                            "balcon": { nombre: "Balcón", precio: 120000, asientosDisponibles: 20 },
                            "tribuna": { nombre: "Tribuna Baja", precio: 90000, asientosDisponibles: 110 }
                        }
                    },
                    "campo": {
                        nombre: "Campo General",
                        subSectores: {
                            "general": { nombre: "Campo General", precio: 70000, asientosDisponibles: 250 }
                        }
                    }
                }
            },
            "2026-11-10": {
                dia: "10 de Noviembre",
                horario: "21:00 HS",
                sectores: {
                    "platea-este": {
                        nombre: "Platea Este",
                        subSectores: {
                            "vip": { nombre: "VIP Alta", precio: 150000, asientosDisponibles: 45 },
                            "balcon": { nombre: "Balcón", precio: 120000, asientosDisponibles: 20 },
                            "tribuna": { nombre: "Tribuna Baja", precio: 90000, asientosDisponibles: 110 }
                        }
                    },
                    "platea-oeste": {
                        nombre: "Platea Oeste",
                        subSectores: {
                            "vip": { nombre: "VIP Alta", precio: 150000, asientosDisponibles: 45 },
                            "balcon": { nombre: "Balcón", precio: 120000, asientosDisponibles: 20 },
                            "tribuna": { nombre: "Tribuna Baja", precio: 90000, asientosDisponibles: 110 }
                        }
                    },
                    "campo": {
                        nombre: "Campo General",
                        subSectores: {
                            "general": { nombre: "Campo General", precio: 70000, asientosDisponibles: 500 }
                        }
                    }
                }
            }
        }
    },
    "estadio-velez": {
        id: "estadio-velez",
        ubicacion: "Buenos Aires",
        show: "Los Rolingas - Homenaje a los Rolling Stones",
        fechas: {
            "2026-10-25": {
                dia: "25 de Octubre",
                horario: "21:00 HS",
                sectores: {
                    "platea-este": {
                        nombre: "Platea Este",
                        subSectores: {
                            "vip": { nombre: "VIP Alta", precio: 150000, asientosDisponibles: 45 },
                            "balcon": { nombre: "Balcón", precio: 120000, asientosDisponibles: 20 },
                            "tribuna": { nombre: "Tribuna Baja", precio: 90000, asientosDisponibles: 110 }
                        }
                    },
                    "platea-oeste": {
                        nombre: "Platea Oeste",
                        subSectores: {
                            "vip": { nombre: "VIP Alta", precio: 150000, asientosDisponibles: 45 },
                            "balcon": { nombre: "Balcón", precio: 120000, asientosDisponibles: 20 },
                            "tribuna": { nombre: "Tribuna Baja", precio: 90000, asientosDisponibles: 110 }
                        }
                    },
                    "campo": {
                        nombre: "Campo General",
                        subSectores: {
                            "general": { nombre: "Campo General", precio: 70000, asientosDisponibles: 500 }
                        }
                    }
                }
            }
        }
    },
    "estadio-movistar": {
        id: "estadio-movistar",
        ubicacion: "Buenos Aires",
        show: "Fake Queen - Tribute",
        fechas: {
            "2026-09-13": {
                dia: "13 de Septiembre",
                horario: "21:00 HS",
                sectores: {
                    "platea-este": {
                        nombre: "Platea Este",
                        subSectores: {
                            "vip": { nombre: "VIP Alta", precio: 150000, asientosDisponibles: 0 },
                            "balcon": { nombre: "Balcón", precio: 120000, asientosDisponibles: 5 },
                            "tribuna": { nombre: "Tribuna Baja", precio: 90000, asientosDisponibles: 80 }
                        }
                    }, "platea-oeste": {
                        nombre: "Platea Oeste",
                        subSectores: {
                            "vip": { nombre: "VIP Alta", precio: 150000, asientosDisponibles: 45 },
                            "balcon": { nombre: "Balcón", precio: 120000, asientosDisponibles: 20 },
                            "tribuna": { nombre: "Tribuna Baja", precio: 90000, asientosDisponibles: 110 }
                        }
                    },
                    "campo": {
                        nombre: "Campo General",
                        subSectores: {
                            "general": { nombre: "Campo General", precio: 70000, asientosDisponibles: 250 }
                        }
                    }
                }
            },
            "2026-09-14": {
                dia: "14 de Septiembre",
                horario: "21:00 HS",
                sectores: {
                    "platea-este": {
                        nombre: "Platea Este",
                        subSectores: {
                            "vip": { nombre: "VIP Alta", precio: 150000, asientosDisponibles: 45 },
                            "balcon": { nombre: "Balcón", precio: 120000, asientosDisponibles: 20 },
                            "tribuna": { nombre: "Tribuna Baja", precio: 90000, asientosDisponibles: 110 }
                        }
                    },
                    "platea-oeste": {
                        nombre: "Platea Oeste",
                        subSectores: {
                            "vip": { nombre: "VIP Alta", precio: 150000, asientosDisponibles: 45 },
                            "balcon": { nombre: "Balcón", precio: 120000, asientosDisponibles: 20 },
                            "tribuna": { nombre: "Tribuna Baja", precio: 90000, asientosDisponibles: 110 }
                        }
                    },
                    "campo": {
                        nombre: "Campo General",
                        subSectores: {
                            "general": { nombre: "Campo General", precio: 70000, asientosDisponibles: 500 }
                        }
                    }
                }
            }
        }
    },

}

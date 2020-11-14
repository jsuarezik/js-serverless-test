'use strict';

const uuid = require('uuid')

module.exports.planet = ( data ) => {
   this.id = data.id || uuid.v1()
   this.clima = data.clima
   this.diametro = data.diametro
   this.gravedad = data.gravedad
   this.nombre =  data.nombre
   this.periodo_orbital = data.periodo_orbital
   this.poblacion = data.poblacion
   this.periodo_rotacion = data.periodo_rotacion
   this.superficie_agua = data.superficie_agua
   this.terreno = data.terreno
   this.url = `${process.env.GW_URL}/planets/${this.id}`
   this.residents = []
   this.creado = new Date().toDateString()
   this.actualizado = false
   
   return this
}

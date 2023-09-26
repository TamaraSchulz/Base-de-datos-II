from rpg import Entidad, Personaje, Enemigo, Habilidad
from typing import List

e = Entidad("Individuo", salud = 20, energia = 5, ataque_basico = 5)

hab = [ 
       Habilidad("danza espada"),
       Habilidad("aura férrica"),
       Habilidad("crescent moon"),
       Habilidad("slash")
]

p = Personaje("Heroe", salud= 100, energia=50, ataque_basico=20, habilidades=[])

e = Enemigo("Ogro", salud=100, energia= 70, ataque_basico= 35)

print("Entidades:")
print(p)
for habilidad in hab:
    print(habilidad)
print(e)

from dataclasses import dataclass, field
from typing import List


@dataclass
class Entidad:
    nombre: str
    salud: int
    energia: int
    salud_maxima: int
    energia_maxima: int 
    ataque_basico: int
    
    def __init__(self, nombre: str, salud: int, energia: int, ataque_basico: int) -> None:
        self.nombre: nombre
        self.salud: salud
        self.energia: energia
        self.salud_maxima: salud
        self.energia_maxima: energia
        self.ataque_basico: ataque_basico
        
    def __str__(self) -> str:
        return self.describir()
    
    def atacar(self, objetivo: "Personaje"|"Enemigo") -> None:
        if self.salud > 0:
            objetivo.salud -= self.ataque_basico
            objetivo.recibir_dano(self.ataque_basico)
            print(f"{self.nombre} hizo {self.ataque_basico} de daño a {objetivo.nombre}")
        else:
            print(f"{self.nombre} está muerto")
            
    def recibir_dano(self, daño: int) -> None:
        self.salud -= daño
        if self.salud <= 0:
            print(f"{self.nombre} murió")      
        
@dataclass
class Personaje(Entidad):
    habilidades: List[str] = field(default_factory=list)
    
    def __init__(self, nombre: str, salud: int, energia: int, ataque_basico: int, habilidades: list["Habilidad"] = []) ->None:
        super(). __init__(self, nombre, salud, energia, ataque_basico)
        self.habilidades: habilidades
        
    def aprender_habilidad(self, habilidad: "Habilidad") -> None:
        if len(self.habilidades) < 3:
            self.habilidades.append(habilidad)
            print(f"{self.nombre} acaba de aprender {habilidad.nombre}!!, tiene {len(self.habilidades)} habilidades")
        else:
            print(f"No se puede aprender {habilidad.nombre} ya posee 3 habilidades")
        
@dataclass
class Enemigo(Entidad):
    def __init__(self, nombre: str, salud: int, energia: int, ataque_basico: int) -> None:
        super(). __init__(self, nombre, salud, energia, ataque_basico)
        
@dataclass
class Habilidad:
    nombre: str
    ataque: int
    energia_requerida: int
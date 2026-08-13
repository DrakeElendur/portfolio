// El orden en el que se listan los casos en la portada.
//
// Por defecto `getCollection` los devuelve alfabéticamente por id, y eso
// dejaba primero el proyecto personal en curso y sepultaba los dos casos
// con impacto de negocio medible. El orden de un portafolio es una
// decisión editorial, no del sistema de archivos.
//
// La lista vive aquí, y no dentro de cada .md, porque las dos portadas
// (es/en) tienen que contar la misma historia: una copia por idioma se
// desincroniza en cuanto se añade o se reordena un caso, y el fallo no
// se ve — la página sigue funcionando, solo cuenta mal.
const orden = [
    "fryda-design-system",
    "nueva-maya",
    "nueva-incorporacion",
    "coloma-design-system",
];

/** El id viene con prefijo de idioma (`es/fryda-…`); el orden no depende de él. */
const posicion = (id: string) => {
    const slug = id.replace(/^(es|en)\//, "");
    const indice = orden.indexOf(slug);
    // Un caso nuevo que nadie haya añadido a la lista cae al final en vez
    // de colarse al principio por ser alfabéticamente afortunado.
    return indice === -1 ? orden.length : indice;
};

export const ordenarCasos = <T extends { id: string }>(casos: T[]) =>
    [...casos].sort((a, b) => posicion(a.id) - posicion(b.id));

// Equivalencias entre las dos versiones del sitio.
//
// Esto vivía dentro de Nav.astro, que era su único consumidor. Ahora lo
// necesitan dos: el conmutador de idioma y las etiquetas `hreflang` del
// <head>. Con la tabla duplicada, añadir una página nueva obligaría a
// acordarse de los dos sitios — y el que se olvide falla en silencio,
// porque un hreflang mal puesto no rompe nada visible.

const tabla: Record<string, string> = {
    "/": "/en",
    "/en": "/",
    "/sobre-mi": "/en/about",
    "/en/about": "/sobre-mi",
    "/contacto": "/en/contact",
    "/en/contact": "/contacto",
};

/** Quita la barra final. La raíz se queda como está. */
export const sinBarra = (ruta: string) =>
    ruta.length > 1 && ruta.endsWith("/") ? ruta.slice(0, -1) : ruta;

/** Pone la barra final: es el formato que ya publican el sitemap y og:url. */
const conBarra = (ruta: string) => (ruta === "/" ? "/" : sinBarra(ruta) + "/");

/**
 * Ruta equivalente en el otro idioma.
 *
 * Los casos de estudio no están en la tabla porque son dinámicos: se
 * traducen intercambiando el prefijo. Eso asume que cada caso existe en
 * ambos idiomas — hoy los cuatro lo cumplen.
 */
export function rutaAlterna(pathname: string, esIngles: boolean): string {
    const ruta = sinBarra(pathname);
    if (ruta in tabla) return conBarra(tabla[ruta]);
    if (ruta.includes("/casos")) {
        return conBarra(
            esIngles
                ? ruta.replace("/en/casos", "/casos")
                : ruta.replace("/casos", "/en/casos"),
        );
    }
    return conBarra(esIngles ? "/" : "/en");
}

---
title: Coloma Design System — un DS desde cero
image: "../../../assets/images/cover-coloma-ds.png"
summary: Mi sistema de diseño personal y open source. 155 design tokens en formato estándar DTCG (W3C), publicados en NPM como @coloma-design/tokens v0.1.0, más un visor en Web Components que los documenta y permite copiarlos con un clic. Escrito línea por línea, sin plantillas.
date: 2026 - Actualidad
tags:
    - Design Systems
    - Design Tokens
    - Open Source
    - Front-end
company: Proyecto personal
role: Creador — Diseño y desarrollo
tldr: |
    Después de liderar la tokenización de un design system corporativo, quise responder una pregunta incómoda: "¿cuánto de eso sé hacer yo, desde cero y solo?". Coloma Design System es mi respuesta. Un monorepo con dos entregables: un paquete de design tokens en formato estándar DTCG del W3C —con arquitectura de dos capas, primitivas y semánticas, conectadas por aliases— publicado en NPM bajo licencia MIT, y un visor web que aplana el JSON anidado, resuelve los aliases y documenta cada token en Web Components con Shadow DOM. Todo el JSON está escrito a mano: me propuse no exportar desde Figma para interiorizar el mecanismo de aliases, el concepto central de la capa semántica. Es mi banco de pruebas técnico y, al ser abierto, lo único de mi trabajo en sistemas de diseño que puedo enseñar completo.
---
## Por qué existe este proyecto

Todo mi trabajo en design systems vive dentro de una empresa, bajo acuerdos de confidencialidad. Eso plantea dos problemas: no puedo mostrar el código ni los componentes, y —más incómodo— es difícil demostrar cuánto del sistema es método propio y cuánto es contexto.

Coloma Design System nació para cerrar esa brecha. Es **100 % mío, abierto y demostrable**: cada decisión de arquitectura, cada token y cada línea de código son públicos y auditables.

> **La pregunta que me hice:** si me quitas el equipo, el presupuesto y la infraestructura de una corporación, ¿puedo construir un sistema de diseño correcto desde cero?

## Las decisiones de arquitectura

**Formato DTCG (W3C) desde el primer token.** Elegí el estándar del *Design Tokens Community Group* en lugar de un formato propio. Es la especificación que la industria está convergiendo a adoptar y la que consumen nativamente herramientas como Style Dictionary. Diseñar contra el estándar —y no contra una herramienta— es lo que hace portable un sistema.

**Dos capas: primitivas → semánticas.** Las primitivas guardan los valores crudos: ocho familias de color en OKLCH (con hex de respaldo), espaciado, tipografía —tamaños, pesos, interlineado y tracking—, radios, sombras y z-index. Las semánticas no contienen **ningún valor literal**: solo referencian primitivas mediante aliases. La regla que me impuse es simple y brutal: *si escribo un hexadecimal en la capa semántica, es que me falta una primitiva*. Esa disciplina es lo que permite que un cambio de marca se propague en cascada en lugar de convertirse en una búsqueda y reemplazo.

**Monorepo con npm workspaces.** Un paquete publicable (`tokens`) y una app desplegable (`token-viewer`), sin añadir herramientas de build que oscurezcan el concepto. Quería entender el *hoisting* y la resolución de dependencias, no configurarlos a ciegas.

**Web Components con Shadow DOM para el visor.** Podría haberlo hecho en un framework, pero elegí Custom Elements con Shadow DOM justamente porque el aislamiento de estilos es lo que hace que un componente de sistema funcione en cualquier stack. Es la mentalidad correcta para un design system: **agnóstico de framework por diseño, no por accidente**.

**Licencia MIT.** A diferencia de mi portafolio, este proyecto busca adopción. Si alguien quiere tomarlo, forkearlo o aprender de él, ese es el punto.

## La decisión más contraintuitiva: escribir el JSON a mano

Podría haber exportado los tokens desde Figma con un plugin en una tarde. Decidí no hacerlo, por dos razones:

1. **La mayoría de los exportadores resuelven los aliases a valores literales.** Eso destruye exactamente la capa semántica que da sentido al sistema: te deja con un JSON plano lleno de hexadecimales y sin intención.
2. **La transcripción manual no es trabajo perdido; es donde se interioriza el mecanismo.** Entender por qué `surface.feedback.success` apunta a `green.100` y no a `green.500` —el fondo de una alerta necesita el paso más claro para que el texto encima contraste— no se aprende leyendo un export.

La sincronización automatizada Figma → repositorio es un problema real y lo abordaré como proyecto propio. Pero primero quise dominar el formato, no la herramienta.

## Los retos técnicos del visor

**Aplanar una profundidad variable.** El visor consume los JSON anidados y necesita convertirlos en una lista plana. La profundidad no es fija: `spacing.8` son dos niveles, `color.primary.500` son tres y `color.surface.overlay.state-layer.hover` son cinco, así que recorrer con `map()` no alcanza. La solución es recorrer el objeto recursivamente y distinguir un token final de un grupo intermedio. El propio estándar da la pista: **un token final es el que declara `$value`**; todo lo demás es un grupo por el que hay que seguir bajando, acumulando la ruta y heredando el `$type` que el grupo declara.

**Resolver los aliases.** Un token semántico solo dice `{color.green.100}`. Para mostrar el color real, el visor busca cada referencia en la lista de primitivas ya aplanada y la sustituye por su valor y su tipo. Si una referencia no resuelve, el token se muestra tal cual: el error queda visible en vez de esconderse.

**Agrupar sin multiplicar componentes.** Los 155 tokens se agrupan por categoría con un `reduce` que lee el nivel de la ruta que corresponde: el primero en primitivas, el segundo en semánticas, porque todas empiezan por `color`. Un único Custom Element, `<token-swatch>`, decide cómo previsualizar cada token según su tipo: un color pinta una muestra, un espaciado dibuja un cuadrado a escala, una sombra la proyecta, un tamaño tipográfico renderiza texto.

**Copiar al portapapeles, y entender por fin la asincronía.** `navigator.clipboard.writeText()` devuelve una promesa, así que el clic tiene que esperar la confirmación del navegador antes de mostrar "¡Copiado!". Eso me obligó a responder tres preguntas que llevaba usando sin entender del todo: por qué la función debe ser `async`, qué pasa exactamente durante el `await`, y por qué un `try/catch` es la única forma de avisar al usuario si el permiso falla. Un detalle de UX que salió de probarlo: dos clics seguidos hacían que el temporizador del primer feedback borrara el segundo; se resuelve cancelando el anterior antes de programar el nuevo.

## Decisiones de sistema que no se ven en el JSON

- **Siete pasos, no nueve.** Cada familia de color tiene siete tonos. Menos variantes es menos costo de mantenimiento y menos tokens sin usar; si hace falta un octavo, se justifica cuando aparezca el caso.
- **Escalas distintas para problemas distintos.** El espaciado es escalonado: de 4 en 4 hasta 16 px, donde el ojo distingue diferencias finas, y de 8 en 8 hasta 64. La tipografía sí es modular, ratio 1.333, con los valores redondeados a 1/16 rem para que caigan en píxeles enteros.
- **Alpha sin función alpha.** DTCG no tiene una forma de decir "este color al 10 %". En vez de colar valores literales en la capa semántica, añadí dos familias primitivas, `dark_alpha` y `light_alpha`, con siete pasos de opacidad de negro y blanco puros. Alimentan los backdrops de modales y las capas de estado.
- **Un solo modelo de interacción.** Ningún token de acción tiene `hover` ni `pressed` propios. Los estados se logran superponiendo `surface.overlay.state-layer.hover` o `.pressed` sobre el color base, el patrón de *state layer* de Material. Un mecanismo para todo el sistema en vez de tres tokens por cada variante de cada rol.
- **OKLCH con red de seguridad.** Los colores se definen en OKLCH, con el hue corregido unos grados hacia los extremos de cada escala para compensar el corrimiento perceptual, y cada uno lleva su `hex` de respaldo para herramientas que aún no lo interpretan.

## Estado actual: v0.1.0 publicada

El alcance del primer proyecto está cerrado y mergeado a `main`:

- ✅ Monorepo con npm workspaces.
- ✅ 155 tokens en DTCG válido: 111 primitivas y 44 semánticas, todas por alias, ninguna con valor literal.
- ✅ Visor: aplanado recursivo, resolución de aliases, galería agrupada por categoría y copiado al portapapeles con feedback.
- ✅ READMEs del monorepo y del paquete.
- ✅ `@coloma-design/tokens` v0.1.0 publicado en NPM bajo licencia MIT.
- ⏳ Despliegue público del visor.

> [Repositorio en GitHub](https://github.com/DrakeElendur/Coloma-Design-System) · [Paquete en NPM](https://www.npmjs.com/package/@coloma-design/tokens)

**Lo que sigue.** Es un proyecto vivo. En el backlog: validación de contraste WCAG dentro del visor, la tercera capa de tokens (componente) junto con los primeros componentes, y el pipeline de transformación a CSS y JS con Style Dictionary, que abre la puerta al theming y a sincronizar desde Figma con criterio.

## Lo que me está enseñando

Construir un sistema pequeño y solo te obliga a justificar decisiones que en una corporación se toman por inercia o por herencia: por qué siete pasos de color y no nueve, por qué el espaciado va escalonado y la tipografía en ratio, qué criterio define los neutros. **La restricción es el mejor profesor de sistemas.**

Y hay un beneficio que no esperaba: cada concepto que aterrizo aquí —recursión, aislamiento de estilos, asincronía, versionado semántico, publicación— me hace mejor interlocutor con los equipos de desarrollo en mi trabajo. La brecha entre diseño e ingeniería se cierra construyendo, no explicando.

---
title: Coloma Design System — un DS desde cero
image: "../../../assets/images/cover-coloma-ds.png"
summary: Mi sistema de diseño personal y open source. Un paquete de design tokens en formato estándar DTCG (W3C) publicado en NPM, más un visor construido en Web Components que documenta y permite copiar cada token. Escrito línea por línea, sin plantillas.
date: 2026 - Present
tags:
    - Design Systems
    - Design Tokens
    - Open Source
    - Front-end
company: Proyecto personal
role: Creador — Diseño y desarrollo
tldr: Después de liderar la tokenización de un design system corporativo, quise responder una pregunta incómoda "¿cuánto de eso sé hacer yo, desde cero y solo?". Coloma Design System es mi respuesta. Un monorepo con dos entregables un paquete de design tokens en formato estándar DTCG del W3C —con arquitectura de dos capas, primitivas y semánticas, conectadas por aliases— publicado bajo licencia MIT, y un visor web que aplana el JSON anidado y documenta cada token en Web Components con Shadow DOM. Todo el JSON está escrito a mano, me propuse no usar Figma para interiorizar el mecanismo de aliases, y el concepto central de las capas semántica. Es mi banco de pruebas técnico y, al ser abierto, lo único de mi trabajo en Sistemas de Diseño que puedo enseñar completo.
---
## Por qué existe este proyecto

Todo mi trabajo en design systems vive dentro de una empresa, bajo acuerdos de confidencialidad. Eso plantea dos problemas: no puedo mostrar el código ni los componentes, y —más incómodo— es difícil demostrar cuánto del sistema es método propio y cuánto es contexto.

Coloma Design System nació para cerrar esa brecha. Es **100 % mío, abierto y demostrable**: cada decisión de arquitectura, cada token y cada línea de código son públicos y auditables.

> **La pregunta que me hice:** si me quitas el equipo, el presupuesto y la infraestructura de una corporación, ¿puedo construir un sistema de diseño correcto desde cero?

## Las decisiones de arquitectura

**Formato DTCG (W3C) desde el primer token.** Elegí el estándar del *Design Tokens Community Group* en lugar de un formato propio. Es la especificación que la industria está convergiendo a adoptar y la que consumen nativamente herramientas como Style Dictionary. Diseñar contra el estándar —y no contra una herramienta— es lo que hace portable un sistema.

**Dos capas: primitivas → semánticas.** Las primitivas guardan los valores crudos (escalas de color, espaciado, tipografía, radios, sombras). Las semánticas no contienen **ningún valor literal**: solo referencian primitivas mediante aliases. La regla que me impuse es simple y brutal: *si escribo un hexadecimal en la capa semántica, es que me falta una primitiva*. Esa disciplina es lo que permite que un cambio de marca se propague en cascada en lugar de convertirse en una búsqueda y reemplazo.

**Monorepo con npm workspaces.** Un paquete publicable (`tokens`) y una app desplegable (`token-viewer`), sin añadir herramientas de build que oscurezcan el concepto. Quería entender el *hoisting* y la resolución de dependencias, no configurarlos a ciegas.

**Web Components con Shadow DOM para el visor.** Podría haberlo hecho en un framework, pero elegí Custom Elements con Shadow DOM justamente porque el aislamiento de estilos es lo que hace que un componente de sistema funcione en cualquier stack. Es la mentalidad correcta para un design system: **agnóstico de framework por diseño, no por accidente**.

**Licencia MIT.** A diferencia de mi portafolio, este proyecto busca adopción. Si alguien quiere tomarlo, forkearlo o aprender de él, ese es el punto.

## La decisión más contraintuitiva: escribir el JSON a mano

Podría haber exportado los tokens desde Figma con un plugin en una tarde. Decidí no hacerlo, por dos razones:

1. **La mayoría de los exportadores resuelven los aliases a valores literales.** Eso destruye exactamente la capa semántica que da sentido al sistema: te deja con un JSON plano lleno de hexadecimales y sin intención.
2. **La transcripción manual no es trabajo perdido; es donde se interioriza el mecanismo.** Entender por qué `text.primary` apunta a `gray.900` y no al revés no se aprende leyendo un export.

La sincronización automatizada Figma → repositorio es un problema real y lo abordaré como proyecto propio. Pero primero quise dominar el formato, no la herramienta.

## El reto técnico: aplanar una profundidad variable

El visor consume los JSON anidados y necesita convertirlos en una lista plana de tokens. El problema no es trivial: la profundidad es variable —`color.blue.500` son tres niveles, `space.4` son dos— así que recorrer con `map()` no alcanza.

La solución pasa por recorrer el objeto recursivamente y distinguir un token final de un grupo intermedio. El propio estándar DTCG da la pista: **un token final es el que declara `$value`**; todo lo demás es un grupo por el que hay que seguir bajando, acumulando la ruta.

> [Repositorio en GitHub](https://github.com/DrakeElendur/Coloma-Design-System)

## Estado actual

Este es un proyecto vivo y lo documento en abierto conforme avanza:

- ✅ Monorepo con npm workspaces funcionando.
- ✅ Capa de primitivas y capa semántica en DTCG válido, conectadas por aliases.
- 🔄 Visor: aplanado de tokens y primer Web Component con Shadow DOM.
- 🔄 Galería agrupada por categoría y copiado al portapapeles.
- ⏳ Publicación del paquete en NPM y despliegue del visor.

> WORK IN PROGRESS

## Lo que estoy aprendiendo

Construir un sistema pequeño y solo te obliga a justificar decisiones que en una corporación se toman por inercia o por herencia: por qué nueve pasos de color y no cinco, por qué una escala modular y no lineal, qué criterio define los neutros. **La restricción es el mejor profesor de sistemas.**

Y hay un beneficio que no esperaba: cada concepto que aterrizo aquí —recursión, aislamiento de estilos, versionado, publicación— me hace mejor interlocutor con los equipos de desarrollo en mi trabajo. La brecha entre diseño e ingeniería se cierra construyendo, no explicando.

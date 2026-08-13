---
title: FrYDA Design System
image: "../../../assets/images/fryda-01.png"
summary: FrYDA (Framework de Yanbal para Diseño Atómico) es el sistema de diseño corporativo que unifica el diseño y el desarrollo de los productos digitales de Yanbal. Lo llevé de una librería visual a un pipeline tokenizado y gobernado 37 componentes en su segundo paquete NPM, con una reducción estimada de 30-40% en los tiempos de entrega y desarrollo.
date: 2025 - Actualidad
tags:
    - Design Systems
    - UX / UI
    - Front-end
    - Tokenization
company: Yanbal
role: Design System Manager & UI Lead
tldr: | 
    Después de 3 años construyendo Nueva MAYA y otros productos digitales, el orden que existía en Figma (UI Kit v0.2) no se trasladaba al desarrollo, cada equipo reconstruía su propia librería de componentes hardcodeados, lo que generaba inconsistencias visuales, QA largos y overwrites constantes. Lideré la transformación de ese UI Kit en FrYDA, un design system tokenizado de tres niveles (Primitive, Semantic, Functional) con ~1.785 tokens, gobernanza centralizada y un pipeline automatizado:
    Tokens Studio → Style Dictionary → Azure DevOps → NPM.
    Hoy FrYDA vive como paquete v1.5.0 con 37 componentes en Stencil.JS, ya adoptado por un nuevo producto y proyectado para acelerar el desarrollo entre 30 % y 40 % y reducir los tiempos de QA en cada equipo. En el camino pasé de diseñador visual/UX a líder de producto con criterio técnico y de negocio.
---
## El Problema

Yanbal llevaba 3 años desarrollando su nuevo sistema comercial, **Nueva MAYA**, junto a productos satélite como Pase de Pedido. MAYA ya tenía 2 años en producción, con mejoras visuales y nuevos features encima, y Pase de Pedido —aunque interconectado— funcionaba como una caja distinta.

El diseño vivía ordenado en Figma, pero ese orden se rompía al cruzar hacia desarrollo. El UI Kit v0.2 no era una fuente de verdad accionable: cada equipo de desarrollo tomaba los layouts y reconstruía, por su cuenta, una librería de componentes para su propio producto. Todos los átomos, moléculas y organismos terminaban *hardcodeados* y desalineados entre sí.

El costo era concreto y repetido:
- Inconsistencias visuales entre productos que compartían marca.
- Ciclos de QA visual largos para detectar y corregir esas diferencias.
- Overwrites constantes que multiplicaban el mantenimiento.

Empecé liderando el frente de UI del equipo de Diseño: gobernaba el UI Kit y me reunía con UIs y Product Designers para estandarizar componentes y features entre productos y equipos. Conforme el proyecto tomó forma y escala, mi rol evolucionó a Design System Manager + UI Lead, coordinando un equipo mixto Yanbal–Propelland de 9 personas a través de las disciplinas de diseño, tokens y desarrollo.

![Comparación de dos productos digitales de Yanbal y como a pesar de tener la misma fuente visual, fueron construidos con diferencias marcadas](../../../assets/images/header-comparison.png)

## El proceso

Estructuramos el proyecto en 4 fases a lo largo de ~25 semanas:
1. **Auditoría (4 semanas)**. Evaluamos el estado real del UI Kit en Figma, identificamos áreas de mejora y construimos un prototipo de pipeline para validar la viabilidad técnica antes de comprometer la inversión.
2. **Setup, estrategia y modelo de gobierno (3 semanas)**. Definimos guidelines de documentación, la estructura semántica y nomenclatura del sistema, el modelo de gobernanza, el plan de medición y el roadmap de tokenización.
3. **Diseño e implementación de tokens y pipelines (8 semanas)**. Diseñamos los tokens Foundation, Semantic y Component; tokenizamos los componentes; e inventariamos ilustraciones e iconos. El equipo Yanbal aplicó las mejoras en paralelo.
4. **Desarrollo de componentes y pipeline npm (10 semanas)**. Construimos los componentes en Stencil.JS y el pipeline de empaquetado y publicación como paquete npm.

## Decisiones clave de arquitectura

**Tres niveles de tokens (7 librerías): Primitive → Semantic → Functional**. Separar los tokens por nivel semántico y función permitió que el sistema escalara sin colisiones y que un cambio de marca se propagara por cascada. Se diseñó una nomenclatura propia `--fry-p-*`, `--fry-s-*`, `--fry-f-*` con alias en cascada entre niveles.

**Tokens Studio + Style Dictionary + Azure DevOps**. Elegimos Tokens Studio porque permite hacer gatekeeping de los cambios antes de que entren al repo de Azure DevOps; Style Dictionary traduce esos tokens en tres archivos —Foundation.css, Semantic.css y Component.css— listos para consumo en código.

**Modelo de gobernanza centralizado**. Yanbal es una marca única, sin marcas paraguas, y FrYDA se concibió para ser el estándar del 100 % de los productos digitales. Un modelo centralizado era la forma más eficiente de gobernar esa ambición.

## Los retos más duros

1. **Reformular la semántica heredada.** El UI Kit arrastraba errores de semántica y sintaxis: nombres de variantes y propiedades confusos que inducían a error. Adoptamos el principio de que toda variante debía nombrar su intención de uso y diseñamos los componentes para que el diseñador no pudiera equivocarse al aplicarlos. Esto obligó a reformular varias veces la semántica de color y a crear tokens nuevos de forma iterativa. El inventario y análisis de uso de componentes entre productos fue, además, un trabajo arduo.
2. **Angular en un mundo React.** El estándar de mercado es React, pero Yanbal exige Angular en todos sus productos. Buscamos la mejor solución técnica y elegimos Stencil.JS para generar web components agnósticos al framework. Angular sigue siendo un reto: ciertos protocolos del framework nos han llevado a ajustar configuraciones y formas de desarrollar componentes sobre la marcha.

![Botón primario para descargar](../../../assets/images/Button.png)

```html
<fry-button hierarchy="primary" mode="default" text="Descargar" icon-left="download-outline" type="button">Descargar</fry-button>
```


## Resultados e impacto

Hoy FrYDA es un **paquete npm v1.5.0 con 37 componentes funcionales** y documentación viva en Zeroheight que cubre foundations, componentes, accesibilidad (WCAG), UX Writing y gobernanza.

El primer producto que nace desde cero ya se construye íntegramente sobre FrYDA. Cuando entre a producción, MAYA adoptará todos los componentes que ese producto utilice, con un impacto proyectado de:
- 30–40 % menos tiempo de desarrollo por reutilización.
- QA visual más rápido y eficiente en cada equipo de producto.
- Una base única que elimina la reconstrucción de librerías por producto.

El resto de métricas se irán recabando conforme avance la adopción. La hoja de ruta de evolución contempla 10 componentes adicionales, mejoras a los actuales y la puesta en marcha de un modelo de contribución desde cada producto hacia el sistema.

## Lo que aprendí

>Este proyecto me sacó de mi faceta de Diseñador UX / UI y me conectó con la capa tecnológica del producto. Pasé de saber solo HTML y CSS a manejar JavaScript, Stencil.JS, Git/GitHub, pipelines y versionado, entendiendo de verdad cómo una decisión de diseño se vuelve código mantenible. 
>Igual de importante: pulí mi rol como líder de proyecto y producto, midiendo el impacto en el negocio y asegurando que cada céntimo y cada segundo invertidos en FrYDA tuvieran un retorno comercial real para Yanbal.
/* ============================================
  ALCANCE (SCOPE) Y HOISTING EN JAVASCRIPT
   ============================================ */

/* ====== TEORÍA BÁSICA ====== */

/*
  ¿QUÉ ES SCOPE (ALCANCE)?
  
  El scope define dónde una variable puede ser accedida en el código.
  Es como una "área permitida" para cada variable.
  
  Tipos de scope:
  1. GLOBAL SCOPE: Variables accesibles desde cualquier parte del código
  2. LOCAL SCOPE (Función): Variables que solo existen dentro de una función
  3. BLOCK SCOPE: Variables dentro de bloques {} (entre llaves)
  
  
  ¿QUÉ ES HOISTING?
  
  Hoisting es un comportamiento donde el intérprete de JavaScript "eleva"
  o "mueve" las declaraciones de variables y funciones al inicio del 
  scope correspondiente, PERO solo las DECLARACIONES, no las ASIGNACIONES.
  
  Esto significa que puedes referenciar variables antes de declararlas,
  pero obtendrás resultados inesperados.
  
  Nota: La palabra "hoisting" significa "izar" o "elevar".
  Nota: Cloures significa que las funciones internas pueden acceder a variables del scope externo y traducido es "cierres" o "envolturas".
*/


/* ====== TABLA COMPARATIVA DE var, let, const ====== */

/*
┌──────────┬──────────────┬──────────────┬────────────┬─────────────┐
│ Variable │ Scope        │ Redeclarable │ Hoisting   │ Recomendado │
├──────────┼──────────────┼──────────────┼────────────┼─────────────┤
│ var      │ Global/Func. │ SÍ           │ undefined  │ ❌ NO       │
│ let      │ Bloque       │ NO           │ TDZ        │ ✅ SÍ       │
│ const    │ Bloque       │ NO           │ TDZ        │ ✅ SÍ       │
└──────────┴──────────────┴──────────────┴────────────┴─────────────┘

EXPLICACIÓN:

VAR:
  - Scope: Global o Función (no respeta bloques)
  - Se puede redeclarar y reasignar
  - Hoisting: Se eleva pero se asigna como 'undefined'
  - Problema: Impredecible, puede sobrescribir variables accidentalmente

LET:
  - Scope: Bloque (respeta las llaves {})
  - NO se puede redeclarar (error si lo haces)
  - SÍ se puede reasignar
  - Hoisting: Se eleva pero está en "Temporal Dead Zone" (TDZ)
  - Ventaja: Más seguro y predecible que var

CONST:
  - Scope: Bloque (respeta las llaves {})
  - NO se puede redeclarar NI reasignar
  - Hoisting: Se eleva pero está en "Temporal Dead Zone" (TDZ)
  - Ventaja: Impide cambios accidentales, código más seguro
  - Nota: Los objetos/arrays const sí se pueden modificar internamente
*/


/* ====== EJEMPLOS PRÁCTICOS ====== */

console.log("\n╔════════════════════════════════════════════════════════╗");
console.log("║         EJEMPLO 1: SCOPE GLOBAL vs LOCAL               ║");
console.log("╚════════════════════════════════════════════════════════╝\n");

var globalVar = "Soy accesible desde cualquier lugar";

function ejemploGlobal() {
  console.log("Dentro de función: " + globalVar);
}

ejemploGlobal(); // ✅ "Soy accesible desde cualquier lugar"
console.log("Fuera de función: " + globalVar); // ✅ Accesible


function ejemploLocal() {
  var variableLocal = "Solo existo dentro de esta función";
  console.log("Dentro: " + variableLocal); // ✅ Funciona
}

ejemploLocal();
// console.log(variableLocal); // ❌ ERROR: variableLocal no está definida


console.log("\n╔════════════════════════════════════════════════════════╗");
console.log("║    EJEMPLO 2: var, let, const - Diferencia de Scope   ║");
console.log("╚════════════════════════════════════════════════════════╝\n");

console.log("--- Dentro de un bloque if ---");
if (true) {
  var miVar = "Soy var";
  let miLet = "Soy let";
  const miConst = "Soy const";

  console.log(miVar, miLet, miConst); // ✅ Todo funciona aquí
}

console.log("\n--- Fuera del bloque if ---");
console.log("var: " + miVar);        // ✅ "Soy var" (traspasa el bloque)
// console.log("let: " + miLet);      // ❌ ERROR: no está definida
// console.log("const: " + miConst);  // ❌ ERROR: no está definida

console.log("\nConclusion: var escapa del bloque, let y const NO");


console.log("\n╔════════════════════════════════════════════════════════╗");
console.log("║         EJEMPLO 3: HOISTING CON VAR                    ║");
console.log("╚════════════════════════════════════════════════════════╝\n");

console.log("¿Qué valor tiene 'numero' antes de declararse?");
console.log(numero); // undefined (NO error, eso es hoisting)

var numero = 42;
console.log("Ahora numero vale: " + numero); // 42

console.log("\nInternamente, el código se ejecuta así:");
console.log(`
  var numero;           // ← Se eleva solo la DECLARACIÓN
  console.log(numero);  // undefined (no tiene valor aún)
  numero = 42;          // ← Ahora se ASIGNA
  console.log(numero);  // 42
`);


console.log("\n╔════════════════════════════════════════════════════════╗");
console.log("║     EJEMPLO 4: HOISTING CON let y const (TDZ)         ║");
console.log("╚════════════════════════════════════════════════════════╝\n");

console.log("Intentamos acceder a 'texto' antes de declararlo con let:");
// console.log(texto); // ❌ ERROR: Cannot access before initialization
// La variable existe en el scope pero está en TDZ (Temporal Dead Zone)

let texto = "Ahora sí funciona";
console.log(texto); // ✅ "Ahora sí funciona"

console.log("\nExplicación:");
console.log(`
  TEMPORAL DEAD ZONE (TDZ)
  ↓↓↓ let/const creado ↓↓↓
  let texto;           // ← Variable creada pero no inicializada
  // NO puedes acceder aquí ❌
  ↑↑↑ Fin de TDZ ↑↑↑
  texto = "valor";     // ← Ahora está inicializada
  console.log(texto);  // ✅ Funciona
`);


console.log("\n╔════════════════════════════════════════════════════════╗");
console.log("║      EJEMPLO 5: HOISTING CON FUNCIONES                ║");
console.log("╚════════════════════════════════════════════════════════╝\n");

console.log("Llamamos a saludar() ANTES de declararla:");
saludar(); // ✅ Funciona perfecto

function saludar() {
  console.log("¡Hola! Las funciones se elevan COMPLETAMENTE");
}

console.log("\nPero las funciones expresadas NO se elevan:");
// presentarse(); // ❌ ERROR: presentarse is not a function
var presentarse = function () {
  console.log("Soy una función expresada");
};
presentarse(); // ✅ Ahora funciona


console.log("\n╔════════════════════════════════════════════════════════╗");
console.log("║    EJEMPLO 6: SCOPE ANIDADO (CLOSURES)               ║");
console.log("╚════════════════════════════════════════════════════════╝\n");

function funcionExterna() {
  var mensaje = "Mensaje de función externa";

  function funcionInterna() {
    console.log("Accediendo al scope externo: " + mensaje); // ✅ Funciona
  }

  return funcionInterna;
}

var miClosure = funcionExterna();
miClosure(); // ✅ "Accediendo al scope externo: Mensaje de función externa"

console.log("\nLas funciones internas acceden a variables del scope externo");
console.log("Esto se llama CLOSURE");


console.log("\n╔════════════════════════════════════════════════════════╗");
console.log("║    EJEMPLO 7: PARA ENTENDER EL ORDEN DE EJECUCIÓN    ║");
console.log("╚════════════════════════════════════════════════════════╝\n");

console.log("Step 1: Antes de declarar 'edad'");
console.log("edad =", edad); // undefined (hoisting de var)

var edad = 25;
console.log("\nStep 2: Después de asignar");
console.log("edad =", edad); // 25

function mostrarEdad() {
  console.log("\nStep 3: Dentro de la función");
  console.log("Primer console.log -> " + statusVar); // undefined (hoisting)
  var statusVar = "variable local";
  console.log("Segundo console.log -> " + statusVar); // "variable local"
}

mostrarEdad();


console.log("\n╔════════════════════════════════════════════════════════╗");
console.log("║    EJEMPLO 8: COMPARACIÓN var vs let vs const        ║");
console.log("╚════════════════════════════════════════════════════════╝\n");

console.log("--- Redeclaración ---");
var a = 1;
var a = 2; // ✅ Funciona con var
console.log("var a redeclarado: " + a); // 2

let b = 1;
// let b = 2; // ❌ ERROR: Identifier 'b' has already been declared

const c = 1;
// const c = 2; // ❌ ERROR: Identifier 'c' has already been declared

console.log("\n--- Reasignación ---");
var x = 10;
x = 20; // ✅ Funciona
console.log("var reasignado: " + x); // 20

let y = 10;
y = 20; // ✅ Funciona
console.log("let reasignado: " + y); // 20

const z = 10;
// z = 20; // ❌ ERROR: Assignment to constant variable

console.log("\n--- Con objetos y arrays (const) ---");
const usuario = { nombre: "Juan" };
usuario.nombre = "Carlos"; // ✅ Se puede modificar la propiedad
// usuario = {}; // ❌ No se puede reasignar

const numeros = [1, 2, 3];
numeros.push(4); // ✅ Se puede modificar el contenido
// numeros = []; // ❌ No se puede reasignar


console.log("\n╔════════════════════════════════════════════════════════╗");
console.log("║              CASOS CONFUSOS Y TRAMPAS                ║");
console.log("╚════════════════════════════════════════════════════════╝\n");

console.log("--- Trampa 1: var en bucles ---");
for (var i = 0; i < 3; i++) {
  // var escapa del bucle
}
console.log("i después del bucle: " + i); // ✅ 3 (¡sorpresa!)

for (let j = 0; j < 3; j++) {
  // let respeta el bucle
}
// console.log(j); // ❌ ERROR: j no existe

console.log("\n--- Trampa 2: Closures en bucles ---");
console.log("\nCon var (problema):");
var funciones_var = [];
for (var k = 0; k < 3; k++) {
  funciones_var.push(function () { return k; });
}
console.log(funciones_var[0]()); // 3 (¡no es 0!)
console.log(funciones_var[1]()); // 3 (¡no es 1!)
console.log("Razón: k es la misma variable para todas");

console.log("\nCon let (correcto):");
var funciones_let = [];
for (let m = 0; m < 3; m++) {
  funciones_let.push(function () { return m; });
}
console.log(funciones_let[0]()); // 0 ✅
console.log(funciones_let[1]()); // 1 ✅
console.log("Razón: cada iteración tiene su propio scope");


console.log("\n╔════════════════════════════════════════════════════════╗");
console.log("║                 RESUMEN Y RECOMENDACIÓN               ║");
console.log("╚════════════════════════════════════════════════════════╝\n");

console.log(`
✅ MEJORES PRÁCTICAS:

1. Usa CONST por defecto (para variables que no cambiarán)
  const miConstante = 42;

2. Usa LET cuando necesites reasignar
  let contador = 0;
  contador++;

3. EVITA VAR (causa problemas de scope impredecibles)
  // var antiguo = 1; ← No hagas esto

4. Declara variables al inicio del bloque donde las necesites
  let resultado;
  if (condicion) {
    resultado = valor;
  }

5. Entiende que el hoisting existe pero es impredecible
  No escribas código que dependa del hoisting

Resultado: Código más seguro, legible y predecible ✨
`);

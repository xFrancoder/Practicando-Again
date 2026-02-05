// Ejemplos de tipos de datos y declaraciones de variables
// Archivo: 1-Tipos de datos y variables.Js

// -----------------------------
// Primitivos
// -----------------------------
let indefinido; // undefined
let nulo = null; // null
let booleano = true; // Boolean
let numero = 42; // Number (enteros y flotantes)
let flotante = 3.14;
let enteroGrande = 9007199254740991n; // BigInt (nota: termina con n)
let cadena = "Hola, mundo"; // String
let simbolo = Symbol('id'); // Symbol (identificador único)

// -----------------------------
// Objetos y estructuras comunes
// -----------------------------
let objeto = { nombre: 'Ana', edad: 30 };
let arreglo = [1, 'dos', true];
function suma(a, b) { return a + b; } // Function
let fecha = new Date(); // Date
let expresionRegular = /hola/i; // RegExp
let mapa = new Map([['clave', 'valor']]); // Map
let conjunto = new Set([1, 2, 3]); // Set
let promesa = Promise.resolve('ok'); // Promise
let typed = new Uint8Array([1, 2, 3]); // TypedArray

// -----------------------------
// Declaraciones de variable
// -----------------------------
var v = 'soy var'; // function scope, hoisting, redeclarable
let l = 'soy let'; // block scope, no redeclarar en el mismo bloque
const c = 'soy const'; // block scope, referencia inmutable (pero su contenido puede mutar si es objeto)

// Ejemplos y comprobaciones
console.log('Valores primitivos y typeof:');
console.log({ indefinido, nulo, booleano, numero, flotante, enteroGrande, cadena, simbolo });
console.log('typeof nulo:', typeof nulo); // histórico: typeof null === 'object'
console.log('typeof simbolo:', typeof simbolo);

console.log('\nEstructuras y objetos:');
console.log('objeto:', objeto);
console.log('arreglo:', arreglo);
console.log('suma(2,3):', suma(2, 3));
console.log('fecha:', fecha.toISOString());
console.log('expresionRegular.test("HOLA"):', expresionRegular.test('HOLA'));
console.log('mapa:', Array.from(mapa.entries()));
console.log('conjunto:', Array.from(conjunto));
console.log('promesa (muestra asíncrona):');
promesa.then(v => console.log('  promesa result:', v));
console.log('typed array:', typed);

// Hoisting y scope (demostración breve)
var v = 'redeclaro var (válido)';
console.log('\nvar redeclarada:', v);

{
  let l = 'let en bloque';
  const c = 'const en bloque';
  console.log('let/c en bloque:', l, c);
}
// console.log(l); // daría error si descomentamos porque l está en scope de bloque

// Nota: JavaScript es de tipado dinámico; las variables pueden cambiar de tipo al reasignarlas.
numero = 'ahora soy cadena';
console.log('\nReasignación dinámica:', numero, typeof numero);

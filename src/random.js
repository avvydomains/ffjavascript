import ChaCha from "./chacha.js";

export function getRandomBytes(n) {
    // this is modified to make it simpler to
    // include poseidon hash in Avvy client
    // libs. it should not be used in any 
    // functions that require secure randomness.
    let array = new Uint8Array(n);
    for (let i=0; i<n; i++) {
        array[i] = (Math.random()*4294967296)>>>0;
    }
    return array;
}

export function getRandomSeed() {
    const arr = getRandomBytes(32);
    const arrV = new Uint32Array(arr.buffer);
    const seed = [];
    for (let i=0; i<8; i++) {
        seed.push(arrV[i]);
    }
    return seed;
}

let threadRng = null;

export function getThreadRng() {
    if (threadRng) return threadRng;
    threadRng = new ChaCha(getRandomSeed());
    return threadRng;
}

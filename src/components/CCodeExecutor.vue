<template>
  <div class="executor-container">
    <h1>C Code Executor</h1>
    <textarea v-model="code" placeholder="Write your C code here..."></textarea>
    <button @click="compileCode">Compile and Run</button>
    <pre v-if="output">{{ output }}</pre>
    <pre v-if="error" class="error">{{ error }}</pre>
  </div>
</template>

<script>
/* global Module */
export default {
  data() {
    return {
      code: '',
      output: '',
      error: '',
      wasmModule: null
    }
  },
  mounted() {
    this.loadWasm();
  },
  methods: {
    async loadWasm() {
        try {
            console.log('Loading WASM module...');
            const response = await fetch('/example.js');
            const jsCode = await response.text();
            eval(jsCode); // Execute the JavaScript code to load the WASM module

            // Wait for the module to be ready
            if (typeof Module === 'undefined') {
            throw new Error('Module is not defined after loading the WASM script.');
            }

            // If Module is a promise, wait for it to resolve
            if (Module instanceof Promise) {
            this.wasmModule = await Module;
            } else {
            this.wasmModule = Module();
            }

            console.log('WASM module initialized:', this.wasmModule);
            console.log('Available functions:', this.wasmModule.ccall); // Check if ccall is defined
        } catch (err) {
            this.error = 'Error loading WASM module: ' + err.message;
            console.error(err);
        }
    },
    compileCode() {
      this.output = '';
      this.error = '';

      try {
        // Call the C function from JavaScript
        const result = this.wasmModule.ccall('run_code', 'string', ['string'], [this.code]);
        this.output = result;
      } catch (err) {
        this.error = 'Error: ' + err.message;
        console.error(err);
      }
    }
  }
}
</script>

<style>
.executor-container {
  padding: 20px;
}

textarea {
  width: 100%;
  height: 200px;
}

.error {
  color: red;
}
</style> 
<template>
  <div class="page-container">
    <div class="code-share-container">
      <div class="editor-panel">
        <!-- Editor Header -->
        <div class="editor-header">
          <div class="file-info">
            <span class="file-name">main.c</span>
          </div>
          <div class="header-buttons">
            <button class="action-button" @click="runCode" :disabled="isRunning">
              <span class="button-text">{{ isRunning ? 'Running...' : 'Run Code' }}</span>
            </button>
          </div>
        </div>

        <!-- Code Editor -->
        <div class="editor-container" ref="editorContainer"></div>
      </div>

      <!-- Output Panel -->
      <div class="output-panel">
        <div class="output-header">
          <h3>Output</h3>
          <button class="clear-button" @click="clearOutput" :disabled="!output">
            Clear
          </button>
        </div>
        <div class="output-container">
          <pre class="output-content">{{ output }}</pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as monaco from 'monaco-editor';
import { onMounted, onBeforeUnmount, ref } from 'vue';

export default {
  name: 'CCodeShare',
  setup() {
    const editorContainer = ref(null);
    const output = ref('');
    const code = ref('#include <stdio.h>\n\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}');
    const isRunning = ref(false);
    let editor = null;

    onMounted(() => {
      editor = monaco.editor.create(editorContainer.value, {
        value: code.value,
        language: 'c',
        theme: 'vs-dark',
        automaticLayout: true,
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        lineNumbers: 'on',
        wordWrap: 'on',
        tabSize: 4,
        formatOnType: true,
        formatOnPaste: true,
        quickSuggestions: true,
        suggestOnTriggerCharacters: true,
        parameterHints: true,
      });

      // Add code completion
      monaco.languages.registerCompletionItemProvider('c', {
        provideCompletionItems: () => {
          return {
            suggestions: [
              {
                label: 'printf',
                kind: monaco.languages.CompletionItemKind.Function,
                insertText: 'printf(${1:"Hello, World!"});',
                insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                documentation: 'Prints formatted output',
              },
              {
                label: 'scanf',
                kind: monaco.languages.CompletionItemKind.Function,
                insertText: 'scanf(${1:"format"}, ${2:"&variable"});',
                insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                documentation: 'Reads formatted input',
              },
            ],
          };
        },
      });

      // Custom validation function
      const validateCode = () => {
        const model = editor.getModel();
        const lines = model.getLinesContent();
        const markers = [];

        // Simple validation: Check for unused variables and undefined variables
        lines.forEach((line, index) => {
          if (line.includes('unusedVariable')) {
            markers.push({
              severity: monaco.MarkerSeverity.Warning,
              startLineNumber: index + 1,
              startColumn: 1,
              endLineNumber: index + 1,
              endColumn: line.length + 1,
              message: 'Unused variable detected',
            });
          }
          if (line.includes('undefinedVariable')) {
            markers.push({
              severity: monaco.MarkerSeverity.Error,
              startLineNumber: index + 1,
              startColumn: 1,
              endLineNumber: index + 1,
              endColumn: line.length + 1,
              message: 'Undefined variable detected',
            });
          }
        });

        monaco.editor.setModelMarkers(model, 'owner', markers);
      };

      editor.onDidChangeModelContent(validateCode);
      validateCode(); // Initial validation
    });

    onBeforeUnmount(() => {
      if (editor) {
        editor.dispose();
      }
    });

    const runCode = async () => {
      if (isRunning.value) return;

      // Clear previous output and reset state
      clearOutput();
      code.value = editor.getValue(); // Get the current code from the editor

      try {
        isRunning.value = true;
        output.value = 'Running...\n';

        // Simulate code execution
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (code.value.includes('printf')) {
          const match = code.value.match(/printf\s*\(\s*"([^"]*)"/);
          if (match) {
            output.value = match[1].replace('\\n', '\n');
          } else {
            output.value = 'No output';
          }
        } else {
          output.value = 'No output';
        }
      } catch (error) {
        output.value = `Error: ${error.message}`;
      } finally {
        isRunning.value = false;
      }
    };

    const clearOutput = () => {
      output.value = '';
    };

    return {
      editorContainer,
      output,
      runCode,
      clearOutput,
      isRunning,
    };
  },
};
</script>

<style scoped>
/* Add your existing styles here */
.page-container {
  min-height: 100vh;
  padding-top: var(--navbar-height, 64px);
  box-sizing: border-box;
  background: #1e1e1e;
}

.code-share-container {
  display: flex;
  gap: 1.5rem;
  padding: 1.5rem;
  height: calc(100vh - var(--navbar-height, 64px));
  box-sizing: border-box;
}

.editor-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  background: #252526;
  border-radius: 8px;
  overflow: hidden;
}

.editor-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  background: #2d2d2d;
  border-bottom: 1px solid #3e3e3e;
}

.file-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.file-name {
  color: #d4d4d4;
  font-size: 0.9rem;
  font-family: monospace;
}

.header-buttons {
  display: flex;
  gap: 0.5rem;
}

.action-button {
  padding: 0.5rem 1rem;
  background: #0e639c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.2s;
}

.action-button:hover {
  background: #1177bb;
}

.action-button:disabled {
  background: #4d4d4d;
  cursor: not-allowed;
}

.editor-container {
  flex: 1;
  position: relative;
  padding: 0.5rem;
}

.output-panel {
  width: 350px;
  display: flex;
  flex-direction: column;
  background: #252526;
  border-radius: 8px;
  overflow: hidden;
}

.output-header {
  padding: 0.75rem 1rem;
  background: #2d2d2d;
  border-bottom: 1px solid #3e3e3e;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.output-header h3 {
  margin: 0;
  color: #d4d4d4;
  font-size: 1rem;
}

.clear-button {
  padding: 0.4rem 0.8rem;
  background: #4d4d4d;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.8rem;
  transition: background-color 0.2s;
}

.clear-button:hover {
  background: #666;
}

.clear-button:disabled {
  background: #333;
  cursor: not-allowed;
}

.output-container {
  flex: 1;
  padding: 0.5rem;
}

.output-content {
  height: 100%;
  margin: 0;
  padding: 1rem;
  color: #d4d4d4;
  font-family: 'Consolas', 'Monaco', monospace;
  font-size: 14px;
  line-height: 1.5;
  overflow-y: auto;
  white-space: pre-wrap;
  word-wrap: break-word;
  background: #1e1e1e;
  border-radius: 4px;
}
</style> 
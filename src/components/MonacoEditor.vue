<template>
  <div />
</template>

<script lang="ts">
import { Vue, Component, Prop, Model, Watch } from 'vue-property-decorator'
import * as monaco from 'monaco-editor'

@Component
export default class MonacoEditor extends Vue {
  @Model('change')
  value!: string
  @Prop({ default: 'vs' })
  theme!: string
  @Prop({ required: true })
  language!: string
  @Prop()
  readonly!: boolean

  editor!: monaco.editor.IStandaloneCodeEditor

  mounted() {
    this.initMonaco()
    this.$on('hook:beforeDestroy', () => {
      this.editor.dispose()
    })
  }

  initMonaco() {
    const options = {
      value: this.value,
      theme: this.theme,
      language: this.language,
      automaticLayout: true,
      readOnly: this.readonly
    }
    this.editor = monaco.editor.create(this.$el as any, options)
    this.$emit('editorDidMount', this.editor)
    this.editor.onContextMenu(ev => this.$emit('contextMenu', ev))
    this.editor.onDidBlurEditorText(() => this.$emit('blurText'))
    this.editor.onDidChangeConfiguration(ev => this.$emit('configuration', ev))
    this.editor.onDidChangeCursorPosition(ev => this.$emit('position', ev))
    this.editor.onDidChangeCursorSelection(ev => this.$emit('selection', ev))
    this.editor.onDidChangeModel(ev => this.$emit('model', ev))
    this.editor.onDidChangeModelContent(ev => {
      const value = this.editor.getValue()
      if (this.value !== value) {
        this.$emit('change', value, ev)
      }
    })
    this.editor.onDidChangeModelDecorations(ev => this.$emit('modelDecorations', ev))
    this.editor.onDidChangeModelLanguage(ev => this.$emit('modelLanguage', ev))
    this.editor.onDidChangeModelOptions(ev => this.$emit('modelOptions', ev))
    this.editor.onDidDispose(() => this.$emit('afterDispose'))
    this.editor.onDidFocusEditorText(() => this.$emit('focusText'))
    this.editor.onDidLayoutChange(ev => this.$emit('layout', ev))
    this.editor.onDidScrollChange(ev => this.$emit('scroll', ev))
    this.editor.onKeyDown(ev => this.$emit('keydown', ev))
    this.editor.onKeyUp(ev => this.$emit('keyup', ev))
    this.editor.onMouseDown(ev => this.$emit('mouseDown', ev))
    this.editor.onMouseLeave(ev => this.$emit('mouseLeave', ev))
    this.editor.onMouseMove(ev => this.$emit('mouseMove', ev))
    this.editor.onMouseUp(ev => this.$emit('mouseUp', ev))
  }

  getEditor() {
    return this.editor
  }

  focus() {
    this.editor.focus()
  }

  @Watch('value')
  onValueChanged(val: string) {
    if (val !== this.editor.getValue()) {
      this.editor.setValue(val)
    }
  }

  @Watch('language')
  onLanguageChanged(val: string) {
    const model = this.editor.getModel()
    if (model) {
      monaco.editor.setModelLanguage(model, val)
    }
  }

  @Watch('theme')
  onThemeChanged(val: string) {
    monaco.editor.setTheme(val)
  }

  @Watch('readonly')
  onReadonlyChanged(val: boolean) {
    this.editor.updateOptions({ readOnly: val })
  }
}
</script>

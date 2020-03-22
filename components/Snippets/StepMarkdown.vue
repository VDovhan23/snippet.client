<template>
  <div v-html="markdown">
  </div>
</template>

<script>
import hljs from 'highlight.js'

  let  markdown = require('markdown-it')({
    highlight(str, lang){

      let esc = markdown.utils.escapeHtml;
      if (lang && hljs.getLanguage(lang) ){
        return '<pre class="hljs language-'+ esc(lang.toLowerCase()) +'"><code>' + hljs.highlightAuto(esc(str)).value +'</code> </pre>'
      }

      return '<pre class="hljs"> <code>' + esc(str) +'</code> </pre>'
    }
  });

  export default {
    name: "StepMarkdown",
    props: {
      value: {
        type: String,
        required: true
      },
    },
    computed: {
      markdown() {
        return markdown.render(this.value)
      }
    }
  }
</script>

<style scoped>

</style>


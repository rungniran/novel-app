<template>
<div>
    <form @submit.prevent="generateURLs">
      <h2>Input</h2>
      <div class="form-group">
        <label for="url">URL</label>
        <input class="form-control" name="url" type="url" pattern="^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?" required v-model.trim="url">
      </div>
      <div class="form-group">
        <label for="url">Text</label>
        <input class="form-control" name="text" type="text" required v-model.trim="text">
      </div>
      <div class="form-group">
        <button class="btn btn-primary" type="submit">Generate</button>
      </div>
    </form>
    <h2>Output</h2>
    <div class="form-group">
      <label for="url">Facebook <a :href="facebookURL" target="_blank" rel="noopener noreferrer">Test</a></label>
      <input name="url" type="url" class="form-control" v-model="facebookURL">
    </div>
    <div class="form-group">
      <label for="url">Twitter <a :href="twitterURL" target="_blank" rel="noopener noreferrer">Test</a></label>
      <input name="text" type="text" class="form-control" v-model="twitterURL">
    </div>
    <div class="form-group">
      <label for="url">LinkedIn <a :href="linkedinURL" target="_blank" rel="noopener noreferrer">Test</a></label>
      <input name="text" type="text" class="form-control" v-model="linkedinURL">
    </div>
    </div>
</template>
    <script lang="ts">
    import Vue from 'vue'
   export default Vue.extend({
    name:"Coin",
    data() {
        return {
            url: '',
    text: '',
    facebookURL: '',
    twitterURL: '',
    linkedinURL: '',
    success: false,
 
    
        }
    },
  computed: {
    encodedURL():string {
      return encodeURIComponent(this.url);
    },
    encodedText():string  {
      return encodeURIComponent(this.text);
    }
  },
    methods: {
    generateURLs(event) {
      if (event.target.checkValidity()) {
        this.success = true;
        this.facebookURL =  'http://www.facebook.com/sharer/sharer.php?u=' + this.encodedURL + '&title=' + this.encodedText;
        this.twitterURL =  'https://twitter.com/intent/tweet?text=' + this.encodedText + '&url=' + this.encodedURL;
        this.linkedinURL = 'http://www.linkedin.com/shareArticle?mini=true&url=' + this.encodedURL + '&title=' + this.encodedText;
      }
    }
  }


})
    </script>
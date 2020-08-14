<template>
  <div class="bestcotainer">
    <div class="bg">
      <img src="../assets/myfoodsystembg.jpg" class="myfoodsystembg"/>
    </div>
    <div class="rescontent">
      <h1>Registed</h1>
      <div class="res_form">
        <b-form>
          <b-form-group label="username" label-for="userinput">
            <b-form-input id="userinput" placeholder="Enter username" required v-model="resmes.username"></b-form-input>
          </b-form-group>
          <b-form-group label="password" label-for="passinput">
            <b-form-input id="passinput" type="password" placeholder="Enter password" required v-model="resmes.password"></b-form-input>
          </b-form-group>
          <b-form-group label="telphone" label-for="telinput" >
            <b-input-group >
              <b-input-group-text slot="append">
                <strong>send</strong>
              </b-input-group-text>
              <b-form-input id="telinput" placeholder="Enter telphone" required v-model="resmes.telphone"></b-form-input>
            </b-input-group>
          </b-form-group>
          <b-form-group>
            <b-form-radio-group v-model="selected"
                                :options="options"
                                name="radioInline">
            </b-form-radio-group>
          </b-form-group>
          <b-form-group :style="{float:'right'}">
            <b-button variant="primary" @click="returnlogin">return</b-button>
            <b-button variant="primary" @click="gotologin">submit</b-button>
          </b-form-group>
        </b-form>

      </div>
    </div>

  </div>
</template>


<script src="../js/resindex.js"></script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style>
  /*引入外部样式*/
  @import "../css/resindex.css";
</style>


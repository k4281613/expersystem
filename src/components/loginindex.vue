<template>
  <div class="bestcotainer">
    <div class="bg"><img src="../assets/myfoodsystembg.jpg" class="myfoodsystembg"/></div>
    <div class="logincontent">
      <h1>{{logintopic}}</h1>
    <!-- 修改 -->
      <div class="login_form">
        <b-form @submit.prevent="gotoindex">
          <b-form-group label="username" label-for="userinput">
            <b-form-input id="userinput" placeholder="Enter username" required v-model="loginmes.username"></b-form-input>
          </b-form-group>
          <b-form-group label="passward" label-for="passinput">
            <b-form-input id="passinput" placeholder="Enter passward" required v-model="loginmes.userpass" type="password"></b-form-input>
          </b-form-group>
          <b-form-group>
          <b-form-checkbox value="me">Check me out</b-form-checkbox>
          </b-form-group>
          <b-form-group :style="{float:'right'}">
          <b-button type="submit" variant="primary">login</b-button>
          <b-button variant="primary" @click="gotores">registed</b-button>
          </b-form-group>
        </b-form>
      </div>
    </div>
  </div>
</template>


<script src="../js/loginindex.js"></script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
  /*引入外部样式*/
  @import "../css/loginindex.css";
</style>


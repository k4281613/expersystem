<template>
  <div id="aside">
    <ul class="ul">
      <li :class="activeIndex==index?activeIcon:''" v-for="(item,index) in imgItem" :key="index" @click="asideItem(index)">
        <p>
          <svg class="icon" aria-hidden="true">
            <use :xlink:href="item.iconSrc"></use>
          </svg>
        </p>
        <p>{{item.title}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgItem: [
        { iconSrc: "#icon-shouye-dh", title: "主页" },
        { iconSrc: "#icon-guanli", title: "管理" },
        { iconSrc: "#icon-kechengbiao", title: "选课" },
        { iconSrc: "#icon-shezhi", title: "设置" }
      ],
      activeIndex: 0,
      activeIcon: "active-aside"
    };
  },
  methods: {
    asideItem(index) {
      this.activeIndex = index;
      switch (index) {
        case 0:
          this.$router.push("/zhuye/");
          break;
        case 1:
          this.$router.push("/guanli");
          break;
        case 2:
          this.$router.push("/selectCourse");
          break;
        case 3:
          this.$router.push("/shezhi");
          break;
      }
    }
  }
};
</script>

<style lang='less'>
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
.ul {
  width: 100%;
  height: 100%;
  list-style: none;
  background: #f2f2f2;
  margin: 0;
  padding: 0;
  li {
    text-align: center;
    height: 6.25rem;
    line-height: 6.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    padding: 1.25rem 0;
    p:nth-of-type(1) {
      width: 4rem;
      height: 1.875rem;
      line-height: 1.875rem;
      margin: 0;
    }
    p:nth-of-type(2) {
      width: 4rem;
      height: 1.875rem;
      line-height: 1.875rem;
      margin: 0;
      font-size: 0.875rem;
    }
    &:hover {
      background: #d6d5d5;
      cursor: pointer;
    }
    svg {
      font-size: 1.875rem;
    }
  }
}
.active-aside {
  background: #d6d5d5;
}
</style>

<template>
  <transition name="contextmenu-submenu-fade">
    <div
      ref="menu"
      :class="[commonClass.menu, 'menu', customClass]"
      :style="{left: style.left + 'px', top: style.top + 'px', zIndex: style.zIndex}"
      v-if="visible"
      @contextmenu="(e)=>e.preventDefault()"
    >
      <div class="menu_body">
        <template v-for="(item,index) of items">
          <template v-if="!item.hidden">
            <div
              :class="[
                commonClass.menuItem, commonClass.unclickableMenuItem, 
                'menu_item', 'menu_item__disabled',
                item.divided?'menu_item__divided':null
              ]"
              :key="index"
              v-if="item.disabled"
            >
              <div class="menu_item_icon" v-if="hasIcon">
                <i :class="item.icon" v-if="item.icon"></i>
              </div>
              <span class="menu_item_label">{{item.label}}</span>
              <div class="menu_item_expand_icon"></div>
            </div>
            <div
              :class="[
                commonClass.menuItem, commonClass.unclickableMenuItem, 
                'menu_item', 'menu_item__available',
                activeSubmenu.index===index? 'menu_item_expand':null,
                item.divided?'menu_item__divided':null
              ]"
              :key="index"
              @mouseenter="($event)=>enterItem($event,item,index)"
              v-else-if="item.children"
            >
              <div class="menu_item_icon" v-if="hasIcon">
                <i :class="item.icon" v-if="item.icon"></i>
              </div>
              <span class="menu_item_label">{{item.label}}</span>
              <div class="menu_item_expand_icon">▶</div>
            </div>
            <div
              :class="[
                commonClass.menuItem, commonClass.clickableMenuItem, 
                'menu_item', 'menu_item__available',
                item.divided?'menu_item__divided':null
              ]"
              :key="index"
              @mouseenter="($event)=>enterItem($event,item,index)"
              @click="itemClick(item)"
              v-else
            >
              <div class="menu_item_icon" v-if="hasIcon">
                <i :class="item.icon" v-if="item.icon"></i>
              </div>
              <span class="menu_item_label">{{item.label}}</span>
              <div class="menu_item_expand_icon"></div>
            </div>
          </template>
        </template>
      </div>
    </div>
  </transition>
</template>

<script>
import Vue from "vue";
import {
  SUBMENU_X_OFFSET,
  SUBMENU_Y_OFFSET,
  SUBMENU_OPEN_TREND_LEFT,
  SUBMENU_OPEN_TREND_RIGHT,
  COMPONENT_NAME
} from "../constant";
export default {
  name: COMPONENT_NAME,
  data() {
    return {
      commonClass: {
        menu: null,
        menuItem: null,
        clickableMenuItem: null,
        unclickableMenuItem: null
      },
      activeSubmenu: {
        index: null,
        instance: null
      },
      items: [],
      position: {
        x: 0,
        y: 0,
        width: 0,
        height: 0
      },
      style: {
        left: 0,
        top: 0,
        zIndex: 2,
        minWidth: 150
      },
      customClass: null,
      visible: false,
      hasIcon: false,
      openTrend: SUBMENU_OPEN_TREND_RIGHT
    };
  },
  mounted() {
    this.visible = true;
    for (let item of this.items) {
      if (item.icon) {
        this.hasIcon = true;
        break;
      }
    }
    this.$nextTick(() => {
      const windowWidth = document.documentElement.clientWidth;
      const windowHeight = document.documentElement.clientHeight;
      const menu = this.$refs.menu;
      const menuWidth = menu.offsetWidth;
      const menuHeight = menu.offsetHeight;

      (this.openTrend === SUBMENU_OPEN_TREND_LEFT
        ? this.leftOpen
        : this.rightOpen)(windowWidth, windowHeight, menuWidth);

      this.style.top = this.position.y;
      if (this.position.y + menuHeight > windowHeight) {
        if (this.position.height === 0) {
          this.style.top = this.position.y - menuHeight;
        } else {
          this.style.top = windowHeight - menuHeight;
        }
      }
    });
  },
  methods: {
    leftOpen(windowWidth, windowHeight, menuWidth) {
      this.style.left = this.position.x - menuWidth;
      this.openTrend = SUBMENU_OPEN_TREND_LEFT;
      if (this.style.left < 0) {
        this.openTrend = SUBMENU_OPEN_TREND_RIGHT;
        if (this.position.width === 0) {
          this.style.left = 0;
        } else {
          this.style.left = this.position.x + this.position.width;
        }
      }
    },
    rightOpen(windowWidth, windowHeight, menuWidth) {
      this.style.left = this.position.x + this.position.width;
      this.openTrend = SUBMENU_OPEN_TREND_RIGHT;
      if (this.style.left + menuWidth > windowWidth) {
        this.openTrend = SUBMENU_OPEN_TREND_LEFT;
        if (this.position.width === 0) {
          this.style.left = windowWidth - menuWidth;
        } else {
          this.style.left = this.position.x - menuWidth;
        }
      }
    },
    enterItem(e, item, index) {
      if (!this.visible) {
        return;
      }
      if (this.activeSubmenu.instance) {
        if (this.activeSubmenu.index === index) {
          return;
        } else {
          this.activeSubmenu.instance.close();
          this.activeSubmenu.instance = null;
          this.activeSubmenu.index = null;
        }
      }
      if (!item.children) {
        return;
      }
      const menuItemClientRect = e.target.getBoundingClientRect();
      const SubmenuConstructor = Vue.component(COMPONENT_NAME);
      this.activeSubmenu.index = index;
      this.activeSubmenu.instance = new SubmenuConstructor();
      this.activeSubmenu.instance.items = item.children;
      this.activeSubmenu.instance.openTrend = this.openTrend;
      this.activeSubmenu.instance.commonClass = this.commonClass;
      this.activeSubmenu.instance.position = {
        x: menuItemClientRect.x + SUBMENU_X_OFFSET,
        y: menuItemClientRect.y + SUBMENU_Y_OFFSET,
        width: menuItemClientRect.width - 2 * SUBMENU_X_OFFSET,
        height: menuItemClientRect.width
      };
      this.activeSubmenu.instance.style.minWidth =
        typeof item.minWidth === "number" ? item.minWidth : this.style.minWidth;
      this.activeSubmenu.instance.style.zIndex = this.style.zIndex;
      this.activeSubmenu.instance.customClass =
        typeof item.customClass === "string"
          ? item.customClass
          : this.customClass;
      this.activeSubmenu.instance.$mount();
      document.body.appendChild(this.activeSubmenu.instance.$el);
    },
    itemClick(item) {
      if (!this.visible) {
        return;
      }
      if (
        item &&
        !item.disabled &&
        !item.hidden &&
        typeof item.onClick === "function"
      ) {
        return item.onClick();
      }
    },
    close() {
      this.visible = false;
      if (this.activeSubmenu.instance) {
        this.activeSubmenu.instance.close();
      }
      this.$nextTick(() => {
        this.$destroy();
      });
    }
  }
};
</script>

<style scoped>
.menu {
  height: 10px;
  width: 10px;
  position: fixed;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  background: rgba(0, 0, 0, 0);
  /* border-radius: 4px; */
  /* padding: 8px 0; */
}
.menu_body {
  display: block;
}
.menu_item {
  list-style: none;
  line-height: 60px;
  /* padding: 0 16px; */
  margin-bottom: 5px;
  margin-right: 10px;
  font-size: 14px;
  outline: 0;
  display: block;
  align-items: center;
  transition: 0.2s;
  border-bottom: 1px solid #00000000;

  height: 60px;
  width: 60px;
  border-radius: 50%;
  background: #cedbe6;
  text-align: center;
  position: relative;
  opacity:0.5;
}

.menu_item:first-child{
    /* position: absolute;
    top: -5px;
    left: 50px;  */
    top: -90px;
    left: -30px;
    margin: 8px 0;

    background-image: url("~@/assets/images/menu/return.png");
    background-size: 30px 30px;
    background-repeat: no-repeat;
    background-position: center;   
}

.menu_item:nth-child(2){
    /* position: absolute;
    top: -15px;
    left: 0px;  */
    top: -110px;
    left: -90px;

    background-image: url("~@/assets/images/menu/index.png");
    background-size: 30px 30px;
    background-repeat: no-repeat;
    background-position: center;  
}

.menu_item:nth-child(3){
    /* position: absolute;
    top: -80px;
    left: 100px;  */
    top: -175px;
    left: 30px; 

    background-image: url("~@/assets/images/menu/refresh.png");
    background-size: 30px 30px;
    background-repeat: no-repeat;
    background-position: center; 
}

.menu_item:nth-child(4){
    /* position: absolute;
    top: -90px;
    left: 50px;  */
    top: -195px;
    left: -30px;

    background-image: url("~@/assets/images/menu/cancel.png");
    background-size: 30px 30px;
    background-repeat: no-repeat;
    background-position: center;  
}


.menu_item__divided {
  border-bottom-color: #ebeef5;
}
.menu_item .menu_item_icon {
  margin-right: 8px;
  width: 13px;
}
.menu_item .menu_item_label {
  flex: 1;
}
.menu_item .menu_item_expand_icon {
  margin-left: 16px;
  font-size: 6px;
  width: 10px;
}
.menu_item__available {
  color: #fff;
  cursor: pointer;

  transition: all 0.6s;
}
.menu_item__available:hover {
  /* background: #ecf5ff;
  color: #409eff; */

  transform: scale(1.2);
  opacity:0.75;
}
.menu_item__disabled {
  color: #c0c4cc;
  cursor: not-allowed;
}
.menu_item_expand {
  background: #ecf5ff;
  color: #409eff;
}
</style>

<style>
.contextmenu-submenu-fade-enter-active,
.contextmenu-submenu-fade-leave-active {
  transition: opacity 0.1s;
}
.contextmenu-submenu-fade-enter,
.contextmenu-submenu-fade-leave-to {
  opacity: 0;
}
</style>
<template>
  <aside id="sidebar" class="left-sidebar col-sm-12 col-md-3">
    <h4 class="widget-title">購買花禮Online Shop</h4>
    <div class="tab-content">
      <div class="widget">
        <div class="widget_categories">
          <ul>
            <li v-for="(item, index) in uniqueCategories" :key="index">
              <a href="#" @click.prevent="filterByCategory(item)">
                {{ item }}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </aside>
</template>
<script>
export default {
  props: {
    uniqueCategories: Array,
    filterByCategory: Function
  }
}
</script>
<style>
.widget-title {
  border-bottom: 0.5px solid #ddd;
  padding: 20px 0px 20px 0px;
}

.widget_categories ul li {
  list-style-type: none;
  font-weight: 600;
  border: 1px solid #ddd; /* 添加一個淺灰色的邊線 */
  padding: 3px; /* 增加內部填充，使邊線不緊貼內容 */
  margin: 13px;
  margin-left: 0px;
  text-align: left;
}
.widget_categories ul li a {
  text-decoration: none; /* 去除 a 標籤的下劃線 */
  font-size: 15px;
  display: block;
  padding: 7px 10px 7px 25px;
  line-height: 24px;
  color: #777;
}
</style>

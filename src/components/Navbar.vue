<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
        <a class="navbar-brand" href="#">後台管理</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarText">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
            <!-- <a class="nav-link active" aria-current="page" href="#">Home</a>
            </li>
            <li class="nav-item"> -->
            <router-link class="nav-link" to="/dashboard/products">產品列表</router-link>
            </li>
            <li class="nav-item">
            <router-link class="nav-link" to="/dashboard/coupons">優惠券</router-link>
            </li>
            <li class="nav-item">
            <router-link class="nav-link" to="/dashboard/articles">文章管理</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/dashboard/orders">訂單</router-link>
            </li>
            <li class="nav-item">
            <a class="nav-link" href="#" @click.prevent="logout">登出</a>
            </li>
        </ul>
        <span class="navbar-text">
            Welcome!🖤
        </span>
        </div>
    </div>
  </nav>
</template>
<script>
export default {
  methods: {
    logout () {
      console.log('login')
      const api = `${process.env.VUE_APP_API}logout`
      console.log(api)
      this.$http.post(api, this.user)
        .then((res) => {
          if (res.data.success) {
            this.$router.push('/login')
          }
        })
    }
  }
}
</script>

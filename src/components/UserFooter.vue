<template>
    <div class="footer-separator"></div>

    <footer
      ref="section"
      class="footer"
    >
      <div class="footer-content pt-4 px-4 pb-3">
        <div class="row flex-column flex-xl-row">
          <div class="col-xl-10 d-flex flex-column mb-5 mb-xl-0">
            <router-link
              class="text-decoration-none align-self-start"
              to="/"
            >
              <h2 class="fs-4 fw-bold text-white mb-5 mb-xl-2 me-3">
                Zhuzh
              </h2>
              <hr class="custom-hr">
            </router-link>
            <p class="text-secondary fw-bold text-indent-n1 mb-0 ms-3 pb-2">
              © 2024. 版面設計修改自Sundia桑迪亞國際花藝，圖片來自於Sundia桑迪亞國際花藝。此網站為個人作品展示，非商業使用。
            </p>
          </div>
          <div class="col-xl-2 d-flex justify-content-xl-end">
          </div>
        </div>
      </div>
    </footer>
</template>

<style>
.footer-separator {
background-color: #ffffff; /* 設置白色背景 */
height: 40px; /* 設置區域的高度，根據需求調整 */
width: 100%; /* 占滿全寬 */
}
.footer {
  width: 100%; /* 確保 footer 占滿全寬 */
  padding-left: 0; /* 移除左右填充 */
  padding-right: 0;
  box-sizing: border-box; /* 確保填充和邊框計算在內 */
  background-color: #b8b0b0;
}
.footer-content {
  max-width: 100%; /* 確保內容占滿全寬 */
  margin: 0 auto; /* 居中對齊內容 */
  padding-left: 15px; /* 可選的內部填充 */
  padding-right: 15px; /* 可選的內部填充 */
}
.custom-hr {
  color: white;
  height: 2px;
}
</style>

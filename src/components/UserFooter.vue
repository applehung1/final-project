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
              <h6 class="fw-bold text-white">
                Zhuzh
              </h6>
              <hr class="custom-hr">
            </router-link>
            <ul class="information">
                <li><i class="bi bi-geo-alt-fill"></i> 台北市大安區大安路一段31巷26號1樓</li>
                <li><i class="bi bi-phone-fill"></i> (02)2731-2821</li>
                <li><i class="bi bi-envelope-open-fill"></i> sundiaflower@gmail.com</li>
                <li><i class="bi bi-clock-fill"></i> 星期一至星期六 11:00 a.m – 08:00 p.m. 星期天 11:00 a.m – 06:00 p.m.</li>
            </ul>
            <p class="text-white" style="text-align: center;">
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
.information li {
  color: white;
  font-size: 14px;
  list-style-type: none;
}
</style>

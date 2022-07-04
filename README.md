

## Chức năng

- Xem thông tin brand (logo, cover)
- Banners quảng cáo
- Danh mục sản phẩm
- Thông tin sản phẩm
- Sắp xếp và lọc sản phẩm
- Tìm kiếm sản phẩm
- Mua và thanh toán sản phẩm thông qua Tiki

<br/>

## Hướng dẫn cài đặt

Trước hết, vui lòng tải về [Tini Studio](https://developers.tiki.vn/downloads) để chỉnh sửa cũng như khởi chạy template.

### Cài đặt

1. Từ menu của Tini Studio chọn `File --> New Project --> Ở mục Template chọn Brand`. Hoặc có thể clone trực tiếp repo này về và mở bằng Tini Studio.

2. Cài đặt các packages

   ```sh
   yarn
   ```

3. Thay thế các thông số của brand tại file `app.js`
   ```js
   brandName: <your_brand_name>;
   brandLogo: <your_brand_name>;
   brandCover: <your_brand_name>;
   ```
4. Mở simulator và xem thành quả.

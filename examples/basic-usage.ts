/**
 * Ví dụ sử dụng cơ bản Miniappify SDK
 */

import { MiniappifySDK } from "../src";

// Khởi tạo SDK
const sdk = new MiniappifySDK({
  apiKey: "your-api-key-here",
  baseUrl: "https://merchant-api.miniappify.vn",
});

async function example() {
  try {
    // 1. Kiểm tra kết nối
    const isConnected = await sdk.ping();
    console.log("Kết nối API:", isConnected ? "Thành công" : "Thất bại");

    // 2. Lấy thông tin shop
    const shopInfo = await sdk.shop.getMe();
    console.log("Thông tin shop:", shopInfo);

    // 3. Lấy danh sách sản phẩm
    const products = await sdk.products.list({ page: 1, limit: 10 });
    console.log("Danh sách sản phẩm:", products);

    // 4. Tạo sản phẩm mới
    const newProduct = await sdk.products.create({
      name: "Sản phẩm demo",
      description: "Mô tả sản phẩm demo",
      variants: [
        {
          sku: "DEMO001",
          price: 100000,
          stock: 50,
          attributes: [
            {
              name: "color",
              value: "red",
              displayName: "Màu đỏ",
            },
          ],
        },
      ],
    });
    console.log("Sản phẩm mới:", newProduct);

    // 5. Lấy danh sách danh mục
    const categories = await sdk.categories.list();
    console.log("Danh sách danh mục:", categories);

    // 6. Tạo danh mục mới
    const newCategory = await sdk.categories.create({
      name: "Danh mục demo",
      description: "Mô tả danh mục demo",
      color: "#FF5733",
      icon: "shopping-bag",
    });
    console.log("Danh mục mới:", newCategory);

    // 7. Lấy danh sách đơn hàng
    const orders = await sdk.orders.list({ page: 1, limit: 10 });
    console.log("Danh sách đơn hàng:", orders);

    // 8. Tạo đơn hàng mới
    const newOrder = await sdk.orders.create({
      customerName: "Nguyễn Văn A",
      customerPhone: "0123456789",
      customerEmail: "customer@example.com",
      customerAddress: "123 Đường ABC, Quận 1, TP.HCM",
      totalAmount: 150000,
      products: [
        {
          productId: newProduct.id,
          productName: newProduct.name,
          quantity: 2,
          price: 75000,
          total: 150000,
        },
      ],
    });
    console.log("Đơn hàng mới:", newOrder);

    // 9. Lấy danh sách người dùng
    const users = await sdk.users.list({ page: 1, limit: 10 });
    console.log("Danh sách người dùng:", users);
  } catch (error) {
    console.error("Lỗi:", error);
  }
}

// Chạy ví dụ
example();

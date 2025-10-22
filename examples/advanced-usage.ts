/**
 * Ví dụ sử dụng nâng cao Miniappify SDK
 */

import { MiniappifySDK, MiniappifyError } from "../src";

// Khởi tạo SDK với cấu hình nâng cao
const sdk = new MiniappifySDK({
  apiKey: "your-api-key-here",
  baseUrl: "https://merchant-api.miniappify.vn",
  timeout: 60000, // 60 giây
});

async function advancedExample() {
  try {
    // 1. Xử lý lỗi với try-catch
    try {
      const product = await sdk.products.getById("invalid-id");
    } catch (error) {
      if (error instanceof MiniappifyError) {
        console.log("Mã lỗi:", error.code);
        console.log("Thông báo lỗi:", error.message);
        console.log("HTTP status:", error.status);
      }
    }

    // 2. Tìm kiếm sản phẩm với nhiều tiêu chí
    const searchResults = await sdk.products.search("iPhone", {
      page: 1,
      limit: 20,
      sortBy: "price",
      sortOrder: "asc",
    });
    console.log("Kết quả tìm kiếm:", searchResults);

    // 3. Lấy sản phẩm theo danh mục
    const categoryProducts = await sdk.products.getByCategory("category-id", {
      page: 1,
      limit: 10,
    });
    console.log("Sản phẩm theo danh mục:", categoryProducts);

    // 4. Lấy sản phẩm nổi bật
    const featuredProducts = await sdk.products.getFeatured({
      page: 1,
      limit: 5,
    });
    console.log("Sản phẩm nổi bật:", featuredProducts);

    // 5. Quản lý đơn hàng với workflow
    const orders = await sdk.orders.list({ status: "pending" });

    for (const order of orders.orders) {
      console.log(`Xử lý đơn hàng ${order.id}:`);

      // Xác nhận đơn hàng
      const confirmedOrder = await sdk.orders.confirm(order.id);
      console.log("Đã xác nhận:", confirmedOrder.status);

      // Giả lập giao hàng
      setTimeout(async () => {
        const deliveredOrder = await sdk.orders.deliver(order.id);
        console.log("Đã giao hàng:", deliveredOrder.status);
      }, 5000);
    }

    // 6. Quản lý danh mục với batch operations
    const categories = await sdk.categories.list();

    // Kích hoạt tất cả danh mục
    for (const category of categories.categories) {
      if (!category.isActive) {
        await sdk.categories.activate(category.id);
        console.log(`Đã kích hoạt danh mục: ${category.name}`);
      }
    }

    // 7. Thống kê shop
    const shopInfo = await sdk.shop.getMe();
    const isActive = await sdk.shop.isActive();
    const contactInfo = await sdk.shop.getContactInfo();

    console.log("Thống kê shop:", {
      name: shopInfo.name,
      isActive,
      contact: contactInfo,
      hasLogo: !!shopInfo.logo,
    });

    // 8. Quản lý người dùng với filter
    const activeUsers = await sdk.users.getActive({ page: 1, limit: 50 });
    const inactiveUsers = await sdk.users.getInactive({ page: 1, limit: 50 });

    console.log("Thống kê người dùng:", {
      active: activeUsers.total,
      inactive: inactiveUsers.total,
    });

    // 9. Cập nhật cấu hình SDK động
    sdk.updateApiKey("new-api-key");
    sdk.updateBaseUrl("https://staging-api.miniappify.vn");

    const currentConfig = sdk.getConfig();
    console.log("Cấu hình hiện tại:", currentConfig);

    // 10. Kiểm tra version SDK
    const version = sdk.getVersion();
    console.log("Version SDK:", version);
  } catch (error) {
    console.error("Lỗi trong advanced example:", error);
  }
}

// Chạy ví dụ nâng cao
advancedExample();

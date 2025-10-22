# Miniappify Merchant SDK

SDK TypeScript chính thức để tương tác với Miniappify Merchant API.

## Cài đặt

```bash
npm install @miniappify/merchant-sdk
```

## Sử dụng

### Khởi tạo SDK

```typescript
import { MiniappifySDK } from '@miniappify/merchant-sdk';

const sdk = new MiniappifySDK({
  apiKey: 'your-api-key-here',
  baseUrl: 'https://openapi.miniappify.vn', // optional
  timeout: 30000, // optional
});
```

### Quản lý Sản phẩm

```typescript
// Lấy danh sách sản phẩm
const products = await sdk.products.list({
  page: 1,
  limit: 10,
  search: 'tên sản phẩm'
});

// Tạo sản phẩm mới
const newProduct = await sdk.products.create({
  name: 'Tên sản phẩm',
  description: 'Mô tả sản phẩm',
  variants: [{
    sku: 'SKU001',
    price: 100000,
    stock: 50,
    attributes: [{
      name: 'color',
      value: 'red',
      displayName: 'Màu đỏ'
    }]
  }],
  categoryIds: ['category-id-here']
});

// Cập nhật sản phẩm
const updatedProduct = await sdk.products.update('product-id', {
  name: 'Tên sản phẩm mới'
});

// Xóa sản phẩm
await sdk.products.delete('product-id');
```

### Quản lý Đơn hàng

```typescript
// Lấy danh sách đơn hàng
const orders = await sdk.orders.list({
  status: 'pending',
  page: 1,
  limit: 10
});

// Tạo đơn hàng mới
const newOrder = await sdk.orders.create({
  customerName: 'Nguyễn Văn A',
  customerPhone: '0123456789',
  customerEmail: 'customer@example.com',
  customerAddress: '123 Đường ABC, Quận 1, TP.HCM',
  totalAmount: 150000,
  products: [{
    productId: 'product-id',
    productName: 'Tên sản phẩm',
    quantity: 2,
    price: 75000,
    total: 150000
  }]
});

// Cập nhật trạng thái đơn hàng
await sdk.orders.updateStatus('order-id', 'confirmed');
```

### Quản lý Danh mục

```typescript
// Lấy danh sách danh mục
const categories = await sdk.categories.list();

// Tạo danh mục mới
const newCategory = await sdk.categories.create({
  name: 'Danh mục mới',
  description: 'Mô tả danh mục',
  color: '#FF5733',
  icon: 'shopping-bag'
});

// Cập nhật danh mục
const updatedCategory = await sdk.categories.update('category-id', {
  name: 'Tên danh mục mới'
});
```

### Thông tin Shop

```typescript
// Lấy thông tin shop
const shopInfo = await sdk.shop.getMe();

// Kiểm tra trạng thái shop
const isActive = await sdk.shop.isActive();

// Lấy thông tin liên hệ
const contactInfo = await sdk.shop.getContactInfo();
```

### Quản lý Người dùng

```typescript
// Lấy danh sách người dùng
const users = await sdk.users.list({
  search: 'tên hoặc số điện thoại',
  status: 'active'
});

// Tìm kiếm người dùng
const searchResults = await sdk.users.search('0123456789');
```

## API Reference

### MiniappifySDK

#### Constructor

```typescript
new MiniappifySDK(config: MiniappifyConfig)
```

#### Methods

- `updateApiKey(apiKey: string): void` - Cập nhật API key
- `updateBaseUrl(baseUrl: string): void` - Cập nhật base URL
- `getConfig(): MiniappifyConfig` - Lấy cấu hình hiện tại
- `ping(): Promise<boolean>` - Kiểm tra kết nối API
- `getVersion(): string` - Lấy version SDK

### Products API

- `list(params?: SearchParams): Promise<ProductListResponse>`
- `create(data: CreateProductDto): Promise<ProductResponse>`
- `getById(id: string): Promise<ProductResponse>`
- `update(id: string, data: UpdateProductDto): Promise<ProductResponse>`
- `delete(id: string): Promise<boolean>`
- `search(query: string, params?: SearchParams): Promise<ProductListResponse>`

### Orders API

- `list(params?: SearchParams): Promise<OrderListResponse>`
- `create(data: CreateOrderDto): Promise<OrderResponse>`
- `getById(id: string): Promise<OrderResponse>`
- `update(id: string, data: UpdateOrderDto): Promise<OrderResponse>`
- `updateStatus(id: string, status: string): Promise<OrderResponse>`

### Categories API

- `list(): Promise<CategoryListResponse>`
- `create(data: CreateCategoryDto): Promise<CategoryResponse>`
- `getById(id: string): Promise<CategoryResponse>`
- `update(id: string, data: UpdateCategoryDto): Promise<CategoryResponse>`
- `delete(id: string): Promise<boolean>`

### Shop API

- `getMe(): Promise<ShopBasicInfo>`
- `isActive(): Promise<boolean>`
- `getName(): Promise<string>`
- `getContactInfo(): Promise<ContactInfo>`

### Users API

- `list(params?: UserSearchParams): Promise<UserListResponse>`
- `search(query: string, params?: UserSearchParams): Promise<UserListResponse>`
- `getByStatus(status: string, params?: UserSearchParams): Promise<UserListResponse>`

## Error Handling

SDK sử dụng custom error class `MiniappifyError`:

```typescript
import { MiniappifyError } from '@miniappify/merchant-sdk';

try {
  const product = await sdk.products.getById('invalid-id');
} catch (error) {
  if (error instanceof MiniappifyError) {
    console.log('Error code:', error.code);
    console.log('Error message:', error.message);
    console.log('HTTP status:', error.status);
  }
}
```

## License

MIT
# merchant-sdk

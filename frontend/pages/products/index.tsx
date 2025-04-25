import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link'; // Import Link
import { getProducts, deleteProduct } from '../../services/productService';

// Định nghĩa kiểu dữ liệu cho Product rõ ràng hơn
interface Product {
    ProductID: number;
    ProductName: string;
    Description?: string;
    Price: number;
    Stock: number;
    Category?: string;
}

export default function ProductList() {
    const [products, setProducts] = useState<Product[]>([]);
    const router = useRouter();

    useEffect(() => {
        getProducts().then(setProducts).catch(error => {
            console.error("Failed to fetch products:", error);
            // Có thể thêm thông báo lỗi cho người dùng ở đây
        });
    }, []);

    const handleDelete = async (id: number, name: string) => {
        if (window.confirm(`Bạn có chắc chắn muốn xoá sản phẩm "${name}" không?`)) {
            try {
                await deleteProduct(id);
                setProducts(products.filter(p => p.ProductID !== id));
                // Có thể thêm thông báo thành công
            } catch (error) {
                console.error("Failed to delete product:", error);
                // Có thể thêm thông báo lỗi
            }
        }
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Danh sách Sản phẩm</h1>
                {/* SỬA LỖI LINK: Bỏ thẻ <a>, chuyển className vào Link */}
                <Link href="/products/create"
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out">
                    Thêm sản phẩm
                </Link>
            </div>

            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <table className="min-w-full leading-normal">
                    <thead>
                        <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                            <th className="py-3 px-6 text-left">Tên sản phẩm</th>
                            <th className="py-3 px-6 text-left">Loại</th>
                            <th className="py-3 px-6 text-right">Giá</th>
                            <th className="py-3 px-6 text-center">Tồn kho</th>
                            <th className="py-3 px-6 text-center">Hành động</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700 text-sm font-light">
                        {products.length > 0 ? (
                            products.map((p) => (
                                <tr key={p.ProductID} className="border-b border-gray-200 hover:bg-gray-100">
                                    <td className="py-3 px-6 text-left whitespace-nowrap">
                                        <span className="font-medium">{p.ProductName}</span>
                                    </td>
                                    <td className="py-3 px-6 text-left">
                                        {p.Category || 'N/A'}
                                    </td>
                                    <td className="py-3 px-6 text-right">
                                        {formatPrice(p.Price)}
                                    </td>
                                    <td className="py-3 px-6 text-center">
                                        {p.Stock}
                                    </td>
                                    <td className="py-3 px-6 text-center">
                                        <div className="flex item-center justify-center space-x-4">
                                            {/* SỬA LỖI LINK: Bỏ thẻ <a>, chuyển className vào Link */}
                                            <Link href={`/products/${p.ProductID}`}
                                                  className="text-indigo-600 hover:text-indigo-900 transition duration-150 ease-in-out">
                                                Sửa
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(p.ProductID, p.ProductName)}
                                                className="text-red-600 hover:text-red-900 transition duration-150 ease-in-out"
                                            >
                                                Xoá
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="py-6 px-6 text-center text-gray-500">
                                    Không có sản phẩm nào.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
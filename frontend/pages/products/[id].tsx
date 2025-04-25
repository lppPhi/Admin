import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/router";
import Link from 'next/link'; // Import Link
import { getProductById, updateProduct } from "../../services/productService";

interface ProductFormState {
    ProductName: string;
    Description: string;
    Price: number | string;
    Stock: number | string;
    Category: string;
}

export default function EditProduct() {
    const router = useRouter();
    const { id } = router.query;

    const [form, setForm] = useState<ProductFormState>({
        ProductName: "",
        Description: "",
        Price: '',
        Stock: '',
        Category: ""
    });
    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        if (router.isReady && id && typeof id === 'string') {
            const productId = parseInt(id, 10);
            if (!isNaN(productId)) {
                setIsFetching(true);
                setNotFound(false);
                getProductById(productId)
                    .then(productData => {
                        if (productData) {
                            setForm({
                                ProductName: productData.ProductName,
                                Description: productData.Description || "",
                                Price: productData.Price,
                                Stock: productData.Stock,
                                Category: productData.Category || "",
                            });
                        } else {
                             setNotFound(true);
                        }
                    })
                    .catch(err => {
                        console.error("Failed to fetch product:", err);
                        setError("Lỗi tải dữ liệu sản phẩm.");
                        setNotFound(true);
                    })
                    .finally(() => {
                        setIsFetching(false);
                    });
            } else {
                setNotFound(true);
                setIsFetching(false);
            }
        } else if (router.isReady && !id) {
             setNotFound(true);
             setIsFetching(false);
        }
    }, [id, router.isReady]);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        setForm(prevForm => ({
            ...prevForm,
            [name]: type === 'number' ? (value === '' ? '' : Number(value)) : value
        }));
    };


    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!id || typeof id !== 'string') return;

        setIsLoading(true);
        setError(null);

        const priceValue = Number(form.Price);
        const stockValue = Number(form.Stock);

        if (isNaN(priceValue) || priceValue < 0) {
            setError("Giá sản phẩm không hợp lệ.");
            setIsLoading(false);
            return;
        }
         if (isNaN(stockValue) || stockValue < 0 || !Number.isInteger(stockValue) ) {
            setError("Số lượng tồn kho phải là số nguyên không âm.");
            setIsLoading(false);
            return;
        }

        const productId = parseInt(id, 10);
        if (isNaN(productId)) {
             setError("ID sản phẩm không hợp lệ.");
             setIsLoading(false);
             return;
        }

        try {
            const payload = {
                ...form,
                Price: priceValue,
                Stock: stockValue,
            };
            await updateProduct(productId, payload);
            router.push("/products");
        } catch (err) {
            console.error("Failed to update product:", err);
            setError("Cập nhật sản phẩm thất bại. Vui lòng thử lại.");
            setIsLoading(false);
        }
    };

    if (isFetching) {
        return (
             <div className="container mx-auto px-4 py-8 text-center">
                <p className="text-gray-500">Đang tải dữ liệu sản phẩm...</p>
             </div>
        );
    }

    if (notFound) {
         return (
             <div className="container mx-auto px-4 py-8 text-center">
                <h1 className="text-2xl font-bold text-red-600 mb-4">Không tìm thấy sản phẩm</h1>
                {/* SỬA LỖI LINK: Bỏ thẻ <a>, chuyển className vào Link */}
                <Link href="/products" className="text-blue-600 hover:underline">
                    Quay lại danh sách sản phẩm
                </Link>
             </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Chỉnh sửa sản phẩm</h1>

            <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl mx-auto">
                <form onSubmit={handleSubmit} noValidate>
                    {error && (
                        <div className="mb-4 p-3 bg-red-100 text-red-700 border border-red-400 rounded">
                            {error}
                        </div>
                    )}

                     <div className="mb-4">
                        <label htmlFor="ProductName" className="block text-gray-700 text-sm font-bold mb-2">
                            Tên sản phẩm <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="ProductName"
                            name="ProductName"
                            value={form.ProductName}
                            onChange={handleChange}
                            placeholder="Ví dụ: Laptop ABC"
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="Description" className="block text-gray-700 text-sm font-bold mb-2">
                            Mô tả
                        </label>
                        <textarea
                            id="Description"
                            name="Description"
                            value={form.Description}
                            onChange={handleChange}
                            placeholder="Thông tin chi tiết về sản phẩm..."
                            rows={4}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    <div className="flex flex-wrap -mx-3 mb-4">
                        <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
                            <label htmlFor="Price" className="block text-gray-700 text-sm font-bold mb-2">
                                Giá (VNĐ) <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                id="Price"
                                name="Price"
                                value={form.Price}
                                onChange={handleChange}
                                placeholder="0"
                                required
                                min="0"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        <div className="w-full md:w-1/2 px-3">
                             <label htmlFor="Stock" className="block text-gray-700 text-sm font-bold mb-2">
                                Tồn kho <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                id="Stock"
                                name="Stock"
                                value={form.Stock}
                                onChange={handleChange}
                                placeholder="0"
                                required
                                min="0"
                                step="1"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                    </div>

                    <div className="mb-6">
                        <label htmlFor="Category" className="block text-gray-700 text-sm font-bold mb-2">
                            Loại
                        </label>
                        <input
                            type="text"
                            id="Category"
                            name="Category"
                            value={form.Category}
                            onChange={handleChange}
                            placeholder="Ví dụ: Điện tử, Thời trang"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    <div className="flex items-center justify-end space-x-4">
                         {/* SỬA LỖI LINK: Bỏ thẻ <a>, chuyển className vào Link */}
                         <Link href="/products"
                               className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out">
                            Huỷ
                         </Link>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out ${
                                isLoading
                                    ? 'bg-blue-400 cursor-not-allowed'
                                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                            }`}
                        >
                            {isLoading ? 'Đang lưu...' : 'Lưu thay đổi'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
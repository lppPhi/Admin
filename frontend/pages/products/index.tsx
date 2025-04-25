import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'; // Dùng hook đúng cách
import { getProducts, deleteProduct } from '../../services/productService'; // Gộp import

export default function ProductList() {
    const [products, setProducts] = useState<Array<{
        ProductID: number;
        ProductName: string;
        Description?: string;
        Price: number;
        Stock: number;
        Category?: string;
      }>>([]);
      
  const router = useRouter();
  
  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  const handleDelete = async (id: number) => {
    await deleteProduct(id);
    setProducts(products.filter(p => p.ProductID !== id));
  };

  return (
    <div>
      <h1>Sản phẩm</h1>
      <button onClick={() => router.push("/products/create")}>Thêm sản phẩm</button>
      <ul>
        {products.map((p: any) => (
          <li key={p.ProductID}>
            {p.ProductName} - {p.Price}₫
            <button onClick={() => router.push(`/products/${p.ProductID}`)}>Sửa</button>
            <button onClick={() => handleDelete(p.ProductID)}>Xoá</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getProductById, updateProduct } from "../../services/productService";

export default function EditProduct() {
  const router = useRouter();
  const { id } = router.query;
  const [form, setForm] = useState({
    ProductName: "",
    Description: "",
    Price: 0,
    Stock: 0,
    Category: ""
  });

  useEffect(() => {
    if (id) {
      getProductById(+id).then(setForm);
    }
  }, [id]);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (id) {
      await updateProduct(+id, form);
    }
    router.push("/products");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Sửa sản phẩm</h1>
      <input name="ProductName" value={form.ProductName} onChange={handleChange} placeholder="Tên sản phẩm" />
      <input name="Description" value={form.Description} onChange={handleChange} placeholder="Mô tả" />
      <input name="Price" type="number" value={form.Price} onChange={handleChange} placeholder="Giá" />
      <input name="Stock" type="number" value={form.Stock} onChange={handleChange} placeholder="Tồn kho" />
      <input name="Category" value={form.Category} onChange={handleChange} placeholder="Loại" />
      <button type="submit">Cập nhật</button>
    </form>
  );
}

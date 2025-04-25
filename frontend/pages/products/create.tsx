import { useState } from "react";
import { useRouter } from "next/router";
import { createProduct } from "../../services/productService";

export default function CreateProduct() {
  const router = useRouter();
  const [form, setForm] = useState({
    ProductName: "",
    Description: "",
    Price: 0,
    Stock: 0,
    Category: ""
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await createProduct(form);
    router.push("/products");
  };

  return (
    <div style={{ maxWidth: 500, margin: "auto" }}>
      <h1>Thêm sản phẩm</h1>
      <form onSubmit={handleSubmit}>
        <input name="ProductName" value={form.ProductName} onChange={handleChange} placeholder="Tên sản phẩm" required />
        <input name="Description" value={form.Description} onChange={handleChange} placeholder="Mô tả" />
        <input name="Price" type="number" value={form.Price} onChange={handleChange} placeholder="Giá" required />
        <input name="Stock" type="number" value={form.Stock} onChange={handleChange} placeholder="Tồn kho" required />
        <input name="Category" value={form.Category} onChange={handleChange} placeholder="Loại" />

        <button type="submit">Thêm</button>
      </form>
    </div>
  );
}

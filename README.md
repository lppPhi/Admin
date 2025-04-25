# Admin
Backend: 
1. Tạo môi trường ảo mới tên là venv
python -m venv venv

2. Kích hoạt môi trường ảo
venv\Scripts\activate

3. Cài các thư viện cần thiết
pip install fastapi uvicorn sqlalchemy pyodbc python-dotenv

4. Lưu lại môi trường (tùy chọn)
pip freeze > requirements.txt

5. chạy FastAPI
uvicorn app.main:app --reload

Frontend: 
1. Cài thư viện:
npm install

2. Cài TypeScript và các type cần thiết:
npm install --save-dev typescript @types/react @types/node

3. Tạo file cấu hình TypeScript:
    Next.js sẽ tự tạo tsconfig.json khi bạn chạy npm run dev.
    Nếu bạn muốn tạo ngay, dùng lệnh: npx tsc --init
 Nhưng tốt nhất, bạn chỉ cần chạy: npm run dev
Lúc này Next.js sẽ thấy bạn có TypeScript và tự tạo:
tsconfig.json
next-env.d.ts
4. Chạy lại dự án: npm run dev

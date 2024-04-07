import { http } from "./config";

export const quanLyNguoiDungServ = {
  dangKy: (data) => {
    return http.post("/api/QuanLyNguoiDung/DangKy", data);
  },
  layDanhSachNguoiDung: () => {
    return http.get("/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP00");
  },
  xoaNguoiDung: (taiKhoan) => {
    return http.delete(
      `/api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`
    );
  },
  capNhatThongTinNguoiDung: (user) => {
    console.log(user);
    return http.post("/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung", user);
  },
};

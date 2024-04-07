import { Space, Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { quanLyNguoiDungServ } from "../../services/quanLyNguoiDung";

const TableUser = ({
  arrUser,
  handleGetAllUser,
  handleMessage,
  handleUpdateUser,
}) => {
  console.log(arrUser);
  const columns = [
    {
      title: "STT",
      render: (text, record, index) => {
        return index + 1;
      },
    },
    {
      title: "Họ tên",
      dataIndex: "hoTen",
    },
    {
      title: "Tài khoản",
      dataIndex: "taiKhoan",
    },
    {
      title: "Loại người dùng",
      dataIndex: "maLoaiNguoiDung",
      render: (text) => {
        return text == "KhachHang" ? (
          <Tag color="#f50">Khách hàng</Tag>
        ) : (
          <Tag color="#108ee9">Quản trị</Tag>
        );
      },
    },
    {
      title: "Chức năng",
      dataIndex: "taiKhoan",
      render: (text, record) => {
        // console.log(record);
        return (
          <>
            <button
              onClick={() => {
                handleUpdateUser(record);
              }}
              className="py-2 px-4 rounded text-white bg-yellow-600 mr-3"
            >
              Sửa
            </button>
            <button
              onClick={() => {
                quanLyNguoiDungServ
                  .xoaNguoiDung(text)
                  .then((res) => {
                    console.log(res);
                    handleGetAllUser();
                    handleMessage("success", "Đã xoá thành công");
                  })
                  .catch((err) => {
                    console.log(err);
                    handleMessage("error", err.response.data.content);
                  });
              }}
              className="py-2 px-4 rounded text-white bg-red-600"
            >
              Xoá
            </button>
          </>
        );
      },
    },
  ];
  return (
    <div>
      <Table
        columns={columns}
        dataSource={arrUser}
        pagination={{
          defaultPageSize: 20,
        }}
      />
    </div>
  );
};

export default TableUser;

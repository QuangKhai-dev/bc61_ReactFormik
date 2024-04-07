import { useEffect, useState } from "react";
import FormUser from "./Layout/FormUser/FormUser";
import TableUser from "./Layout/TableUser/TableUser";
import { quanLyNguoiDungServ } from "./services/quanLyNguoiDung";
import { message } from "antd";
function App() {
  // Các thuộc tính mà một nhân viên có: tên, msnv, email, mật khẩu, số điện thoại, chức vụ
  // Yêu cầu 1, tạo ra một hàm tên handleUpdateUser để lấy dữ liệu từ tableUser
  // Yêu cầu 2, tạo một props truyền dữ liệu từ state xuống component FormUser
  const [updateUser, setUpdateUser] = useState({});
  const [arrUser, setArrUser] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  useEffect(() => {
    handleGetAllUser();
  }, []);

  const handleUpdateUser = (user) => {
    console.log(user);
    setUpdateUser(user);
  };

  const handleGetAllUser = () => {
    quanLyNguoiDungServ
      .layDanhSachNguoiDung()
      .then((res) => {
        console.log(res);
        setArrUser(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleMessage = (type, content) => {
    messageApi.open({
      type,
      content,
    });
  };

  return (
    <>
      {contextHolder}
      <div className="py-10">
        <div className="container mx-auto">
          <h1 className="text-center text-4xl font-bold">
            Bài tập quản lí người dùng movie Formik - Yup
          </h1>
          {/* form  */}
          <FormUser
            handleGetAllUser={handleGetAllUser}
            handleMessage={handleMessage}
            updateUser={updateUser}
          />
          {/* table  */}
          <TableUser
            handleGetAllUser={handleGetAllUser}
            arrUser={arrUser}
            handleMessage={handleMessage}
            handleUpdateUser={handleUpdateUser}
          />
        </div>
      </div>
    </>
  );
}

export default App;

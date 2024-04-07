import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import InputCustom from "../../Components/Input/InputCustom";
import { quanLyNguoiDungServ } from "../../services/quanLyNguoiDung";

const FormUser = ({ handleGetAllUser, handleMessage, updateUser }) => {
  const {
    handleChange,
    handleBlur,
    errors,
    values,
    handleSubmit,
    touched,
    setValues,
    isValid,
    setTouched,
    isSubmitting,
    resetForm,
  } = useFormik({
    initialValues: {
      // initialValues đóng vai trò quản lí dữ liệu mặc định cho các input
      taiKhoan: "",
      email: "",
      matKhau: "",
      soDt: "",
      hoTen: "",
      maNhom: "GP06",
    },
    // onSubmit là phương thức chạy khi form được submit
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      // ở đây là nơi xử lí các logic như đăng ký đăng nhập...
      quanLyNguoiDungServ
        .dangKy(values)
        .then((res) => {
          // console.log(res);
          handleMessage("success", "Đăng ký thành công");

          // gọi hàm xử lí load lại dữ liệu mới từ backend
          handleGetAllUser();
          // đưa tất cả dữ liệu về mặc định
          resetForm();
        })
        .catch((err) => {
          console.log(err);
          handleMessage("error", err.response.data.content);
        });
    },
    validationSchema: Yup.object({
      taiKhoan: Yup.string()
        .required("Vui lòng không bỏ trống")
        .min(5, "Vui lòng nhập tối thiêu 5 ký tự"),
      email: Yup.string()
        .required("Vui lòng không bỏ trống")
        .email("Vui lòng nhập đúng email"),
      hoTen: Yup.string()
        .required("Vui lòng không bỏ trống")
        .matches(
          /^[a-zA-Z\s'\-ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚÝàáâãèéêìíòóôõùúýĂăĐđĨĩŨũƠơƯưẠạẢảẤấẦầẨẩẪẫẬậẮắẰằẲẳẴẵẶặẸẹẺẻẼẽẾếỀềỂểỄễỆệỈỉỊịỌọỎỏỐốỒồỔổỖỗỘộỚớỜờỞởỠỡỢợỤụỦủỨứỪừỬửỮữỰựỲỳỴỵỶỷỸỹ]+$/g,
          "Vui lòng nhập họ tên là chữ"
        ),
      soDt: Yup.string()
        .required("Vui lòng không bỏ trống")
        .matches(
          /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
          "Đây không phải số điện thoại"
        ),
      matKhau: Yup.string()
        .required("Vui lòng không bỏ trống")
        .matches(
          // tạo một mật khẩu có ít nhất 8 ký tự bao gồm 1 ký tự viết hoa 1 ký tự đặc biệt và số
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
          "Vui lòng nhập mật khẩu bao gồm ít nhất 1 ký tự viết hoa và số"
        ),
    }),
  });

  useEffect(() => {
    // console.log(updateUser);
    // sử dụng setValues từ formik để update dữ liệu vào initialValue
    setValues({ ...updateUser, soDt: updateUser.soDT });
  }, [updateUser]);
  // Yêu cầu về chức năng cập nhật dữ liệu lên backend
  // Yêu cầu 1: thực hiện kiểm tra xem nếu như người dùng nhập dữ liệu vào và không bị lỗi thì sẽ xử lí lấy dữ liệu, lưu ý ở đâu là tạo một hàm xử lí và gắn vào nút cập nhật người dùng đang có trên giao diện
  // Yêu cầu 2: Sau khi lấy dữ liệu, thực hiện quay trở lại file quanLyNguoiDung và tạo một phương thức giúp gửi dữ liệu lên backend
  // Yêu cầu 3: Tạo chức năng thông báo cho người dùng khi cập nhật thành công hoặc thất bại

  const handleUpdateUser = () => {
    // console.log(isSubmitting);
    const objectTouched = {};
    for (let key in values) {
      objectTouched[key] = true;
    }
    setTouched(objectTouched);
    // console.log(values);
    // console.log("hello");
    if (isValid) {
      // console.log(values);
      // xử lí logic
      quanLyNguoiDungServ
        .capNhatThongTinNguoiDung({ ...values, maNhom: "GP00" })
        .then((res) => {
          // console.log(res);
          handleGetAllUser();
          resetForm();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  // values chứa dữ liệu được lấy từ các input
  // console.log(values);
  // error chứa dữ liệu thông báo lỗi cho người dùng
  console.log(errors);
  // touched giúp quản lí trạng thái người dùng đã focus vào các input có trong form
  // console.log(touched);
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-5">
          {/* họ tên  */}
          <InputCustom
            label="Họ và tên"
            name="hoTen"
            handleBlur={handleBlur}
            handleChange={handleChange}
            placeholder="Vui lòng nhập họ tên"
            error={errors.hoTen}
            touched={touched.hoTen}
            value={values.hoTen}
          />
          <InputCustom
            label="Tài khoản"
            name="taiKhoan"
            handleChange={handleChange}
            handleBlur={handleBlur}
            placeholder="Vui lòng nhập tài khoản"
            error={errors.taiKhoan}
            touched={touched.taiKhoan}
            value={values.taiKhoan}
          />
          <InputCustom
            label="Email"
            name="email"
            handleChange={handleChange}
            handleBlur={handleBlur}
            placeholder="Vui lòng nhập email"
            error={errors.email}
            touched={touched.email}
            value={values.email}
          />
          <InputCustom
            label="Số điện thoại"
            name="soDt"
            handleChange={handleChange}
            handleBlur={handleBlur}
            placeholder="Vui lòng nhập số điện thoại"
            error={errors.soDt}
            touched={touched.soDt}
            value={values.soDt}
          />
          <InputCustom
            label="Mật khẩu"
            name="matKhau"
            handleChange={handleChange}
            handleBlur={handleBlur}
            placeholder="Vui lòng nhập mật khẩu"
            type="password"
            error={errors.matKhau}
            touched={touched.matKhau}
            className="col-span-2"
            value={values.matKhau}
          />

          <div className="space-x-3">
            <button
              type="submit"
              className="bg-black text-white py-2 px-5 rounded"
            >
              Đăng ký
            </button>
            <button
              type="submit"
              className="bg-purple-500 text-white py-2 px-5 rounded"
              onClick={() => {
                resetForm();
              }}
            >
              Reset Form
            </button>
            <button
              type="button"
              className="bg-yellow-500 text-white py-2 px-5 rounded"
              onClick={handleUpdateUser}
            >
              Cập nhật người dùng
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormUser;

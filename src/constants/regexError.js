export const regex = {
  password: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
  email: /^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/,
  phone: /a/,
  username: /^$|\s+/,
}

export const errorText = {
  password: 'Mật khẩu cần tối thiểu tám ký tự, ít nhất một chữ cái viết hoa, một chữ cái viết thường và một số',
  email: 'Email không đúng định dạng',
  phone: 'Số điện thoại không đúng định dạng',
  username: 'Tên đăng nhập không có khoảng trắng',
}
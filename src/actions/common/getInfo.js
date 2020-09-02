export const subjects2 = [
  { vn: 'Toán Học', en: 'toan' },
  { vn: 'Ngữ Văn', en: 'van' },
  { vn: 'Tiếng Anh', en: 'anh' },
  { vn: 'Vật Lý', en: 'ly' },
  { vn: 'Hóa Học', en: 'hoa' },
  { vn: 'Sinh Học', en: 'sinh' },
  { vn: 'Lịch Sử', en: 'su' },
  { vn: 'Địa Lý', en: 'dia' },
];

export const getInfo = (pathname, subjectParam) => {
  let range;
  let title;
  if (pathname.includes('lop-10')) {
    title = 'LUYỆN THI VÀO LỚP 10';
    range = 'LỚP 10';
  }
  if (pathname.includes('dai-hoc')) {
    title = 'LUYỆN THI THPT QUỐC GIA';
    range = 'THPT QUỐC GIA';
  }
  const obj = subjects2.find(item => item.en === subjectParam);
  const subject = obj.vn;
  return {
    range,
    subject,
    title,
  }
}
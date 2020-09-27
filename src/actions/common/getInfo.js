export const subjects2 = [
  { vn: 'Toán Học', en: 'toan', eng: 'math' },
  { vn: 'Ngữ Văn', en: 'van', eng: 'literature' },
  { vn: 'Tiếng Anh', en: 'anh', eng: 'english' },
  { vn: 'Vật Lý', en: 'ly', eng: 'physics' },
  { vn: 'Hóa Học', en: 'hoa', eng: 'chemistry' },
  { vn: 'Sinh Học', en: 'sinh', eng: 'biology' },
  { vn: 'Lịch Sử', en: 'su', eng: 'history' },
  { vn: 'Địa Lý', en: 'dia', eng: 'geography' },
];

export const getObjSubject = (subject) => {
  if (!subject) return {};
  const result = subjects2.find(item =>
    item.vn.toLowerCase() === subject.toLowerCase()
    || item.en.toLowerCase() === subject.toLowerCase()
    || item.eng.toLowerCase() === subject.toLowerCase()
  );
  if (result) return result;
  return {};
}

export const levels = [
  { vn: 'Lớp 10', en: 'highSchool', num: 10 },
  { vn: 'Đại học', en: 'college', num: 13 },
];

export const getObjLevel = (level) => {
  if (!level) return {};
  let result = {};
  if (typeof level === 'string') {
    result = levels.find(item =>
      item.vn.toLowerCase() === level.toLowerCase()
      || item.en.toLowerCase() === level.toLowerCase())
  }
  if (typeof level === 'number') {
    result = levels.find(item => item.num === level)
  }

if (result) return result;
return {};
}

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
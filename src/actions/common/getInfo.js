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
  return result || {};
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

export const getScore = (_score10) => {
  console.log("getScore -> _score10", _score10)
  const score10 = Number(parseFloat(_score10).toFixed(1));
  debugger
  if (score10 >= 9.0 && score10 <= 10) {
    return {
      score10,
      score4: 4.0,
      score: 'A+',
    };
  }
  if (score10 >= 8.5 && score10 <= 8.9) {
    return {
      score10,
      score4: 3.8,
      score: 'A',
    };
  }
  if (score10 >= 7.8 && score10 <= 8.4) {
    return {
      score10,
      score4: 3.5,
      score: 'B+',
    };
  }
  if (score10 >= 7.0 && score10 <= 7.7) {
    return {
      score10,
      score4: 3.0,
      score: 'B',
    };
  }
  if (score10 >= 6.3 && score10 <= 6.9) {
    return {
      score10,
      score4: 2.5,
      score: 'C+',
    };
  }
  if (score10 >= 5.5 && score10 <= 6.2) {
    return {
      score10,
      score4: 2.0,
      score: 'C',
    };
  }
  if (score10 >= 4.8 && score10 <= 5.4) {
    return {
      score10,
      score4: 1.5,
      score: 'D+',
    };
  }
  if (score10 >= 4.0 && score10 <= 4.7) {
    return {
      score10,
      score4: 1.0,
      score: 'D',
    };
  }
  return {
    score10,
    score4: 0,
    score: 'F',
  };
}
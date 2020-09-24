export const hideEmail = email => {
  if (!email) return null;
  const array = email.split('@');
  const temp = array[0].slice(0, 3);
  return `${temp}*******@${array[1]}`;
}

export const hidePhone = phone => {
  if (!phone) return null;
  const temp = phone.slice(phone.length - 3, phone.length);
  return `********${temp}`;
}

export const getMinute = second => {
  const _minute = Math.floor(second / 60);
  const _second = second % 60;
  return `${_minute} : ${_second}`;
}

export const checkDate = (day, month, year) => {
  // let validateDate = false;
  // if (year % 4 == 0 && year % 100 != 0 || year % 400 == 0) {
  //   if (month === 2) {
  //     if (day <= 29) {
  //       validateDate = true;
  //     }
  //   }
  //   switch (month) {
  //     case 4:
  //     case 6:
  //     case 9:
  //     case 11:
  //       if (day <= 30) {
  //         validateDate = true;
  //       } else {
  //         validateDate = false;
  //       }
  //       break;
  //     default:
  //       validateDate = true;
  //       break;
  //   }
  // } else {
  //   if (month === 2) {
  //     if (day <= 28) {
  //       validateDate = true;
  //     }
  //   }
  //   switch (month) {
  //     case 4:
  //     case 6:
  //     case 9:
  //     case 11:
  //       if (day <= 30) {
  //         validateDate = true;
  //       } else {
  //         validateDate = false;
  //       }
  //       break;
  //     default:
  //       validateDate = true;
  //       break;
  //   }
  // }
}

/*
{this.renderSelect('day', DAY_ARRAY)}
changeBirthday = (type, val) => {
  this.setState({ [type]: val });
}

renderSelect = (type, array) => {
  return (
    <select className={type} onChange={(e) => this.changeBirthday(type, e.target.value)}>
      {array.map(val => (
        <option value={val}>
          {type === 'month' ? `Tháng ${val}` : val}
        </option>
      ))}
    </select>
  );
}
*/
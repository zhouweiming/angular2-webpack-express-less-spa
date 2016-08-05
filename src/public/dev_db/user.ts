
let user_list = [
  { id: 1, name: "aaaaaaa", lastupdate: 2312321312312 },
  { id: 2, name: "", lastupdate: 2312321312312 },
  { id: 3, name: "", lastupdate: 2312321312312 },
  { id: 4, name: "", lastupdate: 2312321312312 },
  { id: 5, name: "", lastupdate: 2312321312312 },
  { id: 6, name: "", lastupdate: 2312321312312 },
  { id: 7, name: "", lastupdate: 2312321312312 },
  { id: 8, name: "", lastupdate: 2312321312312 },
  { id: 9, name: "", lastupdate: 2312321312312 },
  { id: 10, name: "", lastupdate: 2312321312312 },
  { id: 11, name: "", lastupdate: 2312321312312 },
  { id: 12, name: "", lastupdate: 2312321312312 },
  { id: 13, name: "", lastupdate: 2312321312312 },
  { id: 14, name: "", lastupdate: 2312321312312 },
  { id: 15, name: "", lastupdate: 2312321312312 },
  { id: 16, name: "", lastupdate: 2312321312312 },
  { id: 17, name: "", lastupdate: 2312321312312 },
  { id: 18, name: "", lastupdate: 2312321312312 },
  { id: 19, name: "", lastupdate: 2312321312312 },
  { id: 20, name: "", lastupdate: 2312321312312 },
  { id: 21, name: "", lastupdate: 2312321312312 },
  { id: 22, name: "", lastupdate: 2312321312312 },
  { id: 23, name: "", lastupdate: 2312321312312 }
];


export class User {
  static getAllUserLoginLog({ pageIndex, pageSize }: { pageIndex: number, pageSize: number }): { list: any[], count: number }{
    let start_index = pageIndex * pageSize;
    let end_index = start_index + pageSize - 1;
    let result = user_list.filter((user, i) => i >= start_index && i <= end_index);
    return {
      list: result,
      count: user_list.length
    };
  }

  static getUserById({ id }: {id: number}){
    return user_list.find(user => user.id === id);
  }
}
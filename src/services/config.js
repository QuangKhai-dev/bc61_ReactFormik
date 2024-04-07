import axios from "axios";
export const http = axios.create({
  // domain mặc định của dự án, thường dùng để giảm thiểu việc viết url ở axios, vd https://google.com/api và https://google.com/user sẽ cấu trúc baseURL là đoạn https://google.com là phần chung
  baseURL: "https://movienew.cybersoft.edu.vn",
  headers: {
    tokenCybersoft:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA2MSIsIkhldEhhblN0cmluZyI6IjI4LzA5LzIwMjQiLCJIZXRIYW5UaW1lIjoiMTcyNzQ4MTYwMDAwMCIsIm5iZiI6MTY5ODUxMjQwMCwiZXhwIjoxNzI3NjI5MjAwfQ.uWn4XmIr3aGBNm4QCi5Q5RFxVqNTwws8-EDFxQQud_I",
    Authorization:
      "Bearer " +
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYWRtaW4wMDAzIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoicGhhbjAzMTEwOTkxQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6WyJRdWFuVHJpIiwicGhhbjAzMTEwOTkxQGdtYWlsLmNvbSIsIkdQMDEiXSwibmJmIjoxNzEyMTQ1MjI5LCJleHAiOjE3MTIxNDg4Mjl9.TX4GOf8n0SYk2KWyW7ViIzb0gw8O9D-AZlk_S2epn7M",
  },
  timeout: 30000,
});

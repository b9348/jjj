const express = require('express');
const path = require('path');
const app = express();

// 设置静态文件夹
app.use(express.static(path.join(__dirname, 'dist')));

// 启动服务器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

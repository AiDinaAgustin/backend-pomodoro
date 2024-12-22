require('dotenv').config();

module.exports = {
  apps: [
    {
      name: 'backend-pomodoro',
      script: './index.js',
      watch: false,
      force: true,
      env: {
        PORT: process.env.PORT,
        NODE_ENV: process.env.NODE_ENV,
      },
    },
  ],
};

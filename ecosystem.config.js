module.exports = {
  apps: [
    {
      name: 'web-i',
      script: 'dist/main.js',
      instances: 0,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
      },
      merge_logs: true
    },
  ],
};

module.exports = {
  apps: [
    {
      name: 'nextjs-app',
      script: './server.js',
      instances: 'max', // استفاده از تمام CPUها
      exec_mode: 'cluster', // حالت cluster برای performance بهتر
      autorestart: true,
      watch: false, // در production غیرفعال کنید
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000
      },
      // تنظیمات لاگ
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
      error_file: 'logs/nextjs-error.log',
      out_file: 'logs/nextjs-out.log',
      merge_logs: true,
      // تنظیمات monitoring
      node_args: '--max-old-space-size=1024'
    }
  ]
}
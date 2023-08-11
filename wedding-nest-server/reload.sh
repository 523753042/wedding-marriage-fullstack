npm run build
pm2 del wedding-nest-server
pm2 start dist/main.js --name wedding-nest-server
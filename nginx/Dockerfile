# Sử dụng NGINX bản alpine siêu nhẹ
FROM nginx:alpine

# Xóa file cấu hình mặc định của Nginx đi
RUN rm /etc/nginx/conf.d/default.conf

# Copy file cấu hình cấu trúc của bạn từ máy thật thay thế vào
COPY default.conf /etc/nginx/conf.d/default.conf

# Nginx luôn mở cổng 80 để đón nhận traffic web
EXPOSE 80

# Chạy Nginx ở chế độ foreground để container không bị tắt
CMD ["nginx", "-g", "daemon off;"]

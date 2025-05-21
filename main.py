import tkinter as tk
import random
from PIL import Image, ImageTk

# Danh sách câu nói yêu thương
love_messages = [
    "Anh yêu em vì nụ cười của em làm anh thấy bình yên.",
    "Mỗi ngày bên em là một món quà.",
    "Em là giấc mơ mà anh không muốn tỉnh dậy.",
    "Cảm ơn em đã đến bên anh ❤️",
]

# Danh sách ảnh (đảm bảo bạn có ảnh trong thư mục)
image_files = ["img1.png", "img2.png", "img3.png"]  # Thay bằng ảnh thật của bạn

def show_new_message():
    msg = random.choice(love_messages)
    

# Giao diện chính
root = tk.Tk()
root.title("Dành cho em 💌")
root.geometry("400x500")
root.configure(bg="pink")

message_label = tk.Label(root, text="", wraplength=300, font=("Arial", 14), bg="pink")
message_label.pack(pady=20)

image_label = tk.Label(root, bg="pink")
image_label.pack(pady=10)

btn = tk.Button(root, text="Cho em một câu nữa 💕", command=show_new_message)
btn.pack(pady=20)

show_new_message()  # Hiển thị câu đầu tiên

root.mainloop()

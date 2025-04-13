import tkinter as tk
from tkinter import ttk
import time

class BreathingGame:
    def __init__(self, root):
        self.root = root
        self.root.title("Breathing Exercise - Grow Your Plant 🌱")
        self.root.geometry("500x550")

        # 🌱 Plant Growth & Counter
        self.stage = 0
        self.sessions_completed = 0

        # 🎨 Background colors for transitions
        self.colors = ["#87CEEB", "#FFD700", "#FF4500", "#4B0082"]  # Morning → Noon → Sunset → Night
        self.color_index = 0
        self.root.configure(bg=self.colors[self.color_index])

        # UI Elements
        self.label = tk.Label(root, text="🌱 Take a Deep Breath", font=("Arial", 16, "bold"), bg=self.colors[0])
        self.label.pack(pady=10)

        self.canvas = tk.Canvas(root, width=200, height=200, bg="white", highlightthickness=0)
        self.canvas.pack(pady=10)
        self.plant = self.canvas.create_text(100, 100, text="🌱", font=("Arial", 50))

        self.breathing_circle = self.canvas.create_oval(50, 50, 150, 150, outline="blue", width=3)

        self.progress = ttk.Progressbar(root, length=300, mode="determinate")
        self.progress.pack(pady=10)

        self.counter_label = tk.Label(root, text=f"Sessions Completed: {self.sessions_completed}", font=("Arial", 12), bg=self.colors[0])
        self.counter_label.pack(pady=5)

        self.start_button = tk.Button(root, text="Start", command=self.start_breathing, font=("Arial", 12, "bold"), bg="#32CD32", fg="white")
        self.start_button.pack(pady=5)

        self.quit_button = tk.Button(root, text="Quit", command=root.quit, font=("Arial", 12, "bold"), bg="red", fg="white")
        self.quit_button.pack(pady=5)

    def start_breathing(self):
        self.label.config(text="Breathe In... Hold... Breathe Out...", fg="black")
        self.progress["value"] = 0
        self.root.update()

        # Smooth breathing animation
        for i in range(5):
            self.progress["value"] += 20
            self.animate_breathing()
            self.root.update()
            time.sleep(2)

        self.label.config(text="Great job! Your plant is growing! 🌿", fg="darkgreen")
        self.sessions_completed += 1
        self.counter_label.config(text=f"Sessions Completed: {self.sessions_completed}")

        # 🌱 Plant Growth Evolution
        if self.stage < 3:
            self.stage += 1
        
        # 🌍 Smooth background color transition
        if self.color_index < len(self.colors) - 1:
            self.color_index += 1
            self.root.configure(bg=self.colors[self.color_index])
            self.label.configure(bg=self.colors[self.color_index])
            self.counter_label.configure(bg=self.colors[self.color_index])

        self.update_plant()

    def animate_breathing(self):
        """ Expands and contracts the breathing circle for a smooth effect. """
        for size in range(10, 30, 2):  # Expanding effect
            self.canvas.coords(self.breathing_circle, 50 - size, 50 - size, 150 + size, 150 + size)
            self.root.update()
            time.sleep(0.05)

        for size in range(30, 10, -2):  # Contracting effect
            self.canvas.coords(self.breathing_circle, 50 - size, 50 - size, 150 + size, 150 + size)
            self.root.update()
            time.sleep(0.05)

    def update_plant(self):
        """ Updates the plant's evolution based on breathing sessions. """
        plant_stages = ["🌱", "🌿", "🌳", "🌺"]  # Adding a flower 🌺 after full growth
        self.canvas.itemconfig(self.plant, text=plant_stages[self.stage])  

# Run the game
root = tk.Tk()
app = BreathingGame(root)
root.mainloop()
import pygame
import sys

# Initialize Pygame
pygame.init()

# Set up the display
screen = pygame.display.set_mode((640, 480))
pygame.display.set_caption('My First Pygame')

# Main game loop
running = True
while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    # Fill the screen with a color (RGB format)
    screen.fill((0, 128, 255))

    # Update the display
    pygame.display.flip()

# Quit Pygame
pygame.quit()
sys.exit()

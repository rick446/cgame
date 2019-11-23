import pygame

from .game import Game


def main():
    pygame.init()
    g = Game(1024, 768)
    g.run()


if __name__ == "__main__":
    main()

import pygame
import numpy as np

from . import util


class Hero(pygame.sprite.Sprite):

    def __init__(self, game):
        super().__init__()
        self._game = game
        self._tiles = util.load_tiled_images(
            'Old%20hero.png', 16, 16, colorkey=(157, 142, 135)
        )
        self.cur = [1, 1]
        self.x = np.r_[10, 10]
        self.invert = False

    @property
    def image(self):
        img = self._tiles[self.cur[0]][self.cur[1]]
        if self.invert:
            img = pygame.transform.flip(img, True, False).convert()
        return img

    @property
    def rect(self):
        return self.image.get_rect().move(self.x)

    def update(self):
        keys = pygame.key.get_pressed()
        speed = 2
        if keys[pygame.K_LSHIFT] or keys[pygame.K_RSHIFT]:
            speed = 1
        if keys[pygame.K_LCTRL] or keys[pygame.K_RCTRL]:
            speed = 3

        v = np.zeros(2)
        self.invert = False

        if keys[pygame.K_LEFT]:
            v[0] = -1
            self.invert = True
        elif keys[pygame.K_RIGHT]:
            v[0] = 1
        if keys[pygame.K_UP]:
            v[1] = -1
        elif keys[pygame.K_DOWN]:
            v[1] = 1

        if (v == np.zeros(2)).all():
            speed = 0
            self.cur = [1, 1]
        else:
            af = speed * pygame.time.get_ticks() // 125
            self.cur = [2, 1 + (af % 4)]

        self.x = (
            self.x + speed * v * self._game.clock.get_time() / 10
        ).astype(int)

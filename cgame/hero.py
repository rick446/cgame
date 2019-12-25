import pygame
import numpy as np

from . import util


class Hero(pygame.sprite.Sprite):

    def __init__(self, game, x=0j):
        super().__init__()
        self._game = game
        self._tiles = util.load_tiled_images(
            'Old%20hero.png', 16, 16, colorkey=(157, 142, 135)
        )
        self.cur = [1, 1]
        self.x = x
        self.jump_pct = 0
        self.v = 0j

    @property
    def image(self):
        img = self._tiles[self.cur[0]][self.cur[1]]
        if self.v.real < 0:
            img = pygame.transform.flip(img, True, False).convert()
        if self.jump_pct > 0:
            h = 1 + util.parabola_height(self.jump_pct)
            sz = h * np.array(img.get_size(), dtype=float)
            img = pygame.transform.scale(
                img, sz.astype(int)
            ).convert()
        return img

    @property
    def rect(self):
        r = self.image.get_rect()
        r.center = (self.x.real, self.x.imag)
        return r

    def update(self):
        x = self.x + self.v * self._game.clock.get_time() / 10
        if not self._game.collide_walls(x):
            self.x = x

        if self.jump_pct > 0:
            self.cur = [1, 5]
        elif (self.v == np.zeros(2)).all():
            self.cur = [1, 1]
        else:
            af = np.abs(self.v) * pygame.time.get_ticks() // 125
            self.cur = [2, 1 + int(af % 4)]


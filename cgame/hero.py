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
        self.x = 0j
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
        x = np.array([self.x.real, self.x.imag])
        return self.image.get_rect().move(x.astype(int))

    def update(self):
        self.x += self.v * self._game.clock.get_time() / 10

        if self.jump_pct > 0:
            self.cur = [1, 5]
        elif (self.v == np.zeros(2)).all():
            self.cur = [1, 1]
        else:
            af = np.abs(self.v) * pygame.time.get_ticks() // 125
            self.cur = [2, 1 + int(af % 4)]

    def update2(self):
        keys = pygame.key.get_pressed()
        speed = 2
        if keys[pygame.K_LSHIFT] or keys[pygame.K_RSHIFT]:
            speed = 1
        if keys[pygame.K_LCTRL] or keys[pygame.K_RCTRL]:
            speed = 3

        v = np.zeros(2)
        self.invert = False

        if keys[pygame.K_LEFT] or keys[pygame.K_a]:
            v[0] = -1
            self.invert = True
        elif keys[pygame.K_RIGHT] or keys[pygame.K_d]:
            v[0] = 1
        if keys[pygame.K_UP] or keys[pygame.K_w]:
            v[1] = -1
        elif keys[pygame.K_DOWN] or keys[pygame.K_s]:
            v[1] = 1

        if (v == np.zeros(2)).all():
            speed = 0
            self.cur = [1, 1]
        else:
            af = speed * pygame.time.get_ticks() // 125
            self.cur = [2, 1 + (af % 4)]

        if keys[pygame.K_SPACE]:
            self.cur = [1,5]

        self.x += speed * v * self._game.clock.get_time() / 10



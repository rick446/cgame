import pygame
import numpy as np

from . import util


class Crosshair(pygame.sprite.Sprite):

    def __init__(self, game):
        super().__init__()
        self._game = game
        self._image = util.load_image('crosshair.png')
        self.x = 0j
        self.charge = 0.0

    def update(self):
        dt = self._game.clock.get_time()
        pos = pygame.mouse.get_pos()
        self.x = complex(*pos)
        self.charge = min(1.0, self.charge + dt / 200)

    @property
    def image(self):
        sz = self.charge * np.array(self._image.get_size(), dtype=float)
        return pygame.transform.scale(
            self._image, sz.astype(int)
        )

    @property
    def rect(self):
        r = self.image.get_rect()
        r.center = (self.x.real, self.x.imag)
        return r

    def shoot(self):
        v = self._game.crosshair.x - self._game.player.x
        if abs(v):
            v /= abs(v)

        arrow = Arrow(
            self._game,
            self._game.player.x, v,
            self.charge
        )
        self._game.sprites.add(arrow)
        self._game.sprites.remove(self)
        self.charge = 0.0


class Arrow(pygame.sprite.Sprite):

    def __init__(self, game, x, v, charge):
        super().__init__()
        self._game = game
        self._image = util.load_image('arrow.png')
        self.x = x
        self.v = v
        self.charge = charge
        self.remain = charge

    @property
    def image(self):
        angle = np.angle(self.v, deg=True)
        charge_remain = self.remain / self.charge
        h = 1 + util.parabola_height(charge_remain)
        return pygame.transform.rotozoom(
            self._image,
            -angle,
            h * 0.8,
        )

    @property
    def rect(self):
        r = self.image.get_rect()
        r.center = (self.x.real, self.x.imag)
        return r

    def update(self):
        if self.remain <= 0:
            self._game.sprites.remove(self)
        speed = 0.5
        dt = self._game.clock.get_time()
        self.x += speed * self.v * dt
        self.remain -= dt / 1000

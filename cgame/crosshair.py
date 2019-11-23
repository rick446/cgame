import pygame
import numpy as np

from . import util


class Crosshair(pygame.sprite.Sprite):

    def __init__(self, game):
        super().__init__()
        self._game = game
        self.image = util.load_image('crosshair.png')
        self.rect = self.image.get_rect()
        self.charge = 0.0

    def update(self):
        pos = pygame.mouse.get_pos()
        self.rect.center = pos

        b1, b2, b3 = pygame.mouse.get_pressed()
        dt = self._game.clock.get_time()
        if b1:
            self.charge = min(1.0, self.charge + dt / 1000)
        else:
            if self.charge:
                self._game.shoot(pos, self.charge)
                self.charge = 0


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
        angle = np.angle(complex(*self.v), deg=True)
        charge_remain = self.remain / self.charge
        scale = -4 * (charge_remain - 0.5)**2 + 1
        return pygame.transform.rotozoom(
            self._image,
            -angle,
            scale * 0.8,
        )

    @property
    def rect(self):
        r = self.image.get_rect()
        r.center = self.x.astype(int)
        return r

    def update(self):
        if self.remain <= 0:
            self._game.sprites.remove(self)
        speed = 0.5
        dt = self._game.clock.get_time()
        self.x += speed * self.v * dt
        self.remain -= dt / 1000

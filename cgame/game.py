import pygame
import numpy as np

from . import util
from .hero import Hero
from .crosshair import Crosshair, Arrow


class Game:

    def __init__(self, width, height):
        logo = util.load_image('200px-Legenda_grodzisko.svg.png')
        pygame.display.set_icon(logo)
        pygame.display.set_caption("Castle Game")

        width, height = 1024, 768
        self.screen = pygame.display.set_mode((width, height))
        self.clock = pygame.time.Clock()

        # bg_img = util.load_image('rocks.png')
        bg_img = util.load_image('snow.png')
        self.background = pygame.Surface(self.screen.get_size())
        util.blit_tiled(bg_img, self.background)
        self.dl = pygame.sprite.RenderUpdates()
        self.player = Hero(self)
        self.dl.add(self.player)
        self.crosshair = Crosshair(self)
        self.controller = Controller(self)

    def run(self):
        self.screen.blit(self.background, (0, 0))
        pygame.display.flip()

        while True:
            self.clock.tick(60)
            for event in pygame.event.get():
                if event.type in (pygame.QUIT,):
                    return
                if event.type == pygame.KEYDOWN:
                    if event.unicode == 'q':
                        return

            self.dl.clear(self.screen, self.background)
            self.controller.update()
            self.dl.update()
            dirty_list = self.dl.draw(self.screen)
            pygame.display.update(dirty_list)

    def shoot(self, target, charge):
        x = self.player.x.astype(float)
        v = (target - x).astype(float)
        v /= np.linalg.norm(v)
        arrow = Arrow(self, x, v, charge)
        self.dl.add(arrow)


class Controller:

    def __init__(self, game):
        self._game = game

    def update(self):
        self.handle_player_jumping()
        self.handle_player_velocity()
        self.handle_player_shoot()

    def handle_player_velocity(self):
        keys = pygame.key.get_pressed()
        if self._game.player.jump_pct > 0:
            return
        speed = 2
        if keys[pygame.K_LSHIFT] or keys[pygame.K_RSHIFT]:
            speed = 1
        if keys[pygame.K_LCTRL] or keys[pygame.K_RCTRL]:
            speed = 3

        v = np.zeros(2)

        if keys[pygame.K_LEFT] or keys[pygame.K_a]:
            v[0] = -1
        elif keys[pygame.K_RIGHT] or keys[pygame.K_d]:
            v[0] = 1
        if keys[pygame.K_UP] or keys[pygame.K_w]:
            v[1] = -1
        elif keys[pygame.K_DOWN] or keys[pygame.K_s]:
            v[1] = 1

        v = complex(*v)

        self._game.player.v = speed * v
        if abs(v):
            self._game.player.v /= abs(v)
        return

    def handle_player_jumping(self):
        keys = pygame.key.get_pressed()
        if self._game.player.jump_pct <= 0:
            if keys[pygame.K_SPACE]:
                self._game.player.jump_pct = 1
        else:
            self._game.player.jump_pct -= self._game.clock.get_time() / 400

    def handle_player_shoot(self):
        b1, b2, b3 = pygame.mouse.get_pressed()
        if b3:
            self._game.dl.add(self._game.crosshair)
        elif self._game.crosshair.charge:
            self._game.crosshair.shoot()

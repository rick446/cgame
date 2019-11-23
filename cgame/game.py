import pygame

from . import util
from .hero import Hero


class Game:

    def __init__(self, width, height):
        logo = util.load_image('200px-Legenda_grodzisko.svg.png')
        pygame.display.set_icon(logo)
        pygame.display.set_caption("Castle Game")

        width, height = 1024, 768
        self.screen = pygame.display.set_mode((width, height))
        self.clock = pygame.time.Clock()

        bg_img = util.load_image('rocks.png')
        self.background = pygame.Surface(self.screen.get_size())
        util.blit_tiled(bg_img, self.background)
        self.sprites = pygame.sprite.RenderUpdates()
        self.sprites.add(Hero(self))

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

            self.sprites.clear(self.screen, self.background)
            self.sprites.update()
            dirty_list = self.sprites.draw(self.screen)
            pygame.display.update(dirty_list)

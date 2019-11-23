import random
import pkg_resources

import numpy as np
import pygame

from .game import Game


def main():
    pygame.init()
    g = Game(1024, 768)
    g.run()


def main2():

    pygame.init()
    # load and set the logo
    logo = load_image('200px-Legenda_grodzisko.svg.png')
    pygame.display.set_icon(logo)
    pygame.display.set_caption("minimal program")

    width, height = 1024, 768
    screen = pygame.display.set_mode((width, height))

    background = Background(screen)
    hero_images = load_tiled_images(
        'Old%20hero.png', 16, 16, colorkey=(157, 142, 135)
    )

    # num_heros = len(hero_images)
    # xs = np.random.randint(width-111, size=num_heros)
    # ys = np.random.randint(height-111, size=num_heros)
    # dxs = np.random.randint(10, size=num_heros)
    # dys = np.random.randint(10, size=num_heros)

    # balls = [
    #     Ball(screen, hero_image, (x, y), (dx, dy))
    #     for (hero_image, x, y, dx, dy) in zip(hero_images, xs, ys, dxs, dys)
    # ]
    clock = pygame.time.Clock()
    # allsprites = pygame.sprite.RenderUpdates(balls)
    allsprites = pygame.sprite.RenderUpdates([TiledSprite(hero_images)])

    background.blit(screen)
    pygame.display.flip()

    while True:
        elapsed = clock.tick(60)
        print(clock.get_time())
        for event in pygame.event.get():
            if event.type in (pygame.QUIT, pygame.KEYDOWN):
                return
        allsprites.clear(screen, background.surf)
        allsprites.update()
        dirty_list = allsprites.draw(screen)
        pygame.display.update(dirty_list)


class Background:
    filename = 'rocks.png'

    def __init__(self, surf):
        self.image = load_image(self.filename).convert()
        self.surf = pygame.Surface(surf.get_size())
        r = self.image.get_rect()
        for xoff in range(0, self.surf.get_width(), r.w):
            for yoff in range(0, self.surf.get_height(), r.h):
                self.surf.blit(self.image, r.move(xoff, yoff))

    def blit(self, surf):
        surf.blit(self.surf, (0, 0))


class Ball(pygame.sprite.Sprite):

    def __init__(self, screen, image, position, speed):
        super().__init__()
        self.screen = screen
        self.image = image
        self.rect = self.image.get_rect().move(position)
        self.speed = list(speed)

    def update(self):
        self.rect = self.rect.move(self.speed)
        surf_rect = self.screen.get_rect()
        if self.rect.left < 0 or self.rect.right > surf_rect.w:
            self.speed[0] = -self.speed[0]
        if self.rect.top < 0 or self.rect.bottom > surf_rect.h:
            self.speed[1] = -self.speed[1]


class TiledSprite(pygame.sprite.Sprite):

    def __init__(self, tiles):
        super().__init__()
        self._tiles = tiles
        self.cur = [1, 1]
        self.rect = self.image.get_rect()

    @property
    def image(self):
        return self._tiles[self.cur[0]][self.cur[1]]

    def update(self):
        pos = pygame.mouse.get_pos()
        self.rect.midtop = pos
        #self.cur[0] = (self.cur[0] + 1) % len(self._tiles)


class Hero(pygame.sprite.Sprite):
    filename = 'Old%20hero.png'

    def __init__(self):
        super().__init__()
        self.image = load_image(self.filename).convert()
        self.image.set_colorkey((157, 142, 135))
        self.rect = self.image.get_rect()
        self.rect.size = (16, 16)
        self.rect.move_ip((16,16))

    def blit(self, surf):
        surf.blit(self.image, self.rect, self.rect)

    def erase(self, surf, background):
        surf.blit(background.surf, self.rect, self.rect)

    def update(self):
        pos = pygame.mouse.get_pos()
        self.rect.midtop = pos


def load_tiled_images(filename, width, height, colorkey=None):
    image = load_image(filename).convert()
    if colorkey is not None:
        image.set_colorkey(colorkey)
    rect = image.get_rect()
    return [
        [
            image.subsurface(pygame.Rect((xoff, yoff), (width, height)))
            for xoff in range(0, rect.w, width)
        ]
        for yoff in range(0, rect.h, height)
    ]


def load_image(filename):
    return pygame.image.load(
        pkg_resources.resource_filename(
            'cgame', f'img/{filename}'
        )
    )


if __name__ == "__main__":
    main()

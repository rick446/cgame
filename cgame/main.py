import random
import pkg_resources

import numpy as np
import pygame


def main():

    pygame.init()
    # load and set the logo
    logo = load_image('200px-Legenda_grodzisko.svg.png')
    pygame.display.set_icon(logo)
    pygame.display.set_caption("minimal program")

    width, height = 1024, 768
    screen = pygame.display.set_mode((width, height))

    background = Background(screen)
    num_heros = 10
    xs = np.random.randint(width-111, size=num_heros)
    ys = np.random.randint(height-111, size=num_heros)
    dxs = np.random.randint(20, size=num_heros)
    dys = np.random.randint(20, size=num_heros)

    balls = [
        Ball(screen, (x, y), (dx, dy))
        for (x, y, dx, dy) in zip(xs, ys, dxs, dys)
    ]
    hero = Hero()
    clock = pygame.time.Clock()
    allsprites = pygame.sprite.RenderUpdates(balls + [hero])

    background.blit(screen)
    pygame.display.flip()

    while True:
        clock.tick(60)
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
    # filename = 'Old%20hero.png'
    filename = 'intro_ball.gif'

    def __init__(self, screen, position, speed):
        super().__init__()
        self.screen = screen
        self.image = load_image(self.filename).convert()
        self.rect = self.image.get_rect().move(position)
        self.speed = list(speed)

    def blit(self, surf):
        surf.blit(self.image, self.rect, self.rect)

    def erase(self, surf, background):
        surf.blit(background.surf, self.rect, self.rect)

    def update(self):
        self.rect = self.rect.move(self.speed)
        surf_rect = self.screen.get_rect()
        if self.rect.left < 0 or self.rect.right > surf_rect.w:
            self.speed[0] = -self.speed[0]
        if self.rect.top < 0 or self.rect.bottom > surf_rect.h:
            self.speed[1] = -self.speed[1]


class Hero(pygame.sprite.Sprite):
    filename = 'Old%20hero.png'

    def __init__(self):
        super().__init__()
        self.image = load_image(self.filename).convert()
        self.image.set_colorkey((157, 142, 135))
        self.rect = self.image.get_rect()

    def blit(self, surf):
        surf.blit(self.image, self.rect, self.rect)

    def erase(self, surf, background):
        surf.blit(background.surf, self.rect, self.rect)

    def update(self):
        pos = pygame.mouse.get_pos()
        self.rect.midtop = pos


def load_image(filename):
    return pygame.image.load(
        pkg_resources.resource_filename(
            'cgame', f'img/{filename}'
        )
    )


if __name__ == "__main__":
    main()

import pkg_resources

import pygame


def load_image(filename):
    return pygame.image.load(
        pkg_resources.resource_filename(
            'cgame', f'img/{filename}'
        )
    )


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


def blit_tiled(src, dest):
    r = src.get_rect()
    for xoff in range(0, dest.get_width(), r.w):
        for yoff in range(0, dest.get_height(), r.h):
            dest.blit(src, r.move(xoff, yoff))

import pkg_resources
import xml.etree.ElementTree as ET

import pygame


def load_image(filename):
    return pygame.image.load(
        pkg_resources.resource_filename(
            'cgame', f'img/{filename}'
        )
    )


def load_etree(filename):
    fn = pkg_resources.resource_filename(
        'cgame', f'img/{filename}'
    )
    return ET.parse(fn)


def load_map(filename):
    fn = pkg_resources.resource_filename(
        'cgame', f'img/{filename}'
    )
    tree = ET.parse(fn)
    root = tree.getroot()
    for rect in root.iter('{http://www.w3.org/2000/svg}rect'):
        r = pygame.Rect(
            int(round(float(rect.attrib['x']))),
            int(round(float(rect.attrib['y']))),
            int(round(float(rect.attrib['width']))),
            int(round(float(rect.attrib['height']))),
        )
        yield r


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


def parabola_height(pct):
    return -4 * (pct - 0.5)**2 + 1

import pygame

from . import util


class Wall(pygame.sprite.Sprite):

    def __init__(self, rect, **attrib):
        super().__init__()
        self.image = pygame.Surface(rect.size)
        util.blit_tiled(util.load_image('rocks.png'), self.image)
        self.rect = rect
        self.attrib = attrib

    @classmethod
    def from_svg(cls, tag):
        rect = pygame.Rect(
            int(round(float(tag.attrib['x']))),
            int(round(float(tag.attrib['y']))),
            int(round(float(tag.attrib['width']))),
            int(round(float(tag.attrib['height']))),
        )
        self = cls(rect, **tag.attrib)
        return self

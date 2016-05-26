# Script to reduce images size.

from PIL import Image
import numpy as np
import os

def reduce_images(path, h, w):
	images = os.listdir(path)

	for name in images:
		route = os.path.join(path, name)
		img = Image.open(route).convert("L")
		#img.show()
		img_reduce = img.resize((h, w))
		img_reduce.save(route)

reduce_images("data/segmentation/yes", 20, 20)
reduce_images("data/segmentation/no", 20, 20)

for i in range(ord('a'), ord('z')+1):
	reduce_images("data/letters/"+chr(i), 20, 20)
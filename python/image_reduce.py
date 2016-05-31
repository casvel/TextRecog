# Script to reduce images size.

from PIL import Image
import os

def reduce_images(path, dest, h, w):
	images = os.listdir(path)

	for name in images:
		route = os.path.join(path, name)
		img = Image.open(route).convert("L")
		#img.show()
		img_reduce = img.resize((h, w), Image.ANTIALIAS)

		route_dest = os.path.join(dest, name)
		img_reduce.save(route_dest)

path_seg = "../data/segmentation/full"
dest_seg = "../data/segmentation"
path_ltr = "../data/letters/full"
dest_ltr = "../data/letters"

reduce_images(path_seg+"/yes", dest_seg+"/yes", 20, 20)
reduce_images(path_seg+"/no", dest_seg+"/no", 20, 20)

for i in range(ord('a'), ord('z')+1):
	reduce_images(path_ltr+"/"+chr(i), dest_ltr+"/"+chr(i), 20, 20)
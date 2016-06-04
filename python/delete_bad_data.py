from PIL import Image
import os

path_yes = "../data/segmentation/yes"
path_no  = "../data/segmentation/no"

def is_bad_yes(img, pixels):
	w, h = img.size
	img  = img.load()
	black = 0
	for i in range(h):
		if img[w/2-1, i] != 255:
			black += 1

		if black > pixels:
			return True

	return False

def is_bad_no(img, cols):
	w, h = img.size
	img  = img.load()

	left  = False
	right = False
	for j in range(cols):
		for i in range(h):
			if img[j, i] != 255: 
				left = True
			if img[w-j-1, i] != 255:
				right = True

	return not left or not right

images = os.listdir(path_yes)
for name in images:
	route = os.path.join(path_yes, name)
	img   = Image.open(route).convert("L")
	if is_bad_yes(img, 5):
		os.remove(route)

images = os.listdir(path_no)
for name in images:
	route = os.path.join(path_no, name)
	img   = Image.open(route).convert("L")
	if is_bad_no(img, 1):
		os.remove(route)
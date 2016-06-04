from PIL import Image
import os

path_yes = "../data/segmentation/yes"
path_no  = "../data/segmentation/no"

def is_bad_yes(image, pixels):
	w, h = image.size
	img  = image.load()
	black = 0
	for i in range(h):
		if img[w/2-1, i] != 255:
			black += 1

		if black > pixels:
			return True

	return False

def is_bad_no(image, cols):
	w, h = image.size
	img  = image.load()

	#image.show()

	left  = False
	right = False
	for j in range(cols):
		for i in range(h):
			if img[j, i] <= 250: 
				left = True
			if img[w-j-1, i] <= 250:
				right = True

	#print([img[0, i] for i in range(h)])
	#print(left, right)
	#input()

	return not left or not right or not is_bad_yes(image, 5)

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
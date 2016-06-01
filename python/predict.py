#!/usr/bin/python

from oct2py import octave
from PIL import Image
import os

def get_rect_and_resize(img, box, h, w):
	img_rect = img.crop(box)
	img_rect = img_rect.resize((h, w), Image.ANTIALIAS)
	return img_rect

def segmentation():
	routeText  = os.path.normcase("data/test/text.png")
	routeRect  = os.path.normcase("data/test/rect.png")
	pathLetter = os.path.normcase("data/test/")

	img = Image.open(routeText).convert("L")

	octave.cd("octave/segmentation")

	w, h    = img.size
	lastx   = 0
	letters = 0

	for delta in range(0, w-50, 5):
		img_rect = get_rect_and_resize(img, (delta, 0, delta+50, h), 10, 20)
		img_rect.save(routeRect)
		#img_rect.show()
		pred = octave.getPrediction()
		#print (pred)
		#input("Enter to continue")
		if pred == 2 and delta-lastx >= 10:
			img_letter = get_rect_and_resize(img, (lastx, 0, delta+25, h), 20, 20)
			img_letter.save(os.path.join(pathLetter, str(letters)+".png"))
			lastx = delta+25
			letters += 1

	img_letter = get_rect_and_resize(img, (lastx, 0, w, h), 20, 20)
	img_letter.save(os.path.join(pathLetter, str(letters)+".png"))

segmentation()
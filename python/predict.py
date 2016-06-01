#!/usr/bin/python

from oct2py import octave
from PIL import Image
import os

data_folder   = "data/test/"
octave_folder = "octave/segmentation"

routeText = os.path.join(data_folder, "text.png")
img_text  = Image.open(routeText).convert("L")

def get_col(img, start, end, step):
	for j in range(start[0], end[0], step[0]):
		for i in range(start[1], end[1], step[1]):
			if img[j, i] != 255:
				return j


def preprocess_img():

	global img_text
	
	img  = img_text.load()
	w, h = img_text.size

	start = get_col(img, [0, 0], [w, h], [1, 1])
	end   = get_col(img, [w-1, h-1], [-1, -1], [-1, -1])

	flag = True
	while (end-start) % 50 != 0:
		if (flag or end == w-1) and start > 0:
			start -= 1
		else:
			end += 1
		flag = not flag

	img_text = img_text.crop((start, 0, end, h))


def get_rect_and_resize(img, box, h, w):
	img_rect = img.crop(box)
	img_rect = img_rect.resize((h, w), Image.ANTIALIAS)
	return img_rect

def segmentation():
	routeRect  = os.path.join(data_folder, "rect.png")

	w, h    = img_text.size
	lastx   = 0
	letters = 0

	for delta in range(0, w-50, 5):
		img_rect = get_rect_and_resize(img_text, (delta, 0, delta+50, h), 10, 20)
		img_rect.save(routeRect)
		#img_rect.show()
		pred = octave.getPrediction()
		#print (pred)
		#input("Enter to continue")
		if pred == 2 and delta-lastx >= 10:
			img_letter = get_rect_and_resize(img_text, (lastx, 0, delta+25, h), 20, 20)
			img_letter.save(os.path.join(data_folder, str(letters)+".png"))
			lastx = delta+25
			letters += 1

	img_letter = get_rect_and_resize(img_text, (lastx, 0, w, h), 20, 20)
	img_letter.save(os.path.join(data_folder, str(letters)+".png"))

octave.cd(octave_folder)
preprocess_img()
#print (img_text.size)
#img_text.show()
segmentation()
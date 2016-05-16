function X = loadImages(path)
    X = [];
    images = dir([path "*.png"]);
    for i = 1:length(images)
        img = imread([path images(i).name]);
        img_gray = ind2gray(rgb2ind(img), colormap("default"));
        X = [X; img_gray(:)'];
    end
end
function X = loadImages(path)
    X = [];
    images = dir([path "*.png"]);
    for i = 1:length(images)
        img = imread([path images(i).name]);
        #img = ind2gray(rgb2ind(img), colormap(gray));
        %size(img)
        %fprintf(images(i).name);
        X = [X; img(:)'];
    end
    
    X = double(X);
end
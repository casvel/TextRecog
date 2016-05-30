function p = getPrediction()
    path
    load params.mat;
    img = imread("../../data/test/rect.png");
    img = double(img);
    p = predict(Theta1, Theta2, img(:)');
end
function [X y] = loadData()
    X = [];
    y = [];
    
    X_yes = loadImages("../../data/segmentation/yes/");
    X_no  = loadImages("../../data/segmentation/no/");
    
    X = [X_yes; X_no];
    y = [ones(size(X_yes, 1), 1)+1; zeros(size(X_no, 1), 1)+1];
end
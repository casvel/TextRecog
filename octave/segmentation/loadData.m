function [X y] = loadData()
    X = [];
    y = [];
    
    X_yes = loadImages("../../data/segmentation/yes/");
    X_no  = loadImages("../../data/segmentation/no/");
    
    %randInd = randperm(idivide(2*size(X_no, 1), 3, "floor"));
    %randInd = randperm(size(X_yes, 1));
    %X_no = X_no(randInd,:);
    
    X = [X_yes; X_no];
    y = [ones(size(X_yes, 1), 1)+1; zeros(size(X_no, 1), 1)+1];
end
function main
    
    % Uncomment if data.mat is not saved.
    initData;
    
    load data.mat;
    randInd = randperm(size(X, 1));
    X = X(randInd,:);
    y = y(randInd,:);
    %displayData(X(1:100, :));
    
    input_layer_size = size(X, 2); % num. pixels.
    hidden_layer_size = 350;         % just guessing.
    num_labels = 26;                % num of letters.
    
    initial_Theta1 = randInitializeWeights(input_layer_size, hidden_layer_size);    
    initial_Theta2 = randInitializeWeights(hidden_layer_size, hidden_layer_size);
    initial_Theta3 = randInitializeWeights(hidden_layer_size, num_labels);
    initial_nn_params = [initial_Theta1(:) ; initial_Theta2(:); initial_Theta3(:)];
    
    % parameters for the fmincg function.
    options = optimset('MaxIter', 270);
    lambda = 0.15;                    % just guessing.
    costFunction = @(p) nnCostFunction(p, ...
                                   input_layer_size, ...
                                   hidden_layer_size, ...
                                   num_labels, X, y, lambda);
                                   
                                   
    [nn_params, cost] = fmincg(costFunction, initial_nn_params, options);

    % Obtain Theta1 and Theta2 back from nn_params
    Theta1 = reshape(nn_params(1:hidden_layer_size * (input_layer_size + 1)), ...
                     hidden_layer_size, (input_layer_size + 1));

    Theta2 = reshape(nn_params((1 + (hidden_layer_size * (input_layer_size + 1))):(hidden_layer_size * (input_layer_size + 1) + (hidden_layer_size + 1) * hidden_layer_size)), ...
                     hidden_layer_size, (hidden_layer_size + 1));

    Theta3 = reshape(nn_params((1 + (hidden_layer_size * (input_layer_size + 1) + (hidden_layer_size + 1) * hidden_layer_size)):end), ...
                     num_labels, (hidden_layer_size + 1));                    
       
     
    pred = predict(Theta1, Theta2, Theta3, X);
    
    save params.mat Theta1 Theta2 Theta3;
    
    fprintf('\nTraining Set Accuracy: %f\n', mean(double(pred == y)) * 100);
    fprintf('Pred A: %d\n', sum(pred == 1));
    fprintf('Pred B: %d\n', sum(pred == 2));
    fprintf('Pred C: %d\n', sum(pred == 3));
    fprintf('Pred D: %d\n', sum(pred == 4));
    fprintf('Pred E: %d\n', sum(pred == 5));
    fprintf('Pred F: %d\n', sum(pred == 6));
    fprintf('Pred G: %d\n', sum(pred == 6));
    fprintf('Pred H: %d\n', sum(pred == 7));
    fprintf('Pred I: %d\n', sum(pred == 8));
    fprintf('Pred J: %d\n', sum(pred == 9));
    fprintf('Pred K: %d\n', sum(pred == 10));
    fprintf('Pred L: %d\n', sum(pred == 11));
    fprintf('Pred M: %d\n', sum(pred == 12));
    fprintf('Pred N: %d\n', sum(pred == 13));
    fprintf('Pred O: %d\n', sum(pred == 14));
    fprintf('Pred P: %d\n', sum(pred == 15));
    fprintf('Pred Q: %d\n', sum(pred == 16));
    fprintf('Pred R: %d\n', sum(pred == 17));
    fprintf('Pred S: %d\n', sum(pred == 18));
    fprintf('Pred T: %d\n', sum(pred == 19));
    fprintf('Pred U: %d\n', sum(pred == 20));
    fprintf('Pred V: %d\n', sum(pred == 21));
    fprintf('Pred W: %d\n', sum(pred == 22));
    fprintf('Pred X: %d\n', sum(pred == 23));
    fprintf('Pred Y: %d\n', sum(pred == 24));
    fprintf('Pred Z: %d\n', sum(pred == 25));

end
function main
    
    % Uncomment if data.mat is not saved.
    %initData;
    
    load data.mat;
    randInd = randperm(size(X, 1));
    X = X(randInd,:);
    y = y(randInd,:);
    %displayData(X(1:100, :));
    
    input_layer_size = size(X, 2); % num. pixels.
    hidden_layer_size = 250;         % just guessing.
    num_labels = 2;                % yes/no. 
    
    initial_Theta1 = randInitializeWeights(input_layer_size, hidden_layer_size);
    initial_Theta2 = randInitializeWeights(hidden_layer_size, num_labels);
    initial_nn_params = [initial_Theta1(:) ; initial_Theta2(:)];
    
    % parameters for the fmincg function.
    options = optimset('MaxIter', 200);
    lambda = 0.3;                    % just guessing.
    costFunction = @(p) nnCostFunction(p, ...
                                   input_layer_size, ...
                                   hidden_layer_size, ...
                                   num_labels, X, y, lambda);
                                   
                                   
    [nn_params, cost] = fmincg(costFunction, initial_nn_params, options);

    % Obtain Theta1 and Theta2 back from nn_params
    Theta1 = reshape(nn_params(1:hidden_layer_size * (input_layer_size + 1)), ...
                     hidden_layer_size, (input_layer_size + 1));

    Theta2 = reshape(nn_params((1 + (hidden_layer_size * (input_layer_size + 1))):end), ...
                     num_labels, (hidden_layer_size + 1));
                     
        
    pred = predict(Theta1, Theta2, X);
    
    %save params.mat Theta1 Theta2;
    
    fprintf('\nTraining Set Accuracy: %f\n', mean(double(pred == y)) * 100);
    fprintf('Pred Yes: %d\n', sum(pred == 2));
    fprintf('Pred No: %d\n', sum(pred == 1));
    fprintf('Pred Yes Right / Total Yes: %f\n', sum(pred == 2 & y == 2) / sum(y == 2));
    fprintf('Pred Yes Right / Total Pred Yes: %f\n', sum(pred == 2 & y == 2) / sum(pred == 2));
end
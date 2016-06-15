function [X y] = loadData()
    X = [];
    y = [];
    
    X_a  = loadImages("../../data/letters/a/");
    X_b  = loadImages("../../data/letters/b/");
    X_c  = loadImages("../../data/letters/c/");
    X_d  = loadImages("../../data/letters/d/");
    X_e  = loadImages("../../data/letters/e/");
    X_f  = loadImages("../../data/letters/f/");
    X_g  = loadImages("../../data/letters/g/");
    X_h  = loadImages("../../data/letters/h/");
    X_i  = loadImages("../../data/letters/i/");
    X_j  = loadImages("../../data/letters/j/");
    X_k  = loadImages("../../data/letters/k/");
    X_l  = loadImages("../../data/letters/l/");
    X_m  = loadImages("../../data/letters/m/");
    X_n  = loadImages("../../data/letters/n/");
    X_o  = loadImages("../../data/letters/o/");
    X_p  = loadImages("../../data/letters/p/");
    X_q  = loadImages("../../data/letters/q/");
    X_r  = loadImages("../../data/letters/r/");
    X_s  = loadImages("../../data/letters/s/");
    X_t  = loadImages("../../data/letters/t/");
    X_u  = loadImages("../../data/letters/u/");
    X_v  = loadImages("../../data/letters/v/");
    X_w  = loadImages("../../data/letters/w/");
    X_x  = loadImages("../../data/letters/x/");
    X_y  = loadImages("../../data/letters/y/");
    X_z  = loadImages("../../data/letters/z/");
    
    X = [X_a; X_b; X_c; X_d; X_e; X_f; X_g; X_h; X_i; X_j; X_k; X_l; X_m; X_n; X_o; X_p; X_q; X_r; X_s; X_t; X_u;
         X_v; X_w; X_y; X_z];
                  
    y = [ones(size(X_a, 1), 1); 2*ones(size(X_a, 1), 1); 3*ones(size(X_a, 1), 1); 
        4*ones(size(X_a, 1), 1); 5*ones(size(X_a, 1), 1);  6*ones(size(X_a, 1), 1); 7*ones(size(X_a, 1), 1); 
        8*ones(size(X_a, 1), 1); 9*ones(size(X_a, 1), 1); 10*ones(size(X_a, 1), 1); 11*ones(size(X_a, 1), 1);
        12*ones(size(X_a, 1), 1); 13*ones(size(X_a, 1), 1); 14*ones(size(X_a, 1), 1); 15*ones(size(X_a, 1), 1);
        16*ones(size(X_a, 1), 1); 17*ones(size(X_a, 1), 1); 18*ones(size(X_a, 1), 1); 19*ones(size(X_a, 1), 1); 
        20*ones(size(X_a, 1), 1); 21*ones(size(X_a, 1), 1); 22*ones(size(X_a, 1), 1); 23*ones(size(X_a, 1), 1);
        24*ones(size(X_a, 1), 1); 25*ones(size(X_a, 1), 1); 26*ones(size(X_a, 1), 1)];
        
end
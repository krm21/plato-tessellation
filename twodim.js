function twodim(x, y, f){
    let rv = [];
    for(let i=0; i<x; i++){
        let row = [];
        for(let j=0; j<y; j++){
            row.push(f(i, j));
        }
        rv.push(row);
    }
    return rv;
}

function sumtwodim(arr){
    return arr.reduce((s, row) => (row.reduce((a, b) => a+b, 0)+s), 0);
}

function mtable(x, y){
    let rv = {};
    for(let i=1; i<=x; i++){
        let row = {};
        for(let j=1; j<=y; j++){
            row[j] = 1;
        }
        rv[i] = row;
    }
    return rv;
}

function alter_mtable_record(x, y, m, f){
    m[x][y] *= f;
    return m;
}

function very_good_asw(x, y, m){
    return alter_mtable_record(x, y, m, 0.8);
}

function good_asw(x, y, m){
    return alter_mtable_record(x, y, m, 0.9);
}

function fine_asw(x, y, m){
    return alter_mtable_record(x, y, m, 1);
}

function bad_asw(x, y, m){
    return alter_mtable_record(x, y, m, 1.2);
}

// console.log(ones(10, 10));
// console.log(sumtwodim(ones(10, 10)));
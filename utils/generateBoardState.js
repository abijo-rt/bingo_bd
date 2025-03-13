
const generateBoardState = (n) => {

    // Create an array [1, 2, ..., n*n]
    const values = Array.from({ length: n * n }, (_, i) => i + 1); 
    // Shuffle the array randomly
    values.sort(() => Math.random() - 0.5); 

    // const matrix = [];
    // for (let i = 0; i < n; i++) {
    //     // Slice into rows
    //     matrix.push(values.slice(i * n, (i + 1) * n)); 
    // }

    return values;
}

export default generateBoardState;
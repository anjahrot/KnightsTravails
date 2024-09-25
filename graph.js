//Build graph for moving on a board with a certain dimension (e.g. 8*8 for chessboard)
buildGraph = (dimension) => {
    const graph =  {};
    
    for(let x=0; x<dimension; x++) {
        for(let y=0; y<dimension; y++){
            graph[[x,y]] = [];
            let potentialNext = [[x+1, y+2], [x+2, y+1], [x+2, y-1], [x+1, y-2], [x-1, y-2], [x-2, y-1], [x-2, y+1], [x-1, y+2]];
            for (let item of potentialNext){
                const [a, b] = item;
                if(a>=0 && a<dimension && b>=0 && b<=dimension){
                    graph[[x,y]].push(item);
                }
            }
        }
    }
    return graph;
}

const graph = buildGraph(8);
console.log(graph);
const breadthFirstShortestPath = (graph, start, end) => {
    const visited = new Set([JSON.stringify(start)]);
    const queue = [[start, 0]];
    const prev = {[JSON.stringify(start)]: null};
    
    while(queue.length > 0){
        let [currNode, distance] = queue.shift(); //Destructure to get node, distance and parentnode
        console.log(currNode);
        if(JSON.stringify(currNode) === JSON.stringify(end)) {
            console.log(`You made it in ${distance} moves. Here is your path: `);
            let path = [];
            let curr = JSON.stringify(currNode);
            while (curr) {
                path.push(curr);  //Adds parent node to path-array
                curr = prev[curr];   //Finds parent node in prevarray
            }
            while (path.length > 0){
                let node = path.pop();
                console.log(node);
            }
            return;
        }
        for(let next of graph[currNode]){
            if(!visited.has(JSON.stringify(next))){
                visited.add(JSON.stringify(next));
                queue.push([next, distance + 1]);
                prev[JSON.stringify(next)] = JSON.stringify(currNode); 
            }
        }
    }
    
}

//Build graph for moving on a board with a dimension passed as argument (e.g. 8*8 for chessboard)
//potentialNext function implemented for knights movement on the board
const buildGraph = (dimension) => {
    const graph =  {};
    
    for(let x=0; x<dimension; x++) {
        for(let y=0; y<dimension; y++){
            graph[[x,y]] = [];
            let potentialNext = [[x+1, y+2], [x+2, y+1], [x+2, y-1], [x+1, y-2], [x-1, y-2], [x-2, y-1], [x-2, y+1], [x-1, y+2]];
            for (let item of potentialNext){
                const [a, b] = item;
                if(a>=0 && a<dimension && b>=0 && b<dimension){
                    graph[[x,y]].push(item);
                }
            }
        }
    }
    return graph;
}

const boardList = buildGraph(8);

console.log(breadthFirstShortestPath(boardList, [3,3], [4,3]));
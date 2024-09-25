const breadthFirstTraceShortestPath = (graph, start, end) => {
    const visited = new Set([JSON.stringify(start)]);
    const queue = [start];
    const prev = {[JSON.stringify(start)]: null}; //Store parent to allow tracing path
    
    while(queue.length > 0){
        let currNode = queue.shift(); 
        if(JSON.stringify(currNode) === JSON.stringify(end)) {
            let path = [];
            let curr = JSON.stringify(currNode);
            while (curr) {
                path.push(curr);  //Adds parent node to path-array
                curr = prev[curr];   //Finds parent node in prevarray
            }
            
            return path;
        }
        for(let next of graph[currNode]){
            if(!visited.has(JSON.stringify(next))){
                visited.add(JSON.stringify(next));
                queue.push(next);
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

const knightsMove = (start, end) => {
    const shortestPath = breadthFirstTraceShortestPath(boardList, start, end);
    console.log(`You made it in ${shortestPath.length-1} moves! Here's your path: `);
    while( shortestPath.length > 0 ){
        console.log(shortestPath.pop());
    } 
}

knightsMove([0,0],[7,7]);

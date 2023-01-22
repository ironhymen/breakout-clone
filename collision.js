// aabb collision detection
// Collisions between aligned rectangles
function aabbCollisionDetection(pos1, w1, h1, pos2, w2, h2) {
    let x1 = pos1.x - w1/2;
    let y1 = pos1.y - h1 / 2; 
     let x2 = pos2.x - w2/2;
    let y2 = pos2.y - h2/2;

    if(x1 + w1 < x2 || x1 > x2 + w2 || y1 + h1 < y2 || y1 > y2 + h2) {
        return false;
    }
    return true;
}

function calculateOverlap(pos1, size1, pos2, size2) {
    let highestStart = Math.max(pos1, pos2);
    let lowestEnd = Math.min(pos1 + size1, pos2 + size2);
    if (highestStart >= lowestEnd) {
        return 0;
    }
    return lowestEnd - highestStart;
}
// aabb collision detection
// Collisions between aligned rectangles
function aabbCollisionDetection(pos1, w1, h1, pos2, w2, h2) {
    let x1 = pos1.x - w1/2;
    let y1 = pos1.y - h1 / 2; 
     let x2 = pos2.x - w2/2;
    let y2 = pos2.y - h2 / 2;
    
    if (x1 < x2 + w2 &&
        x1 + w1 > x2 &&
        y1 < y2 + h2 &&
        y1 + h1 > y2) {
        return true;
    }
    return false;
}

function CollisionImpactPoint(shape1, shape2) {
    

}

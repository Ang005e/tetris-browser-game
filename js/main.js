/*


// Add listeners to the left and right arrow keys, or A and D.
document.addEventListener('keypress', e => keyEvent(e))

// Choose a tetris-like shape (from preset options).

// Movement:
// Change the position of each block to correspond to the key pressed. i.e., pressed left arrow? Move down a row.

// Rotation:
// Create a formula to move blocks around a central point. I.e. the further out the block the more it is moved.
// 1 out: v<. 2 out: vv<<. 3 out: vvv<<<.
// I see a pattern...LOOOOPS...

function keyEvent(key) {

}

function rotateBlock(shapeMiddleBlock, shapeBlocks, rotationDirection) {
    let rotationDegrees;

    // shapeMiddleBlock = The shape's centre block. Element list. Should be used to find shapeMiddlePos.
    // shapeBlocks = each individual block making up the shape. Element list.

    // Make a for() loop here to run through shapeBlocks and adjust their positions based on where they are
    // I.e., left of the middle block? Right of it? Under? Above?
    // use:

    switch (rotationDirection) {
        case 'left':
            rotationDegrees = -90
            break
        case 'right':
            rotationDegrees = 90
            break
    }

    shapeBlocks.forEach(elem => {
        let newXCoord;
        let newYCoord;

        let xCoord = elem.style.gridColumnStart
        let yCoord = elem.style.gridRowStart

        // calculate the new coordinates

        elem.style.transform = `rotate(${rotationDegrees}deg)`; // turns each block around, but doesn't move them.

        elem.style.gridColumnStart = newXCoord
        elem.style.gridRowStart = newYCoord
        // once calculated,

    })


}

 */
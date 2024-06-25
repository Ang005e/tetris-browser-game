// Globals
// NONE HAHAHAHA

// Add listeners to the left and right arrow keys, or A and D.
document.addEventListener('keydown', e => {
    rotateBlock(document.querySelectorAll('.blocks'), keyPressDirection(e))
})

// Choose a tetris-like shape (from preset options).
// A small change!
// Movement:
// Change the position of each block to correspond to the key pressed. i.e., pressed left arrow? Move down a row.

// ToDo Rotation:
// Create a formula to move blocks around a central point. I.e. the further out the block the more it is moved.
// 1 out: v<. 2 out: vv<<. 3 out: vvv<<<.
// I see a pattern...LOOOOPS...

// ToDo Circulation:
// rotate each block around in the same direction the shape is being moved

function keyPressDirection(key) {
    let direction;
    switch(key.keyCode) {
        case 37:
            direction = 'counter clockwise'
            console.log(direction)
            return direction;
        case 39:
            direction = 'clockwise'
            console.log(direction)
            return direction;
        default:
            return;
    }
}

function rotateBlock(blocks, rotationDirection) {
    let rotationDegrees;

    switch (rotationDirection) {
        case 'counter clockwise':
            rotationDegrees = -90
            break
        case 'clockwise':
            rotationDegrees = 90
            break
    }

    let xCoord = [];
    let yCoord = [];
    let xCoordRange = [];
    let yCoordRange = [];
    let xAxisFurther;

    gridDimensions()

    // testing block generation within the range of the grid
    // this should be repurposed for random placement of the left/rightmost block on the screen

    // blocks.forEach(block => block.style.gridColumnStart = (Math.round(Math.random() * gridDimensions(1))).toString())

    blocks.forEach(block => block.style.gridColumnStart = gridRange('rows'));
    blocks.forEach(block => block.style.gridRowStart = gridRange('rows'));

            for (let i = 0; i < blocks.length; i++) {
        let block = blocks[i];

        block.style.transform = `rotate(${rotationDegrees}deg)`; // turns each block around, but doesn't move them.

        xCoord[i] = block.style.gridColumnStart;
        yCoord[i] = block.style.gridRowStart;

    }

    // Calculate the new coordinates

    // Get the lowest and highest values in the arrays...
    xCoord.forEach(value => (xCoordRange < value) && (xCoordRange = value))
    yCoord.forEach(value => (yCoordRange < value) && (yCoordRange = value))

    /*
    i.e.
    1, 10
    5, 2

     */

    // ...and the axis where the blocks are the furthest apart...
    xCoordRange.sort();
    yCoordRange.sort();
    xAxisFurther = (xCoordRange[0] - xCoordRange[1]) > (yCoordRange[0] - yCoordRange[1]);
    console.log(`X axis is further? ${xAxisFurther}`);

    // ...then figure out the centre block based on that.
}

function gridDimensions(returnIndex) {
    // 0 = rows, 1 = columns, 2 = area, 3 = all
    let cols = getComputedStyle(document.querySelector('main')).gridTemplateColumns.split(' ').length
    let rows = getComputedStyle(document.querySelector('main')).gridTemplateRows.split(' ').length
    let dimensions = [rows, cols, rows*cols, [rows, cols, rows*cols]]
    console.log(dimensions);
    return dimensions[returnIndex];
}

function gridRange(axis) {
    if (axis === 'rows') {
        return (Math.round(Math.random() * gridDimensions(0))).toString();
    } else if (axis === 'columns') {
        return (Math.round(Math.random() * gridDimensions(1))).toString();
    }
}
// Globals
// NONE HAHAHAHA

// Add listeners to the left and right arrow keys, or A and D.
document.addEventListener('keydown', e => {
    let blocks = document.querySelectorAll('.blocks')
    rotateBlock(blocks, keyPressDirection(e))
})

/* ------------- RUN AT START ------------- */



// Choose a tetris-like shape (from preset options).

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
        case 37: // left arrow key
            direction = 'counter clockwise'
            break;
        case 39: // right arrow key
            direction = 'clockwise'
            break;
        default:
            return;
    }
    console.log(`DIRECTION: ${direction}`)
    return direction;
}

function rotateBlock(blocks, rotationDirection) {
    let rotation = parseInt(getComputedStyle(document.querySelector('main div')).rotate.split('deg')[0]);

    if (rotation !== ((rotation - 90) || (rotation + 90))) {
        switch (rotationDirection) {
            case 'counter clockwise':
                rotation += -90
                break
            case 'clockwise':
                rotation += 90
                break
        }
    }else if ((rotation >= 360) || (rotation <= -360)) {
        (rotation = 0)
    }

    // testing block generation within the range of the grid
    // this should be repurposed for random placement of the left/rightmost block on the screen

    blocks.forEach(block => block.style.left = `${getPageSize('width')}px`)
    blocks.forEach(block => block.style.top = `${getPageSize('height')}px`);

    for (let i = 0; i < blocks.length; i++) {
        let block = blocks[i];

        console.log(`ROTATION: ${rotation}`)
        block.style.rotate = `${rotation}deg`; // turns each block around, but doesn't move them.

        /*
        xCoord[i] = block.style.gridColumnStart;
        yCoord[i] = block.style.gridRowStart;
        */

    }

    // Calculate the new coordinates

    // Get the lowest and highest values in the arrays...

    /*
    xCoord.forEach(value => (xCoordRange < value) && (xCoordRange = value))
    yCoord.forEach(value => (yCoordRange < value) && (yCoordRange = value))

    // i.e.
    // 1, 10
    // 5, 2

    // ...and the axis where the blocks are the furthest apart...

    xCoordRange.sort();
    yCoordRange.sort();
    xAxisFurther = (xCoordRange[0] - xCoordRange[1]) > (yCoordRange[0] - yCoordRange[1]);
    console.log(`X axis is further? ${xAxisFurther}`);

    // ...then figure out the centre block based on that.

    */
}

function pageDimensions(returnIndex) {
    // pgWidth = 0, pgHeight = 1
    let pgWidth = getComputedStyle(document.querySelector('main')).width.split('p')[0]
    let pgHeight = getComputedStyle(document.querySelector('main')).height.split('p')[0]

    // Here, I've tried using width/height instead of grid

    pgHeight = Math.round(parseInt(pgHeight));
    pgWidth = Math.round(parseInt(pgWidth));
    let dimensions = [pgWidth-50, pgHeight-50] // width or height, minus the size of the block itself
    let cells = (pgWidth*pgHeight) / 50 // width divided by the block size (50)
    // console.log(cells);
    return dimensions[returnIndex];
}

function getPageSize(axis) {
    let size;
    if (axis === 'width') {
        size = (Math.random() * pageDimensions(0)).toString();
    } else if (axis === 'height') {
        size = (Math.random() * pageDimensions(1)).toString();
    }
    console.log(`${axis}: ${size}`);
    return size;
}
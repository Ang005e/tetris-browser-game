// Globals
// NONE HAHAHAHA

// Add listeners to the left and right arrow keys, or A and D.
document.addEventListener('keydown', e => {
    rotateBlock(document.querySelectorAll('.blocks'), keyPressDirection(e))
})

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
            console.log(direction)
            return direction;
        case 39: // right arrow key
            direction = 'clockwise'
            console.log(direction)
            return direction;
        default:
            return;
    }
}

function rotateBlock(blocks, rotationDirection) {
    let rotation = parseInt(getComputedStyle(document.querySelector('main div')).rotate.split('deg')[0]);

    // to avoid rotating over 360 or -360 degrees, reset the rotation property if it goes too high or low
    // not working :/
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


    let xCoordOld = [];
    let yCoordOld = [];
    let xCoordRange = [];
    let yCoordRange = [];
    let xAxisFurther;


    gridDimensions()

    /*
    ToDo:
    My Idea;
    Keep using grid as a quick easy method to calculate the location of, and place, blocks.
    However, get and use coords (top/left) LOCALLY for visual animations (as grid cannot use "transition"
    when changing the grid box of elements).

    i.e.
    1. The new location of the block is calculated in grid-col and grid-row (lets say 2, 5).
    2. The co-ordinates of the future (new) location of the block are retrieved (the
    ones we just calculated). How to do this, I wonder?
    3. The co-ordinates of the current (old) location of the block are retrieved.

    1. transition happens using coords (left and top)
    2. coords are reset so as to not interfere with anything else
    3. block moved permanently with grid row/col
    */



    // blocks.forEach(block => block.style.gridColumnStart = gridRange('columns'));
    // blocks.forEach(block => block.style.gridRowStart = gridRange('rows'));

    for (let i = 0; i < blocks.length; i++) {
        let block = blocks[i];

        console.log(rotation)
        block.style.rotate = `${rotation}deg`; // turns each block around, but doesn't move them.


        // The new location of the block is calculated in grid-col and grid-row
        let newRowPos= gridRange('rows')
        let newColPos= gridRange('columns')

        // The current (old) co-ordinates of the block are retrieved.
        xCoordOld[i] = block.style.left;
        yCoordOld[i] = block.style.top;

        //The future (new) co-ordinates of the block are retrieved
        let xCoordNew = block.style.left;
        let yCoordNew = block.style.top;

        // so before this, the temporary visual transition should happen
        block.style.gridRowStart = newRowPos;
        block.style.gridColumnStart = newColPos;
    }


    // FIGURE OUT THE CENTRE BLOCK

    // Get the lowest and highest values in the arrays...

    xCoordOld.forEach(value => (xCoordRange < value) && (xCoordRange = value))
    yCoordOld.forEach(value => (yCoordRange < value) && (yCoordRange = value))

    // i.e.
    // 1, 10
    // 5, 2

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
    let dimensions = [rows, cols, rows*cols]
    // console.log(dimensions);
    return dimensions[returnIndex];
}

function gridRange(axis) {
    if (axis === 'rows') {
        return (Math.round(Math.random() * gridDimensions(0))).toString();
    } else if (axis === 'columns') {
        return (Math.round(Math.random() * gridDimensions(1))).toString();
    }
}
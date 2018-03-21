testTools = {};

testTools.createLayout = function( config, createdCallback = null) {
    var myLayout = new window.GoldenLayout( config );

    if (createdCallback !== null) {
        createdCallback(myLayout);
    } else {
        myLayout.registerComponent( 'testComponent', testTools.TestComponent );
    }

    const resultPromise = new Promise((res, rej) => {
        myLayout.on('initialised', () => {
            res(myLayout);
        });
    });

    myLayout.init();

    return resultPromise;
};

testTools.TestComponent = function( container, state ){
    if ( state === undefined ) {
        container.getElement().html( 'that worked' );
    } else {
        container.getElement().html( state.html );
    }
    this.isTestComponentInstance = true;
};

/**
 * Takes a path of type.index.type.index, e.g.
 *
 * 'row.0.stack.1.component'
 *
 * and resolves it to an element
 *
 * @param   {String} path
 * @param   {GoldenLayout} layout
 * @param    {Function} expect Jasmine expect function
 *
 * @returns {AbstractContentItem}
 */
testTools.verifyPath = function( path, layout, expect ) {
    expect( layout.root ).toBeDefined();
    expect( layout.root.contentItems.length ).toBe( 1 );

    var pathSegments = path.split( '.' ),
        node = layout.root.contentItems[0],
        i;

    for (const segment of pathSegments) {
        const segmentNum = parseInt(segment);

        if(isNaN(segment)) {
            expect(node.type).toBe(segment);
        } else {
            node = node.contentItems[segmentNum];

            expect(node).toBeDefined();

            if(node === undefined) {
                return null;
            }
        }
    }

    return node;
};

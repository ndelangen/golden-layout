describe( 'Creates the right structure based on the provided config', function() {

    var createLayout = function( config ) {
        return testTools.createLayout(
            {
                content: [{
                    type: 'component',
                    componentName: 'testComponent',
                    componentState: { testValue: 'initial' }
                }]
            },
            (layout) => {
                layout.registerComponent( 'testComponent', function( container ){
                    container.getElement().html( 'that worked' );
                });
            }
        );
    };


    it( 'creates the right primitive types: component only', async function() {
        const layout = await createLayout({
            content: [{
                type: 'component',
                componentName: 'testComponent'
            }]
        });

        expect( layout.isInitialised ).toBe( true );
        expect( layout.root.isRoot ).toBe( true );
        expect( layout.root.contentItems.length ).toBe( 1 );
        expect( layout.root.contentItems[ 0 ].isStack ).toBe( true );
        expect( layout.root.contentItems[ 0 ].contentItems[ 0 ].isComponent ).toBe( true );

        layout.destroy();
    });

    it( 'creates the right primitive types: stack and component', async function() {
        const layout = await createLayout({
            content: [{
                type: 'stack',
                content: [{
                    type: 'component',
                    componentName: 'testComponent'
                }]
            }]
        });

        expect( layout.isInitialised ).toBe( true );
        expect( layout.root.isRoot ).toBe( true );
        expect( layout.root.contentItems.length ).toBe( 1 );
        expect( layout.root.contentItems[ 0 ].isStack ).toBe( true );
        expect( layout.root.contentItems[ 0 ].contentItems[ 0 ].isComponent ).toBe( true );

        layout.destroy();
    });

    it( 'creates the right primitive types: row and two component', function() {
        const layout = await createLayout({
            content: [{
                type: 'row',
                content: [{
                    type: 'component',
                    componentName: 'testComponent'
                },
                {
                    type: 'component',
                    componentName: 'testComponent'
                }]
            }]
        });

        expect( layout.isInitialised ).toBe( true );
        expect( layout.root.contentItems.length ).toBe( 1 );
        expect( layout.root.contentItems[ 0 ].isRow ).toBe( true );
        expect( layout.root.contentItems[ 0 ].contentItems[ 0 ].isStack ).toBe( true );
        expect( layout.root.contentItems[ 0 ].contentItems[ 1 ].isStack ).toBe( true );
        expect( layout.root.contentItems[ 0 ].contentItems.length ).toBe( 2 );
        expect( layout.root.contentItems[ 0 ].contentItems[ 0 ].contentItems[ 0 ].isComponent ).toBe( true );
        expect( layout.root.contentItems[ 0 ].contentItems[ 1 ].contentItems[ 0 ].isComponent ).toBe( true );

        layout.destroy();
    });


    it( 'creates the right primitive types: stack -> column -> component', function() {
        const layout = await createLayout({
            content: [{
                type: 'stack',
                content: [{
                    type: 'column',
                    content:[{
                        type: 'component',
                        componentName: 'testComponent'
                    }]
                }]
            }]
        });

        expect( layout.isInitialised ).toBe( true );

        expect( layout.root.contentItems.length ).toBe( 1 );
        expect( layout.root.contentItems[ 0 ].isStack ).toBe( true );

        expect( layout.root.contentItems[ 0 ].contentItems.length ).toBe( 1 );
        expect( layout.root.contentItems[ 0 ].contentItems[ 0 ].isColumn ).toBe( true );

        expect( layout.root.contentItems[ 0 ].contentItems[ 0 ].contentItems.length ).toBe( 1 );
        expect( layout.root.contentItems[ 0 ].contentItems[ 0 ].contentItems[ 0 ].isStack ).toBe( true );

        expect( layout.root.contentItems[ 0 ].contentItems[ 0 ].contentItems[ 0 ].contentItems.length ).toBe( 1 );
        expect( layout.root.contentItems[ 0 ].contentItems[ 0 ].contentItems[ 0 ].contentItems[ 0 ].isComponent ).toBe( true );

        layout.destroy();
    });
});

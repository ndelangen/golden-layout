describe( 'Sets and retrieves a component\'s state', function() {

    var layout, myComponent;

    beforeAll(function() {
        return testTools.createLayout(
            {
                content: [{
                    type: 'component',
                    componentName: 'testComponent',
                    componentState: { testValue: 'initial' }
                }]
            },
            (layout) => {
                layout.registerComponent( 'testComponent', function( container, state ){
                    this.container = container;
                    this.state = state;
                    myComponent = this;
                });
            }
        ).then(l => layout = l);
    }, 10000);

    it( 'Can create a most basic layout', function() {
        expect( myComponent.state.testValue ).toBe( 'initial' );
    });

    it( 'returns the initial state', function(){
        var config = layout.toConfig();
        expect( config.content[ 0 ].content[ 0 ].componentState.testValue ).toBe( 'initial' );
    });

    it( 'emits stateChanged when a component updates its state', function(){
        var stateChanges = 0;

        layout.on( 'stateChanged', function(){
            stateChanges++;
        });

        runs(function(){
            myComponent.container.setState({ testValue: 'updated' });
        });

        waitsFor(function(){
            return stateChanges !== 0;
        });

        runs(function(){
            expect( stateChanges ).toBe( 1 );
        });
    });

    it( 'returns the updated state', function(){
        var config = layout.toConfig();
        expect( config.content[ 0 ].content[ 0 ].componentState.testValue ).toBe( 'updated' );
    });

    it( 'Destroys the layout', function(){
        layout.destroy();
        expect( layout.root.contentItems.length ).toBe( 0 );
    });
});

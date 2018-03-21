import DragListener from '../utils/DragListener';
import DragProxy from './DragProxy';
/**
 * Allows for any DOM item to create a component on drag
 * start tobe dragged into the Layout
 */
export default class DragSource {
    /**
     *
     * @param {jQuery element} element
     * @param {Object} itemConfig the configuration for the contentItem that will be created
     * @param {LayoutManager} layoutManager
     *
     */
    constructor(element, itemConfig, layoutManager) {
        this._element = element;
        this._itemConfig = itemConfig;
        this._layoutManager = layoutManager;
        this._dragListener = null;

        this._createDragListener();
    }

    /**
     * Called initially and after every drag
     *
     * @returns {void}
     */
    _createDragListener() {
        if (this._dragListener !== null) {
            this._dragListener.destroy();
        }

        this._dragListener = new DragListener(this._element);
        this._dragListener.on('dragStart', this._onDragStart, this);
        this._dragListener.on('dragStop', this._createDragListener, this);
    }

    /**
     * Callback for the DragListener's dragStart event
     *
     * @param   {int} x the x position of the mouse on dragStart
     * @param   {int} y the x position of the mouse on dragStart
     *
     * @returns {void}
     */
    _onDragStart(x, y) {
        var itemConfig = this._itemConfig;
        if (typeof itemConfig === 'function') {
            itemConfig = itemConfig();
        }
        var contentItem = this._layoutManager._$normalizeContentItem(
                Object.assign({}, itemConfig)
            ),
            dragProxy = new DragProxy(
                x,
                y,
                this._dragListener,
                this._layoutManager,
                contentItem,
                null
            );

        this._layoutManager.transitionIndicator.transitionElements(
            this._element,
            dragProxy.element
        );
    }
}

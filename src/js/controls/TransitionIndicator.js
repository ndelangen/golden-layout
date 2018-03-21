import * as utils from '../utils/utils';

import $ from 'jquery';

export default class TransitionIndicator {
    constructor() {
        this._element = $('<div class="lm_transition_indicator"></div>');
        $(document.body).append(this._element);

        this._toElement = null;
        this._fromDimensions = null;
        this._totalAnimationDuration = 200;
        this._animationStartTime = null;
    }

    destroy() {
        this._element.remove();
    }

    transitionElements(fromElement, toElement) {
        /**
         * TODO - This is not quite as cool as expected. Review.
         */
        return;
        this._toElement = toElement;
        this._animationStartTime = utils.now();
        this._fromDimensions = this._measure(fromElement);
        this._fromDimensions.opacity = 0.8;
        this._element.show().css(this._fromDimensions);
        utils.animFrame(this._nextAnimationFrame.bind(this));
    }

    _nextAnimationFrame() {
        var toDimensions = this._measure(this._toElement),
            animationProgress =
                (utils.now() - this._animationStartTime) /
                this._totalAnimationDuration,
            currentFrameStyles = {},
            cssProperty;

        if (animationProgress >= 1) {
            this._element.hide();
            return;
        }

        toDimensions.opacity = 0;

        for (cssProperty in this._fromDimensions) {
            currentFrameStyles[cssProperty] =
                this._fromDimensions[cssProperty] +
                (toDimensions[cssProperty] -
                    this._fromDimensions[cssProperty]) *
                    animationProgress;
        }

        this._element.css(currentFrameStyles);
        utils.animFrame(this._nextAnimationFrame.bind(this));
    }

    _measure(element) {
        var offset = element.offset();

        return {
            left: offset.left,
            top: offset.top,
            width: element.outerWidth(),
            height: element.outerHeight()
        };
    }
}

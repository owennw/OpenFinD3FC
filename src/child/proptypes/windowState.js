import { PropTypes } from 'react';

const windowStateShape = PropTypes.shape({
    isCompact: PropTypes.bool.isRequired,
    isMaximised: PropTypes.bool.isRequired,
    isResizing: PropTypes.bool.isRequired
}).isRequired;

export default windowStateShape;

import React from 'react'
import {connect} from 'react-redux'
import {removePoint, changePositionPointList} from "../actionCreators";
import {mapToArr} from "../helpers";
import {SortableContainer, SortableElement} from 'react-sortable-hoc';

const SortableItem = SortableElement(({point, remove}) => <li className="list-group-item">
    {point.name}
    <button className="remove-button" onClick={remove(point.id)}>&times;</button>
</li>);

const SortableList = SortableContainer(({points, remove}) => {
    return (
        <ul className="list-group list-group-flush">
            {points.map((point, i) => (
                <SortableItem key={point.id} index={i} point={point} remove={remove}/>
            ))}
        </ul>
    );
});


class PointList extends React.Component {

    render() {
        const {points} = this.props;
        return <SortableList points={points} remove={this.remove} onSortEnd={this.onSortEnd}/>;
    }

    onSortEnd = ({oldIndex, newIndex}) => {
        const {changePositionPointList} = this.props;
        changePositionPointList(oldIndex, newIndex);
    }

    remove = (id) => () => {
        this.props.removePoint(id);
    }
}

export default connect((state) => ({points: mapToArr(state.points)}), {
    removePoint,
    changePositionPointList
})(PointList);
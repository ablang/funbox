import {
    ACTION_POINT_ADD,
    ACTION_POINT_CHANGE_LOCATION,
    ACTION_POINT_LIST_CHANGE_POSITION,
    ACTION_POINT_REMOVE
} from "../constants";
import {Record, OrderedMap} from 'immutable'

const Point = new Record({
    location: null,
    name: '',
    id: undefined
});

export default (points = new OrderedMap(), action) => {
    const {type, payload} = action;
    switch (type) {
        case ACTION_POINT_ADD:
            const id = Math.random().toString(16).slice(2);
            return points.set(id, new Point({name: payload.name, id: id}));
        case ACTION_POINT_CHANGE_LOCATION:
            return points.setIn([payload.id, 'location'], payload.location);
        case ACTION_POINT_REMOVE:
            return points.delete(payload.id);
        case ACTION_POINT_LIST_CHANGE_POSITION:
            const arr = points.toList().toArray();
            arr.splice(payload.newIndex, 0, arr.splice(payload.oldIndex, 1)[0]);
            return OrderedMap().withMutations(r => {
                arr.forEach(point => {
                    r.set(point.id, point);
                });
            });
    }
    return points;
}
import {
    ACTION_POINT_ADD, ACTION_POINT_CHANGE_LOCATION,
    ACTION_POINT_REMOVE, ACTION_POINT_LIST_CHANGE_POSITION,
} from "../constants";

export function addPoint(name) {
    return {
        type: ACTION_POINT_ADD,
        payload: {name}
    }
}

export function removePoint(id) {
    return {
        type: ACTION_POINT_REMOVE,
        payload: {id}
    }
}

export function changeLocationPoint(id, location) {
    return {
        type: ACTION_POINT_CHANGE_LOCATION,
        payload: {id, location}
    }
}

export function changePositionPointList(oldIndex, newIndex) {
    return {
        type: ACTION_POINT_LIST_CHANGE_POSITION,
        payload: {oldIndex, newIndex}
    }
}
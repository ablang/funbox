import React from 'react';
import RouteInput from './routeInput'
import PointList from './pointList'
import store from '../store'
import {Provider} from 'react-redux'
import MyMap from './myMap'

export default () => {
    return <Provider store={store}>
        <div className="row">
            <div className="col-md-3">
                <div className="card">
                    <div className="card-header">
                        <RouteInput/>
                    </div>
                    <PointList/>
                </div>
            </div>
            <div className="col-md-9">
                <MyMap containerElement={<div style={{height: `500px`}}/>}
                           mapElement={<div style={{height: `100%`}}/>}/>
            </div>
        </div>
    </Provider>
}
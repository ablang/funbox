import React from 'react'
import {withGoogleMap, GoogleMap, Polyline} from "react-google-maps";
import {connect} from 'react-redux';
import Point from './point'
import {changeLocationPoint} from "../actionCreators";
import {mapToArr} from "../helpers";

class MyMap extends React.Component {

    componentWillReceiveProps({points, changeLocationPoint}) {
        points.forEach(point => {
            if (point.location === null) {
                changeLocationPoint(point.id, this.map.getCenter());
            }
        });
    }

    render() {
        const mapState = {defaultCenter: {lat: 55.76, lng: 37.64}, defaultZoom: 12};
        return <GoogleMap {...mapState} ref={this.onMapMounted}>
            <Polyline path={this.props.points.filter(point => point.location != null).map(point => point.location)}/>
            {this.props.points.map(point => <Point key={point.id} point={point}/>)}
        </GoogleMap>
    }

    onMapMounted = (ref) => {
        this.map = ref;
    }
}


export default connect((state) => ({points: mapToArr(state.points)}), {changeLocationPoint})(withGoogleMap((props) =>
    <MyMap {...props}/>));




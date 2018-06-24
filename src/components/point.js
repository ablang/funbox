import React from 'react';
import {Marker, InfoWindow} from 'react-google-maps'
import {connect} from 'react-redux'
import {changeLocationPoint} from "../actionCreators";

class Point extends React.Component {

    state = {
        isOpen: false,
        title: null
    };

    render() {
        const {point} = this.props;
        const {isOpen, title} = this.state;
        return <Marker ref={this.onMarkerMounted} position={point.location} onClick={this.onToggleOpen} draggable={true}
                       onPositionChanged={this.onPositionChanged}>
            {isOpen && <InfoWindow onCloseClick={this.onToggleOpen}>
                <div>{title}</div>
            </InfoWindow>}
        </Marker>
    }

    onMarkerMounted = (ref) => {
        this.marker = ref;
    };

    onPositionChanged = () => {
        const {point, changeLocationPoint} = this.props;
        changeLocationPoint(point.id, this.marker.getPosition());
    };

    onToggleOpen = () => {
        const me = this;
        const {isOpen} = this.state;
        if (!isOpen) {
            const geocoder = new google.maps.Geocoder();
            geocoder.geocode({
                'latLng': this.props.point.location
            }, function (results, status) {
                if (status === google.maps.GeocoderStatus.OK && results[0]) {
                    me.setState({title: results[0].formatted_address});
                }
            });
        }
        this.setState({isOpen: !isOpen})
    }
}

export default connect(null, {changeLocationPoint})(Point);
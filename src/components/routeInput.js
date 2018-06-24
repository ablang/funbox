import React from 'react';
import {connect} from 'react-redux';
import {addPoint} from "../actionCreators";

class RouteInput extends React.Component {

    state = {
        value: ''
    };

    render() {
        const {value} = this.state;
        return <div>
            <input type="text" value={value} placeholder="Новая точка маршрута" className="form-control"
                   onChange={this.onChange} onKeyPress={this.onKeyPress}/>
        </div>
    }

    onChange = (e) => {
        this.setState({value: e.target.value});
    };

    onKeyPress = (e) => {
        const {value} = this.state;
        if (e.key === 'Enter' && value.trim() !== '') {
            this.props.addPoint(value);
            this.setState({value: ''});
        }
    }
}

export default connect(null, {addPoint})(RouteInput);
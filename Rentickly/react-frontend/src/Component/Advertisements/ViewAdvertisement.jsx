import React from 'react'; 


class ViewAdvertisement extends React.Component {

    constructor(props) {
        super(props);
        console.log(this.props.location.myCustomProps);
      }

    render(){
        return (
            <div>
                Hello World
            </div>
        )
    }
}

export default ViewAdvertisement; 
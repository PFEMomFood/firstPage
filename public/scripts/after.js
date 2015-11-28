/**
 * Created by Emily on 27/11/15.
 */
/**
 * Created by Emily on 18/11/15.
 */
// tutorial1.js


var EventList = React.createClass({
  render: function() {
    var eventNodes = this.props.data.map(function(event) {
      return (
        <Event item={event}  key={event.id}>
        </Event>
      );
    });
    return (
      <ul className="eventList">
        {eventNodes}
      </ul>
    );
  }
});

var Event = React.createClass({
  /*getInitialState: function() {
    return {root: "image/"+this.props.item.id+".jpg"};
  },*/
  render: function() {
    var root="image/"+this.props.item.id+".jpg";
    return (
      <li className="event col-lg-4 col-md-6">
        <div className="event-img">
          <img src={root} alt="event-photo"/>
        </div>
        <div className="event-text">
          <p><h2 className="event-title">{this.props.item.title}</h2></p>
          <p><h4 className="event-sub">{this.props.item.subTitle}</h4></p>
          <p><h4 className="event-time"><i className="timeIcon"></i> {this.props.item.time}</h4></p>
          <p>
            <span className="event-price">{this.props.item.price}</span>
            <span> PER PERSON</span>
          </p>
        </div>
      </li>
    );
  }
});




var EventArea = React.createClass({
  loadEventsFromServer: function() {

    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
        console.log(data);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {   //listen to the backend every 2 seconds
    this.loadEventsFromServer();
    setInterval(this.loadEventsFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      <section className="eventArea container">

        <EventList data={this.state.data} />

      </section>
    );
  }
});



ReactDOM.render(
  <EventArea url="/api/events" pollInterval={2000} />,
  document.getElementById('content')
);








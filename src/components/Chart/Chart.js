import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import ChartJs from 'chart.js';

export default  class Chart extends React.Component {
  constructor(props){
    super(props);

    this.generateRandomColor = this.generateRandomColor.bind(this);
  }

  generateRandomColor(number){
    let colors = [];

    for( let i = 0; i < number; i++){
      let r = Math.floor(Math.random() * 255);
      let g = Math.floor(Math.random() * 255);
      let b = Math.floor(Math.random() * 255);

      colors.push("rgb(" + r + "," + g + "," + b + ")");
    }

    return colors;
  }

  componentDidMount(){
    const ctx = document.getElementById('chart');
    console.log(this.props.poll);

    const data = this.props.poll.options.map( (option) => {
       return Number(option.votes);
    });

    const labels = this.props.poll.options.map( (option) => {
       return option.name;
    });

    const colors = this.generateRandomColor(data.length);

    console.log(data);

    const myChart = new ChartJs(ctx, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: colors
        }]
      }, 
      options: {
        legend: {
          display: true,
          position: 'bottom'
        }
      }
    });


  }

  render(){
    return (
      <div>Chart.js
        <canvas id='chart' width='400' height='400' />
      </div>
    );
  }
}

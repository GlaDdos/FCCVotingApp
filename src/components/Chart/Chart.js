import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import ChartJs from 'chart.js';

export default  class Chart extends React.Component {
  constructor(props){
    super(props);

    //component wide handler to destroy chart after new option is created
    this.chartHandle = false;

    this.generateRandomColor = this.generateRandomColor.bind(this);
    this.createChart = this.createChart.bind(this);
  }

  componentDidMount(){
    this.chartHandle = this.createChart();
  }

  componentDidUpdate(prevProps, prevState){
    if(prevProps.poll !== this.props.poll){

      if(this.chartHandle) {
        this.chartHandle.destroy();
        this.chartHandle = null;
      }
      
     this.chartHandle = this.createChart();
    }


    
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

  createChart(){
    const ctx = document.getElementById('chart');

    const data = this.props.poll.options.map( (option) => {
       return Number(option.votes);
    });

    const labels = this.props.poll.options.map( (option) => {
       return option.name;
    });

    const colors = this.generateRandomColor(data.length);

    return new ChartJs(ctx, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          borderColor: 'rgba(0,0,0,0.3)',
          data: data,
          backgroundColor: colors
        }]
      }, 
      options: {
        legend: {
          labels: {
            fontColor: '#fff'
          },
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

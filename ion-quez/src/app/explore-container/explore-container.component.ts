import { Component, Input, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-explore-container',
  templateUrl: './explore-container.component.html',
  styleUrls: ['./explore-container.component.scss'],
})
export class ExploreContainerComponent implements OnInit {

  public chart1: any;
  public chart2: any;
  public chart3: any;


  ngOnInit() {
    this.createCharts();
  }

  createCharts(){
    // Who is most likely to win this year's Hunt?
    this.chart1 = new Chart("Chart1", {
      type: 'bar',
      data: {
        labels: ['Yamamoto','Tamsin','Nobody','Charles','Ares','Johnathan'], 
	       datasets: [
          {
            label: "Votes",
            data: ['1051','576','401','233','99','89'],
            backgroundColor: '#3880ff'
          }
        ]
      },
    });
    // What is your favorite moment of this year's Hunt so far?
    this.chart2 = new Chart("Chart2", {
      type: 'bar',
      data: {
        labels: ['Ares & Artemis reunion','Sparkle',"Yamamoto's killing spree",'Ares & Tamsin betrayal'], 
	       datasets: [
          {
            label: "Votes",
            data: ['1708','429', '372', '150'],
            backgroundColor: '#3880ff'
          }
        ]
      },
    });
    // How many survivors will make it out of this year's Hunt?
    this.chart3 = new Chart("Chart3", {
      type: 'bar',

      data: {
        labels: ['Zero', 'One', 'Two','Three'], 
	       datasets: [
          {
            label: "Votes",
            data: ['2019','399', '29', '7'],
            backgroundColor: '#3880ff'
          }
        ]
      },
    });
  }

}

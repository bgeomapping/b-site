import { Component, OnInit } from '@angular/core';
import * as d3Selection from 'd3-selection';
import * as d3Fetch from 'd3-fetch';
import * as d3Scale from 'd3-scale';
import * as d3Geo from 'd3-geo';
import * as d3Collection from 'd3-collection';
import * as topojson from 'topojson-client';
import { forkJoin, from } from 'rxjs';

@Component({
  selector: 'app-us-drought',
  templateUrl: './us-drought.component.html',
  styleUrls: ['./us-drought.component.scss']
})
export class UsDroughtComponent implements OnInit {
  map;
  data: { divisions: string, drought: string } = {
    divisions: "/assets/post/us-drought/divisions-merged.topo.json",
    drought: "/assets/post/us-drought/drought.csv"
  };
  styles;
  width: number = 960;
  height: number = 500;
  svg;
  path;
  g;
  projection;

  droughtYear: string = "2015";
  drought;
  features;
  constructor() { }

  ngOnInit() {
    this.svg = d3Selection.select("#map").append("svg")
      .attr("width", this.width)
      .attr("height", this.height);
    this.projection = d3Geo.geoAlbers()
      .scale(1000)
      .translate([this.width / 2, this.height / 2]);

    this.path = d3Geo.geoPath(this.projection);

    this.styles = d3Scale.scaleQuantile<string>()
      .domain([-4.00, -3.00, -2.00, 0])
      .range(["#7F003F", "#FE0000", "#FEAF44", "#bdc3c7"]);

    forkJoin([
      from(d3Fetch.json(this.data.divisions)),
      from(d3Fetch.csv(this.data.drought)),
      ]
    ).subscribe(results => this.run(results[0], results[1]))
  }

  run(divisions, drought) {
    this.drought = drought;
    let droughtData = this.droughtByYear(drought, this.droughtYear);
    this.features = topojson.feature(divisions, divisions.objects.divisions).features;
    this.svg.append("g")
      .attr("class", "divisions")
      .selectAll("path")
      .data(this.features)
      .enter().append("path")
      .style("fill", d => this.styles(droughtData.get(d.id)))
      .style("stroke", d => {
        return this.styles(droughtData.get(d.id))
      }).attr("d", this.path);
  }
  rightClick(event) {
    if (this.droughtYear === '2015') { return;}
    this.droughtYear = (+this.droughtYear + 1).toString()
    this.updateDrought();
  }

  leftClick(event) {
    if (this.droughtYear === '1895') { return;}
    this.droughtYear = (+this.droughtYear - 1).toString()
    this.updateDrought();
  }
  updateDrought() {
    let droughtData = this.droughtByYear(this.drought, this.droughtYear);
    this.svg.selectAll("path")
      .data(this.features)
      .style("fill", d => {
        return this.styles(droughtData.get(d.id))
      })
      .style("stroke", d => {
        return this.styles(droughtData.get(d.id))
      })
  } 

  droughtByYear(drought, year) {
    let droughtByDiv = d3Collection.map();
    drought.forEach(d => {
      if (d.year === year) {
        droughtByDiv.set(d.key, +d.pdsi)
      }
    });
    return droughtByDiv;

  }
}
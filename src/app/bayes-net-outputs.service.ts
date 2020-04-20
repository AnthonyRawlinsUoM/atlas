import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Papa } from 'ngx-papaparse';

import * as colormap from 'colormap';




@Injectable({
    providedIn: 'root'
})
export class BayesNetOutputsService {

    private url = 'assets/BayesNetOutputs/Absolute/';

    colors;

    regimes = [0, 1, 2, 3, 5, 10, 15, -1];

    constructor(private http: HttpClient, private papa: Papa) {
        this.colors = colormap({
            colormap: 'viridis',
            nshades: 256,
            format: 'rgbaString',
            alpha: 1.0
        });
    }

    public loadMatrix(study_area: any) {

        let rows = { 1: "Edge_Treatment" }
        let columns = { 2: "Landscape_Treatment" }
        let properties = {
            3: "Fire_area",
            4: "House_loss",
            5: "Life_loss",
            6: "Road_loss",
            7: "Power_loss",
            8: "TFI_burnt"
        };


        let matrix_path = `${this.url}${study_area.properties.sim_name}_Matrix.csv`;

        return Observable.create((observer) => {
            console.log('Getting: ' + matrix_path);
            this.papa.parse(matrix_path, {
                download: true,
                complete: (result) => {

                    let matrix = [];
                    for (var i: number = 0; i < (this.regimes.length - 1); i++) {
                        matrix[i] = [];

                        for (var j: number = 0; j < (this.regimes.length - 1); j++) {
                            matrix[i][j] = { value: 0, color: this.colors[(this.regimes.length * j) + i] };
                        }
                    }

                    console.log('Parsed: ', result);

                    // Areas summary
                    let areas = [];
                    for (let c = 1; c < 50; c++) {
                        areas.push(parseFloat(result.data[c][3]));
                    }
                    let area_min = Math.min(...areas);
                    let area_max = Math.max(...areas);

                    // Houses summary
                    let houses = [];
                    for (let c = 1; c < 50; c++) {
                        houses.push(parseFloat(result.data[c][4]));
                    }
                    let house_min = Math.min(...houses);
                    let house_max = Math.max(...houses);

                    // Life summary
                    let lives = [];
                    for (let c = 1; c < 50; c++) {
                        lives.push(parseFloat(result.data[c][5]));
                    }
                    let life_min = Math.min(...lives);
                    let life_max = Math.max(...lives);

                    // Road summary
                    let roads = [];
                    for (let c = 1; c < 50; c++) {
                        roads.push(parseFloat(result.data[c][6]));
                    }
                    let road_min = Math.min(...roads);
                    let road_max = Math.max(...roads);

                    // Power summary
                    let power = [];
                    for (let c = 1; c < 50; c++) {
                        power.push(parseFloat(result.data[c][7]));
                    }
                    let power_min = Math.min(...power);
                    let power_max = Math.max(...power);

                    // TFI summary
                    let tfi = [];
                    for (let c = 1; c < 50; c++) {
                        tfi.push(parseFloat(result.data[c][8]));
                    }
                    let tfi_min = Math.min(...tfi);
                    let tfi_max = Math.max(...tfi);

                    for (let c = 1; c < 50; c++) {
                        let e = parseInt(result.data[c][1].replace('e', ''));
                        let l = parseInt(result.data[c][2].replace('l', ''));

                        console.log('e: ' + e + ' l: ' + l);

                        matrix[this.regimes.indexOf(e)][this.regimes.indexOf(l)] = {
                            "Fire_area": {
                                value: parseFloat(result.data[c][3]),
                                color: this.colors[Math.floor(this.normalise(parseFloat(result.data[c][3]), area_min, area_max) * 255)]
                            },
                            "House_loss": {
                                value: parseFloat(result.data[c][4]),
                                color: this.colors[Math.floor(this.normalise(parseFloat(result.data[c][4]), house_min, house_max) * 255)]
                            },
                            "Life_loss": {
                                value: parseFloat(result.data[c][5]),
                                color: this.colors[Math.floor(this.normalise(parseFloat(result.data[c][5]), life_min, life_max) * 255)]
                            },
                            "Road_loss": {
                                value: parseFloat(result.data[c][6]),
                                color: this.colors[Math.floor(this.normalise(parseFloat(result.data[c][6]), road_min, road_max) * 255)]
                            },
                            "Power_loss": {
                                value: parseFloat(result.data[c][7]),
                                color: this.colors[Math.floor(this.normalise(parseFloat(result.data[c][7]), power_min, power_max) * 255)]
                            },
                            "TFI_burnt": {
                                value: parseFloat(result.data[c][8]),
                                color: this.colors[Math.floor(this.normalise(parseFloat(result.data[c][8]), tfi_min, tfi_max) * 255)]
                            }
                        }
                    }

                    observer.next(matrix);
                }
            });
        });
    }


    private normalise(val, min, max) {
        let normalised = (val - min) / (max - min);
        console.log(normalised);
        return normalised;
    }
}

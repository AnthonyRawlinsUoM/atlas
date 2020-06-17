import { Injectable } from '@angular/core';
import { from, of, Observable, BehaviorSubject, combineLatest, throwError } from 'rxjs';
import { filter, map } from 'rxjs/operators';

// import matrix from '../assets/matrix_master.json';
import matrix from '../assets/matrix_w_costs.json';
// import normals from '../assets/BayesNetOutputs/master_normalised.json';

import Blues from '../assets/cmaps/seq/cmap_Blues_255.json';
import BuGn from '../assets/cmaps/seq/cmap_BuGn_255.json';
import BuPu from '../assets/cmaps/seq/cmap_BuPu_255.json';
import GnBu from '../assets/cmaps/seq/cmap_GnBu_255.json';
import Greens from '../assets/cmaps/seq/cmap_Greens_255.json';
import Greys from '../assets/cmaps/seq/cmap_Greys_255.json';
import OrRd from '../assets/cmaps/seq/cmap_OrRd_255.json';
import Oranges from '../assets/cmaps/seq/cmap_Oranges_255.json';
import PuBu from '../assets/cmaps/seq/cmap_PuBu_255.json';
import PuBuGn from '../assets/cmaps/seq/cmap_PuBuGn_255.json';
import PuRd from '../assets/cmaps/seq/cmap_PuRd_255.json';
import Purples from '../assets/cmaps/seq/cmap_Purples_255.json';
import RdPu from '../assets/cmaps/seq/cmap_RdPu_255.json';
import Reds from '../assets/cmaps/seq/cmap_Reds_255.json';
import YlGn from '../assets/cmaps/seq/cmap_YlGn_255.json';
import YlGnBu from '../assets/cmaps/seq/cmap_YlGnBu_255.json';
import YlOrBr from '../assets/cmaps/seq/cmap_YlOrBr_255.json';
import YlOrRd from '../assets/cmaps/seq/cmap_YlOrRd_255.json';

import cividis from '../assets/cmaps/pu/cmap_cividis_255.json';
import inferno from '../assets/cmaps/pu/cmap_inferno_255.json';
import magma from '../assets/cmaps/pu/cmap_magma_255.json';
import plasma from '../assets/cmaps/pu/cmap_plasma_255.json';
import viridis from '../assets/cmaps/pu/cmap_viridis_255.json';

@Injectable({
    providedIn: 'root'
})
export class WeightsService {



    constructor() { }

    public getLandscapeOptions() {
        return matrix.regimes.landscape;
    }

    public getEdgeOptions() {
        return matrix.regimes.edge;
    }

    public getSpiderSeries(area, positions) {
        return Observable.create((observer) => {
            // Area = array of indexes row*col + col
            // eg., [0,12,14...,48] etc

            let selected_area = matrix.areas[area];
            let res = [];
            for (let m in selected_area) {
                let metric = {};
                for (let i in selected_area[m]) {
                    for (let pos = 0; pos < positions.length; pos++) {
                        if (i == positions[pos].toString()) {
                            metric['idx' + (i.toString())] = selected_area[m][i];
                        }
                    }
                }
                metric["metric"] = m;
                res.push(metric);
            }
            observer.next(res)
        });
    }

    public getSingleSeries(study, scope, level:number, treatment) {

        const pos = [0,1,2,3,4,5,6];
        console.log(treatment);
        console.log(level);
        console.log(study);
        return Observable.create((observer) => {
            // Area = array of indexes row*col + col
            // eg., [0,12,14...,48] etc

            let selected_area = matrix.areas[study];
            let res = [];

            for (let m in selected_area) {
                if (m == scope) {
                    for (let i in selected_area[m]) {
                      if (treatment == 'landscape') {
                        // 0,1,2,3,4,5,6
                        for (let j of pos) {
                          if(i == (j + (level * 7)).toString()) res.push(selected_area[m][i]);
                        }
                      }
                      if (treatment == 'edge') {
                        for (let j of pos) {
                          if(i == (level + (j * 7)).toString()) res.push(selected_area[m][i]);
                        }
                      }
                    }
                }
            }
            observer.next(res)
        });
    }

    public getMatrixValueForAreaScope(cellpos, area, scope) {
        let norms = matrix.areas[area][scope];
        let normalised_value = norms[cellpos];
        return normalised_value;
    }

    public getMatrixCellOptionsForAreaScope(cellpos, area, scope, cmap, mode) {
        let norms = matrix.areas[area][scope];
        let normalised_value = norms[cellpos];
        let color_value = Math.floor(normalised_value * 255);
        let colormap = viridis; // Default

        if (cmap == 'viridis') {
            let colormap = viridis;
        } else if (cmap == 'inferno') {
            let colormap = inferno;
        } else if (cmap == 'magma') {
            let colormap = magma;
        } else if (cmap == 'plasma') {
            let colormap = plasma;
        } else if (cmap == 'cividis') {
            let colormap = cividis;
        }
        let c = this.where(colormap, { index: color_value });

        return c[0]['hex'];
    }


    public get2DColor(size, row, column) {
        let colormap = magma;

        let offset = Math.floor(((row * size) + column) * 5);
        let c = this.where(colormap, { index: offset });
        return c[0]['hex'];
    }

    public get1DColor(idx) {
        let colormap = magma;
        let offset = Math.floor(idx * 5);
        let c = this.where(colormap, { index: offset });
        return c[0]['hex'];
    }

    private where(collection, constraint) {
        return collection.filter(collectionItem =>
            Object.keys(constraint).every(key =>
                collectionItem.hasOwnProperty(key) && constraint[key] === collectionItem[key]));
    }


    public getRowColumnForIndex(idx) {
        let column = parseInt(idx) % matrix.regimes.landscape.length;
        let row = Math.floor(parseInt(idx) / matrix.regimes.edge.length); // Reversed order!!

        console.log("Row: " + row);
        console.log("Column: " + column);

        let edge = matrix.regimes.edge.filter(e => {
            if (e['value'] === row) {
                return e;
            }
        }).map(e => {
            return e['name'];
        });
        let land = matrix.regimes.landscape.filter(l => {
            if (l['value'] === column) {
                return l;
            }
        }).map(l => {
            return l['name'];
        });
        console.log("Edge: " + edge);
        console.log("Land: " + land);

        let disp = "Edge: " + edge + "% Landscape: " + land + "%";
        console.log(disp);
        return disp;
    }
}

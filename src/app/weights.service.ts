import { Injectable } from '@angular/core';
import { from, of, Observable, BehaviorSubject, combineLatest, throwError } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import matrix from '../assets/matrix_master.json';
import normals from '../assets/BayesNetOutputs/master_normalised.json';

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
        return matrix.regimes.edge.reverse();
    }

    public getSpiderSeries(area, positions) {
        return Observable.create((observer) => {
            // Area = array of indexes row*col + col
            // eg., [0,12,14...,48] etc

            console.log(positions);
            console.log(area);

            let selected_area = normals.areas[area];

            let res = [];

            // console.log(selected_area);

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

            // console.log(res);
            observer.next(res)
        });
    }

    public getMatrixCellOptionsForAreaScope(lpos, epos, area, scope, cmap, mode) {

        console.log(area);
        console.log(scope);

        let norms = matrix.areas[area][scope];

        console.log(norms);

        let e = parseInt(epos); // reverse order
        let l = parseInt(lpos);
        let cellpos: number = (l * this.getEdgeOptions().length) + e;

        // console.log('Evaluating: ', cellpos);

        let normalised_value = norms[cellpos];
        // console.log('Normalised: ', normalised_value);
        let color_value = Math.floor(normalised_value * 255);
        // console.log('Color value: ', color_value);
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
        // console.log(c);
        // console.log(c[0]['hex']);

        return c[0]['hex'];
    }


    public get2DColor(size, row, column) {
        let cmap = plasma;

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
}

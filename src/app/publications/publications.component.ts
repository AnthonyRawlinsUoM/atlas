import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Cover, Author } from './cover/cover.component';



@Component({
    selector: 'app-publications',
    templateUrl: './publications.component.html',
    styleUrls: ['./publications.component.css']
})
export class PublicationsComponent implements OnInit {
    dois = [
        { doi: '10.1071/WF18135' },
        { doi: '10.1016/j.foreco.2018.11.009' },
        { doi: '10.1016/j.agrformet.2019.03.005' },
        { doi: '10.1016/j.jenvman.2019.01.055' },
        { doi: '10.3389/ffgc.2020.00079'},
        { doi: '10.1016/j.jenvman.2020.110735'}
    ];

    covers: Array<Cover> = [
      {
        title: "Impact of Australia's catastrophic 2019/20 bushfire season on communities and environment. Retrospective analysis and current trends",
        image: '/assets/images/black_summer.jpg',
        link: 'https://www.bnhcrc.com.au/publications/biblio/bnh-7036',
        description: 'Journal of Safety Science and Resilience',
        doi: 'http://dx.doi.org/10.1016/j.jnlssr.2020.06.009',
        date: '07/2020',
        authors: [
          {
            name: 'Filkov, A',
            url: 'https://www.bnhcrc.com.au/people/afilkov'
          },
          {
            name: 'Ngo, T',
            url: 'https://www.bnhcrc.com.au/people/tngo'
          },
          {
            name: 'Matthew, S',
            url: 'https://www.bnhcrc.com.au/publications/biblio?f%5Bauthor%5D=91'
          },
          {
            name: 'Tefler, S',
            url: 'https://www.bnhcrc.com.au/publications/biblio?f%5Bauthor%5D=1346'
          },
          {
            name: 'Penman, T',
            url: 'https://www.bnhcrc.com.au/people/tpenman'
          }
        ]
      },

      {
        title: "A new decision support tool for prescribed burning risk assessment",
        image: '/assets/images/afac19.jpg',
        link: 'https://www.aidr.org.au/media/7378/monograph_afac19-peer-reviewed_v2_051219.pdf',
        description: 'Bushfire and Natural Hazards CRC Research Day AFAC19',
        date: '12/2019',
        authors: [
          {
            name: 'Clarke, H',
            url: 'https://www.bnhcrc.com.au/people/hclarke'
          },
          {
            name: 'Cirilus, B',
            url: 'https://www.bnhcrc.com.au/people/bcirulis'
          },
          {
            name: 'Bradstock, R',
            url: 'https://www.bnhcrc.com.au/people/rbradstock'
          },
          {
            name: 'Boer, MM',
            url: 'https://www.bnhcrc.com.au/people/mboer'
          },
          {
            name: 'Penman, T',
            url: 'https://www.bnhcrc.com.au/people/tpenman'
          },
          {
            name: 'Price, O',
            url: 'https://www.bnhcrc.com.au/people/oprice'
          }
        ]
      },
      {
        title: "Cost-effective prescribed burning solutions vary between landscapes in eastern Australia",
        image: '/assets/images/afac19.jpg',
        link: 'https://www.aidr.org.au/media/7378/monograph_afac19-peer-reviewed_v2_051219.pdf',
        description: 'Frontiers in Forests and Global Change',
        date: '6/2020',
        doi: '10.3389/ffgc.2020.00079',
        authors: [
          {
            name: 'Penman, T',
            url: 'https://www.bnhcrc.com.au/people/tpenman'
          },
          {
            name: 'Clarke, H',
            url: 'https://www.bnhcrc.com.au/people/hclarke'
          },
          {
            name: 'Cirilus, B',
            url: 'https://www.bnhcrc.com.au/people/bcirulis'
          },
          {
            name: 'Boer, MM',
            url: 'https://www.bnhcrc.com.au/people/mboer'
          },
          {
            name: 'Price, O',
            url: 'https://www.bnhcrc.com.au/people/oprice'
          },
          {
            name: 'Bradstock, R',
            url: 'https://www.bnhcrc.com.au/people/rbradstock'
          }
        ]
      }

    ];

    constructor(private http: HttpClient) { }

    ngOnInit() {
    }
}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css']
})
export class AboutusComponent implements OnInit {

  AboutUsData = [
    {
      FristName : "ISADORE SHARP",
      LastName : "FOUNDER AND CHAIRMAN",
      description: "There was no vision, there",
      description1:"was no grand dream – but",
      description2:"there has always been a",
      description3:"consistent thread and it",
      description4:"propels us forward today, as",
      description5:"we continue to grow globally,",
      description6:"and that’s service.",
    
    },

  ];

  AboutUsImage = [
   
    {
      img : "../../assets/FourSeasonsHotel/AboutUsPerson.jpg",
    },

  ];
  IconsData = [
   
    {
      img : "../../assets/FourSeasonsHotel/icons1.png",
      title : "NUMERUOUS ACTIVITIES"
    },

    {
      img : "../../assets/FourSeasonsHotel/icons2.png",
      title : "CONTINUOUS SERVICES"
    },

    {
      img : "../../assets/FourSeasonsHotel/icons3.png",
      title : "THE FINEST CUISINES"
    }
  ];
  constructor() { }

  ngOnInit(): void {
  }

}

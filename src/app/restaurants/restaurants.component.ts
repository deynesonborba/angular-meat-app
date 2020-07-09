import { Component, OnInit } from '@angular/core';
import {Restaurant} from './restaurant/restaurant.model'
import {RestaurantsService} from './restaurants.service'
import {trigger, state, style, transition, animate} from '@angular/animations'
import {FormBuilder, FormControl, FormGroup} from '@angular/forms'
import 'rxjs/add/operator/switchMap'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/debounceTime'
import 'rxjs/add/operator/distinctUntilChanged'
import 'rxjs/add/operator/catch'
import 'rxjs/add/observable/from'
import {Observable} from 'rxjs/Observable'

@Component({
  selector: 'mt-restaurants',
  templateUrl: './restaurants.component.html',
  animations: [
    trigger('toggleSearch', [
      state('hidden', style({
        opacity: 0,
        "max-height": "0px"
      })),
      state('visible', style({
        opacity: 1,
        "max-height": "70px",
        "margin-top": "20px"
      })),
      transition('* => *', animate('250ms 0s ease-in-out'))
    ])
  ]
})
export class RestaurantsComponent implements OnInit {

  searchBarState = 'hidden'
  restaurants: Restaurant[]
  searchForm: FormGroup
  searchControl: FormControl

  constructor(private restaurantService: RestaurantsService,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.searchControl = this.fb.control('')
    this.searchForm = this.fb.group({
      searchControl: this.searchControl
    })

    //-- aplicação da busca de restaurantes
    this.searchControl.valueChanges
      .debounceTime(500)//timer para não buscar no back-end a cada teclas
      .distinctUntilChanged()//para não fazer buscar repetidas
      //.do(searchTerm => console.log(`q = ${searchTerm}`))//só faz algo com o retorno
      .switchMap(searchTerm =>//switchMap não deixa fazer requests independentes, ele faz o unsubcribe da request anterior
    this.restaurantService
      .restaurants(searchTerm)
      .catch(error=>Observable.from([])))//tratamento de erros para não travar o Observable
      .subscribe(restaurants => this.restaurants = restaurants)
      //-- aplicação da busca de restaurantes

    this.restaurantService.restaurants()
      .subscribe(restaurants => this.restaurants = restaurants)
  }

  toggleSearch() {
    this.searchBarState = this.searchBarState === 'hidden' ? 'visible' : 'hidden'
  }
}

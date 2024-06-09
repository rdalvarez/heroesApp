import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Hero } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styles: ``
})
export class SearchPageComponent {

  public searchInput = new FormControl('');
  public heroes: Hero[]= [];
  public selectedHero?: Hero;

  public constructor( private heroesService: HeroesService ){}

  searchHero(){
    const value: string = this.searchInput.value || '';

    this.heroesService.getSuggestion( value )
      .subscribe( (heroes) => {
        this.heroes = heroes.filter(
          (hero) => hero.superhero.toLocaleLowerCase().startsWith(value.toLocaleLowerCase())
        );
      } );
  }

  onSelectedOption(event: MatAutocompleteSelectedEvent):void{
    if (!event.option.value ) {
      this.selectedHero = undefined;
      return
    }

    const hero: Hero = event.option.value;
    this.searchInput.setValue(hero.superhero);

    this.selectedHero = hero;
  }

}

import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: ``,
})
export class NewPageComponent {
  public heroForm = new FormGroup({
    id: new FormControl<string | null>(''),
    superhero: new FormControl<string>('', { nonNullable: true }),
    publisher: new FormControl<Publisher>(Publisher.DCComics),
    alter_ego: new FormControl<string>(''),
    first_appearance: new FormControl<string>(''),
    characters: new FormControl<string>(''),
    alt_img: new FormControl<string>(''),
  });

  public publishers = [
    { id: 'DC Comics', desc: 'DC - Comics' },
    { id: 'Marvel Comics', desc: 'Marvel - Comics' },
  ];

  constructor ( private heroesService: HeroesService ){}


  public get currentHero() : Hero {
    const hero = this.heroForm.value as Hero;
    return hero;
  }


  onSubmit(){
    console.log(
      { formIsValid: this.heroForm.valid,
        value: this.heroForm.value
      }
    );

    if ( this.heroForm.invalid) return;

    //this.heroesService.updateHero( this.heroForm.value )

  }

}

import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';

import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('popOverState', [
      state(
        'show',
        style({
          opacity: 1,
          transform: 'translateX(0)'
        })
      ),
      state(
        'hide',
        style({
          opacity: 0,
          transform: 'rotate3d(0, 1, 0, 180deg)'
        })
      ),
      transition('show => hide', animate('600ms ease-out')),
      transition('hide => show', animate('600ms ease-in'))
    ]),
    trigger('popverState', [
      state(
        'show',
        style({
          opacity: 0,
          transform: 'rotate3d(0, 1, 0, 180deg)'
        })
      ),
      state(
        'hide',
        style({
          opacity: 1,
          transform: 'translateX(0)'
        })
      ),
      transition('show => hide', animate('600ms ease-out')),
      transition('hide => show', animate('600ms ease-in'))
    ])
  ]
})
export class AppComponent implements OnInit {
  title = 'creditcard-app';
  number = new FormControl('');
  cvc = new FormControl('');
  show = false;
  back = false;
  registerForm: FormGroup;
  submitted = false;

  onDateChange(valid: string) {
    valid = valid.replace(new RegExp('_', 'g'), '•');
    (<HTMLInputElement>document.getElementById('inputValid')).value = valid;
  }

  onInputChange(numb: string) {
    const color = document.querySelector('.creditcard') as HTMLElement;
    const visa =  document.querySelector('.chip-right') as HTMLElement;
    const master =  document.querySelector('.chip-master') as HTMLElement;
    if (numb[0] === '4') {
      color.style.backgroundColor = '#6699CC';
      visa.style.display = 'block';
      console.log('success');
    } else if (numb[0] === '5' && numb[1] === '5') {
      color.style.backgroundColor = '#f07610';
      master.style.display = 'block';
      console.log('gold');
    } else if (numb[0] === '_') {
      color.style.backgroundColor = '#AFB8BD';
      visa.style.display = 'none';
      master.style.display = 'none';
    }
    numb = numb.replace(new RegExp('_', 'g'), '•');
    (<HTMLInputElement>document.getElementById('inputNumber')).value = numb;
  }

  constructor(private formBuilder: FormBuilder) {}

  get stateName() {
    return this.show ? 'show' : 'hide';
  }

  toggle() {
    if (this.stateName === 'show') {
      this.show = this.show;
    } else {
      this.show = !this.show;
    }
  }

  click() {
    if (this.stateName === 'show') {
      this.show = !this.show;
    } else {
      this.show = this.show;
    }
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      text: new FormControl('', Validators.required),
      date: ['', [Validators.required, Validators.minLength(4)]],
      number: ['', [Validators.required, Validators.minLength(16)]],
      cvc: ['', [Validators.required, Validators.minLength(3)]]
    });
  }
  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    const result = document.querySelector('.result') as HTMLElement;
    console.log(this.registerForm.value);
    if (this.registerForm.invalid) {
      return;
    }
    result.style.display = 'block';
  }
}


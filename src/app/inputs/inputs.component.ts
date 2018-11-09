import { Component, OnInit, Pipe } from '@angular/core';

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
  selector: 'app-inputs',
  templateUrl: './inputs.component.html',
  styleUrls: ['./inputs.component.scss'],
  animations: [
    trigger('inputResult', [
      state(
        'block',
        style({
          opacity: 1
        })
      ),
      state(
        'none',
        style({
          opacity: 0
        })
      ),
      transition('block => none', animate('600ms ease-out')),
      transition('none => block', animate('600ms ease-in'))
    ])
  ]
})
export class InputsComponent implements OnInit {
  title = 'creditcard-app';
  text = '';
  cvc = '';
  show = false;
  block = false;
  back = false;
  registerForm: FormGroup;
  submitted = false;
  result: string;
  num: string;
  exDate: string;

  onKey(event: any) {
    this.text = event.target.value;
  }

  onKeyCvc(event: any) {
    this.cvc = event.target.value;
  }

  onInputChange(numb: string) {
    if (numb[0] === '4') {
      this.result = 'isVisa';
    } else if (numb[0] === '5' && numb[1] === '5') {
      this.result = 'isMaster';
    } else if (numb[0] === '_' || numb[0] !== '5' || numb[0] !== '4') {
      this.result = 'isNormal';
    }

    numb = numb.replace(new RegExp('_', 'g'), '•');
    this.num = numb;
  }

  onNumberInput(event: any) {
    this.num = (<HTMLInputElement>event.target).value;
  }

  onDateChange(valid: string) {
    valid = valid.replace(new RegExp('_', 'g'), '•');
    this.exDate = valid;
  }

  ExpDate(event: any) {
    this.exDate = (<HTMLInputElement>event.target).value;
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
    if (this.registerForm.invalid) {
      return;
    }
    this.block = !this.block;
  }

  get In() {
    return this.block ? 'block' : 'none';
  }
}

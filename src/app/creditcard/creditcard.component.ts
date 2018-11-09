import { Component, OnInit, Pipe } from '@angular/core';
import { Input, Output } from '@angular/core';

import {
  FormControl,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup
} from '@angular/forms';

import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { EventEmitter } from '@angular/core';


@Component({
  selector: 'app-creditcard',
  templateUrl: './creditcard.component.html',
  styleUrls: ['./creditcard.component.scss'],
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
export class CreditcardComponent {
  @Input()
  text: string;
  @Input()
  cvc: string;
  @Input()
  show = false;
  @Input()
  result: string;
  @Input()
  num: string;
  @Input()
  exDate: string;
  @Output() ColorEvent = new EventEmitter<string>();


  callParent() {
    this.ColorEvent.next(' onInputChange(numb: string)');
  }
  public setMyStyles(): any {
    const styles = {
      'background-color':
        this.result === 'isVisa'
          ? '#6699CC'
          : this.result === 'isMaster'
            ? '#f07610'
            : '#AFB8BD'
    };
    return styles;
  }

  public setVisaLogo(): any {
    const styles = {
      display: this.result === 'isVisa' ? 'block' : 'none'
    };
    return styles;
  }

  public setMasterLogo(): any {
    const styles = {
      display: this.result === 'isMaster' ? 'block' : 'none'
    };
    return styles;
  }

  constructor(private formBuilder: FormBuilder) {}

  get stateName() {
    return this.show ? 'show' : 'hide';
  }
}

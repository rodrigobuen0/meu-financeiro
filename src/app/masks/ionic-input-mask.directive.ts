import { Attribute, Directive } from '@angular/core';
import { NgModel } from '@angular/forms';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[mask]',
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: {
    '(keydown)': 'onKeyDown($event)'
  },
  providers: [NgModel]
})
export class IonicInputMaskDirective {

  pattern: string;

  constructor(public model: NgModel,
              @Attribute('mask') pattern: string) {
    this.pattern = pattern;
  }

  onKeyDown(event: any) {
    let value = event.target.value;
      const pattern = this.pattern;
    if (event.keyIdentifier === 'U+0008' || event.keyCode === 8 || event.key === 'Backspace') {
      if (value.length) { //prevent fatal exception when backspacing empty value in progressive web app
        //remove all trailing formatting then delete character
        while (pattern[value.length] && pattern[value.length] !== '*') {
          value = value.substring(0, value.length - 1);
        }
        //remove all leading formatting to restore placeholder
        if (pattern.substring(0, value.length).indexOf('*') < 0) {
          value = value.substring(0, value.length - 1);
        }
      }
    } else {
      let maskIndex = value.length;
      let formatted = '';
      formatted += value;
      if (maskIndex < pattern.length) {
        //apply trailing formatting
        while (pattern[maskIndex] !== '*') {
          formatted += pattern[maskIndex];
          maskIndex++;
        }
      }
      value = formatted;
    }
    event.target.value = value;
    if (this.model) {
      this.model.update.emit(value);
    }
    return true;
  }

}

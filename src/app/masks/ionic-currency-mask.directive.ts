import {Attribute, Directive} from '@angular/core';
import {NgModel} from '@angular/forms';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[currencyMask]',
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: {
    '(keyup)': 'changeValue($event)',
    '(ionChange)': 'changeValue($event)',
  },
  providers: [NgModel]
})
export class CurrencyMaskDirective {

  /**
   * Decimal separator (defaults to ",")
   */
  decimal = ',';

  /**
   * Thousand separator (defaults to ".")
   */
  thousand = '.';

  constructor(public model: NgModel,
              @Attribute('decimal') decimal: string,
              @Attribute('thousand') thousand: string) {
    if (decimal) {
      this.decimal = decimal;
    }
    if (thousand) {
      this.thousand = thousand;
    }
  }

  changeValue(event: any) {
    let value = event.target.value;
    if (value === '') {
      return;
    }
    value = value + '';
    // eslint-disable-next-line radix
    value = parseInt(value.replace(/[\D]+/g, ''));
    value = value + '';
    value = value.replace(/([0-9]{2})$/g, this.decimal + '$1');
    const parts = value.toString().split(this.decimal);
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, this.thousand);
    value = parts.join(this.decimal);
    //console.log(value);
    event.target.value = value;
    this.model.update.emit(value);
    return true;
  }
}
